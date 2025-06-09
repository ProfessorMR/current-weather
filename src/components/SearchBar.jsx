"use client";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { mutate } from "swr";

import useWeatherStore from "../store/weatherStore";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const setSelectedCity = useWeatherStore((state) => state.setSelectedCity);

  const handleClear = () => {
    setSearchValue("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      const city = searchValue.trim();
      setSelectedCity(city);

      await mutate(
        (key) => typeof key === "string" && key.includes("weatherapi.com")
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Flex direction="column" gap="3">
      <Box style={{ position: "relative" }}>
        <form onSubmit={handleSubmit}>
          <TextField.Root
            size="3"
            placeholder="Search Location..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              color: "#FFF",
              background: "rgba(255, 255, 255, 0.1)",
              border: "none",
              outline: "none",
              width: "100%",
              paddingRight: "30px",
            }}
          />
          {searchValue && (
            <Button
              onClick={handleClear}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#FFF",
                cursor: "pointer",
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon icon="mdi:close" width={20} />
            </Button>
          )}
          <button type="submit" style={{ display: "none" }}></button>
        </form>
      </Box>
    </Flex>
  );
}
