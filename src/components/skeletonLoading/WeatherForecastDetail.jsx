import { Box, DataList } from "@radix-ui/themes";

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

export default ForecastSkeleton; 