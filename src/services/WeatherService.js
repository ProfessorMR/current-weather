"use client";

import useSWR from "swr";

const API_KEY = "8fd252d0e11c46548f7161607250606";
const BASE_URL = "https://api.weatherapi.com/v1/";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export function useCurrentWeather(city) {
  const { data, error, isLoading } = useSWR(
    `${BASE_URL}/current.json?q=${city}&key=${API_KEY}`,
    fetcher
  );

  return {
    currrentData: data,
    currentLoading: isLoading,
    currentError: error,
  };
}
