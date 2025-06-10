import { Heading } from "@radix-ui/themes";

import WeatherForecastDetail from "./WeatherForecastDetail";

export default function WeatherForecast() {
  return (
    <>
      <Heading
        size={{ initial: "4", md: "5" }}
        mt="7"
        style={{ color: "#fff" }}
        weight="medium"
        className="title-weather-details"
      >
        Weather Forecast
      </Heading>
      <WeatherForecastDetail />
    </>
  );
}
