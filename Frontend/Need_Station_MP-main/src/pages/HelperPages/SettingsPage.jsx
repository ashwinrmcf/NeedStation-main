import DashboardHeader from "../../components/common/DashboardHeader";
import ConnectedAccounts from "../../components/settings/ConnectedAccounts";
import DangerZone from "../../components/settings/DangerZone";
import Notifications from "../../components/settings/Notifications";
import Profile from "../../components/settings/Profile";
import Security from "../../components/settings/Security";

const SettingsPage = () => {
	return (
		<div className='flex-1 flex flex-col h-full'>
			{/* Fixed position header at the top */}
			<DashboardHeader title='Settings' />
			
			{/* Content area */}
			<main className='flex-1 py-6 px-4 lg:px-8 max-w-4xl mx-auto w-full'>
				<Profile />
				<Notifications />
				<Security />
				<ConnectedAccounts />
				<DangerZone />
			</main>
		</div>
	);
};
export default SettingsPage;
