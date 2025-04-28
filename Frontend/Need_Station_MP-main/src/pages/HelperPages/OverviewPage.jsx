import {  DollarSign, Clock,ClipboardList, Calendar, XCircle , Star} from "lucide-react";
import {  motion } from "framer-motion";

import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import EarningTrendChart from "../../components/overview/EarningTrendChart";
import MonthlyTaskGrowthChart from "../../components/overview/MonthlyTasksGrowthChart";

const OverviewPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Task Completed' icon={ClipboardList} value='45' color='#4DD0E1' />
					<StatCard name='Pending Tasks' icon={Clock} value='5' color='#4DD0E1' />
					<StatCard name='Upcoming Tasks' icon={Calendar} value='3' color='#4DD0E1' />
					<StatCard name='Canceled Tasks' icon={XCircle} value='0' color='#EC4899' />
					<StatCard name='Earning Today' icon={DollarSign} value='$80' color='#4DD0E1' />
					<StatCard name='Customer Rating' icon={Star} value='4.2' color='#4DD0E1' />
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 gap-6'>
					<EarningTrendChart />
					<MonthlyTaskGrowthChart />
				</div>
			</main>
		</div>
	);
};
export default OverviewPage;
