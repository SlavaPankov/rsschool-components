import {
  ScrollRestoration,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { IProduct } from '../../types/interfaces/IProduct';
import { Api } from '../../api/Api';
import { Card } from '../../components/Card';
import './detailPage.css';
import { Loader } from '../../components/Loader';

export function DetailPage() {
  const api = new Api();
  const { id } = useParams();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [isMount, setIsMount] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(0);

  const closeOnClick = (event: MouseEvent) => {
    if (event.target instanceof Node && !ref.current?.contains(event.target)) {
      navigate(`/?page=${page}`);
    }
  };

  const handleClick = () => {
    navigate(`/?page=${page}`);
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    setPage(Number(searchParams.get('page')) || 1);
    setSearchParams({});
    setIsLoading(true);
    api.getProductById(id).then((response) => {
      setIsLoading(false);

      if (!response) {
        return;
      }

      setProduct(response);
    });
    setIsMount(true);
  }, []);

  useEffect((): (() => void) | undefined => {
    if (!isMount) {
      return;
    }

    document.addEventListener('click', closeOnClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', closeOnClick);
    };
  }, [isMount]);

  if (isLoading) {
    return (
      <div className="detail" data-testid="detail" ref={ref}>
        <Loader />
      </div>
    );
  }
  if (!product) {
    return (
      <div className="detail" data-testid="detail" ref={ref}>
        <h1 className="noProduct">Product not found</h1>
      </div>
    );
  }
  return (
    <div className="detail" data-testid="detail" ref={ref}>
      <button
        className="cross"
        type="button"
        name="close"
        onClick={handleClick}
      >
        cross
      </button>
      {product && !isLoading && <Card product={product} />}
      <ScrollRestoration />
    </div>
  );
}
