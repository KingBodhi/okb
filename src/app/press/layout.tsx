import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press Inquiries",
  description: "Media and press inquiries for the Office of the Oklahoma Billionaire. Request interviews, quotes, or information about Jessy Artman and family office initiatives.",
  openGraph: {
    title: "Press Inquiries | Oklahoma Billionaire",
    description: "Media and press inquiries for the Office of the Oklahoma Billionaire.",
  },
};

export default function PressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
