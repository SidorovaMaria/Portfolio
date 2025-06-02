"use clent";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

import { BudgetSummary } from "./SpendingSummary";
import { toLocaleStringWithCommas } from "@/lib/helperFunctions";
type PieData = {
	label: string;
	value: number;
	color: string;
};
type DonutChartProps = {
	data: BudgetSummary[];
	totalSpend: number;
	totalBudget: number;
};

const DonutChart = ({ data, totalSpend, totalBudget }: DonutChartProps) => {
	const ref = useRef<SVGSVGElement | null>(null);
	const toolTipRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		const svg = d3.select(ref.current);
		svg.selectAll("*").remove();
		const width = 240;
		const height = 240;
		const radius = Math.min(width, height) / 2;
		const innerRadius = Math.min(width, height) / 3.5; //
		if (data.length === 0) {
			return; // No data to render
		}
		const pie = d3.pie<PieData>().value((d: PieData) => d.value);
		const tooltip = d3.select(toolTipRef.current);
		const arc = d3
			.arc<d3.PieArcDatum<PieData>>()
			.innerRadius(innerRadius) // 0 for full pie; >0 for donut
			.outerRadius(radius - 10);
		const g = svg
			.attr("width", width)
			.attr("height", height)
			.append("g")
			.attr("transform", `translate(${width / 2},${height / 2})`);

		const arcs = g
			.selectAll("arc")
			.data(
				pie(
					data.map((d) => ({
						label: d.budget.category.name,
						value: d.spent,
						color: d.budget.theme.value,
					}))
				)
			)
			.enter()
			.append("g");
		arcs.append("path")
			.attr("d", arc)
			.attr("fill", (d: d3.PieArcDatum<PieData>) => d.data.color)
			.on("mouseenter", function (event, d) {
				const [x, y] = d3.pointer(event);
				tooltip
					.style("display", "block")
					.style("left", `${x + width / 2 + 10}px`)
					.style("top", `${y + height / 2}px`).html(`
                    <div style="padding: 6px 12px; background: ${
						d.data.color
					}; color: white ; border-radius: 5px;
                    font-family: 'Public Sans', sans-serif; font-size: 16px; display: flex; flex-direction: column; gap: 2px;">
                    <strong>${d.data.label}</strong>
              <p style="font-weight:500" >${toLocaleStringWithCommas(d.data.value, "USD", 2)}</p>
                    </div>
                  `);
			})
			.on("mouseleave", () => {
				tooltip.style("display", "none");
			});

		g.append("circle")
			.attr("cx", 0)
			.attr("cy", 0)
			.attr("r", Math.min(width, height) / 2.8)
			.attr("fill", "rgba(255, 255, 255, 0.3)");
		g.append("text")
			.attr("text-anchor", "middle")
			.attr("dy", "0em")
			.style("font-size", "32px")
			.style("font-family", "Public Sans, sans-serif")
			.style("font-weight", "bold")
			.text(`${toLocaleStringWithCommas(totalSpend, "USD", 0)}`);
		g.append("text")
			.attr("text-anchor", "middle")
			.attr("dy", "1.8em")
			.style("font-size", "14px")
			.style("font-family", "Public Sans, sans-serif")
			.style("fill", "#696868")
			.text(` of ${toLocaleStringWithCommas(totalBudget, "USD", 0)} limit`);
	});
	return (
		<div className="relative">
			<svg ref={ref}></svg>
			<div
				ref={toolTipRef}
				style={{
					position: "absolute",
					display: "none",
					pointerEvents: "none",
					zIndex: 10,
				}}
			/>
		</div>
	);
};

export default DonutChart;
