import React from 'react';
import { IComparePastRatesTable } from '../../interfaces/interfaces';

const ComparePastRatesTable = ({
  date1,
  date2,
  baseAmount,
  baseCurrency,
  historyRateDay1,
  historyRateDay2,
}: IComparePastRatesTable) => {
  return (
    <>
      <h2>
        Compare Rates between {date1} and {date2}
      </h2>
      <table>
        <tbody>
          <tr>
            <th>
              {baseAmount} {baseCurrency}
            </th>
            <th>USD</th>
            <th>EUR</th>
            <th>SGD</th>
          </tr>
          {historyRateDay1?.rates?.[date1] && (
            <tr>
              <td>{date1}</td>
              <td>{historyRateDay1?.rates?.[date1]?.USD * baseAmount}</td>
              <td>{historyRateDay1?.rates?.[date1]?.EUR * baseAmount}</td>
              <td>{historyRateDay1?.rates?.[date1]?.SGD * baseAmount}</td>
            </tr>
          )}
          {historyRateDay2?.rates?.[date2] && (
            <tr>
              <td>{date2}</td>
              <td>{historyRateDay2?.rates?.[date2]?.USD * baseAmount}</td>
              <td>{historyRateDay2?.rates?.[date2]?.EUR * baseAmount}</td>
              <td>{historyRateDay2?.rates?.[date2]?.SGD * baseAmount}</td>
            </tr>
          )}
          {historyRateDay1?.rates?.[date1] &&
          historyRateDay2?.rates?.[date2] ? (
            <tr>
              <td>Difference</td>
              <td>
                {historyRateDay1?.rates?.[date1]?.USD * baseAmount -
                  historyRateDay2?.rates?.[date2]?.USD * baseAmount}
              </td>
              <td>
                {historyRateDay1?.rates?.[date1]?.EUR * baseAmount -
                  historyRateDay2?.rates?.[date2]?.EUR * baseAmount}
              </td>
              <td>
                {historyRateDay1?.rates?.[date1]?.SGD * baseAmount -
                  historyRateDay2?.rates?.[date2]?.SGD * baseAmount}
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={4}>
                {' '}
                <p>
                  Difference can not be calculated as data is missgin for one of
                  the selected dates{' '}
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default ComparePastRatesTable;
