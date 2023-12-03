import styles from './dataList.module.css';
import { DataItem } from './DataItem';
import { IData } from '../../store/formData/formData';

interface IDataListProps {
  list: IData[];
  title?: string;
}

export function Datalist({ list, title }: IDataListProps) {
  return (
    <div className={styles.wrapper}>
      {title && <h3>{title}</h3>}
      {list.length > 0 && (
        <ul className={styles.list}>
          {list.map((item, index) => (
            <li
              key={item.age}
              className={`${index === 0 && `${styles.firstItem}`} ${
                styles.item
              }`}
            >
              <DataItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Datalist.defaultProps = {
  title: '',
};
