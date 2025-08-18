import { motion } from "framer-motion";

import DashboardHeader from "../../components/common/DashboardHeader";
import UpcomingTask from "../../components/UpcomingTasks/UpcomingTasksCard";

const UpcomingTaskPage = () => {
	return (
		<div className='flex-1 flex flex-col h-full'>
			{/* Fixed position header at the top */}
			<DashboardHeader title='Upcoming Tasks' />

			{/* Content area - ensuring full opacity */}
			<main className='flex-1 py-6 px-4 lg:px-8 max-w-7xl mx-auto w-full'>

				<motion.div
					className='py-4 space-y-6'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, staggerChildren: 0.3 }}
				>
					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
						<UpcomingTask 
							name= 'Alice Johnson'
							email= "alice.johnson@example.com" 
							URL = "https://randomuser.me/api/portraits/women/1.jpg" 
							heading=  "Plumbing Repair"
							task = "Fix a leaking kitchen sink."
							date = "March 14, 2025"
							time = "10:00 AM"
							phone = "+1 (987) 654-3210"/>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
						<UpcomingTask
							name= "Michael Smith"
							email= "michael.smith@example.com"
							URL= "https://randomuser.me/api/portraits/men/2.jpg"
							heading= "Furniture Assembly"
							task= "Assemble a 6-piece wooden dining set."
							date= "March 15, 2025"
							time= "2:30 PM"
							phone= "+1 (456) 789-1234"
						/>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}>
						<UpcomingTask
							name = "Sophia Brown"
							email = "sophia.brown@example.com"
							URL = "https://randomuser.me/api/portraits/women/3.jpg"
							heading = "Home Cleaning"
							task = "Deep cleaning of a 3-bedroom apartment."
							date = "March 16, 2025"
							time = "9:00 AM"
							phone = "+1 (321) 654-0987"
						/>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }}>
						<UpcomingTask
							name = "Daniel Martinez"
							email = "daniel.martinez@example.com"
							URL = "https://randomuser.me/api/portraits/men/4.jpg"
							heading = "Electrical Repair"
							task = "Fixing a faulty circuit breaker."
							date = "March 17, 2025"
							time = "4:00 PM"
							phone = "+1 (123) 456-7890"/>
					</motion.div>
				</motion.div>
			</main>
		</div>
	);
};
export default UpcomingTaskPage;

