import { CheckCircle, Clock, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import DailyBookings from "../../components/EarningAndPayments/DailyBookings";
import EarningHistoryTable from "../../components/EarningAndPayments/EarningHistoryTable";
import EarningTrendChart from "../../components/overview/EarningTrendChart";

const EarningData = {
	pendingPayments: "$356",
	PaidEarning: "$1,178",
	totalEarning: "$98,765",
};

const EarningPage = () => {
	return (
		<div className='flex-1 relative z-10 overflow-auto'>
			<Header title={"Earning and Payment"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Earning' icon={DollarSign} value={EarningData.totalEarning} color='#6366F1' />
					<StatCard name='Pending Payment' icon={Clock} value={EarningData.pendingPayments} color='#F59E0B' />
					<StatCard
						name='Paid Earning'
						icon={CheckCircle}
						value={EarningData.PaidEarning}
						color='#10B981'
					/>
					
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
				<EarningTrendChart />
					<DailyBookings />
				</div>
				<EarningHistoryTable />
			</main>
		</div>
	);
};
export default EarningPage;
