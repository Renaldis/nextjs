import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next JS App - About",
  description: "Generated by create next app",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>About Layout</h1>
      {children}
    </div>
  );
}
