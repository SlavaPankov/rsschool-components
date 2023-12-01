import styles from './dataItem.module.css';
import { IFormData } from '../../../types/interfaces/IFormData';

interface IDataItemProps {
  item: IFormData;
}
export function DataItem({ item }: IDataItemProps) {
  return (
    <article className={styles.item}>
      <div className={styles.data}>
        Name: <span className={styles.value}>{item.name}</span>
      </div>
      <div className={styles.data}>
        Age: <span className={styles.value}>{item.age}</span>
      </div>
      <div className={styles.data}>
        Email: <span className={styles.value}>{item.email}</span>
      </div>
      <div className={styles.data}>
        Password: <span className={styles.value}>{item.password}</span>
      </div>
      <div className={styles.data}>
        Confirm password:{' '}
        <span className={styles.value}>{item.confirmPassword}</span>
      </div>
      <div className={styles.data}>
        Accept T&C: <span className={styles.value}>{item.accept}</span>
      </div>
      <div className={styles.data}>
        Gender: <span className={styles.value}>{item.gender}</span>
      </div>
      <div className={styles.data}>
        Country: <span className={styles.value}>{item.country}</span>
      </div>
      <div className={styles.data}>
        Image: <img className={styles.image} src={item.image} alt={item.name} />
      </div>
    </article>
  );
}
