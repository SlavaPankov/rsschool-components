/* eslint-disable react/jsx-props-no-spreading */
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { schema } from '../../utils/schema';
import { IFormData } from '../../types/interfaces/IFormData';
import { toBase64 } from '../../utils/toBase64';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { appendData } from '../../store/formData/formData';
import { EFormFieldNames } from '../../types/enums/EFormFieldNames';
import { useAppSelector } from '../../hooks/useAppSelector';
import { PasswordStrength } from '../PasswordStrength';
import { getPasswordStrength } from '../../utils/getPasswordStrength';

export function ReactHookForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { countries } = useAppSelector((state) => state.countries);
  const [strength, setStrength] = useState(getPasswordStrength(''));
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      age: 0,
      email: '',
      password: '',
      confirmPassword: '',
      gender: 'male',
      accept: false,
      country: '',
    },
  });

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const base64File = await toBase64(data.image[0]);

    dispatch(
      appendData({
        ...data,
        image: base64File,
      })
    );

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <Controller
        name={EFormFieldNames.name}
        control={control}
        render={({ field }) => (
          <label htmlFor={EFormFieldNames.name} className="label">
            Name:
            <input
              {...field}
              type="text"
              className="input"
              id={EFormFieldNames.name}
            />
            {errors.name && (
              <span className="error">{errors.name.message}</span>
            )}
          </label>
        )}
      />
      <Controller
        name={EFormFieldNames.age}
        control={control}
        render={({ field }) => (
          <label htmlFor={EFormFieldNames.age} className="label">
            Age:
            <input
              {...field}
              type="number"
              className="input"
              id={EFormFieldNames.age}
            />
            {errors.age && <span className="error">{errors.age.message}</span>}
          </label>
        )}
      />
      <Controller
        name={EFormFieldNames.email}
        control={control}
        render={({ field }) => (
          <label htmlFor={EFormFieldNames.email} className="label">
            Email:
            <input
              {...field}
              type="text"
              className="input"
              id={EFormFieldNames.email}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </label>
        )}
      />
      <Controller
        name={EFormFieldNames.password}
        control={control}
        render={({ field }) => (
          <label htmlFor={EFormFieldNames.password} className="label">
            Password:
            <input
              {...field}
              type="password"
              className="input"
              id={EFormFieldNames.password}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                field.onChange(event);
                setStrength(getPasswordStrength(event.target.value));
              }}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </label>
        )}
      />
      <PasswordStrength strength={strength} />
      <Controller
        name={EFormFieldNames.confirmPassword}
        control={control}
        render={({ field }) => (
          <label htmlFor={EFormFieldNames.confirmPassword} className="label">
            Password:
            <input
              {...field}
              type="password"
              className="input"
              id={EFormFieldNames.confirmPassword}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword.message}</span>
            )}
          </label>
        )}
      />
      <div className="gender">
        Gender:
        <Controller
          name={EFormFieldNames.gender}
          control={control}
          render={({ field }) => (
            <label htmlFor="male">
              <input {...field} type="radio" className="input" id="male" />:
              Male
            </label>
          )}
        />
        <Controller
          name={EFormFieldNames.gender}
          control={control}
          render={({ field }) => (
            <label htmlFor="female">
              <input {...field} type="radio" className="input" id="female" />:
              Female
            </label>
          )}
        />
        {errors.gender && (
          <span className="error">{errors.gender.message}</span>
        )}
      </div>
      <Controller
        name={EFormFieldNames.accept}
        control={control}
        render={({ field }) => (
          <label htmlFor={EFormFieldNames.accept} className="accept">
            Accept T&C:
            <input
              {...field}
              type="checkbox"
              onChange={(e) => field.onChange(e.target.checked)}
              value=""
              name={EFormFieldNames.accept}
              id={EFormFieldNames.accept}
            />
            {errors.accept && (
              <span className="error">{errors.accept.message}</span>
            )}
          </label>
        )}
      />
      <label htmlFor="image" className="label">
        Image:
        <input {...register('image')} type="file" id="image" />
        {errors.image && <span className="error">{errors.image.message}</span>}
      </label>
      <Controller
        name={EFormFieldNames.country}
        control={control}
        render={({ field }) => (
          <label htmlFor={EFormFieldNames.country} className="label">
            Country:
            <input
              {...field}
              type="text"
              className="input"
              list="countriesList"
              name={EFormFieldNames.country}
              id={EFormFieldNames.country}
            />
            {errors.country && (
              <span className="error">{errors.country.message}</span>
            )}
            <datalist id="countriesList">
              {countries.map((country) => (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              ))}
            </datalist>
          </label>
        )}
      />
      <button disabled={Object.keys(errors).length > 0} type="submit">
        Send
      </button>
    </form>
  );
}
