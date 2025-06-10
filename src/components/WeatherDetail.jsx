"use client";

import { useCurrentWeather } from "@/services/WeatherService";
import { Icon } from "@iconify/react";
import { Box, DataList, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

import LoadingSkeleton from "./skeletonLoading/WeatherDetail";
import useWeatherStore from "../store/weatherStore";

export default function WeatherDetail() {
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

  if (isLocationLoading || currentLoading) return <LoadingSkeleton />;
  if (currentError)
    return (
      <Box mt="5">
        <Text
          size="5"
          weight="medium"
          style={{ color: "#ffbcbc", fontStyle: "italic" }}
        >
          *Error receiving information*
        </Text>
      </Box>
    );
  if (!currrentData) return null;

  const weatherItems = [
    {
      label: "Pressure",
      value: `${currrentData.current.pressure_mb} mb`,
      icon: "carbon:pressure",
      iconColor: "#fff",
    },
    {
      label: "Precip",
      value: `${currrentData.current.precip_mm} mm`,
      icon: "hugeicons:rain",
      iconColor: "#fff",
    },
    {
      label: "Humidity",
      value: `${currrentData.current.humidity}%`,
      icon: "mi:drop",
      iconColor: "#fff",
    },
    {
      label: "Cloudy",
      value: `${currrentData.current.cloud}%`,
      icon: "uil:clouds",
      iconColor: "#fff",
    },
    {
      label: "Wind",
      value: `${currrentData.current.wind_kph} km/h`,
      icon: "solar:wind-bold",
      iconColor: "#fff",
    },
  ];

  return (
    <DataList.Root
      mt="5"
      style={{
        gap: "30px",
        display: "flex",
        flexDirection: "column",
        borderBottom: "1px solid #fff",
        padding: "40px 0",
      }}
      className="list-weather-details"
    >
      {weatherItems.map((item, index) => (
        <DataList.Item
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <DataList.Label style={{ color: "#eee" }}>
            <Text size={{ initial: "2", md: "4" }}>{item.label}</Text>
          </DataList.Label>
          <DataList.Value
            style={{
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text size={{ initial: "2", md: "4" }} mr="2">
              {item.value}
            </Text>
            <Icon
              icon={item.icon}
              width="24"
              height="24"
              style={{ color: item.iconColor }}
            />
          </DataList.Value>
        </DataList.Item>
      ))}
    </DataList.Root>
  );
}
