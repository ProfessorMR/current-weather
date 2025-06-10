import { Heading } from "@radix-ui/themes";

import WeatherDetail from "./WeatherDetail";

export default function WeatherDetails({ title = "Weather Details", items }) {
  return (
    <>
      <Heading
        size={{ initial: "4", md: "5" }}
        mt="7"
        style={{ color: "#fff" }}
        weight="medium"
        className="title-weather-details"
      >
        {title}
      </Heading>
      <WeatherDetail items={items} />
    </>
  );
}
