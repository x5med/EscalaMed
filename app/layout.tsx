import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

const description =
  "Um caminho prático para dobrar o faturamento da sua clínica, melhorar a lucratividade e construir o próximo nível do seu negócio.";

export const metadata: Metadata = {
  metadataBase: new URL("https://escalamed.x5med.com.br"),
  title: "EscalaMED — A Rota do Crescimento",
  description,
  icons: { icon: "/assets/images/favicon.svg" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "EscalaMED — A Rota do Crescimento",
    description:
      "Evento presencial para médicos empresários donos de clínica, em Alphaville — São Paulo.",
    images: [
      {
        url: "/assets/images/opengraph.png",
        width: 1200,
        height: 630,
        alt: "EscalaMED",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/images/opengraph.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020817",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=Inter+Tight:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=Sora:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
