import type { Metadata } from "next";
import { DM_Mono, Figtree, Fraunces } from "next/font/google";
import "./globals.css";

const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elad Asis — Software Developer",
  description:
    "Elad Asis is a software developer in Givat Shmuel, Israel, focused on full-stack product work and applied AI. Currently at SAP, previously full-stack at Singit.",
  authors: [{ name: "Elad Asis" }],
  openGraph: {
    title: "Elad Asis — Software Developer",
    description:
      "Full-stack and AI, together: how Elad Asis builds software.",
    type: "profile",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Elad Asis",
  jobTitle: "Software Developer",
  email: "mailto:asiselad12@gmail.com",
  url: "https://www.linkedin.com/in/elad-asis-bb71681a1",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Givat Shmuel",
    addressRegion: "Center District",
    addressCountry: "IL",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Holon Institute of Technology",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "ORT Colleges",
    },
  ],
  knowsAbout: [
    "Python",
    "LangChain",
    "Retrieval-Augmented Generation",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB",
    "HTML",
    "CSS",
    "Quality assurance",
  ],
  worksFor: {
    "@type": "Organization",
    name: "SAP",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${display.variable} ${mono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip" href="#content">
          Skip to content
        </a>
        <p className="rail">Elad Asis · Software developer · Givat Shmuel</p>
        {children}
      </body>
    </html>
  );
}
