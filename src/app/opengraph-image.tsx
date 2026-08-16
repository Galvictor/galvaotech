import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Galvão Tech — Full Stack & Infraestrutura";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(145deg, #070a09 0%, #0e1412 50%, #0a1210 100%)",
          color: "#e8ebe9",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-60px",
            top: "-40px",
            width: "380px",
            height: "380px",
            borderRadius: "999px",
            background:
              "radial-gradient(circle, rgba(46,196,160,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            position: "relative",
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -1 }}>
            Galvão Tech
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 500,
              maxWidth: 820,
              lineHeight: 1.25,
              color: "rgba(232,235,233,0.9)",
            }}
          >
            Sua ideia online — full stack, infra e deploy
          </div>
        </div>
        <div
          style={{
            fontSize: 22,
            color: "rgba(154,163,160,1)",
            position: "relative",
          }}
        >
          Desenvolvimento acelerado com IA · Orçamento sem compromisso
        </div>
      </div>
    ),
    { ...size },
  );
}
