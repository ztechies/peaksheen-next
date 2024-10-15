import React from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"

const BarChartDouble = (props: { data: { name: string; buyers: number; cleaners: number }[] }) => {
    return (
        <ResponsiveContainer width={350} height={260} style={{ marginLeft: -80, padding: 10 }}>
            <BarChart
                data={props.data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                }}
                barCategoryGap="30%"
            >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />

                <XAxis dataKey="name" axisLine={false} tickLine={false} />

                <YAxis axisLine={false} tickLine={false} />

                <Tooltip cursor={{ fill: "transparent" }} />

                <Legend
                    iconType="circle"
                    formatter={(value, entry) => (
                        <span style={{ color: entry.color }}>{value}</span>
                    )}
                />
                <Bar
                    dataKey="cleaners"
                    stackId="a" // Stack bars together
                    fill="#A5D6A7" // Light Green color for cleaners
                    radius={[10, 10, 10, 10]} // Rounded top corners
                    barSize={10} // Adjust bar width
                />

                {/* Buyers Bar - Dark Green */}
                <Bar
                    dataKey="buyers"
                    stackId="a" // Stack bars together
                    fill="#00C853" // Dark Green color for buyers
                    radius={[10, 10, 10, 10]} // Rounded top corners
                    barSize={10} // Adjust bar width
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarChartDouble
