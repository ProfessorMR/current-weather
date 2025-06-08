"use client";

import { Icon } from "@iconify/react";
import { Box, DataList, Text } from "@radix-ui/themes";
import { useForecastWeather } from "../services/WeatherService";
import { useEffect, useState } from "react";

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  gap: "10px",
};

const labelStyle = {
  alignItems: "center",
  display: "flex",
};

const boxStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const valueStyle = {
  color: "#eee",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const skeletonStyle = {
  backgroundColor: "#2a2a2a",
  borderRadius: "4px",
  animation: "pulse 1.5s infinite",
};

const ForecastSkeleton = () => {
  return (
    <DataList.Root
      mt="5"
      style={{
        gap: "30px",
        display: "flex",
        flexDirection: "column",
        padding: "40px 0",
      }}
    >
      {[...Array(6)].map((_, index) => (
        <DataList.Item key={index} style={itemStyle}>
          <DataList.Label style={labelStyle}>
            <Box
              style={{
                ...skeletonStyle,
                width: "48px",
                height: "48px",
                borderRadius: "50%",
              }}
            />
            <Box style={boxStyle} ml="5">
              <Box
                style={{
                  ...skeletonStyle,
                  width: "60px",
                  height: "20px",
                  marginBottom: "8px",
                }}
              />
              <Box
                style={{
                  ...skeletonStyle,
                  width: "100px",
                  height: "16px",
                }}
              />
            </Box>
          </DataList.Label>
          <DataList.Value style={valueStyle}>
            <Box
              style={{
                ...skeletonStyle,
                width: "40px",
                height: "24px",
              }}
            />
          </DataList.Value>
        </DataList.Item>
      ))}
    </DataList.Root>
  );
};

export default function WeatherForecastDetail() {
  const [city, setCity] = useState(null);
  const [isLocationLoading, setIsLocationLoading] = useState(true);
  const { forecastData, forecastLoading, forecastError } = useForecastWeather(
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

  if (isLocationLoading || forecastLoading) {
    return <ForecastSkeleton />;
  }

  if (forecastError) {
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
  }

  if (!forecastData) {
    return null;
  }

  const filteredHours = forecastData.forecast.forecastday[0].hour.filter(
    (hour) => parseInt(hour.time.split(" ")[1].split(":")[0]) % 4 === 0
  );

  return (
    <DataList.Root
      mt="5"
      style={{
        gap: "30px",
        display: "flex",
        flexDirection: "column",
        padding: "40px 0",
      }}
    >
      {filteredHours.map((hour, index) => (
        <DataList.Item key={index} style={itemStyle}>
          <DataList.Label style={labelStyle}>
            <Icon
              icon={getWeatherIcon(hour.condition.text)}
              width="48"
              height="48"
              style={{ color: "white" }}
            />
            <Box style={boxStyle} ml="5">
              <Text weight="regular" size="4" style={{ color: "#fff" }}>
                {hour.time.split(" ")[1]}
              </Text>
              <Text weight="regular" size="3" style={{ color: "#eee" }}>
                {hour.condition.text}
              </Text>
            </Box>
          </DataList.Label>
          <DataList.Value style={valueStyle}>
            <Text size="6" mr="2">
              {hour.temp_c}°
            </Text>
          </DataList.Value>
        </DataList.Item>
      ))}
    </DataList.Root>
  );
}

// تابع کمکی برای انتخاب آیکون مناسب بر اساس وضعیت آب و هوا
function getWeatherIcon(condition) {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes("sunny") || conditionLower.includes("clear")) {
    return "solar:sun-bold";
  } else if (conditionLower.includes("cloud")) {
    return "solar:clouds-broken";
  } else if (conditionLower.includes("rain")) {
    return "solar:cloud-rain-bold";
  } else if (conditionLower.includes("snow")) {
    return "solar:snow-bold";
  } else if (conditionLower.includes("thunder")) {
    return "solar:thunder-bold";
  }
  return "solar:clouds-broken";
}
