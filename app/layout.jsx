import "./globals.css";
import { Varela_Round } from "next/font/google";
import InquiryAttribution from "../components/InquiryAttribution";
import { Analytics } from "@vercel/analytics/next";

const varelaRound = Varela_Round({
  subsets: ["latin"],
  variable: "--font-varela-round",
  weight: "400",
});

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://leadtopmedia.com"),
  title: "Leadtop Helios Growth Engine",
  description:
    "Leadtop Helios Growth Engine 是面向 B2C 品牌打造的独立站全链路增长解决方案，聚焦 GMV 与 ROI 的规模化增长。",
};

export default function RootLayout({ children }) {
  return (
    <html className={varelaRound.variable} lang="zh-CN">
      <body style={assetStyles}>
        <InquiryAttribution />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
