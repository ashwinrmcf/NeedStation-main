// CardData.js
import elec1 from "../../assets/images/BasicNeeds/elec1.jpg";
import plum3 from "../../assets/images/BasicNeeds/plum3.png";
import wat1 from "../../assets/images/BasicNeeds/wat1.jpg";

import appliance from "../../assets/images/BasicNeeds/cards/appliance.jpg";
import wiring from "../../assets/images/BasicNeeds/cards/wiring.jpg";
import inverter from "../../assets/images/BasicNeeds/cards/invertor.jpg";
import fan from "../../assets/images/BasicNeeds/cards/fan.jpg";
import mcb from "../../assets/images/BasicNeeds/cards/mcb.jpg";
import visit from "../../assets/images/BasicNeeds/cards/home-visit.jpg";

import drainage from "../../assets/images/BasicNeeds/cards/drainage.jpg";
import toilet from "../../assets/images/BasicNeeds/cards/toilet.jpg";
import tap from "../../assets/images/BasicNeeds/cards/tap.jpg";
import waterpipes from "../../assets/images/BasicNeeds/cards/water-pipes.jpg";
import waterfilter from "../../assets/images/BasicNeeds/cards/water-filter.jpg";
import visit2 from "../../assets/images/BasicNeeds/cards/home-visit2.jpg";

import purifier from "../../assets/images/BasicNeeds/cards/water-purifier.jpg"
import tank from "../../assets/images/BasicNeeds/cards/water-tank.jpg"
import truck from "../../assets/images/BasicNeeds/cards/truck.jpg"
import underground from "../../assets/images/BasicNeeds/cards/underground-tank.jpg"
import motor from "../../assets/images/BasicNeeds/cards/motor.jpg"
import visit1 from "../../assets/images/BasicNeeds/cards/home-visit1.jpg"


const cardData = [
  {
    pageId: 1, // Unique identifier for "Basic Needs and Services"
    cards: [
      {
        id: 1,
        title: "Electrician",
        image: elec1,
        description: "Project starting at ₹5k",
        link: "/electrician",
      },
      {
        id: 2,
        title: "Plumber",
        image: plum3,
        description: "Project starting at ₹5k",
        link: "/plumber",
      },
      {
        id: 3,
        title: "Water-Supply",
        image: wat1,
        description: "Project starting at ₹5k",
        link: "/water-supply",
      },
    ],
  },
  {
    pageId: 2, // Example for another page
    cards: [
      {
        id: 1,
        title: "Appliances",
        image: appliance,
        description: "Navigate to Appliances service",
        link: "/user-details",
      },
      {
        id: 2,
        title: "Wiring",
        image: wiring,
        description: "Navigate to Wiring service",
        link: "/user-details",
      },
      {
        id: 3,
        title: "Inverter",
        image: inverter,
        description: "Navigate to Inverter service",
        link: "/user-details",
      },
      {
        id: 4,
        title: "Fan",
        image: fan,
        description: "Navigate to Fan service",
        link: "/user-details",
      },
      {
        id: 5,
        title: "MCB",
        image: mcb,
        description: "Navigate to MCB service",
        link: "/user-details",
      },
      {
        id: 6,
        title: "Book a visit",
        image: visit2,
        description: "Navigate to Book a Visit service",
        link: "/user-details",
      },
    ],
  },
  {
    pageId: 3, // Example for another page
    cards: [
      {
        id: 1,
        title: "Drainage",
        image: drainage,
        description: "Navigate to Drainage service",
        link: "/user-details",
      },
      {
        id: 2,
        title: "Toilet",
        image: toilet,
        description: "Navigate to Toilet service",
        link: "/user-details",
      },
      {
        id: 3,
        title: "Tap",
        image: tap,
        description: "Navigate to Tap service",
        link: "/user-details",
      },
      {
        id: 4,
        title: "Water-Pipes",
        image: waterpipes,
        description: "Navigate to Water-Pipes service",
        link: "/user-details",
      },
      {
        id: 5,
        title: "Water-Filter",
        image: waterfilter,
        description: "Navigate to Water-Filter service",
        link: "/user-details",
      },
      {
        id: 6,
        title: "Home-Visit",
        image: visit,
        description: "Navigate to Home-Visit service",
        link: "/user-details",
      },
    ],
  },
  {
    pageId: 4, // Example for another page
    cards: [
      {
        id: 1,
        title: "Water Purifier",
        image: purifier,
        description: "Navigate to Water Purifier service",
        link: "/user-details",
      },
      {
        id: 2,
        title: "Water Tank",
        image: tank,
        description: "Navigate to Water Tank service",
        link: "/user-details",
      },
      {
        id: 3,
        title: "Water Truck",
        image: truck,
        description: "Navigate to Water Truck service",
        link: "/user-details",
      },
      {
        id: 4,
        title: "Underground Tank",
        image: underground,
        description: "Navigate to Underground Tank service",
        link: "/user-details",
      },
      {
        id: 5,
        title: "Motor",
        image: motor,
        description: "Navigate to Motor service",
        link: "/user-details",
      },
      {
        id: 6,
        title: "Home-Visit",
        image: visit1,
        description: "Navigate to Home-Visit service",
        link: "/user-details",
      },
    ],
  },
];

export default cardData;
