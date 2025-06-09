"use client";

import useSWR from "swr";

const API_KEY = "8fd252d0e11c46548f7161607250606";
const BASE_URL = "https://api.weatherapi.com/v1/";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useCurrentWeather(city) {
  const { data, error, isLoading } = useSWR(
    city ? ["current", city] : null,
    () =>
      fetch(`${BASE_URL}/current.json?q=${city}&key=${API_KEY}`).then((res) =>
        res.json()
      )
  );

  return {
    currrentData: data,
    currentLoading: isLoading,
    currentError: error,
  };
}

export function useForecastWeather(city) {
  const { data, error, isLoading } = useSWR(
    city ? ["forecast", city] : null,
    () =>
      fetch(`${BASE_URL}/forecast.json?q=${city}&days=1&key=${API_KEY}`).then(
        (res) => res.json()
      )
  );

  return {
    forecastData: data,
    forecastLoading: isLoading,
    forecastError: error,
  };
}
