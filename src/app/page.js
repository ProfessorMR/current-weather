"use client";

import { Container, Flex } from "@radix-ui/themes";
import { useCurrentWeather } from "@/services/WeatherService";
import { useEffect, useState } from "react";

import MainSection from "@/components/MainSection";
import WeatherBar from "@/components/WeatherBar";
import LoadingScreen from "@/components/LoadingScreen";
import useWeatherStore from "@/store/weatherStore";

import sunnyBg from "@/assets/images/sunny.jpg";
import cloudyBg from "@/assets/images/cloudy.jpg";
import rainyBg from "@/assets/images/rainy.jpg";
import snowyBg from "@/assets/images/snowy.jpeg";
import nightBg from "@/assets/images/night.jpg";

export default function Home() {
  const selectedCity = useWeatherStore((state) => state.selectedCity);
  const { currrentData, isLoading } = useCurrentWeather(selectedCity);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    if (currrentData) {
      const condition = currrentData.current.condition.text.toLowerCase();
      const isDay = currrentData.current.is_day === 1;

      if (!isDay) {
        setBackgroundImage(nightBg.src);
      } else if (condition.includes("rain") || condition.includes("drizzle")) {
        setBackgroundImage(rainyBg.src);
      } else if (condition.includes("snow") || condition.includes("sleet")) {
        setBackgroundImage(snowyBg.src);
      } else if (
        condition.includes("cloud") ||
        condition.includes("overcast")
      ) {
        setBackgroundImage(cloudyBg.src);
      } else {
        setBackgroundImage(sunnyBg.src);
      }
    }
  }, [currrentData]);

  if (isLoading || !backgroundImage) {
    return <LoadingScreen />;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: `url(${backgroundImage}) center/cover no-repeat`,
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <Container>
        <Flex style={{ minHeight: "100vh" }} justify={"between"}>
          <MainSection />
          <WeatherBar />
        </Flex>
      </Container>
    </main>
  );
}
