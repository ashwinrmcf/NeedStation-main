import { Calendar, Phone } from "lucide-react";

export default function UpcomingTaskCard({name,email,heading,task,date,time,phone,URL}) {
  return (
    <div className="bg-gray-900 border border-cyan-300 shadow-lg rounded-2xl p-6  flex justify-between">
      {/* Left Section */}
      <div>
        
        {/* Profile Section */}
        <div className="flex items-center mb-4">
          <img
            src={URL}
            alt="Client Profile"
            className="w-16 h-16 rounded-full object-cover border border-cyan-300 mr-4"
          />
          <div>
            <p className="text-white font-medium text-lg">{name}</p>
            <p className="text-gray-400 text-sm">{email}</p>
          </div>
        </div>
        
        {/* Task Details */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">{heading}</h2>
          <p className="text-gray-400">{task}</p>
          <p className="text-gray-400 text-sm flex items-center"><Calendar className="w-4 h-4 mr-1" />{date},{time}</p>
          <p className="text-gray-400 text-sm flex items-center"><Phone className="w-4 h-4 mr-1" /> {phone}</p>
        </div>
      </div>
      
      {/* Right Section - Buttons */}
      <div className="mt-5 flex flex-col space-y-6">
        <button className="bg-cyan-400 text-white px-4 py-2 rounded-lg text-sm hover:bg-cyan-500">
          View More
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600">
          Accept
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600">
          Decline
        </button>
      </div>
    </div>
  );
}
