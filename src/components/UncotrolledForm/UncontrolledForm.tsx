import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import { useNavigate } from 'react-router-dom';
import { EFormFieldNames } from '../../types/enums/EFormFieldNames';
import { getPasswordStrength } from '../../utils/getPasswordStrength';
import { getStrengthColor } from '../../utils/getStrengthColor';
import { AutocompleteSelect } from '../AutocompleteSelect';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { appendData } from '../../store/formData/formData';
import { schema } from '../../utils/schema';
import { toBase64 } from '../../utils/toBase64';

export function UncontrolledForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { countries } = useAppSelector((state) => state.countries);
  const [strength, setStrength] = useState(getPasswordStrength(''));
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const imageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const { target } = event;

    const formData = Object.fromEntries(
      new FormData(target as HTMLFormElement)
    );

    const base64File = await toBase64(formData[EFormFieldNames.image] as File);
    const fileList = new DataTransfer();
    fileList.items.add(formData[EFormFieldNames.image] as File);

    const convertedData = {
      ...formData,
      [EFormFieldNames.age]: (formData[EFormFieldNames.age] as string) || '0',
      [EFormFieldNames.accept]:
        (formData[EFormFieldNames.accept] as string) === 'on',
      [EFormFieldNames.image]: fileList.files,
    };

    schema
      .validate(convertedData, { abortEarly: false })
      .then((data) => {
        dispatch(appendData({ ...data, image: base64File }));
        navigate('/');
      })
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

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label" htmlFor="name">
        <span>Name:</span>
        <input
          className="input"
          type="text"
          name={EFormFieldNames.name}
          id="name"
          placeholder="Name..."
        />
        {errors[EFormFieldNames.name] && (
          <span className="error">{errors[EFormFieldNames.name]}</span>
        )}
      </label>
      <label className="label" htmlFor="age">
        <span>Age:</span>
        <input
          className="input"
          type="number"
          name={EFormFieldNames.age}
          id="age"
          placeholder="22"
        />
        {errors[EFormFieldNames.age] && (
          <span className="error">{errors[EFormFieldNames.age]}</span>
        )}
      </label>
      <label className="label" htmlFor="email">
        <span>Email:</span>
        <input
          className="input"
          type="text"
          name={EFormFieldNames.email}
          id="email"
          placeholder="email@example.com"
        />
        {errors[EFormFieldNames.email] && (
          <span className="error">{errors[EFormFieldNames.email]}</span>
        )}
      </label>
      <label className="label" htmlFor="password">
        <span>Password:</span>
        <input
          className="input"
          type="password"
          name={EFormFieldNames.password}
          id="password"
          placeholder="Passowrd..."
          onChange={handlePasswordChange}
        />
        {errors[EFormFieldNames.password] && (
          <span className="error">{errors[EFormFieldNames.password]}</span>
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
      <label className="label" htmlFor="confirmPassword">
        <span>Confirm password:</span>
        <input
          className="input"
          type="password"
          name={EFormFieldNames.confirmPassword}
          id="confirmPassword"
          placeholder="Passowrd..."
        />
        {errors[EFormFieldNames.confirmPassword] && (
          <span className="error">
            {errors[EFormFieldNames.confirmPassword]}
          </span>
        )}
      </label>
      <div className="gender">
        <span>Gender: </span>
        <label className="label" htmlFor="gender_female">
          <input
            className="radio"
            type="radio"
            name={EFormFieldNames.gender}
            id="gender_female"
            value="female"
          />
          <span> :Female</span>
        </label>
        <label className="label" htmlFor="gender_male">
          <input
            className="radio"
            type="radio"
            name={EFormFieldNames.gender}
            id="gender_male"
            value="male"
          />
          <span> :Male</span>
        </label>
        {errors[EFormFieldNames.gender] && (
          <span className="error">{errors[EFormFieldNames.gender]}</span>
        )}
      </div>
      <label className="accept" htmlFor="accept">
        <span>Accept T&C:</span>
        <input type="checkbox" name={EFormFieldNames.accept} id="accept" />
        {errors[EFormFieldNames.accept] && (
          <span className="error">{errors[EFormFieldNames.accept]}</span>
        )}
      </label>
      <label className="label" htmlFor="image">
        <span>Upload image:</span>
        <input
          type="file"
          ref={imageRef}
          name={EFormFieldNames.image}
          id="image"
        />
        {errors[EFormFieldNames.image] && (
          <span className="error">{errors[EFormFieldNames.image]}</span>
        )}
      </label>
      <AutocompleteSelect
        label="Country:"
        list={countries}
        error={errors[EFormFieldNames.country]}
      />
      <button type="submit">Send</button>
    </form>
  );
}
