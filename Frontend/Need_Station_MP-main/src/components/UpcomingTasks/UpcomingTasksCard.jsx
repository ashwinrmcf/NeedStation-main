import { Calendar, Phone } from "lucide-react";

export default function UpcomingTaskCard({name,email,heading,task,date,time,phone,URL}) {
  return (
    <div className="bg-gray-900 border-2 border-cyan-300 shadow-xl rounded-2xl p-6 flex justify-between" style={{opacity: 1}}>
      {/* Left Section */}
      <div>
        
        {/* Profile Section */}
        <div className="flex items-center mb-4">
          <img
            src={URL}
            alt="Client Profile"
            className="w-16 h-16 rounded-full object-cover border-2 border-[#00E0B8] mr-4"
          />
          <div>
            <p className="text-white font-semibold text-lg">{name}</p>
            <p className="text-gray-300 text-sm">{email}</p>
          </div>
        </div>
        
        {/* Task Details */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-cyan-300">{heading}</h2>
          <p className="text-white text-md">{task}</p>
          <p className="text-gray-200 text-sm flex items-center mt-2"><Calendar className="w-4 h-4 mr-1 text-cyan-300" />{date}, {time}</p>
          <p className="text-gray-200 text-sm flex items-center"><Phone className="w-4 h-4 mr-1 text-cyan-300" /> {phone}</p>
        </div>
      </div>
      
      {/* Right Section - Buttons */}
      <div className="mt-5 flex flex-col space-y-6">
        <button className="bg-[#00E0B8] text-gray-900 font-medium px-4 py-2 rounded-lg text-sm hover:bg-[#22c3b4]">
          View More
        </button>
        <button className="bg-green-500 text-white font-medium px-4 py-2 rounded-lg text-sm hover:bg-green-600">
          Accept
        </button>
        <button className="bg-red-500 text-white font-medium px-4 py-2 rounded-lg text-sm hover:bg-red-600">
          Decline
        </button>
      </div>
    </div>
  );
}
