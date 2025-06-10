"use client";

import useSWR from "swr";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
