import { ImageResponse } from "next/og";
import { CONTACT, STATS } from "@/data/portfolio";

export const runtime = "edge";
export const alt = `${CONTACT.fullName} — ${CONTACT.jobTitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background:
          "radial-gradient(ellipse at top left, #1a0608 0%, #0d0506 55%, #050203 100%)",
        color: "#f4e8e8",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          color: "#ef4444",
          fontSize: "22px",
          letterSpacing: "0.32em",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "9999px",
            background: "#ef4444",
            boxShadow: "0 0 24px #ef4444",
          }}
        />
        <span>Portfolio · {CONTACT.handle}</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            fontSize: "92px",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            backgroundImage: "linear-gradient(90deg, #ef4444 0%, #f59e0b 60%, #f97316 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {CONTACT.fullName}
        </div>
        <div
          style={{
            fontSize: "40px",
            fontWeight: 500,
            color: "#f4e8e8",
            opacity: 0.92,
          }}
        >
          {CONTACT.jobTitle}
        </div>
        <div
          style={{
            fontSize: "26px",
            color: "#b89898",
            maxWidth: "920px",
          }}
        >
          {STATS.yearsExperience}+ years building scalable web & mobile products with React,
          Next.js, Vue, Angular, and React Native.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: "28px",
          fontSize: "22px",
          color: "#b89898",
        }}
      >
        <span>{CONTACT.location}</span>
        <span>minhdoan.dev</span>
      </div>
    </div>,
    { ...size },
  );
}
