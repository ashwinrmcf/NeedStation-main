import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const dailyBookingData = [
	{ date: "07/01", bookings: 0 },
	{ date: "07/02", bookings: 2 },
	{ date: "07/03", bookings: 1 },
	{ date: "07/04", bookings: 3 },
	{ date: "07/05", bookings: 4 },
	{ date: "07/06", bookings: 4 },
	{ date: "07/07", bookings: 5 },
];

const DailyOrders = () => {
	return (
		<motion.div
			className='bg-gray-900 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-cyan-300'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Daily Bookings</h2>

			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={dailyBookingData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='date' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4dd0e1",
							}}
							itemStyle={{ color: "#4dd0e1" }}
						/>
						<Legend />
						<Line type='monotone' dataKey='bookings' stroke='#4dd0e1' strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default DailyOrders;
