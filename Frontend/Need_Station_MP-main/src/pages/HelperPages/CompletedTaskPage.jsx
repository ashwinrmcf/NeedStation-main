import { DollarSign, ClipboardList, Star, XCircle } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../components/common/Header";
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
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Completed Tasks' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
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
