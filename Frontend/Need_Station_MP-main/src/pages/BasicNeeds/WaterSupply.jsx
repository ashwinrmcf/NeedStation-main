import RelatedServices from "../../components/RelatedServices/RelatedServices.jsx";
import ServiceDetails from "../../components/ServiceDetails/ServiceDetails.jsx";
import servicesData from "../../data/BasicNeedsData/servicesData.js";
import cardData from "../../data/BasicNeedsData/CardData.js";
import HowItWorks from "../../components/HowItWorks/HowItWorks.jsx";
import GetStarted from "../../components/GetStarted/GetStarted.jsx";

const WaterSupply = () => {
  // Find the service details for the current page
  const serviceData = servicesData.find((service) => service.id === 4);

  if (!serviceData) {
    return <div>Error: Service data not found.</div>;
  }

  // Get the related card data for this page
  const relatedCards = cardData.find((page) => page.pageId === 4)?.cards || [];
  const heading = "Related Services";

  return (
    <>
      <ServiceDetails data={serviceData} />
      <RelatedServices cards={relatedCards} heading={heading} />
      <HowItWorks />
      <GetStarted />
    </>
  );
};

export default WaterSupply;