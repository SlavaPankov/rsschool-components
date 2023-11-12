import { IProduct } from '../../types/interfaces/IProduct';

interface ICardProps {
  product: IProduct;
}

export function Card({ product }: ICardProps) {
  return (
    <div className="card">
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} />
      <p data-testid="paragraph">{product.description}</p>
      <div data-testid="price">price: {product.price} $</div>
    </div>
  );
}
