import RelatedServices from "../../components/RelatedServices/RelatedServices.jsx";
import ServiceDetails from "../../components/ServiceDetails/ServiceDetails.jsx";
import servicesData from "../../data/BasicNeedsData/servicesData.js";
import cardData from "../../data/BasicNeedsData/CardData.js";
import HowItWorks from "../../components/HowItWorks/HowItWorks.jsx";
import GetStarted from "../../components/GetStarted/GetStarted.jsx";
import { Link } from "react-router-dom";

const Electrician = () => {
  // Find the service details for the current page
  const serviceData = servicesData.find((service) => service.id === 2);

  if (!serviceData) {
    return <div>Error: Service data not found.</div>;
  }

  // Get the related card data for this page
  const relatedCards = cardData.find((page) => page.pageId === 2)?.cards || [];
  const heading = "Related Services";


  const handleCardClick = (subServiceName) => {
    // Navigate to the user details page with service and sub-service info
    return {
      pathname: "/service-details",
      state: {
        service: serviceData.name,
        subService: subServiceName,
      },
    };
  };

  return (
    <>
      <ServiceDetails data={serviceData} />
      <RelatedServices cards={relatedCards} heading={heading} />
      <div>
        <h2>{heading}</h2>
        <div>
          {relatedCards.map((card) => (
            <Link
              to={handleCardClick(card.name)}
              key={card.id}
              style={{ textDecoration: "none" }}
            >
              <div>{card.name}</div>
            </Link>
          ))}
        </div>
      </div>
      <HowItWorks />
      <GetStarted />
    </>
  );
};

export default Electrician;