import "./globals.css";

const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX || "";
const assetUrl = (path) => `url("${assetPrefix}${path}")`;
const assetStyles = {
  "--asset-prefix": assetPrefix,
  "--asset-hero": assetUrl("/helios/assets/hero.png"),
  "--asset-traffic": assetUrl("/helios/assets/traffic.png"),
  "--asset-revenue": assetUrl("/helios/assets/revenue.png"),
  "--asset-diagnosis": assetUrl("/helios/assets/diagnosis.png"),
};

export const metadata = {
  title: "Leadtop Helios Growth Engine",
  description:
    "Leadtop Helios Growth Engine 是面向 B2C/DTC 独立站的全链路效果增长系统，覆盖流量、转化、收入、复购和数据归因。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body style={assetStyles}>{children}</body>
    </html>
  );
}
