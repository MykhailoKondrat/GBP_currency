import React from 'react';
import { ICurrentRateTable } from '../../interfaces/interfaces';
// import classes from './CurrentRatesTable.module.css';

const CurrentRatesTable = ({
  baseCurrency,
  baseAmount,
  currentRate,
}: ICurrentRateTable) => {
  return (
    <>
      <h2>Current Rates</h2>
      {currentRate?.rates ? (
        <table>
          <tbody>
            <tr>
              <th>{baseCurrency}</th>
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
      ) : (
        <p>Data can't be displayed</p>
      )}
    </>
  );
};

export default CurrentRatesTable;
