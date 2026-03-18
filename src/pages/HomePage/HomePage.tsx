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
    </>
  );
}

export default HomePage;
