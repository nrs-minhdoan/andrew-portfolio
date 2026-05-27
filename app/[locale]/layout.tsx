import type { Metadata } from "next";
import { Fira_Code, Silkscreen } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";
import { Providers } from "@/components/Providers";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { routing } from "@/i18n/routing";
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

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://minhdoan.dev";

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
  const canonical = locale === routing.defaultLocale ? `${SITE}/` : `${SITE}/${locale}`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, l === routing.defaultLocale ? `${SITE}/` : `${SITE}/${l}`]),
  );

  return {
    metadataBase: new URL(SITE),
    title: t("title"),
    description: t("description"),
    alternates: { canonical, languages },
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "profile",
      locale: locale === "vi" ? "vi_VN" : "en_US",
      url: canonical,
      siteName: "Minh Truong Doan",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
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
      <body className="min-h-screen font-sans antialiased" suppressHydrationWarning>
        <PersonJsonLd locale={locale} />
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
