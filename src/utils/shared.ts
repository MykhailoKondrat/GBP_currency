import { unwrapResult } from '@reduxjs/toolkit';
import store from '../store/store';
import { getCurrency } from '../store/appSlice';

export type AppDispatch = typeof store.dispatch;

export const GetData = (
  dataQuery: string,
  dispatch: AppDispatch
): Promise<any> => {
  return dispatch(getCurrency(dataQuery))
    .then(unwrapResult)
    .then((res: any) => {
      return res;
    })
    .catch((err: any) => {
      console.log(err);
    });
};
