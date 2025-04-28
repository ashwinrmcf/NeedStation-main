import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const earningData = [
	{ month: "Jul", earnings: 4200 },
	{ month: "Aug", earnings: 3800 },
	{ month: "Sep", earnings: 5100 },
	{ month: "Oct", earnings: 4600 },
	{ month: "Nov", earnings: 5400 },
	{ month: "Dec", earnings: 7200 },
	{ month: "Jan", earnings: 6100 },
	{ month: "Feb", earnings: 5900 },
	{ month: "Mar", earnings: 6800 },
	{ month: "Apr", earnings: 6300 },
	{ month: "May", earnings: 7100 },
	{ month: "Jun", earnings: 7500 },
];

const EarningTrendChart = () => {
	return (
		<motion.div
			className='bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-cyan-300'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Earnings Trend</h2>

			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart data={earningData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey={"month"} stroke='#9ca3af' />
						<YAxis stroke='#9ca3af' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4dd0e1",
							}}
							itemStyle={{ color: "#4dd0e1" }}
						/>
						<Line
							type='monotone'
							dataKey='earnings'
							stroke='#4DD0E1'
							strokeWidth={3}
							dot={{ fill: "#4DD0E1", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default EarningTrendChart;
