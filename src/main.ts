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
}

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

const showResult = () => {
  result.innerHTML= rates[target.value].toString();
};

base.addEventListener('change', getConversionRates);
target.addEventListener('change', showResult);