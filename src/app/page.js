import MainSection from "@/components/MainSection";
import WeatherBar from "@/components/WeatherBar";

import { Container, Flex } from "@radix-ui/themes";

import BG from "@/assets/images/clouds.jpg";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: `url(${BG.src}) center/cover no-repeat`,
      }}
    >
      <Container>
        <Flex style={{ minHeight: "100vh" }}>
          <MainSection />
          <WeatherBar />
        </Flex>
      </Container>
    </main>
  );
}
