import { Icon } from "@iconify/react";
import { Box, DataList, Text } from "@radix-ui/themes";

const forecastData = [
  {
    time: "21:00",
    condition: "Clouds",
    temperature: 22,
    icon: "solar:clouds-broken",
  },
  {
    time: "22:00",
    condition: "Clouds",
    temperature: 21,
    icon: "solar:clouds-broken",
  },
  {
    time: "23:00",
    condition: "Clouds",
    temperature: 20,
    icon: "solar:clouds-broken",
  },
  {
    time: "00:00",
    condition: "Clouds",
    temperature: 19,
    icon: "solar:clouds-broken",
  },
  {
    time: "01:00",
    condition: "Clouds",
    temperature: 18,
    icon: "solar:clouds-broken",
  },
  {
    time: "02:00",
    condition: "Clouds",
    temperature: 17,
    icon: "solar:clouds-broken",
  },
];

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

export default function WeatherForecastDetail() {
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
      {forecastData.map((item, index) => (
        <DataList.Item key={index} style={itemStyle}>
          <DataList.Label style={labelStyle}>
            <Icon
              icon={item.icon}
              width="48"
              height="48"
              style={{ color: "white" }}
            />
            <Box style={boxStyle} ml="5">
              <Text weight="regular" size="4" style={{ color: "#fff" }}>
                {item.time}
              </Text>
              <Text weight="regular" size="3" style={{ color: "#eee" }}>
                {item.condition}
              </Text>
            </Box>
          </DataList.Label>
          <DataList.Value style={valueStyle}>
            <Text size="6" mr="2">
              {item.temperature}°
            </Text>
          </DataList.Value>
        </DataList.Item>
      ))}
    </DataList.Root>
  );
}
