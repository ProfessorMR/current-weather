"use client";

import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { Icon } from "@iconify/react";
import { useCurrentWeather } from "@/services/WeatherService";
import { useEffect, useState } from "react";

import LoadingSkeleton from "./skeletonLoading/MainSection";
import useWeatherStore from "../store/weatherStore";
import Image from "next/image";

import Logo from "../../public/images/logo/logoT.png";

export default function MainSection() {
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const selectedCity = useWeatherStore((state) => state.selectedCity);
  const { currrentData, currentLoading, currentError } =
    useCurrentWeather(selectedCity);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`
              );
              const data = await response.json();
              if (data.city) {
                useWeatherStore.getState().setSelectedCity(data.city);
              }
            } catch (error) {
              console.error("Error fetching city name:", error);
            } finally {
              setIsLocationLoading(false);
            }
          },
          () => {
            console.log("Location access denied, using default city");
            setIsLocationLoading(false);
          }
        );
      } else {
        setIsLocationLoading(false);
      }
    };

    getLocation();
  }, []);

  if (isLocationLoading || currentLoading) {
    return <LoadingSkeleton />;
  }

  if (currentError) return null;
  if (!currrentData) return null;

  return (
    <Flex
      justify="between"
      direction="column"
      style={{ marginBottom: "120px" }}
      className="main-section"
    >
      <Image src={Logo} alt="logo" width={150} className="logo-page" />
      <Flex
        gapX="5"
        justify="center"
        align="center"
        style={{ color: "var(--slate-1)", paddingInline: "20px" }}
      >
        <Heading style={{ fontSize: "80px" }} className="temp-main-section">
          {currrentData.current.temp_c}°
        </Heading>
        <Box>
          <Heading
            style={{ fontSize: "40px" }}
            weight="regular"
            className="city-main-section"
          >
            {currrentData.location.name}
          </Heading>
          <Text
            mt="3"
            className="date-main-section"
            style={{ display: "inline-block" }}
            weight="regular"
          >
            {new Date(currrentData.location.localtime).toLocaleString()}
          </Text>
        </Box>
        <Icon
          icon={`il:${currrentData.current.condition.text.toLowerCase()}`}
          width={60}
        />
      </Flex>
    </Flex>
  );
}
