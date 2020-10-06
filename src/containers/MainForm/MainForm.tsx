import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveCurrentRate, updateBaseValues } from '../../store/appSlice';
import { ICurrentRateResponse, IFormProps } from '../../interfaces/interfaces';
import { AppDispatch, GetData } from '../../utils/shared';

const MainForm = ({
  baseAmount,
  baseCurrency,
  date1,
  date2,
  latestRates,
}: IFormProps) => {
  // local constants
  const currencies = [
    'GBP',
    'CAD',
    'HKD',
    'ISK',
    'PHP',
    'DKK',
    'HUF',
    'CZK',
    'AUD',
    'RON',
    'SEK',
    'IDR',
    'INR',
    'BRL',
    'RUB',
    'HRK',
    'JPY',
    'THB',
    'CHF',
    'PLN',
    'BGN',
    'TRY',
    'CNY',
    'NOK',
    'NZD',
    'ZAR',
    'MXN',
    'ILS',
    'KRW',
    'MYR',
  ];
  const today = new Date().toISOString().slice(0, 10);
  // local State
  const [amount, setAmount] = useState(baseAmount);
  const [currency, setCurrency] = useState(baseCurrency);
  const [dateOne, setDateOne] = useState(date1);
  const [dateTwo, setDateTwo] = useState(date2);

  const dispatch = useDispatch<AppDispatch>();
  // handlers
  const handleGetRates = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateBaseValues({
        baseAmount: amount,
        baseCurrency: currency,
        dateOne,
        dateTwo,
      })
    );
    GetData(latestRates, dispatch).then((res: ICurrentRateResponse) => {
      dispatch(saveCurrentRate(res));
    });
  };
  const handleChangeBaseAmount = (e: React.FormEvent<HTMLInputElement>) => {
    setAmount(+e.currentTarget.value);
  };
  const handleSelectCurrency = (e: React.FormEvent<HTMLSelectElement>) => {
    setCurrency(e.currentTarget.value);
  };
  const handleSelectDate1 = (e: React.FormEvent<HTMLInputElement>) => {
    setDateOne(e.currentTarget.value);
  };
  const handleSelectDate2 = (e: React.FormEvent<HTMLInputElement>) => {
    setDateTwo(e.currentTarget.value);
  };
  return (
    <form onSubmit={handleGetRates}>
      <p className="inputWrapper">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          min="0"
          value={amount}
          onChange={handleChangeBaseAmount}
        />
      </p>
      <p className="inputWrapper">
        <label htmlFor="baseValue">Base Currency: </label>
        <select
          name="baseValue"
          defaultValue={currency}
          onBlur={handleSelectCurrency}
        >
          {currencies.map((c) => {
            return (
              <option key={c} value={c}>
                {c}
              </option>
            );
          })}
        </select>
      </p>
      <p className="inputWrapper">
        <label htmlFor="dateOne">Date #1: </label>
        <input
          type="date"
          id="dateOne"
          name="dateOne"
          value={dateOne}
          max={today}
          onChange={handleSelectDate1}
        />
      </p>
      <p className="inputWrapper">
        <label htmlFor="dateTwo">Date #2:</label>
        <input
          type="date"
          id="dateTwo"
          name="dateTwo"
          value={dateTwo}
          max={today}
          onChange={handleSelectDate2}
        />
      </p>
      <button type="submit">Get Data!</button>
    </form>
  );
};

export default MainForm;
