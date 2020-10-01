import React, { useCallback, useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {
  getCurrency,
  saveCurrentRate,
  saveHistoryRateDay1,
  saveHistoryRateDay2,
  saveToLocalStorage,
} from './store/appSlice';
import store from './store/store';
import {
  IAppState,
  ICurrentRateResponse,
  IHistoryRateResponse,
} from './interfaces/interfaces';

function App() {
  type AppDispatch = typeof store.dispatch;
  const dispatch = useDispatch<AppDispatch>();
  const date1 = useSelector((state: IAppState) => state.appSlice.setup.date1);
  const date2 = useSelector((state: IAppState) => state.appSlice.setup.date2);
  const baseAmount = useSelector(
    (state: IAppState) => state.appSlice.setup.baseAmountOfGbp
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
  const latestRates = 'latest?symbols=EUR,USD,SGD&base=GBP';
  const day1Rates = `history?start_at=${date1}&end_at=${date1}&symbols=USD,EUR,SGD&base=GBP`;
  const day2Rates = `history?start_at=${date2}&end_at=${date2}&symbols=USD,EUR,SGD&base=GBP`;

  // Sends a request to API
  const GetData = useCallback(
    (dataQuery: string): Promise<any> => {
      return dispatch(getCurrency(dataQuery))
        .then(unwrapResult)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [dispatch]
  );

  useEffect(() => {
    // GET & Save Data from the API request to APP STORE
    Promise.all([
      GetData(latestRates).then((res: ICurrentRateResponse) => {
        dispatch(saveCurrentRate(res));
      }),
      GetData(day1Rates).then((res: IHistoryRateResponse) => {
        dispatch(saveHistoryRateDay1(res));
      }),
      GetData(day2Rates).then((res: IHistoryRateResponse) => {
        dispatch(saveHistoryRateDay2(res));
      }),
    ]).then(() => {
      dispatch(saveToLocalStorage());
    });
  }, [GetData, dispatch, day1Rates, day2Rates]);

  const handleClick = () => {
    GetData(latestRates).then((res: ICurrentRateResponse) => {
      dispatch(saveCurrentRate(res));
    });
  };

  return (
    <div className="App">
      <header />
      <h2>{baseAmount} of GBP to USD, EUR, SGD</h2>
      <button type="button" onClick={handleClick}>
        Refresh Data!
      </button>
      <div>
        <h2>Current Rates</h2>
        <table>
          <tbody>
            <tr>
              <th>GBP</th>
              <th>USD</th>
              <th>EUR</th>
              <th>SGD</th>
            </tr>
            <tr>
              <td>{baseAmount}</td>
              <td>{currentRate?.rates?.USD * baseAmount}</td>
              <td>{currentRate?.rates?.EUR * baseAmount}</td>
              <td>{currentRate?.rates?.SGD * baseAmount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2>
          Compare Rates between {date1} and {date2}
        </h2>
        <table>
          <tbody>
            <tr>
              <th>{baseAmount} GBP</th>
              <th>{date1}</th>
              <th>{date2}</th>
              <th>Difference</th>
            </tr>
            {/* USD */}
            <tr>
              <td>USD</td>
              <td>{historyRateDay1?.rates?.[date1]?.USD * baseAmount}</td>
              <td>{historyRateDay2?.rates?.[date2]?.USD * baseAmount}</td>
              <td>
                {historyRateDay1?.rates?.[date1]?.USD * baseAmount -
                  historyRateDay2?.rates?.[date2]?.USD * baseAmount}
              </td>
            </tr>
            <tr>
              <td>EUR</td>
              <td>{historyRateDay1?.rates?.[date1]?.EUR * baseAmount}</td>
              <td>{historyRateDay2?.rates?.[date2]?.EUR * baseAmount}</td>
              <td>
                {historyRateDay1?.rates?.[date1]?.EUR * baseAmount -
                  historyRateDay2?.rates?.[date2]?.EUR * baseAmount}
              </td>
            </tr>
            <tr>
              <td>SGD</td>
              <td>{historyRateDay1?.rates?.[date1]?.SGD * baseAmount}</td>
              <td>{historyRateDay2?.rates?.[date2]?.SGD * baseAmount}</td>
              <td>
                {historyRateDay1?.rates?.[date1]?.SGD * baseAmount -
                  historyRateDay2?.rates?.[date2]?.SGD * baseAmount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
