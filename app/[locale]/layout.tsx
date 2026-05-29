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

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description,
    alternates: { canonical, languages },
    openGraph: {
      title: t("title"),
      description,
      type: "profile",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      url: canonical,
      siteName: CONTACT.fullName,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
