import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_DESCRIPTION, AUTHOR_NAME } from "@/lib/site";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #0d1117 0%, #0d2318 100%)",
          color: "#e6edf3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700, marginBottom: 16, letterSpacing: "-1px" }}>
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 28, color: "#7d8590", marginBottom: 48, lineHeight: 1.5 }}>
          {SITE_DESCRIPTION}
        </div>
        <div style={{ fontSize: 22, color: "#3fb950", fontWeight: 500 }}>
          {AUTHOR_NAME}
        </div>
      </div>
    ),
    { ...size }
  );
}
