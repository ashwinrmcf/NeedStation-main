import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";


const MONTHLY_TASKS_DATA = [
   { month: 'Jan', tasks: 10 },
  { month: 'Feb', tasks: 15 },
  { month: 'Mar', tasks: 20 },
  { month: 'Apr', tasks: 25 },
  { month: 'May', tasks: 30 },
];

const MonthlyTaskGrowthChart = () => {
	return (
		<motion.div
			className='bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 lg:col-span-2 border border-cyan-300'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Monthly Tasks Growth</h2>

			<div className='h-80'>
				<ResponsiveContainer>
					<BarChart data={MONTHLY_TASKS_DATA}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey='month' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4DD0E1",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Bar dataKey={"tasks"} fill='#4DD0E1'>
							{MONTHLY_TASKS_DATA.map((entry, index) => (
								<Cell key={`cell-${index}`} fill="#4DD0E1" />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default  MonthlyTaskGrowthChart;
