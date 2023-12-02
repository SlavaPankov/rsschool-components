export interface IFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female';
  accept: boolean;
  image: FileList;
  country: string;
}
