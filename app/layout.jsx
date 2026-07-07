import "./globals.css";

export const metadata = {
  title: "Leadtop Helios Growth Engine",
  description:
    "Leadtop Helios Growth Engine 是面向 B2C/DTC 独立站的全链路效果增长系统，覆盖流量、转化、收入、复购和数据归因。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
