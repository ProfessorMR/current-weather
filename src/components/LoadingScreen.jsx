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
        background: "linear-gradient(135deg,rgb(15, 22, 34) 0%,rgb(10, 17, 33) 100%)",
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
        <Text size={{ initial: "5", md: "6" }} weight="bold">
          Loading...
        </Text>
      </motion.div>
    </Flex>
  );
};

export default LoadingScreen;
