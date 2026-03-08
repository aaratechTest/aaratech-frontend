import HeroSec from "../../components/HeroSec/HeroSec";
import ServicesSection from "../../components/ServicesSection/ServicesSection";
import ProductsSection from "../../components/ProductsSection/ProductsSection";
import ClientsSection from "../../components/ClientsSection/ClientsSection";
import CaseStudySection from "../../components/CaseStudySection/CaseStudySection";
import { usePageContent } from "../../hooks/usePageContent";

function HomePage() {
  const { content } = usePageContent("home");

  return (
    <>
      <HeroSec data={content.hero} />
      <ServicesSection data={content.services} />
      <ProductsSection data={content.products} />
      <ClientsSection data={content.clients} />
      <CaseStudySection data={content.caseStudies} />
    </>
  );
}

export default HomePage;
