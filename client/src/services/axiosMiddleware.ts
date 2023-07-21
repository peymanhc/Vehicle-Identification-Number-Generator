import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function timeDelay(k: number): number {
  const base_interval = 0.5;
  const base_multiplier = 1.5;
  const retry_interval = base_interval * base_multiplier ** (k - 1) * 1000;
  const max = k === 5 ? 500 : retry_interval;
  return retry_interval + randomInt(0, max);
}

function wait(delay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

let _retry_count = 0;

export function resetRetry(): void {
  _retry_count = 0;
}

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_KEY,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (resp: AxiosResponse) => ({
    ...resp,
  }),
  async (err) => {
    const origReqConfig: AxiosRequestConfig = err.config;
    if (err.response && err.response.status >= 500 && _retry_count < 4) {
      _retry_count++;
      const delay = timeDelay(_retry_count);
      await wait(delay);
      return instance.request(origReqConfig);
    }
    return Promise.reject(err);
  }
);

export default instance;