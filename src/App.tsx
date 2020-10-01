import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import {
  saveCurrentRate,
  saveHistoryRateDay1,
  saveHistoryRateDay2,
  saveToLocalStorage,
} from './store/appSlice';
import { AppDispatch, GetData } from './utils/shared';
import MainForm from './containers/MainForm/MainForm';
import {
  IAppState,
  ICurrentRateResponse,
  IHistoryRateResponse,
} from './interfaces/interfaces';
import CurrentRatesTable from './components/CurrenRatesTable/CurrentRatesTable';
import ComparePastRatesTable from './components/ComparePastRatesTable/ComparePastRatesTable';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const date1 = useSelector((state: IAppState) => state.appSlice.setup.date1);
  const date2 = useSelector((state: IAppState) => state.appSlice.setup.date2);
  const baseAmount = useSelector(
    (state: IAppState) => state.appSlice.setup.baseAmount
  );
  const baseCurrency = useSelector(
    (state: IAppState) => state.appSlice.setup.baseCurrency
  );
  const currentRate = useSelector(
    (state: IAppState) => state.appSlice.currentRate
  );
  const historyRateDay1 = useSelector(
    (state: IAppState) => state.appSlice.historyRateDay1
  );
  const historyRateDay2 = useSelector(
    (state: IAppState) => state.appSlice.historyRateDay2
  );

  // request queries based on requirements. Could be replaced with dynamic values from input
  const latestRates = `latest?symbols=EUR,USD,SGD&base=${baseCurrency}`;
  const day1Rates = `history?start_at=${date1}&end_at=${date1}&symbols=USD,EUR,SGD&base=${baseCurrency}`;
  const day2Rates = `history?start_at=${date2}&end_at=${date2}&symbols=USD,EUR,SGD&base=${baseCurrency}`;

  // Sends a request to API

  useEffect(() => {
    // GET & Save Data from the API request to APP STORE
    Promise.all([
      GetData(latestRates, dispatch).then((res: ICurrentRateResponse) => {
        dispatch(saveCurrentRate(res));
      }),
      GetData(day1Rates, dispatch).then((res: IHistoryRateResponse) => {
        dispatch(saveHistoryRateDay1(res));
      }),
      GetData(day2Rates, dispatch).then((res: IHistoryRateResponse) => {
        dispatch(saveHistoryRateDay2(res));
      }),
    ]).then(() => {
      dispatch(saveToLocalStorage());
    });
  }, [day1Rates, day2Rates, dispatch, latestRates]);
  return (
    <div className="App">
      <h2>
        {baseAmount} of {baseCurrency} to USD, EUR, SGD
      </h2>
      <MainForm
        baseAmount={baseAmount}
        baseCurrency={baseCurrency}
        date1={date1}
        date2={date2}
        latestRates={latestRates}
      />
      <CurrentRatesTable
        currentRate={currentRate}
        baseCurrency={baseCurrency}
        baseAmount={baseAmount}
      />
      <ComparePastRatesTable
        date1={date1}
        date2={date2}
        baseAmount={baseAmount}
        baseCurrency={baseCurrency}
        historyRateDay1={historyRateDay1}
        historyRateDay2={historyRateDay2}
      />
    </div>
  );
}

export default App;
