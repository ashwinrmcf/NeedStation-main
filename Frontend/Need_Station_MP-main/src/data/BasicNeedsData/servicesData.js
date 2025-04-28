import plum1 from "../../assets/images/BasicNeeds/plum1.png";
import elec1 from "../../assets/images/BasicNeeds/elec1.jpeg";
import plum2 from "../../assets/images/BasicNeeds/plum2.jpg";
import wat1 from "../../assets/images/BasicNeeds/wat1.png";
import elec from "../../assets/images/BasicNeeds/elec.png";
import plum from "../../assets/images/BasicNeeds/plum.png";
import water from "../../assets/images/BasicNeeds/water.png";

import image1 from "../../assets/images/BasicNeeds/E1.jpg";
import image2 from "../../assets/images/BasicNeeds/E2.jpg";
import image3 from "../../assets/images/BasicNeeds/E3.jpg";
import image4 from "../../assets/images/BasicNeeds/E4.jpg";
import appliance from "../../assets/images/BasicNeeds/appliance.png";
import wiring from "../../assets/images/BasicNeeds/wiring.png";
import inverter from "../../assets/images/BasicNeeds/inverter.png";
import fan from "../../assets/images/BasicNeeds/fan.png";
import mcb from "../../assets/images/BasicNeeds/mcb.png";
import visit from "../../assets/images/BasicNeeds/visit.png";

import image5 from "../../assets/images/BasicNeeds/plumberPageImage1.jpg";
import image6 from "../../assets/images/BasicNeeds/plumberPageImage2.jpg";
import image7 from "../../assets/images/BasicNeeds/plumberPageImage3.jpg";
import image8 from "../../assets/images/BasicNeeds/plumberPageImage4.jpg";
import drainage from "../../assets/images/BasicNeeds/drainage.png";
import toilet from "../../assets/images/BasicNeeds/toilet.png";
import tap from "../../assets/images/BasicNeeds/tap.png";
import waterpipes from "../../assets/images/BasicNeeds/waterpipes.png";
import waterfilter from "../../assets/images/BasicNeeds/waterfilter.png";

import image9 from "../../assets/images/BasicNeeds/waterSupply1.jpg"
import image10 from "../../assets/images/BasicNeeds/waterSupply2.jpg"
import image11 from "../../assets/images/BasicNeeds/waterSupply3.jpg"
import image12 from "../../assets/images/BasicNeeds/waterSupply4.jpg"
import purifier from "../../assets/images/BasicNeeds/purifier.png"
import tank from "../../assets/images/BasicNeeds/tank.png"
import truck from "../../assets/images/BasicNeeds/truck.png"
import underground from "../../assets/images/BasicNeeds/underground.png"
import motor from "../../assets/images/BasicNeeds/motor.png"

const servicesData = [
  {
    id: 1,
    heading: "Basic Needs And Services",
    description: "Trustworthy and energetic professionals providing top-notch general services.",
    highlights: [
      "Electronic Repairs and Appliance Installation",
      "Plumbing Damages, Repairs and Installation",
      "Aid Tankers for Water Supply",
    ],
    offeredServices: [
      "Installation and Maintenance",
      "Inspection and Repair",
      "Demand and Pressure Management",
      "Emergency Response and Contingency Planning",
      "System Upgrades",
    ],
    images: [plum1, elec1, plum2, wat1],
    popup: {
      heading: "Basic Services",
      cards: [
        {
          id: 1,
          title: "Electrician",
          image: elec,
          description: "Project starting at ₹5k",
          link: "/electrician",
        },
        {
          id: 2,
          title: "Plumber",
          image: plum,
          description: "Project starting at ₹7k",
          link: "/plumber",
        },
        {
          id: 3,
          title: "Water-Supply",
          image: water,
          description: "Project Starting at ₹6K",
          link: "/water-supply",
        },
      ],
    },
  },
  {
    id: 2, // Unique identifier for the page
    heading: "Electrician", // Page title
    description: "Your Trusted Partner for On-Demand Electricians!", // Description
    highlights: [
      "Skilled electricians available at your convenience.",
      "Fast response for all your electrical needs.",
      "Quality service without hidden costs.",
    ], // Points from the first unordered list
    offeredServices: [
      "Switch & Socket Installation/Repair",
      "Fan Installation & Maintenance",
      "Wall, ceiling, and decorative light installation.",
      "Safe and efficient electrical wiring for homes.",
      "Convenient and secure entry solutions.",
    ], // Points from the 'Services Offered' unordered list
    images: [image1, image2, image3, image4], // Image filenames from the image-container
    popup: {
      heading: "Electrician and Services",
      cards: [
        {
          id: 1,
          title: "Appliances",
          image: appliance,
          description: "Navigate to Appliances service",
          link: "/basic-needs/user-details",
        },
        {
          id: 2,
          title: "Wiring",
          image: wiring,
          description: "Navigate to Wiring service",
          link: "/basic-needs/user-details",
        },
        {
          id: 3,
          title: "Inverter",
          image: inverter,
          description: "Navigate to Inverter service",
          link: "/basic-needs/user-details",
        },
        {
          id: 4,
          title: "Fan",
          image: fan,
          description: "Navigate to Fan service",
          link: "/basic-needs/user-details",
        },
        {
          id: 5,
          title: "MCB",
          image: mcb,
          description: "Navigate to MCB service",
          link: "/basic-needs/user-details",
        },
        {
          id: 6,
          title: "Book a visit",
          image: visit,
          description: "Navigate to Book a Visit service",
          link: "/basic-needs/user-details",
        },
      ],
    },
  },
  {
    id: 3,
    heading: "Plumber",
    description: "Trustworthy and energetic professionals providing top-notch general services.",
    highlights: [
      "Convenient Booking",
      "Expert Professionals",
      "Affordable and Transparent Pricing"
    ],
    offeredServices: [
      "Tap Fitting",
      "Bathroom Fitting Services",
      "Shower Installation and Repairs",
      "Pipe Installation and Replacement",
      "Drain Cleaning and Blockage Removal"
    ],
    images: [image5, image6, image7, image8],
    popup:{
      heading: "Plumber",
  cards: [
    {
      id: 1,
      title: "Drainage",
      image: drainage,
      description: "Navigate to Drainage service",
      link: "/basic-needs/user-details",
    },
    {
      id: 2,
      title: "Toilet",
      image: toilet,
      description: "Navigate to Toilet service",
      link: "/basic-needs/user-details",
    },
    {
      id: 3,
      title: "Tap",
      image: tap,
      description: "Navigate to Tap service",
      link: "/basic-needs/user-details",
    },
    {
      id: 4,
      title: "Water-Pipes",
      image: waterpipes,
      description: "Navigate to Water-Pipes service",
      link: "/basic-needs/user-details",
    },
    {
      id: 5,
      title: "Water-Filter",
      image: waterfilter,
      description: "Navigate to Water-Filter service",
      link: "/basic-needs/user-details",
    },
    {
      id: 6,
      title: "Home-Visit",
      image: visit,
      description: "Navigate to Home-Visit service",
      link: "/basic-needs/user-details",
    },
  ],
    },
  },
  {
    id: 4,
    heading: "Water Supply",
    description: "Trustworthy and energetic professionals providing top-notch general services.",
    highlights: [
      "Efficient Pipeline Repairs and Maintenance",
      "Professional Installation of Water Supply Systems",
      "Aid Tankers for Water Supply"
    ],
    offeredServices: [
      "Installation and Maintenance",
      "Inspection and Repair",
      "Demand and Pressure Management",
      "Emergency Response and Contingency Planning",
      "System Upgrades"
    ],
    images: [image9, image10, image11, image12],
    popup: {
      heading: "Water Supply",
      cards: [
        {
          id: 1,
          title: "Water Purifier",
          image: purifier,
          description: "Navigate to Water Purifier service",
          link: "/basic-needs/user-details",
        },
        {
          id: 2,
          title: "Water Tank",
          image: tank,
          description: "Navigate to Water Tank service",
          link: "/basic-needs/user-details",
        },
        {
          id: 3,
          title: "Water Truck",
          image: truck,
          description: "Navigate to Water Truck service",
          link: "/basic-needs/user-details",
        },
        {
          id: 4,
          title: "Underground Tank",
          image: underground,
          description: "Navigate to Underground Tank service",
          link: "/basic-needs/user-details",
        },
        {
          id: 5,
          title: "Motor",
          image: motor,
          description: "Navigate to Motor service",
          link: "/basic-needs/user-details",
        },
        {
          id: 6,
          title: "Home-Visit",
          image: visit,
          description: "Navigate to Home-Visit service",
          link: "/basic-needs/user-details",
        },
      ],
    },
  },

];

export default servicesData;
