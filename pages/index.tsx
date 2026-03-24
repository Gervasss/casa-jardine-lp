
import EventsSection from "@/src/components/EventsSection/EventsSection";
import HeroSection from "@/src/components/HeroSection/HeroSection";
import InstagramSection from "@/src/components/InstagramSection/InstagramSection";
import PresentationSection from "@/src/components/PresentationSection/PresentationSection";
import ProfileSection from "@/src/components/ProfileSection/ProfileSection";
import VideoShowcaseSection from "@/src/components/VideoShowcaseSection/VideoShowcaseSection";
import Head from "next/head";
import Script from "next/script";


function HomePage() {
    return (
        <>
            <Head>
                {/* Título otimizado para o Google encontrar em VDC */}
                <title>Casa Jardine | Espaço de Eventos e Festas em Vitória da Conquista - BA</title>

                {/* Meta description – Foco em Casamentos, 15 anos e Corporativo */}
                <meta
                    name="description"
                    content="Celebre seus melhores momentos na Casa Jardine. O melhor espaço de eventos em Vitória da Conquista para casamentos, aniversários e eventos corporativos com infraestrutura completa."
                />

                {/* Palavras-chave – Foco em busca local */}
                <meta
                    name="keywords"
                    content="Casa Jardine, Espaço de eventos Vitória da Conquista, Salão de festas VDC, Aluguel para casamentos Bahia, Espaço para festas de 15 anos, Eventos corporativos Conquista"
                />

                {/* Autor e Robôs */}
                <meta name="author" content="Casa Jardine" />
                <meta name="robots" content="index, follow" />

                {/* Ajuste para a URL real da Casa Jardine */}
                <link rel="canonical" href="https://www.casajardine.com.br" />

                {/* Open Graph – Como o link aparece no WhatsApp e Instagram */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.casajardine.com.br" />
                <meta property="og:title" content="Casa Jardine | Espaço de Eventos em Vitória da Conquista" />
                <meta
                    property="og:description"
                    content="O cenário perfeito para sua festa. Conheça nossa estrutura para casamentos e eventos em Vitória da Conquista."
                />
                <meta
                    property="og:image"
                    content="https://www.casajardine.com.br/banner-casa-jardine.jpg"
                />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta
                    property="og:image:alt"
                    content="Fachada elegante da Casa Jardine Espaço de Eventos"
                />
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:site_name" content="Casa Jardine" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Casa Jardine | Espaço de Eventos" />
                <meta
                    name="twitter:description"
                    content="Infraestrutura completa para o seu evento em Vitória da Conquista."
                />
                <meta
                    name="twitter:image"
                    content="https://www.casajardine.com.br/banner-casa-jardine.jpg"
                />

                {/* Favicon e Viewport */}
                <link rel="icon" type="image/png" href="/casaLogo1.jpg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            {/* Structured Data: Local Business (Para aparecer no Maps/Busca Local) */}
            <Script
                id="schema-org-local-business"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "EventVenue",
                        "name": "Casa Jardine",
                        "description": "Espaço premium para casamentos, festas e eventos corporativos em Vitória da Conquista.",
                        "url": "https://www.casajardine.com.br",
                        "telephone": "+55",
                        "priceRange": "R$$",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Inserir Endereço Real Aqui",
                            "addressLocality": "Vitória da Conquista",
                            "addressRegion": "BA",
                            "addressCountry": "BR"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": "-14.8661",
                            "longitude": "-40.8394"
                        },
                        "openingHoursSpecification": {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": [
                                "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                            ],
                            "opens": "08:00",
                            "closes": "18:00"
                        },
                        "knowsAbout": [
                            "Organização de Casamentos",
                            "Eventos Corporativos",
                            "Festas de 15 anos",
                            "Locação de Espaço para Festas"
                        ],
                        "sameAs": [
                            "https://www.instagram.com/casajardinevca/", 
                        ]
                    })
                }}
            />

            {/* Google Analytics Script */}
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'GA_MEASUREMENT_ID');
                    `,
                }}
            />

            {/* Conteúdo da página inicial  */}
            <main>
              <HeroSection/>
              <PresentationSection/>
              <ProfileSection/>
              <EventsSection/>
              <InstagramSection/>
              <VideoShowcaseSection/>

              
            </main>
        </>
    );
}

export default HomePage;