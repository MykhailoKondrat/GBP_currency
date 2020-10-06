import store from '../store/store';

interface IRates {
  EUR: number;
  SGD: number;
  USD: number;
}
interface IHistoryRates {
  [key: string]: IRates;
}
export interface ICurrentRateTable {
  baseCurrency: string;
  baseAmount: number;
  currentRate: ICurrentRateResponse;
}
export interface IComparePastRatesTable {
  date1: string;
  date2: string;
  baseAmount: number;
  baseCurrency: string;
  historyRateDay1: IHistoryRateResponse;
  historyRateDay2: IHistoryRateResponse;
}
export interface IFormProps {
  baseAmount: number;
  baseCurrency: string;
  date1: string;
  date2: string;
  latestRates: string;
}
// typing response from server - obj fields should match so can't use camelCase
export interface ICurrentRateResponse {
  base: 'GBP';
  date?: string;
  start_at?: string;
  end_at?: string;
  rates: IRates;
}

export interface IHistoryRateResponse {
  base: 'GBP';
  date?: string;
  start_at?: string;
  end_at?: string;
  rates: IHistoryRates;
}
export interface IAppSliceState<T, U> {
  setup: {
    baseAmount: number;
    baseCurrency: string;
    date1: string;
    date2: string;
  };
  currentRate: T;
  historyRateDay1: U;
  historyRateDay2: U;
  loading: boolean;
  error: boolean;
}

export interface IAppState {
  appSlice: IAppSliceState<ICurrentRateResponse, IHistoryRateResponse>;
}
