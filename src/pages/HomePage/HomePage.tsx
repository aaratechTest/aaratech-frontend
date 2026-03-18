import HeroSec from "../../components/HeroSec/HeroSec";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import ProductsSection from "../../components/ProductsSection/ProductsSection";
import ClientsSection from "../../components/ClientsSection/ClientsSection";
import CaseStudySection from "../../components/CaseStudySection/CaseStudySection";
import { usePageContent } from "../../hooks/usePageContent";
import PageLoader from "../../components/PageLoader/PageLoader";
import SEO from "../../components/SEO/SEO";
import { seoDefaults } from "../../constants/seoDefaults";
import { organizationSchema, webSiteSchema } from "../../utils/structuredData";

function HomePage() {
  const { content, loading, meta } = usePageContent("home");
  const seo = seoDefaults.home;

  return (
    <>
      <SEO
        title={meta.metaTitle || seo.title}
        description={meta.metaDescription || seo.description}
        path="/"
        structuredData={[organizationSchema(), webSiteSchema()]}
      />
      {loading && <PageLoader />}
      <HeroSec data={content.hero} />
      <ServicesSection data={content.services} />
      <ProductsSection data={content.products} />
      <ClientsSection data={content.clients} />
      <CaseStudySection data={content.caseStudies} />

      {/* SEO: hidden internal links for crawler discovery */}
      <nav className="sr-only" aria-label="Site navigation">
        <a href="/about">About AaraTech</a>
        <a href="/services">IT Services</a>
        <a href="/industries">Industries</a>
        <a href="/contact">Contact Us</a>
        <a href="/lending-solutions">Lending Solutions</a>
        <a href="/leasing">Leasing Solutions</a>
        <a href="/sdb-management">Safe Deposit Box Management</a>
        <a href="/mobile-wallet">Mobile Wallet</a>
        <a href="/assembler-cobol">Assembler to COBOL Conversion</a>
        <a href="/culture">Our Culture</a>
        <a href="/blog">Blog</a>
        <a href="/events">Events</a>
      </nav>
    </>
  );
}

export default HomePage;
