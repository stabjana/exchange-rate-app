# Currency Converter App

This project is a currency converter that shows the exchange rate between two currencies.

## Features

- Users can select a base currency (left dropdown) and a target currency (right dropdown).
- Real-time exchange rates are fetched from [ExchangeRate-API](https://www.exchangerate-api.com/).

## Setup Instructions

### 1. Get an API Key

1. Sign up at [ExchangeRate-API](https://www.exchangerate-api.com/).
2. Copy your API key.
3. Clone this repo.
4. Create a `config.js` file in the root directory and add:

```js
export const API_KEY = "YOUR_API_KEY_HERE";
```

### 2. Install and Run the Project

```shell
npm i
npm run dev
```

Use the url given in your console to test it. Have fun!
