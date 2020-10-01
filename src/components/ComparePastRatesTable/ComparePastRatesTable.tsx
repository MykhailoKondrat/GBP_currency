import React, { useCallback, useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { IComparePastRatesTable } from '../../interfaces/interfaces';

const ComparePastRatesTable = ({
  date1,
  date2,
  baseAmount,
  baseCurrency,
  historyRateDay1,
  historyRateDay2,
}: IComparePastRatesTable) => {
  const calculateDifference = (dateOne: number, dateTwo: number): number => {
    console.log(dateOne, dateTwo);
    // let's assume rate for date1 is 100%
    // so date2 in percent relative to date1:
    const date2InPercents = (dateTwo * 100) / dateOne;
    // rounding to 4 digits after coma
    const diff = date2InPercents - 100;
    const rounded = diff.toFixed(4);
    // calculating difference between date1(100 % in this case) and date2( @rounded)
    const result = Number(rounded);
    return result;
  };

  const data = [
    {
      name: 'USD',
      diff: calculateDifference(
        historyRateDay1?.rates?.[date1]?.USD,
        historyRateDay2?.rates?.[date2]?.USD
      ),
    },
    {
      name: 'EUR',
      diff: calculateDifference(
        historyRateDay1?.rates?.[date1]?.EUR,
        historyRateDay2?.rates?.[date2]?.EUR
      ),
    },
    {
      name: 'SGD',
      diff: calculateDifference(
        historyRateDay1?.rates?.[date1]?.SGD,
        historyRateDay2?.rates?.[date2]?.SGD
      ),
    },
  ];
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
      {historyRateDay1?.rates?.[date1] && historyRateDay2?.rates?.[date2] ? (
        <BarChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit="%" />
          <Tooltip />
          <Bar dataKey="diff">
            {data.map((entry, index) => {
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.diff > 0 ? 'green' : 'red'}
                  strokeWidth={index === 2 ? 4 : 1}
                />
              );
            })}
          </Bar>
        </BarChart>
      ) : (
        <p>Not sufficient data to display a chart</p>
      )}
    </>
  );
};
export default ComparePastRatesTable;
