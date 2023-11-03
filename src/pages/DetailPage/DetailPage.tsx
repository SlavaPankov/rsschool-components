import { useNavigate, useParams } from 'react-router-dom';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function closeOnClick(event: MouseEvent) {
    if (event.target instanceof Node && !ref.current?.contains(event.target)) {
      navigate(-1);
    }
  }

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);
    api.getProductById(id).then((response) => {
      setProduct(response);
      setIsLoading(false);
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

  return (
    <div className="detail" ref={ref}>
      {isLoading && <Loader />}
      {product && !isLoading && <Card product={product} />}
    </div>
  );
}
