import type { Metadata } from "next";
import { Fira_Code, Silkscreen } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import { Providers } from "@/components/Providers";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { CONTACT, STATS } from "@/data/portfolio";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silkscreen",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  const canonical = `${SITE_URL}/${locale}`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}`]),
  );
  const description = t("description", { years: STATS.yearsExperience });
  const title = t("title");
  const ogLocale = locale === "vi" ? "vi_VN" : "en_US";
  const alternateLocale = locale === "vi" ? "en_US" : "vi_VN";
  const ogAlt = `${CONTACT.fullName} — ${CONTACT.jobTitle}`;
  const ogImage = {
    url: `${SITE_URL}/opengraph-image`,
    secureUrl: `${SITE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: ogAlt,
    type: "image/png",
  };

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: CONTACT.fullName,
    authors: [{ name: CONTACT.fullName, url: SITE_URL }],
    creator: CONTACT.fullName,
    publisher: CONTACT.fullName,
    category: "technology",
    keywords: [
      "Front-end Developer",
      "Team Leader",
      "React",
      "Next.js",
      "Vue.js",
      "Angular",
      "React Native",
      "TypeScript",
      "Portfolio",
      CONTACT.fullName,
      CONTACT.altName,
      CONTACT.handle,
    ],
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      type: "profile",
      locale: ogLocale,
      alternateLocale: [alternateLocale],
      url: canonical,
      siteName: CONTACT.fullName,
      images: [ogImage],
      firstName: CONTACT.fullName.split(" ").slice(-1)[0],
      lastName: CONTACT.fullName.split(" ").slice(0, -1).join(" "),
      username: CONTACT.handle,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: ogImage.url,
          alt: ogImage.alt,
          width: ogImage.width,
          height: ogImage.height,
        },
      ],
      creator: `@${CONTACT.handle}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/logo.svg", type: "image/svg+xml" },
      ],
      apple: "/logo.svg",
      shortcut: "/icon.svg",
    },
    appleWebApp: {
      capable: true,
      title: CONTACT.fullName,
      statusBarStyle: "black-translucent",
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    other: {
      "og:image:width": String(ogImage.width),
      "og:image:height": String(ogImage.height),
      "og:image:alt": ogImage.alt,
      "og:image:type": ogImage.type,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${silkscreen.variable} ${firaCode.variable}`}
    >
      <head>
        <ThemeScript />
        <PersonJsonLd />
      </head>
      <body className="min-h-screen font-sans antialiased" suppressHydrationWarning>
        <NextIntlClientProvider>
          <Providers>
            <Navigation />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
