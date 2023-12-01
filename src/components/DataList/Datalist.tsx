import { IFormData } from '../../types/interfaces/IFormData';
import styles from './dataList.module.css';
import { DataItem } from './DataItem';

interface IDataListProps {
  list: IFormData[];
}

export function Datalist({ list }: IDataListProps) {
  return (
    <div className={styles.wrapper}>
      {list.length > 0 && (
        <ul className={styles.list}>
          {list.map((item) => (
            <li key={item.age}>
              <DataItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
