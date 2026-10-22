import React from "react";
import { Container, Stack } from "@mui/material";
import "../../../css/about.css";

export default function AboutPage() {
  return (
    <div className={"about-page"}>
      <Container className={"about-container"}>
        <Stack className={"about-box"}>
          <span className={"about-title"}>About Cosmetics Store</span>
          <p>
            Cosmetics Store was founded on a simple idea: quality skincare
            and beauty products shouldn&apos;t be complicated to find or
            expensive to enjoy. We curate a hand-picked selection of
            skincare, makeup, haircare, and fragrance from trusted
            formulators, so every product on our shelves has already earned
            its place through real results.
          </p>
          <p>
            Our team combines a passion for clean, effective beauty with a
            commitment to honest information — clear ingredient lists,
            transparent pricing, and no filler claims. Whether you&apos;re
            building a daily skincare routine or looking for your next
            signature scent, we&apos;re here to make the experience simple,
            personal, and enjoyable.
          </p>
          <p>
            We&apos;re a growing community of beauty lovers who believe good
            skin days start with good choices. Thank you for shopping with
            us — we&apos;re glad you&apos;re here.
          </p>
        </Stack>
      </Container>
    </div>
  );
}
