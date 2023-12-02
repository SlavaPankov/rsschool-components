import styles from './dataList.module.css';
import { DataItem } from './DataItem';
import { IData } from '../../store/formData/formData';

interface IDataListProps {
  list: IData[];
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
