import m1 from "../../assets/images/MaidServices/m1.png";
import m2 from "../../assets/images/MaidServices/m2.png";
import m3 from "../../assets/images/MaidServices/m3.png";
import m4 from "../../assets/images/MaidServices/m4.png";
import cooking from "../../assets/images/MaidServices/cooking1.jpg";
import cleaning from "../../assets/images/MaidServices/cleaning1.jpg";
import laundry from "../../assets/images/MaidServices/laundry1.jpg";


const servicesData = [
  {
    id: 1,
    heading: "House Maid",
    description: "Your Reliable Help for a Well-Maintained Home!",
    highlights: [
      "Trained and trustworthy maids available at your convenience",
      "Flexible scheduling for part-time or full-time assistance",
      "Affordable and transparent pricing with no hidden charges",
    ],
    offeredServices: [
      "Cooking Assistance: Meal preparation as per your dietary preferences.",
      "Cleaning Services: Sweeping, mopping, dusting, and bathroom cleaning.",
      "Laundry Services: Washing, drying, and ironing clothes.",
      "Utensil Cleaning: Daily dishwashing and kitchen upkeep.",
    ],
    images: [m1, m2, m3, m4],
    popup: {
      heading: "Basic Services",
      cards: [
        {
          id: 1,
          title: "Cooking",
          image: cooking,
          description: "Project starting at ₹9k",
          link: "/user-details",
        },
        {
          id: 2,
          title: "Cleaning",
          image: cleaning,
          description: "Project starting at ₹6k",
          link: "/user-details",
        },
        {
          id: 3,
          title: "Laundry",
          image: laundry,
          description: "Project Starting at ₹2K",
          link: "/user-details",
        },
      ],
    },
  },
];

export default servicesData;
