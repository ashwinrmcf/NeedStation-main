import ElderCareServiceDetails from "../../components/ElderCareServiceDetails/ElderCareServiceDetails";
import ElderCareServiceData from "../../data/ElderCare/ElderCareServiceData.js";
import AvailableServices from "../../components/ElderCareAvailableServices/AvailableServices.jsx";
import HowItWorks from "../../components/HowItWorks/HowItWorks.jsx";
import GetStarted from "../../components/GetStarted/GetStarted.jsx";

const Nurse = () => {

  const serviceData = ElderCareServiceData.find((service) => service.id === 3);

  return <>
    <ElderCareServiceDetails data = {serviceData} />
    <AvailableServices/>
    <HowItWorks/>
    <GetStarted/>
  </>
}

export default Nurse;