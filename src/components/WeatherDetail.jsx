import { Icon } from "@iconify/react";
import { DataList, Text } from "@radix-ui/themes";

const weatherItems = [
  {
    label: "Temp max",
    value: "15°",
    icon: "fluent:temperature-16-filled",
    iconColor: "#FF9592",
  },
  {
    label: "Temp min",
    value: "13°",
    icon: "fluent:temperature-16-filled",
    iconColor: "#3B9EFF",
  },
  {
    label: "Humidity",
    value: "87%",
    icon: "mi:drop",
    iconColor: "#fff",
  },
  {
    label: "Cloudy",
    value: "20%",
    icon: "uil:clouds",
    iconColor: "#fff",
  },
  {
    label: "Wind",
    value: "4km/h",
    icon: "solar:wind-bold",
    iconColor: "#fff",
  },
];

export default function WeatherDetail({ items = weatherItems }) {
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
      {items.map((item, index) => (
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
