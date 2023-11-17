import {
  ScrollRestoration,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Card } from '../../components/Card';
import { Loader } from '../../components/Loader';
import { EOptions } from '../../types/enums/EOptions';
import { useGetProductQuery } from '../../store/products/products';
import './detailPage.css';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setIsProductLoading } from '../../store/options/options';
import { useAppSelector } from '../../hooks/useAppSelector';

export function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isProductLoading } = useAppSelector((state) => state.options);
  const { data: product, isFetching } = useGetProductQuery(Number(id));
  const ref = useRef<HTMLDivElement>(null);
  const [isMount, setIsMount] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(0);

  const closeOnClick = (event: MouseEvent) => {
    if (event.target instanceof Node && !ref.current?.contains(event.target)) {
      navigate(`/?${EOptions.page}=${page}`);
    }
  };

  const handleClick = () => {
    navigate(`/?${EOptions.page}=${page}`);
  };

  useEffect(() => {
    if (id) {
      setPage(Number(searchParams.get(EOptions.page)) || 1);
      setSearchParams({});
      setIsMount(true);
    }
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

  useEffect(() => {
    dispatch(setIsProductLoading(isFetching));
  }, [isFetching]);

  if (isProductLoading) {
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
      {product && !isFetching && <Card product={product} />}
      <ScrollRestoration />
    </div>
  );
}
