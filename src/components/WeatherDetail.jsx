"use client";

import { useCurrentWeather } from "@/services/WeatherService";
import { Icon } from "@iconify/react";
import { Box, DataList, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

const LoadingSkeleton = () => {
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
    >
      {[1, 2, 3, 4, 5].map((item) => (
        <DataList.Item
          key={item}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            gap: "10px",
          }}
        >
          <DataList.Label style={{ color: "#eee" }}>
            <div
              className="skeleton"
              style={{
                width: "80px",
                height: "24px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
              }}
            />
          </DataList.Label>
          <DataList.Value
            style={{
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="skeleton"
              style={{
                width: "60px",
                height: "24px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
                marginRight: "8px",
              }}
            />
            <div
              className="skeleton"
              style={{
                width: "24px",
                height: "24px",
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
              }}
            />
          </DataList.Value>
        </DataList.Item>
      ))}
    </DataList.Root>
  );
};

export default function WeatherDetail() {
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
            <Text size="4">{item.label}</Text>
          </DataList.Label>
          <DataList.Value
            style={{
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text size="4" mr="2">
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
