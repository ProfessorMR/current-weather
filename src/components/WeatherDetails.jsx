import { Heading } from "@radix-ui/themes";
import WeatherDetail from "./WeatherDetail";

export default function WeatherDetails({ title = "Weather Details", items }) {
  return (
    <>
      <Heading size="5" mt="7" style={{ color: "#fff" }} weight="medium">
        {title}
      </Heading>
      <WeatherDetail items={items} />
    </>
  );
}
