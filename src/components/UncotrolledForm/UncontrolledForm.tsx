import { FormEvent, useRef } from 'react';
import styles from './uncontrolledForm.module.css';
import { EFormFieldNames } from '../../types/enums/EFormFieldNames';

export function UncontrolledForm() {
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
    const { current } = imageRef;
    let base64File: string = '';

    if (!current) {
      return;
    }

    if (current.files) {
      base64File = await toBase64(current.files[0]);
    }

    const formData = Object.fromEntries(
      new FormData(target as HTMLFormElement)
    );

    const convertedData: { [k: string]: string } = {
      ...formData,
      [EFormFieldNames.image]: base64File,
    };

    console.log(convertedData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="name">
        <span>Name:</span>
        <input
          type="text"
          name={EFormFieldNames.name}
          id="name"
          placeholder="Name..."
        />
      </label>
      <label htmlFor="age">
        <span>Age:</span>
        <input
          type="number"
          name={EFormFieldNames.age}
          id="age"
          placeholder="22"
        />
      </label>
      <label htmlFor="email">
        <span>Email:</span>
        <input
          type="email"
          name={EFormFieldNames.email}
          id="email"
          placeholder="email@example.com"
        />
      </label>
      <label htmlFor="password">
        <span>Password:</span>
        <input
          type="password"
          name={EFormFieldNames.password}
          id="password"
          placeholder="Passowrd..."
        />
      </label>
      <label htmlFor="confirmPassword">
        <span>Confirm password:</span>
        <input
          type="password"
          name={EFormFieldNames.confirmPassword}
          id="confirmPassword"
          placeholder="Passowrd..."
        />
      </label>
      <div>
        <span>Gender</span>
        <label htmlFor="gender_female">
          <span>Female:</span>
          <input
            type="radio"
            name={EFormFieldNames.gender}
            id="gender_female"
          />
        </label>
        <label htmlFor="gender_male">
          <span>Male:</span>
          <input type="radio" name={EFormFieldNames.gender} id="gender_male" />
        </label>
      </div>
      <label htmlFor="accept">
        <span>Accept T&C:</span>
        <input type="checkbox" name={EFormFieldNames.accept} id="accept" />
      </label>
      <label htmlFor="image">
        <span>Upload image:</span>
        <input
          type="file"
          ref={imageRef}
          name={EFormFieldNames.image}
          id="image"
        />
      </label>
      <button type="submit">Send</button>
    </form>
  );
}
