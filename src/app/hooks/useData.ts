import { useContext } from 'react';
import { DataContext } from '@/app/provider/DataProvider';

export const useData = () => {
  return useContext(DataContext);
};
