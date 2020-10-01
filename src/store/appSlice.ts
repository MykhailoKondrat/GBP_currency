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
  JSON.parse(<string>localStorage.getItem('GBP_Currency')) ??
  ({
    setup: {
      baseAmountOfGbp: 200,
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
    saveCurrentRate: (state, { payload }) => {
      state.currentRate = payload;
    },
    saveHistoryRateDay1: (state, { payload }) => {
      state.historyRateDay1 = payload;
    },
    saveHistoryRateDay2: (state, { payload }) => {
      state.historyRateDay2 = payload;
    },
    saveToLocalStorage: (state) => {
      localStorage.setItem('GBP_Currency', JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrency.fulfilled, (state) => {
      state.loading = false;
      state.error = false;
    });
    builder.addCase(getCurrency.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getCurrency.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});
export const {
  saveCurrentRate,
  saveHistoryRateDay1,
  saveHistoryRateDay2,
  saveToLocalStorage,
} = appSlice.actions;
export default appSlice.reducer;
