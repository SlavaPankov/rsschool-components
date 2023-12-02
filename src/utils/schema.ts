import { boolean, mixed, number, object, ObjectSchema, ref, string } from 'yup';
import { IFormData } from '../types/interfaces/IFormData';
import { EErrorMessages } from '../types/enums/EErrorMessages';

export const schema: ObjectSchema<IFormData> = object({
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
    .positive(EErrorMessages.positiveError)
    .integer()
    .test({
      test(value, ctx) {
        if (value === 0) {
          return ctx.createError({ message: EErrorMessages.requireAge });
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
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()-_=+{};:,<.>]).{4,}$/,
      { message: EErrorMessages.strengthError }
    )
    .test({
      test(value, ctx) {
        if (!value) {
          return ctx.createError({ message: EErrorMessages.requirePassword });
        }

        return true;
      },
    }),
  confirmPassword: string()
    .oneOf([ref('password')], EErrorMessages.matchError)
    .required(EErrorMessages.requireConfirmPassword),
  gender: string<'male' | 'female'>().required(EErrorMessages.requireGender),
  accept: boolean()
    .required(EErrorMessages.requireAccept)
    .oneOf([true], EErrorMessages.requireAccept),
  image: mixed((input): input is FileList => input instanceof FileList)
    .required(EErrorMessages.requireImage)
    .test('fileSize', EErrorMessages.invalidSize, (value, ctx) => {
      const fileList = value as FileList;

      if (!fileList.length) {
        return ctx.createError({ message: EErrorMessages.requireImage });
      }

      return fileList && fileList[0].size <= 1024 * 1024;
    })
    .test('fileType', EErrorMessages.invalidExtension, (value, ctx) => {
      const fileList = value as FileList;

      if (!fileList.length) {
        return ctx.createError({ message: EErrorMessages.requireImage });
      }

      return fileList && ['image/jpeg', 'image/png'].includes(fileList[0].type);
    }),
  country: string().required(EErrorMessages.requiredCountry),
});
