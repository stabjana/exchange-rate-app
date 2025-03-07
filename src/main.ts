import { API_KEY } from "../config.ts";

interface Data {
  conversion_rates: Record<string, number>;
}

class FetchWrapper {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  get(endpoint: string): Promise<Data> {
    return fetch(this.baseURL + endpoint).then((response) => response.json());
  }

  put(endpoint: string, body: any): Promise<any> {
    return this._send('put', endpoint, body);
  }

  post(endpoint: string, body: any): Promise<any> {
    return this._send('post', endpoint, body);
  }

  delete(endpoint: string, body: any): Promise<any> {
    return this._send('delete', endpoint, body);
  }

  _send(method: string, endpoint: string, body: any): Promise<any> {
    return fetch(this.baseURL + endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((response) => response.json());
  }
}

//TODO
/* The goal of this project is to show the user the conversion rate between 2 currency pairs.
  The currency chosen on the left is the base currency and the currency chosen on the right is the target currency.
  The app starts at 1 USD = 1 USD.
  
  The API you need to use in this challenge is exchangerate-api.com.
  You can create a free account and browse the documentation.
  
  The free plan on this API allows you to perform 1,500 requests per month.
  Remember that every time you type in the editor, the browser preview will refresh,
  causing a new API request. In order not to exceed your limit, we recommend commenting out the
  fetch/FetchWrapper related code after you get it to work the first time. */

//Notes:
// Sign up for a free account on exchange <a href="https://www.exchangerate-api.com/">https://www.exchangerate-api.com/</a>
// Copy the example request
// Please check the documentation link, read Standard Requests documentation
// Sending a GET request to <a href="https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD">https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD</a>
// Above will give you exchange rate comapred to USD

// TODO: WRITE YOUR TYPESCRIPT CODE HERE



const base = document.getElementById('base-currency') as HTMLSelectElement;
const target = document.getElementById('target-currency') as HTMLSelectElement;
const result = document.getElementById('conversion-result') as HTMLParagraphElement;

let rates : Record<string, number> = {}; // with keyword get value from api

const api = new FetchWrapper(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`);


const getConversionRates= async () => { 
  api.get(base.value)
  .then ((data) => {
    rates = data.conversion_rates;
    showResult();
  });
};

const showResult = () => { // target currency, rates
  result.innerHTML= rates[target.value].toString();
};


base.addEventListener('change', getConversionRates);
target.addEventListener('change', showResult);
