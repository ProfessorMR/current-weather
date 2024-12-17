import Image from "next/image";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { Icon } from "@iconify/react";

import Logo from "../../public/images/logo/logoT.png";

export default function MainSection() {
  return (
    <Flex justify="between" direction="column" style={{marginBottom: "120px"}}>
      <Image src={Logo} alt="logo" width={150} />
      <Flex
        gapX="5"
        justify="center"
        align="center"
        style={{ color: "var(--slate-1)" }}
      >
        <Heading style={{ fontSize: "120px" }}>10*</Heading>
        <Box>
          <Heading style={{ fontSize: "50px" }}>London</Heading>
          <Text mt="3" style={{ display: "inline-block" }} weight="bold">
            11:51 - Tue, 17 Dec 2024
          </Text>
        </Box>
        <Icon icon="il:cloud" width={60} />
      </Flex>
    </Flex>
  );
}
