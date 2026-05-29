import { ImageResponse } from "next/og";
import { CONTACT, STATS } from "@/data/portfolio";
import { SITE_URL } from "@/lib/site";

const SITE_HOST = new URL(SITE_URL).host;

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
        background: "linear-gradient(135deg, #1a0608 0%, #0d0506 55%, #050203 100%)",
        color: "#f4e8e8",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "#ef4444",
          fontSize: 22,
          letterSpacing: 6,
          textTransform: "uppercase",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 12,
            height: 12,
            borderRadius: 9999,
            background: "#ef4444",
            marginRight: 16,
          }}
        />
        <div style={{ display: "flex" }}>PORTFOLIO · {CONTACT.handle.toUpperCase()}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#ef4444",
            marginBottom: 24,
          }}
        >
          {CONTACT.fullName}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 500,
            color: "#f4e8e8",
            marginBottom: 24,
          }}
        >
          {CONTACT.jobTitle}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#b89898",
            maxWidth: 920,
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
          paddingTop: 28,
          fontSize: 22,
          color: "#b89898",
        }}
      >
        <div style={{ display: "flex" }}>{CONTACT.location}</div>
        <div style={{ display: "flex" }}>{SITE_HOST}</div>
      </div>
    </div>,
    { ...size },
  );
}
