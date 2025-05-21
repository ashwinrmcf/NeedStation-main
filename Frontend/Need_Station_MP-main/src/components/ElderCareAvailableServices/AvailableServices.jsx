import React from 'react';
import ServiceCard from './ServiceCard.jsx';
import image1 from "../../assets/images/ElderCare/card-paralysis.jpg";
import image2 from "../../assets/images/ElderCare/Nurse.webp";
import image3 from "../../assets/images/ElderCare/Full-body-checkup.jpg"

const AvailableServices = () => {
  const services = [
    { title: 'Elder Care', price: '₹7k', imgUrl: 'https://i.ibb.co/qDK2WHS/ed-care.jpg' ,pageName:'/caretaker' },
    { title: 'Paralysis Caregiver', price: '₹9k', imgUrl: image1, pageName:'/paralysis-care' },
    { title: 'Postnatal Caregiver', price: '₹6k', imgUrl: 'https://i.ibb.co/sVrg60H/post-natal.jpg',pageName:'/postnatal-care' },
    { title: 'Nurse', price: '₹5k', imgUrl: image2, pageName:'/nurse' },
    { title: 'Health Checkup Services', price: '₹3k', imgUrl: image3, pageName:'/health-checkup' },
     { title: 'Baby Sitter', price: '₹6k', imgUrl: 'https://i.ibb.co/F62S1J1/babysitter.webp' ,pageName:'/babysitter'},
  ];

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-6xl font-semibold text-white mb-4">Available Services</h2>
      </div>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 px-4">
        {services.map((service, index) => (
          <ServiceCard key={index} title={service.title} price={service.price} imgUrl={service.imgUrl} pageName={service.pageName}/>
        ))}
      </div>
    </section>
  );
};

export default AvailableServices;



