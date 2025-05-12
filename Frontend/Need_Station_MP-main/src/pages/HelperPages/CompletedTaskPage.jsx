import { DollarSign, ClipboardList, Star, XCircle } from "lucide-react";
import { motion } from "framer-motion";

import DashboardHeader from "../../components/common/DashboardHeader";
import StatCard from "../../components/common/StatCard";
import TaskHistoryTable from "../../components/CompletedTask/CompletedTaskHistoryTable";



const taskStats = {
	totalTasksCompleted: 5,
	totalEarning: "$220",
	clientRating: 4.5,
	cancelledTask: 0,
};

const CompletedTaskPage = () => {
	return (
		<div className='flex-1 flex flex-col h-full'>
			{/* Fixed position header at the top */}
			<DashboardHeader title='Completed Tasks' />

			{/* Content area */}
			<main className='flex-1 py-6 px-4 lg:px-8 max-w-7xl mx-auto w-full'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total Tasks completed'
						icon={ClipboardList}
						value={taskStats.totalTasksCompleted.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard name='Amount Earned' icon={DollarSign} value={taskStats.totalEarning} color='#10B981' />
					<StatCard
						name='Client Rating'
						icon={Star}
						value={taskStats.clientRating.toLocaleString()}
						color='#F59E0B'
					/>
					<StatCard name='Cancelled Task ' icon={XCircle} value={taskStats.cancelledTask} color='#EF4444' />
				</motion.div>

				<TaskHistoryTable />   
			</main>
		</div>
	);
};
export default CompletedTaskPage;
