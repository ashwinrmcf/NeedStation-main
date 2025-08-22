import {  DollarSign, Clock, ClipboardList, Calendar, XCircle, Star, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import DashboardHeader from "../../components/common/DashboardHeader";
import StatCard from "../../components/common/StatCard";
import EarningTrendChart from "../../components/overview/EarningTrendChart";
import MonthlyTaskGrowthChart from "../../components/overview/MonthlyTasksGrowthChart";
import WelcomeCard from "../../components/overview/WelcomeCard";

const OverviewPage = () => {
	// State to track welcome card visibility
	const [isWelcomeCardVisible, setIsWelcomeCardVisible] = useState(true);
	
	// Always show welcome card for 10 seconds on dashboard load, then allow manual control
	useEffect(() => {
		// Always show the welcome card initially when dashboard loads
		setIsWelcomeCardVisible(true);
		
		// Set timer to auto-hide the card after 10 seconds
		const timer = setTimeout(() => {
			// Hide the card with animation
			setIsWelcomeCardVisible(false);
			
			// After auto-hide, user can still show it manually
			// We don't set any localStorage flag here so it will show again on next login
		}, 10000); // 10 seconds
		
		// Clean up timer if component unmounts
		return () => clearTimeout(timer);
	}, []); // Empty dependency array means this runs once on component mount
	
	// Handle show/hide toggle
	const handleVisibilityChange = (visible) => {
		setIsWelcomeCardVisible(visible);
	};
	
	// Function to unhide the welcome card
	const unhideWelcomeCard = () => {
		// Show the welcome card again
		setIsWelcomeCardVisible(true);
		
		// Remove the flag from localStorage
		const workerId = localStorage.getItem('workerId');
		if (workerId) {
			localStorage.removeItem(`worker_${workerId}_welcomed`);
		}
	};

	return (
		<div className='flex-1 flex flex-col h-full'>
			{/* Fixed position header at the top */}
			<DashboardHeader title='Overview' />

			{/* Content area */}
			<main className='flex-1 py-6 px-4 lg:px-8 max-w-7xl mx-auto w-full'>
				{/* Welcome Card for newly registered workers */}
				<AnimatePresence>
					{isWelcomeCardVisible ? (
						<WelcomeCard 
							key="welcome-card"
							isVisible={true} 
							onVisibilityChange={handleVisibilityChange} 
						/>
					) : (
						<motion.button 
							key="show-button"
							onClick={unhideWelcomeCard}
							className="mb-4 flex items-center gap-2 bg-gray-800 text-[#00E0B8] px-4 py-2 rounded-md border border-[#00E0B8] hover:bg-gray-700 transition-colors"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3, delay: 0.2 }}
						>
							<Eye size={18} />
							<span>Show Welcome Card</span>
						</motion.button>
					)}
				</AnimatePresence>
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
