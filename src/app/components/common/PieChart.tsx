import React, { useCallback, useState } from "react"
import { PieChart as RechartsPieChart, Pie, Sector, Cell, PieProps } from "recharts"

interface PieChartProps extends Omit<PieProps, "data" | "dataKey"> {
    data: { name: string; value: number }[]
    width?: number
    height?: number
    innerRadius?: number
    outerRadius?: number
}

// Helper function to calculate color shade based on value
const getGreenShade = (value: number) => {
    const baseColor = [36, 187, 97] // RGB for #24bb61
    const factor = (100 - value) / 216 // Calculate lighter or darker shade
    const adjustedColor = baseColor.map((c) => Math.round(c * (1 - factor))) // Adjust the shade
    return `rgb(${adjustedColor.join(",")})` // Return the shade in rgb format
}

// eslint-disable-next-line
const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180

    const sin = Math.sin(-RADIAN * midAngle)
    const cos = Math.cos(-RADIAN * midAngle)
    const mx = cx + (outerRadius + 30) * cos
    const my = cy + (outerRadius + 3) * sin
    const ex = mx + (cos >= 0 ? 1 : -1)
    const ey = my
    const textAnchor = cos >= 0 ? "start" : "end"

    return (
        <g>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${(
                percent * 100
            ).toFixed(1)}`}</text>
            {/* <text x={ex + cos * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`${payload.name}`}
            </text> */}
        </g>
    )
}

// eslint-disable-next-line
const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props as {
        cx: number
        cy: number
        innerRadius: number
        outerRadius: number
        startAngle: number
        endAngle: number
        fill: string
        payload: { name: string }
    }
    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
        </g>
    )
}
const PieChart: React.FC<PieChartProps> = ({
    data,
    width = 300,
    height = 300,
    innerRadius,
    outerRadius,
}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const onPieEnter = useCallback(
        // eslint-disable-next-line
        (_: any, index: number) => {
            setActiveIndex(index)
        },
        [setActiveIndex],
    )

    return (
        <RechartsPieChart width={width} height={height} style={{ width: "100%", height: "auto" }}>
            <Pie
                activeIndex={activeIndex} // eslint-disable-next-line
                activeShape={renderActiveShape}
                data={data}
                cx={width / 2}
                cy={height / 2}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                dataKey="value"
                onMouseEnter={onPieEnter}
                label={renderCustomizedLabel}
                labelLine={false}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getGreenShade(entry.value)} />
                ))}
            </Pie>
        </RechartsPieChart>
    )
}

export default PieChart
