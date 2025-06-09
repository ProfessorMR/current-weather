import { create } from "zustand";

const useWeatherStore = create((set) => ({
  selectedCity: "Tehran",
  setSelectedCity: (city) => set({ selectedCity: city }),
}));

export default useWeatherStore;
