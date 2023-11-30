import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import {
  number,
  object,
  ObjectSchema,
  ref,
  string,
  ValidationError,
} from 'yup';
import styles from './uncontrolledForm.module.css';
import { EFormFieldNames } from '../../types/enums/EFormFieldNames';
import { EErrorMessages } from '../../types/enums/EErrorMessages';
import { getPasswordStrength } from '../../utils/getPasswordStrength';
import { getStrengthColor } from '../../utils/getStrengthColor';
import { AutocompleteSelect } from '../AutocompleteSelect';
import { useAppSelector } from '../../hooks/useAppSelector';

interface IFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  accept: string;
  image: string;
  country: string;
}

const schema: ObjectSchema<IFormData> = object({
  name: string()
    .required(EErrorMessages.requireName)
    .test({
      test(value, ctx) {
        if (!value) {
          return ctx.createError({ message: EErrorMessages.requireName });
        }

        if ([...value][0] !== [...value][0].toUpperCase()) {
          return ctx.createError({ message: EErrorMessages.capitalizeError });
        }

        return true;
      },
    }),
  age: number()
    .required(EErrorMessages.requireAge)
    .test({
      test(value, ctx) {
        if (value === 0) {
          return ctx.createError({ message: EErrorMessages.requireAge });
        }

        if (value < 0) {
          return ctx.createError({ message: EErrorMessages.positiveError });
        }

        return true;
      },
    }),
  email: string()
    .email(EErrorMessages.invalidFormat)
    .required(EErrorMessages.requireEmail),
  password: string()
    .required(EErrorMessages.requirePassword)
    .min(8, EErrorMessages.passwordLengthError)
    .test({
      test(value, ctx) {
        if (!value) {
          return ctx.createError({ message: EErrorMessages.requirePassword });
        }

        if (
          !/^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{4,}$/.test(
            value
          )
        ) {
          return ctx.createError({ message: EErrorMessages.strengthError });
        }

        return true;
      },
    }),
  confirmPassword: string()
    .oneOf([ref('password')], EErrorMessages.matchError)
    .required(EErrorMessages.requireConfirmPassword),
  gender: string<'male' | 'female'>().required(EErrorMessages.requireGender),
  accept: string().required(EErrorMessages.requireAccept),
  image: string()
    .required(EErrorMessages.requireImage)
    .test({
      test(value, ctx) {
        if (!value.split(',')[1]) {
          return ctx.createError({ message: EErrorMessages.requireImage });
        }

        const extension = value.split(';')[0].split(':')[1].split('/')[1];

        if (atob(value.split(',')[1]).length / 1024 / 1024 > 1) {
          return ctx.createError({ message: EErrorMessages.invalidSize });
        }

        if (extension === 'png' || extension === 'jpeg') {
          return true;
        }

        return ctx.createError({ message: EErrorMessages.invalidExtension });
      },
    }),
  country: string().required(EErrorMessages.requiredCountry),
});

export function UncontrolledForm() {
  const { countries } = useAppSelector((state) => state.countries);
  const [strength, setStrength] = useState(getPasswordStrength(''));
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const imageRef = useRef<HTMLInputElement>(null);
  const toBase64 = async (file: File | undefined) => {
    if (!file) {
      throw new Error('no file');
    }

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { target } = event;

    const formData = Object.fromEntries(
      new FormData(target as HTMLFormElement)
    );
    const base64File = await toBase64(formData[EFormFieldNames.image] as File);

    const convertedData: { [k: string]: string } = {
      ...formData,
      [EFormFieldNames.image]: base64File,
      [EFormFieldNames.age]: (formData[EFormFieldNames.age] as string) || '0',
    };

    schema
      .validate(convertedData, { abortEarly: false })
      .then(() => setIsDisabled(false))
      .catch((validationErrors: ValidationError) => {
        const newErrors: Record<string, string> = {};
        validationErrors.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      });
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStrength(getPasswordStrength(event.target.value));
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="name">
        <span>Name:</span>
        <input
          className={styles.input}
          type="text"
          name={EFormFieldNames.name}
          id="name"
          placeholder="Name..."
        />
        {errors[EFormFieldNames.name] && (
          <span className={styles.error}>{errors[EFormFieldNames.name]}</span>
        )}
      </label>
      <label className={styles.label} htmlFor="age">
        <span>Age:</span>
        <input
          className={styles.input}
          type="number"
          name={EFormFieldNames.age}
          id="age"
          placeholder="22"
        />
        {errors[EFormFieldNames.age] && (
          <span className={styles.error}>{errors[EFormFieldNames.age]}</span>
        )}
      </label>
      <label className={styles.label} htmlFor="email">
        <span>Email:</span>
        <input
          className={styles.input}
          type="text"
          name={EFormFieldNames.email}
          id="email"
          placeholder="email@example.com"
        />
        {errors[EFormFieldNames.email] && (
          <span className={styles.error}>{errors[EFormFieldNames.email]}</span>
        )}
      </label>
      <label className={styles.label} htmlFor="password">
        <span>Password:</span>
        <input
          className={styles.input}
          type="password"
          name={EFormFieldNames.password}
          id="password"
          placeholder="Passowrd..."
          onChange={handlePasswordChange}
        />
        {errors[EFormFieldNames.password] && (
          <span className={styles.error}>
            {errors[EFormFieldNames.password]}
          </span>
        )}
      </label>
      <div>
        <div>Password Strength: {strength.toFixed(2)}%</div>
        <div
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: 'lightgray',
            marginTop: '5px',
          }}
        >
          <div
            style={{
              width: `${strength}%`,
              height: '100%',
              backgroundColor: getStrengthColor(strength),
            }}
          />
        </div>
      </div>
      <label className={styles.label} htmlFor="confirmPassword">
        <span>Confirm password:</span>
        <input
          className={styles.input}
          type="password"
          name={EFormFieldNames.confirmPassword}
          id="confirmPassword"
          placeholder="Passowrd..."
        />
        {errors[EFormFieldNames.confirmPassword] && (
          <span className={styles.error}>
            {errors[EFormFieldNames.confirmPassword]}
          </span>
        )}
      </label>
      <div className={styles.gender}>
        <span>Gender: </span>
        <label className={styles.label} htmlFor="gender_female">
          <input
            className={styles.radio}
            type="radio"
            name={EFormFieldNames.gender}
            id="gender_female"
          />
          <span> :Female</span>
        </label>
        <label className={styles.label} htmlFor="gender_male">
          <input
            className={styles.radio}
            type="radio"
            name={EFormFieldNames.gender}
            id="gender_male"
          />
          <span> :Male</span>
        </label>
        {errors[EFormFieldNames.gender] && (
          <span className={styles.error}>{errors[EFormFieldNames.gender]}</span>
        )}
      </div>
      <label className={styles.accept} htmlFor="accept">
        <span>Accept T&C:</span>
        <input type="checkbox" name={EFormFieldNames.accept} id="accept" />
        {errors[EFormFieldNames.accept] && (
          <span className={styles.error}>{errors[EFormFieldNames.accept]}</span>
        )}
      </label>
      <label className={styles.label} htmlFor="image">
        <span>Upload image:</span>
        <input
          type="file"
          ref={imageRef}
          name={EFormFieldNames.image}
          id="image"
        />
        {errors[EFormFieldNames.image] && (
          <span className={styles.error}>{errors[EFormFieldNames.image]}</span>
        )}
      </label>
      <AutocompleteSelect
        label="Country:"
        list={countries}
        error={errors[EFormFieldNames.country]}
      />
      <button type="submit" disabled={!isDisabled}>
        Send
      </button>
    </form>
  );
}
