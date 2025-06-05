import { Box } from "@radix-ui/themes";
import SearchBar from "./SearchBar";

export default function WeatherBar() {
  return (
    <Box
      style={{
        background: "rgba( 255, 255, 255, .1 );",
        borderLeft: "6px solid rgba(255, 255, 255,.2)",
        backdropFilter: "blur( 20px );",
        position: "fixed",
        right: 0,
        top: 0,
        height: "100vh",
        width: "500px",
        padding: "20px 60px",
      }}
    >
      <SearchBar />
    </Box>
  );
}
