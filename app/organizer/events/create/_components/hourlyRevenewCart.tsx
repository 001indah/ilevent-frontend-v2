'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import apiClient from '@/services/apiClient';
import { getToken } from '@/utils/auth';

interface TimeSegment {
    segmentName: string;
    revenue: number;
}

interface ChartData {
    totalRevenue: number;
    timeSegments: TimeSegment[];
}

const HourlyRevenueChart: React.FC = () => {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = getToken();
            if (!token) {
                setError("No authentication token found. Please log in.");
                return;
            }

            try {
                const response = await apiClient.get('/report/revenue/hourly/today', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setChartData(response.data.data);
            } catch (error) {
                console.error('Error fetching hourly revenue data:', error);
                setError("Failed to fetch hourly revenue data. Please try again later.");
            }
        };

        fetchData();
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (!chartData) {
        return <div>Loading...</div>;
    }

    const maxRevenue = Math.max(...chartData.timeSegments.map(segment => segment.revenue));
    const tickCount = 10; // Number of segments for the Y-axis
    const domainMax = Math.ceil(maxRevenue / tickCount) * tickCount; // Ensure the max is a multiple of tickCount

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className='text-center'>Hourly Revenue for Today</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData.timeSegments} margin={{ top: 20, right: 30, left: 70, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="segmentName" />
                            <YAxis
                                domain={[0, domainMax]}
                                ticks={Array.from({ length: tickCount + 1 }, (_, i) => i * domainMax / tickCount)}
                                tickFormatter={(value) => value.toLocaleString()}
                                label={{ value: 'Revenue (Rp)', angle: -90, position: 'insideLeft', dx: -60 }}
                            />
                            <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString()}`} />
                            <Bar dataKey="revenue" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center">
                    <p className="text-lg font-semibold">Total Revenue: Rp {chartData.totalRevenue.toLocaleString()}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default HourlyRevenueChart;
