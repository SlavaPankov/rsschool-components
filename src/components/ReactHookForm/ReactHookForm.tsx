/* eslint-disable react/jsx-props-no-spreading */
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/schema';
import { IFormData } from '../../types/interfaces/IFormData';

export function ReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <label htmlFor="name" className="label">
        Name:
        <input {...register('name')} type="text" className="input" id="name" />
        {errors.name && <span className="error">{errors.name.message}</span>}
      </label>
      <label htmlFor="age" className="label">
        Age:
        <input
          {...register('age')}
          type="number"
          id="age"
          className="input"
          defaultValue="0"
        />
        {errors.age && <span className="error">{errors.age.message}</span>}
      </label>
      <label htmlFor="age" className="label">
        Email:
        <input
          {...register('email')}
          type="text"
          className="input"
          id="email"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </label>
      <label htmlFor="password" className="label">
        Password:
        <input
          {...register('password')}
          type="password"
          className="input"
          id="password"
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
      </label>
      <label htmlFor="confirmPassword" className="label">
        Password:
        <input
          {...register('confirmPassword')}
          type="password"
          className="input"
          id="confirmPassword"
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword.message}</span>
        )}
      </label>
      <div className="gender">
        Gender:
        <label htmlFor="male" className="label">
          <input
            {...register('gender')}
            type="radio"
            value="male"
            className="input"
            id="male"
          />
          :Male
        </label>
        <label htmlFor="female" className="label">
          <input
            {...register('gender')}
            type="radio"
            value="female"
            className="input"
            id="female"
          />
          :Female
        </label>
        {errors.gender && (
          <span className="error">{errors.gender.message}</span>
        )}
      </div>
      <label htmlFor="accept" className="accept">
        Accept T&C:
        <input
          {...register('accept')}
          type="checkbox"
          className="input"
          id="accept"
        />
        {errors.accept && (
          <span className="error">{errors.accept.message}</span>
        )}
      </label>
      <label htmlFor="image" className="label">
        Image:
        <input {...register('image')} type="file" id="image" />
        {errors.image && <span className="error">{errors.image.message}</span>}
      </label>
      <label htmlFor="image">
        Country:
        <input {...register('country')} type="text" id="country" />
        {errors.country && <p>{errors.country.message}</p>}
      </label>
      <button type="submit">Send</button>
    </form>
  );
}
