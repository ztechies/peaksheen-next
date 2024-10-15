import React from "react"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarProps,
} from "recharts"

interface BarChartsProps extends Omit<BarProps, "data" | "dataKey"> {
    data: { name: string; value: number }[]
}

const BarCharts: React.FC<BarChartsProps> = ({ data }) => {
    return (
        <ResponsiveContainer width={350} height={260} style={{ marginLeft: -80, padding: 10 }}>
            <BarChart data={data}>
                {/* Add horizontal grid lines */}
                <CartesianGrid vertical={false} strokeDasharray="10 10" />

                {/* X-axis with labels for days of the week */}
                <XAxis dataKey="name" axisLine={false} tickLine={false} />

                {/* Y-axis with custom labels */}
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    ticks={[0, 25]} // Customize ticks for min and max
                    domain={[0, "dataMax + 5"]} // Set max to be slightly higher
                    tick={({ x, y, payload }) => (
                        <text x={x} y={y} dy={-4} fill="#999" fontSize={14}>
                            {payload.value.toFixed(1)}
                        </text>
                    )}
                />

                {/* Tooltip */}
                <Tooltip
                    cursor={{ fill: "transparent" }}
                    formatter={(value: number) => `$${value.toFixed(2)}`}
                />

                {/* Bars with rounded corners */}
                <Bar
                    dataKey="value"
                    fill="#00C853"
                    radius={[10, 10, 10, 10]} // Rounded top corners
                    barSize={16}
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default BarCharts
