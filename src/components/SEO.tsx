import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

export function SEO({ title, description, canonical }: SEOProps) {
  const fullTitle = `${title} | MultiCalc - Calculadoras Online Gratuitas`;
  const siteUrl = "https://multicalc.com.br"; // Exemplo de URL
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="calculadora online, financiamento, empréstimo, imposto de renda, câmbio, imc, calorias, data de parto, décimo terceiro, divisão de contas, combustível, economia, saúde" />
      <meta name="author" content="MultiCalc" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical || siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical || siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}/og-image.jpg`} />

      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <html lang="pt-BR" />
      
      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": fullTitle,
          "description": description,
          "url": canonical || siteUrl,
          "applicationCategory": "UtilityApplication",
          "operatingSystem": "All",
          "author": {
            "@type": "Organization",
            "name": "MultiCalc"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "BRL"
          }
        })}
      </script>
    </Helmet>
  );
}
