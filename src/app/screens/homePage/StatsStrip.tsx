import React from "react";
import { Box, Container, Stack } from "@mui/material";

export default function StatsStrip() {
  return (
    <div className={"stats-strip"}>
      <Container>
        <Stack className={"stats-row"}>
          <Box className={"stat-item"}>
            <span className={"stat-number"}>5</span>
            <span className={"stat-label"}>Categories</span>
          </Box>
          <Box className={"stat-divider"} />
          <Box className={"stat-item"}>
            <span className={"stat-number"}>100%</span>
            <span className={"stat-label"}>Cruelty-Free</span>
          </Box>
          <Box className={"stat-divider"} />
          <Box className={"stat-item"}>
            <span className={"stat-number"}>$50</span>
            <span className={"stat-label"}>Free Shipping Over</span>
          </Box>
          <Box className={"stat-divider"} />
          <Box className={"stat-item"}>
            <span className={"stat-number"}>30</span>
            <span className={"stat-label"}>Day Returns</span>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
