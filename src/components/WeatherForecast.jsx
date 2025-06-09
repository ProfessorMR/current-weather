import { Heading } from "@radix-ui/themes";

import WeatherForecastDetail from "./WeatherForecastDetail";

export default function WeatherForecast() {
  return (
    <>
      <Heading size="5" mt="7" style={{ color: "#fff" }} weight="medium">
        Weather Forecast
      </Heading>
      <WeatherForecastDetail />
    </>
  );
}
