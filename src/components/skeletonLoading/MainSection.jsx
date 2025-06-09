import { Box, Flex } from "@radix-ui/themes";

import Image from "next/image";
import Logo from "../../../public/images/logo/logoT.png";

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
      </Flex>
    </Flex>
  );
};

export default LoadingSkeleton;
