import { DataList } from "@radix-ui/themes";

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

export default LoadingSkeleton; 