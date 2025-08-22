import image1 from "../assets/images/Rina.jpg";
import image2 from "../assets/images/cardImage2.jpeg";
import image3 from "../assets/images/Jane_Austin.jpg";

// Additional helper images (you can add more images to assets/images folder)
import electrician1 from "../assets/images/BasicNeeds/E1.jpg";
import electrician2 from "../assets/images/BasicNeeds/E2.jpg";
import plumber1 from "../assets/images/BasicNeeds/plumberPageImage1.jpg";
import plumber2 from "../assets/images/BasicNeeds/plumberPageImage2.jpg";
import waterSupply1 from "../assets/images/BasicNeeds/waterSupply1.jpg";
import waterSupply2 from "../assets/images/BasicNeeds/waterSupply2.jpg";

const availableHelpersData = {
  // Basic Needs Services
  electrician: [
    {
      id: 1,
      name: 'Rajesh Kumar',
      image: electrician1,
      rate: '₹450/hr',
      reviews: '4.9 (85 reviews)',
      tasks: '120+ electrical repair tasks',
      experience: '8+ years',
      description: 'Expert electrician specializing in residential and commercial electrical work. Certified in electrical safety protocols with extensive experience in wiring, appliance installation, and electrical troubleshooting.',
      specialties: ['Wiring Installation', 'Appliance Repair', 'Circuit Breaker Maintenance', 'Electrical Safety Inspections']
    },
    {
      id: 2,
      name: 'Amit Sharma',
      image: electrician2,
      rate: '₹500/hr',
      reviews: '5.0 (92 reviews)',
      tasks: '150+ electrical installation tasks',
      experience: '10+ years',
      description: 'Licensed master electrician with a decade of experience in complex electrical systems. Specializes in smart home installations, industrial electrical work, and emergency repairs.',
      specialties: ['Smart Home Setup', 'Industrial Wiring', 'Emergency Repairs', 'Electrical Upgrades']
    },
    {
      id: 3,
      name: 'Priya Patel',
      image: image1,
      rate: '₹420/hr',
      reviews: '4.8 (67 reviews)',
      tasks: '95+ electrical maintenance tasks',
      experience: '6+ years',
      description: 'Skilled female electrician focusing on residential electrical services. Known for attention to detail and excellent customer service in electrical repairs and installations.',
      specialties: ['Residential Wiring', 'Light Fixtures', 'Outlet Installation', 'Electrical Diagnostics']
    }
  ],

  plumber: [
    {
      id: 4,
      name: 'Mohammed Ali',
      image: plumber1,
      rate: '₹480/hr',
      reviews: '4.9 (78 reviews)',
      tasks: '110+ plumbing repair tasks',
      experience: '9+ years',
      description: 'Professional plumber with extensive experience in pipe installation, leak repairs, and bathroom renovations. Certified in modern plumbing techniques and emergency services.',
      specialties: ['Pipe Installation', 'Leak Detection', 'Bathroom Fitting', 'Emergency Plumbing']
    },
    {
      id: 5,
      name: 'Suresh Gupta',
      image: plumber2,
      rate: '₹520/hr',
      reviews: '5.0 (95 reviews)',
      tasks: '140+ plumbing installation tasks',
      experience: '12+ years',
      description: 'Master plumber specializing in complex plumbing systems, water heater installations, and commercial plumbing solutions. Available for both residential and commercial projects.',
      specialties: ['Water Heater Installation', 'Commercial Plumbing', 'Drain Cleaning', 'Pipe Replacement']
    },
    {
      id: 6,
      name: 'Kavita Singh',
      image: image2,
      rate: '₹460/hr',
      reviews: '4.7 (63 reviews)',
      tasks: '85+ plumbing maintenance tasks',
      experience: '7+ years',
      description: 'Experienced plumber focusing on residential plumbing services, fixture installations, and preventive maintenance. Known for reliable service and competitive pricing.',
      specialties: ['Fixture Installation', 'Preventive Maintenance', 'Toilet Repair', 'Faucet Installation']
    }
  ],

  'water-supply': [
    {
      id: 7,
      name: 'Ravi Mehta',
      image: waterSupply1,
      rate: '₹450/hr',
      reviews: '4.9 (88 reviews)',
      tasks: '100+ water supply projects',
      experience: '11+ years',
      description: 'Water supply specialist with expertise in water tank installations, pump systems, and water purification setups. Certified in water quality management and system optimization.',
      specialties: ['Water Tank Installation', 'Pump Systems', 'Water Purification', 'System Maintenance']
    },
    {
      id: 8,
      name: 'Deepak Joshi',
      image: waterSupply2,
      rate: '₹480/hr',
      reviews: '5.0 (76 reviews)',
      tasks: '125+ water system installations',
      experience: '13+ years',
      description: 'Senior water supply engineer specializing in comprehensive water management solutions, underground tank installations, and water quality testing services.',
      specialties: ['Underground Tanks', 'Water Quality Testing', 'System Design', 'Emergency Water Supply']
    },
    {
      id: 9,
      name: 'Anita Verma',
      image: image3,
      rate: '₹400/hr',
      reviews: '4.8 (54 reviews)',
      tasks: '70+ water supply maintenance tasks',
      experience: '8+ years',
      description: 'Water supply technician focusing on residential water systems, motor installations, and regular maintenance services. Known for thorough work and customer satisfaction.',
      specialties: ['Motor Installation', 'Water System Maintenance', 'Pressure Management', 'Water Storage Solutions']
    }
  ],

  // Elder Care Services
  nurse: [
    {
      id: 10,
      name: 'Dr. Meera Nair',
      image: image1,
      rate: '₹500/hr',
      reviews: '5.0 (120 reviews)',
      tasks: '200+ nursing care sessions',
      experience: '15+ years',
      description: 'Registered nurse with extensive experience in elderly care, medication management, and health monitoring. Specialized in providing compassionate care for seniors with chronic conditions.',
      specialties: ['Medication Management', 'Health Monitoring', 'Chronic Care', 'Patient Education']
    },
    {
      id: 11,
      name: 'Nurse Priyanka',
      image: image2,
      rate: '₹480/hr',
      reviews: '4.9 (95 reviews)',
      tasks: '180+ home nursing visits',
      experience: '12+ years',
      description: 'Experienced home care nurse specializing in post-operative care, wound management, and elderly assistance. Certified in geriatric nursing and emergency medical response.',
      specialties: ['Post-operative Care', 'Wound Management', 'Geriatric Care', 'Emergency Response']
    },
    {
      id: 12,
      name: 'Sister Mary',
      image: image3,
      rate: '₹460/hr',
      reviews: '4.8 (87 reviews)',
      tasks: '160+ elderly care sessions',
      experience: '10+ years',
      description: 'Compassionate nurse with a decade of experience in elderly care, physical therapy assistance, and family support services. Known for patient-centered care approach.',
      specialties: ['Physical Therapy Support', 'Family Counseling', 'Mobility Assistance', 'Comfort Care']
    }
  ],

  caretaker: [
    {
      id: 13,
      name: 'Sunita Devi',
      image: image1,
      rate: '₹350/hr',
      reviews: '4.9 (110 reviews)',
      tasks: '250+ caretaking sessions',
      experience: '8+ years',
      description: 'Dedicated caretaker with years of experience in elderly assistance, daily living support, and companionship services. Trained in basic medical care and emergency response.',
      specialties: ['Daily Living Support', 'Companionship', 'Meal Preparation', 'Mobility Assistance']
    },
    {
      id: 14,
      name: 'Ramesh Yadav',
      image: image2,
      rate: '₹320/hr',
      reviews: '4.7 (89 reviews)',
      tasks: '190+ elderly care tasks',
      experience: '6+ years',
      description: 'Experienced male caretaker specializing in elderly male care, physical support, and household assistance. Known for patience and understanding with dementia patients.',
      specialties: ['Physical Support', 'Dementia Care', 'Household Tasks', 'Transportation']
    },
    {
      id: 15,
      name: 'Lakshmi Iyer',
      image: image3,
      rate: '₹380/hr',
      reviews: '5.0 (75 reviews)',
      tasks: '140+ caretaking assignments',
      experience: '9+ years',
      description: 'Professional caretaker with expertise in elderly care, medication reminders, and emotional support. Certified in first aid and CPR with excellent communication skills.',
      specialties: ['Medication Reminders', 'Emotional Support', 'First Aid', 'Personal Care']
    }
  ],

  babysitter: [
    {
      id: 16,
      name: 'Pooja Sharma',
      image: image1,
      rate: '₹300/hr',
      reviews: '4.9 (145 reviews)',
      tasks: '300+ babysitting sessions',
      experience: '5+ years',
      description: 'Experienced babysitter with early childhood education background. Specializes in infant care, educational activities, and creating safe, nurturing environments for children.',
      specialties: ['Infant Care', 'Educational Activities', 'Safety Management', 'Meal Preparation']
    },
    {
      id: 17,
      name: 'Neha Gupta',
      image: image2,
      rate: '₹350/hr',
      reviews: '5.0 (98 reviews)',
      tasks: '220+ childcare sessions',
      experience: '7+ years',
      description: 'Professional childcare provider with certification in child development. Experienced in caring for multiple children, homework assistance, and recreational activities.',
      specialties: ['Child Development', 'Homework Help', 'Recreational Activities', 'Behavioral Guidance']
    },
    {
      id: 18,
      name: 'Ritu Agarwal',
      image: image3,
      rate: '₹320/hr',
      reviews: '4.8 (112 reviews)',
      tasks: '280+ babysitting tasks',
      experience: '6+ years',
      description: 'Caring babysitter with special needs experience and first aid certification. Known for creating engaging activities and maintaining consistent routines for children.',
      specialties: ['Special Needs Care', 'Activity Planning', 'Routine Management', 'Emergency Care']
    }
  ],

  // Maid Services - General Cleaning
  'maid-services': [
    {
      id: 19,
      name: 'Rina Choudhary',
      image: image1,
      rate: '₹350/hr',
      reviews: '5.0 (150 reviews)',
      tasks: '400+ cleaning tasks',
      experience: '5+ years',
      description: 'Meticulous cleaner with over 5+ years of experience in cleaning private apartments. Achieved 100% adherence to sanitization policies and received consistently high customer satisfaction rating.',
      specialties: ['Deep Cleaning', 'Sanitization', 'Apartment Cleaning', 'Regular Maintenance']
    },
    {
      id: 20,
      name: 'Huzefa Qureshi',
      image: image2,
      rate: '₹380/hr',
      reviews: '4.9 (128 reviews)',
      tasks: '350+ household tasks',
      experience: '6+ years',
      description: 'Professional house cleaner specializing in comprehensive household management, including cleaning, organizing, and basic maintenance tasks. Known for reliability and attention to detail.',
      specialties: ['House Cleaning', 'Organization', 'Laundry Services', 'Basic Maintenance']
    },
    {
      id: 21,
      name: 'Jane Austin',
      image: image3,
      rate: '₹400/hr',
      reviews: '5.0 (95 reviews)',
      tasks: '280+ cleaning projects',
      experience: '4+ years',
      description: 'Experienced domestic helper with expertise in eco-friendly cleaning methods, kitchen management, and maintaining hygiene standards. Certified in green cleaning practices.',
      specialties: ['Eco-friendly Cleaning', 'Kitchen Management', 'Green Practices', 'Hygiene Standards']
    }
  ],

  // Maid Services - Cooking Specialists
  'cooking': [
    {
      id: 22,
      name: 'Sita Sharma',
      image: image1,
      rate: '₹450/hr',
      reviews: '4.9 (120 reviews)',
      tasks: '300+ cooking assignments',
      experience: '8+ years',
      description: 'Expert cook specializing in traditional Indian cuisine and healthy meal preparation. Experienced in cooking for families and special dietary requirements.',
      specialties: ['Traditional Indian Cuisine', 'Healthy Meals', 'Special Diets', 'Meal Planning']
    },
    {
      id: 23,
      name: 'Kamala Devi',
      image: image2,
      rate: '₹420/hr',
      reviews: '5.0 (95 reviews)',
      tasks: '250+ cooking sessions',
      experience: '10+ years',
      description: 'Professional cook with expertise in multi-cuisine cooking, including North Indian, South Indian, and Continental dishes. Known for hygiene and taste.',
      specialties: ['Multi-cuisine Cooking', 'Continental Food', 'Hygiene Standards', 'Recipe Development']
    },
    {
      id: 24,
      name: 'Radha Iyer',
      image: image3,
      rate: '₹480/hr',
      reviews: '4.8 (85 reviews)',
      tasks: '200+ cooking projects',
      experience: '7+ years',
      description: 'Skilled cook specializing in South Indian cuisine, vegetarian meals, and festival cooking. Certified in food safety and nutrition.',
      specialties: ['South Indian Cuisine', 'Vegetarian Cooking', 'Festival Foods', 'Nutritional Meals']
    }
  ],

  // Maid Services - Cleaning Specialists
  'cleaning': [
    {
      id: 25,
      name: 'Meera Joshi',
      image: image1,
      rate: '₹320/hr',
      reviews: '4.9 (140 reviews)',
      tasks: '450+ cleaning tasks',
      experience: '6+ years',
      description: 'Professional cleaner specializing in deep cleaning, sanitization, and maintaining spotless homes. Expert in using eco-friendly cleaning products.',
      specialties: ['Deep Cleaning', 'Sanitization', 'Eco-friendly Products', 'Floor Care']
    },
    {
      id: 26,
      name: 'Sunita Kumari',
      image: image2,
      rate: '₹350/hr',
      reviews: '5.0 (110 reviews)',
      tasks: '380+ cleaning projects',
      experience: '8+ years',
      description: 'Experienced cleaning specialist with expertise in bathroom cleaning, kitchen deep cleaning, and maintaining hygiene standards in homes.',
      specialties: ['Bathroom Cleaning', 'Kitchen Deep Clean', 'Hygiene Maintenance', 'Stain Removal']
    },
    {
      id: 27,
      name: 'Lata Patel',
      image: image3,
      rate: '₹330/hr',
      reviews: '4.8 (125 reviews)',
      tasks: '320+ cleaning assignments',
      experience: '5+ years',
      description: 'Dedicated cleaner focusing on residential cleaning, dusting, and organizing. Known for attention to detail and maintaining cleanliness standards.',
      specialties: ['Residential Cleaning', 'Dusting', 'Organization', 'Window Cleaning']
    }
  ],

  // Maid Services - Laundry Specialists
  'laundry': [
    {
      id: 28,
      name: 'Geeta Rani',
      image: image1,
      rate: '₹300/hr',
      reviews: '4.9 (100 reviews)',
      tasks: '350+ laundry tasks',
      experience: '7+ years',
      description: 'Expert in laundry services including washing, ironing, and fabric care. Experienced with different fabric types and stain removal techniques.',
      specialties: ['Fabric Care', 'Stain Removal', 'Ironing', 'Delicate Garments']
    },
    {
      id: 29,
      name: 'Pushpa Devi',
      image: image2,
      rate: '₹320/hr',
      reviews: '5.0 (88 reviews)',
      tasks: '280+ laundry projects',
      experience: '6+ years',
      description: 'Professional laundry specialist with expertise in washing, drying, and pressing clothes. Known for maintaining garment quality and timely service.',
      specialties: ['Professional Pressing', 'Garment Quality', 'Quick Service', 'Dry Cleaning']
    },
    {
      id: 30,
      name: 'Savita Sharma',
      image: image3,
      rate: '₹310/hr',
      reviews: '4.7 (92 reviews)',
      tasks: '260+ laundry assignments',
      experience: '5+ years',
      description: 'Skilled in all aspects of laundry care including sorting, washing, and folding. Specializes in caring for expensive and delicate fabrics.',
      specialties: ['Fabric Sorting', 'Delicate Care', 'Folding Techniques', 'Color Protection']
    }
  ],

  // Default helpers for unknown services
  default: [
    {
      id: 31,
      name: 'Rina Choudhary',
      image: image1,
      rate: '₹400/hr',
      reviews: '5.0 (50 reviews)',
      tasks: '32 furniture assembly tasks',
      experience: '5+ years',
      description: 'Meticulous cleaner with over 5+ years of experience in cleaning private apartments. Achieved 100% adherence to sanitization policies and received consistently high customer satisfaction rating.',
      specialties: ['General Services', 'Customer Satisfaction', 'Reliable Service', 'Quality Work']
    },
    {
      id: 32,
      name: 'Huzefa Qureshi',
      image: image2,
      rate: '₹400/hr',
      reviews: '5.0 (50 reviews)',
      tasks: '32 furniture assembly tasks',
      experience: '5+ years',
      description: 'Professional service provider with extensive experience in various household and maintenance tasks. Known for reliability and quality workmanship.',
      specialties: ['Versatile Services', 'Problem Solving', 'Quality Assurance', 'Customer Care']
    },
    {
      id: 33,
      name: 'Jane Austin',
      image: image3,
      rate: '₹400/hr',
      reviews: '5.0 (50 reviews)',
      tasks: '32 furniture assembly tasks',
      experience: '5+ years',
      description: 'Experienced service professional offering comprehensive solutions for various household needs. Committed to delivering excellent results and customer satisfaction.',
      specialties: ['Comprehensive Services', 'Excellence', 'Adaptability', 'Professional Standards']
    }
  ]
};

export default availableHelpersData;
