import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';

const ElderCareServiceDetails = ({data}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!data) {
    return <div>Error: Service data is not available.</div>;
  }
  
  const handleBookNow = () => {
    // Check if user is logged in
    if (!user) {
      // If not logged in, redirect to login page
      navigate('/login', {
        state: {
          redirectAfterLogin: '/user-details',
          serviceData: {
            service: data.heading,
            description: data.description,
            serviceType: 'ElderCare'
          }
        }
      });
    } else {
      // If logged in, redirect to user-details page with service info
      navigate('/user-details', {
        state: {
          service: data.heading,
          description: data.description,
          serviceType: 'ElderCare'
        }
      });
    }
  }

  return <>
    <section className="text-white py-12 px-6 md:px-12 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2">
        <h2 className="text-4xl font-bold mb-4">{data.heading}</h2>
        <p className="mb-4 text-xl"> {data.description} </p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300 text-xl">
        {data.highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            </ul>
        <h3 className="font-semibold mb-2 text-xl">Services Include</h3>
        <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300 text-xl">
          {data.offeredServices.map((service, index) => (
            <li key = {index}> {service} </li>
          ))}
        </ul>
        <button 
          onClick={handleBookNow}
          className="hover:bg-teal-600 text-black font-semibold py-2 px-4 rounded-lg" 
          style={{
            background: "linear-gradient(157.81deg, #DEF9FA -43.27%, #BEF3F5 -21.24%, #9DEDF0 12.19%, #7DE7EB 29.82%, #5CE1E6 51.94%, #33BBCF 90.29%)"
          }}
        >
          Book Now
        </button>
      </div>
      <div className="md:w-1/2 flex justify-center md:justify-end mt-6 md:mt-0">
        <img
          src={data.image}
          alt="Caretaker with Elderly Person"
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  </>
}

export default ElderCareServiceDetails;