import { Box } from "@radix-ui/themes";

import SearchBar from "./SearchBar";
import WeatherDetails from "./WeatherDetails";
import WeatherForecast from "./WeatherForecast";

export default function WeatherBar() {
  return (
    <Box
      style={{
        background: "rgba( 255, 255, 255, .1 )",
        borderLeft: "6px solid rgba(255, 255, 255,.2)",
        backdropFilter: "blur( 20px )",
        position: "fixed",
        right: 0,
        top: 0,
        height: "100vh",
        width: "500px",
        padding: "20px 60px",
        overflowY: "auto",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(255, 255, 255, 0.3) transparent",
      }}
      className="custom-scrollbar"
    >
      <SearchBar />
      <WeatherDetails />
      <WeatherForecast />
    </Box>
  );
}
