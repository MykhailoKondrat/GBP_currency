
## Available Scripts

In the project directory, you can run:
### `npm init`
To download npm packages
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## App Logic

As it's a test task everything is in App.tsx file for now. Normally it should be in different components for sure. 

AppSlice:
1. getCurrency - async function to fetch data. Argument should be a query itself not a full GET url.
   Correct: getCurrency(latest?symbols=EUR,USD,SGD&base=GBP')
   Incorrect: getCurrency(https://api.exchangeratesapi.io/latest?symbols=EUR,USD,SGD&base=GBP');
2.  initialState variable value loaded from localStore or assigned to default object;
3.  State itself is build with some hard coded values like:
        baseAmountOfGbp: 200,
        date1: '2015-03-25',
        date2: '2016-06-13',
   - they could be changed dynamically in the future.
4. Redux Toolkit generates 3 actions for this request as it's use createAsyncThunk;
   Basically we do nothing there for now - just setting store props like loading and error.

   
App.tsx:
1.GetData - dispatches getCurrency() and returns a Promise.
2. In useEffect hook we invoke getData() 3 times in parallel mode and once all of them are done - dispatch action that saves states for localStore.
3. Once data received we render it to 2 tables. As we are saving raw data - in a future it will allow adding more calculations.  

