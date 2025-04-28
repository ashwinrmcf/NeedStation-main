import GetStarted from "../../components/GetStarted/GetStarted";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import image1 from "../../assets/images/flatRental.jpg"


const FlatRentalHome = () => {

  return <>

    <section className="bg-gray-900 text-white py-12 px-6 md:px-12 flex flex-col md:flex-row items-center">
  <div className="md:w-1/2">
    <h2 className="text-4xl font-bold mb-4">Flat Rental</h2>
    <p className="mb-4 text-xl">
      Affordable and comfortable flats designed to meet all your living needs. 
      Choose from a range of spacious, modern, and conveniently located properties 
      for families, professionals, or students.
    </p>
    <h3 className="font-semibold mb-2 text-xl">Key Features include:</h3>
    <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300 text-xl">
      <li>Fully furnished or unfurnished options</li>
      <li>Prime locations with excellent connectivity</li>
      <li>24/7 security and maintenance services</li>
      <li>Modern amenities (WiFi, gym, parking)</li>
      <li>Flexible rental agreements</li>
    </ul>
    <button className="bg-blue-100 hover:bg-teal-600 text-black font-semibold py-2 px-4 rounded-lg">
      Rent Now
    </button>
  </div>
  <div className="md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
    <img
      src={image1}
      alt="Modern Flat Interior"
      className="rounded-lg shadow-lg"
    />
  </div>
</section>

<HowItWorks/>
<GetStarted/>
  </>
}

export default FlatRentalHome;