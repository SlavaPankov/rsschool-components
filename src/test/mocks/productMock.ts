import { IProduct } from '../../types/interfaces/IProduct';

export const productMock: IProduct = {
  id: 1,
  title: 'Test',
  description: 'Test card',
  price: 1000,
  discountPercentage: 900,
  rating: 5.0,
  stock: 11,
  brand: 'test brand',
  category: 'category',
  thumbnail: './src/image.png',
  images: [],
};
