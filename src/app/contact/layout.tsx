import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Connect with the Office of the Oklahoma Billionaire. Schedule a meeting, request a speaking engagement, or reach out for partnership opportunities.",
  openGraph: {
    title: "Contact | Oklahoma Billionaire",
    description: "Schedule a meeting or reach out for partnership opportunities.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
