import React from "react";
import { Box, Container, Stack } from "@mui/material";

export default function Advertisement() {
  return (
    <div className="ads-store-frame">
      <Container>
        <Stack className={"promo-inner"}>
          <Box className={"promo-eyebrow"}>Limited Time</Box>
          <Box className={"promo-title"}>Get 20% off your first order</Box>
          <Box className={"promo-sub"}>
            New customers save on skincare, makeup, haircare and fragrance — no
            code needed at checkout.
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
