import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../utils/axios';
import {
  IAppSliceState,
  IHistoryRateResponse,
  ICurrentRateResponse,
} from '../interfaces/interfaces';

export const getCurrency = createAsyncThunk<ICurrentRateResponse, string>(
  'appSlice/getCurrency',
  async (reqString: string) => {
    const response = await axios.get(reqString);
    return response.data as ICurrentRateResponse;
  }
);
const initialState =
  JSON.parse(localStorage.getItem('GBP_Currency') as string) ??
  ({
    setup: {
      baseAmount: 200,
      baseCurrency: 'GBP',
      date1: '2015-03-25',
      date2: '2016-06-13',
    },
    currentRate: {},
    historyRateDay1: {},
    historyRateDay2: {},
    loading: false,
    error: false,
  } as IAppSliceState<ICurrentRateResponse, IHistoryRateResponse>);
export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    updateBaseValues: (
      state: IAppSliceState<ICurrentRateResponse, IHistoryRateResponse>,
      { payload }
    ) => {
      state.setup.baseAmount = payload.baseAmount;
      state.setup.baseCurrency = payload.baseCurrency;
      state.setup.date1 = payload.dateOne;
      state.setup.date2 = payload.dateTwo;
    },
    saveCurrentRate: (
      state: IAppSliceState<ICurrentRateResponse, IHistoryRateResponse>,
      { payload }
    ) => {
      state.currentRate = payload;
    },
    saveHistoryRateDay1: (
      state: IAppSliceState<ICurrentRateResponse, IHistoryRateResponse>,
      { payload }
    ) => {
      state.historyRateDay1 = payload ?? {};
    },
    saveHistoryRateDay2: (
      state: IAppSliceState<ICurrentRateResponse, IHistoryRateResponse>,
      { payload }
    ) => {
      state.historyRateDay2 = payload ?? {};
    },
    saveToLocalStorage: (
      state: IAppSliceState<ICurrentRateResponse, IHistoryRateResponse>
    ) => {
      localStorage.setItem('GBP_Currency', JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getCurrency.fulfilled,
      (state: IAppSliceState<ICurrentRateResponse, IHistoryRateResponse>) => {
        state.loading = false;
        state.error = false;
      }
    );
    builder.addCase(
      getCurrency.pending,
      (state: IAppSliceState<ICurrentRateResponse, IHistoryRateResponse>) => {
        state.loading = true;
        state.error = false;
      }
    );
    builder.addCase(
      getCurrency.rejected,
      (state: IAppSliceState<ICurrentRateResponse, IHistoryRateResponse>) => {
        state.loading = false;
        state.error = true;
      }
    );
  },
});
export const {
  saveCurrentRate,
  saveHistoryRateDay1,
  saveHistoryRateDay2,
  saveToLocalStorage,
  updateBaseValues,
} = appSlice.actions;
export default appSlice.reducer;
