import { IProduct } from '@/types/interfaces/IProduct';
import Image from 'next/image';

interface ICardProps {
  product: IProduct;
}

export function Card({ product }: ICardProps) {
  return (
    <div className="card">
      <h2>{product.title}</h2>
      {product.thumbnail && (
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={500}
          height={300}
        />
      )}
      <p data-testid="paragraph">{product.description}</p>
      <div data-testid="price">price: {product.price} $</div>
    </div>
  );
}
