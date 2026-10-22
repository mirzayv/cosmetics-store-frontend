import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #1a1a1a;
  background-size: cover;
`;

export default function Footer() {
  const authMember = null;

  return (
    <Footers>
      <Container>
        <Stack direction="row" sx={{ mt: "55px" }}>
          <Stack direction={"column"} style={{ width: "340px" }}>
            <Box>
              <span className={"foot-brand-text"}>Cosmetics Store</span>
            </Box>
            <Box className={"foot-desc-txt"}>
              Clean, effective beauty made simple. We create skincare, makeup,
              haircare and fragrance formulas that respect your skin and never
              compromise on results.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} alt="" />
              <img src={"/icons/twitter.svg"} alt="" />
              <img src={"/icons/instagram.svg"} alt="" />
              <img src={"/icons/youtube.svg"} alt="" />
            </Box>
          </Stack>
          <Stack sx={{ ml: "288px" }} direction={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Shop</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Contact us</Box>
                <Box
                  className="foot-category-link"
                  sx={{
                    mt: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    className="find-us"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <span>E.</span>
                    <div>hello@cosmeticsstore.com</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>H.</span>
                    <div>Mon–Sat, 9am–7pm</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>S.</span>
                    <div>Free shipping over $50</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>R.</span>
                    <div>30-day returns</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © Cosmetics Store, All rights reserved.
        </Stack>
      </Container>
    </Footers>
  );
}
