import laundry from "../../assets/images/MaidServices/laundry.jpg";
import cooking from "../../assets/images/MaidServices/cooking.jpg";
import cleaning from "../../assets/images/MaidServices/cleaning.jpg";


const cardData = [
  {
    pageId: 1,
    cards: [
      {
        id: 1,
        title: "Cooking Assistance",
        image: cooking,
        description: "Project starting at ₹5k",
        link: "/user-details",
      },
      {
        id: 2,
        title: "Cleaning Services",
        image: cleaning,
        description: "Project starting at ₹5k",
        link: "/user-details",
      },
      {
        id: 3,
        title: "Laundry Services",
        image: laundry,
        description: "Project starting at ₹5k",
        link: "/user-details",
      },
    ],
  },
];

export default cardData;
