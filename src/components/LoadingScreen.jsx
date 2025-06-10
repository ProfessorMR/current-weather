import { Flex, Text } from "@radix-ui/themes";
import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
        color: "white",
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Text size="6" weight="bold">
          Loading...
        </Text>
      </motion.div>
    </Flex>
  );
};

export default LoadingScreen;
