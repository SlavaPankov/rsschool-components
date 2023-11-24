import { setLimit, setPage, setSearchValue } from '@/store/options/options';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

export function setStoreValues(
  store: ToolkitStore,
  query: { [k: string]: string }
) {
  const { search: searchValue, page: currentPage, limit: currentLimit } = query;

  if (searchValue) {
    store.dispatch(setSearchValue(searchValue));
  }

  if (currentPage) {
    store.dispatch(setPage(Number(currentPage)));
  }

  if (currentLimit) {
    store.dispatch(setLimit(Number(currentLimit)));
  }
}
