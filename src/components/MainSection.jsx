"use client";
import Image from "next/image";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { Icon } from "@iconify/react";
import { useCurrentWeather } from "@/services/WeatherService";
import { useEffect, useState } from "react";

import Logo from "../../public/images/logo/logoT.png";

const LoadingSkeleton = () => {
  return (
    <Flex
      justify="between"
      direction="column"
      style={{ marginBottom: "120px" }}
    >
      <Image src={Logo} alt="logo" width={150} />
      <Flex
        gapX="5"
        justify="center"
        align="center"
        style={{ color: "var(--slate-1)" }}
      >
        <div
          className="skeleton"
          style={{
            width: "120px",
            height: "120px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "4px",
          }}
        />
        <Box>
          <div
            className="skeleton"
            style={{
              width: "150px",
              height: "50px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
              marginBottom: "12px",
            }}
          />
          <div
            className="skeleton"
            style={{
              width: "200px",
              height: "24px",
              background: "rgba(255, 255, 255, 0.1)",
              borderRadius: "4px",
            }}
          />
        </Box>
        <div
          className="skeleton"
          style={{
            width: "60px",
            height: "60px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "4px",
          }}
        />
      </Flex>
    </Flex>
  );
};

export default function MainSection() {
  const [city, setCity] = useState(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const { currrentData, currentLoading, currentError } = useCurrentWeather(
    city || "Tehran"
  );

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
                setCity(data.city);
              }
            } catch (error) {
              console.error("Error fetching city name:", error);
              setCity("Tehran");
            } finally {
              setIsLocationLoading(false);
            }
          },
          (error) => {
            console.log("Location access denied, using default city");
            setCity("Tehran");
            setIsLocationLoading(false);
          }
        );
      } else {
        setCity("Tehran");
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
    >
      <Image src={Logo} alt="logo" width={150} />
      <Flex
        gapX="5"
        justify="center"
        align="center"
        style={{ color: "var(--slate-1)" }}
      >
        <Heading style={{ fontSize: "120px" }}>
          {currrentData.current.temp_c}°
        </Heading>
        <Box>
          <Heading style={{ fontSize: "50px" }} weight="regular">
            {currrentData.location.name}
          </Heading>
          <Text mt="3" style={{ display: "inline-block" }} weight="regular">
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
