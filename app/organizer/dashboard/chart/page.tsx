import HourlyRevenueChart from '../../events/create/_components/hourlyRevenewCart';

const DashboardPage: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <HourlyRevenueChart />
        </div>
    );
};

export default DashboardPage;