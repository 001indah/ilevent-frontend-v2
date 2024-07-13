'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Data dummy untuk contoh
const yearlyData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 700 },
    { name: 'Jun', value: 900 },
    { name: 'Jul', value: 1000 },
    { name: 'Aug', value: 1200 },
    { name: 'Sep', value: 1100 },
    { name: 'Oct', value: 1300 },
    { name: 'Nov', value: 1500 },
    { name: 'Dec', value: 1400 },
]

const monthlyData = [
    { name: 'Week 1', value: 100 },
    { name: 'Week 2', value: 200 },
    { name: 'Week 3', value: 150 },
    { name: 'Week 4', value: 300 },
]

const weeklyData = [
    { name: 'Mon', value: 50 },
    { name: 'Tue', value: 80 },
    { name: 'Wed', value: 70 },
    { name: 'Thu', value: 100 },
    { name: 'Fri', value: 120 },
    { name: 'Sat', value: 150 },
    { name: 'Sun', value: 90 },
]

const SalesChart = () => {
    const [period, setPeriod] = useState('yearly')

    const data = {
        yearly: yearlyData,
        monthly: monthlyData,
        weekly: weeklyData,
    }[period]

    return (
        <Card className="w-full bg-black text-white">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    Sales Overview
                    <Select onValueChange={setPeriod} defaultValue={period}>
                        <SelectTrigger className="w-[180px] bg-black">
                            <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="yearly">Yearly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                    </Select>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                        <XAxis dataKey="name" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#333', border: 'none' }}
                            labelStyle={{ color: '#fff' }}
                        />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

export default SalesChart