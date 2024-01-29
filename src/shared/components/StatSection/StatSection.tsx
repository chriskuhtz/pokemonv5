import { useMemo } from 'react';
import {
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
} from 'recharts';
import { calculateStat } from '../../functions/calculateStat';
import { getBaseStatTotal } from '../../functions/getBaseStatTotal';
import { Nature } from '../../interfaces/Natures';
import { Stat, StatObject } from '../../interfaces/StatObject';
import './StatSection.css';

export type StatChartDataPoint = {
	statName: string;
	value: number;
};
export type StatChartData = StatChartDataPoint[];

export const StatSection = ({
	baseStats,
	ivs,
	evs,
	nature,
	level,
}: {
	baseStats: StatObject;
	ivs: StatObject;
	evs: StatObject;
	nature: Nature;
	level: number;
}): JSX.Element => {
	const bst = useMemo((): number | undefined => {
		if (baseStats) {
			return getBaseStatTotal(baseStats);
		}
	}, [baseStats]);

	const statChartData: StatChartData = useMemo(() => {
		return Object.entries(baseStats).map(([key, value]) => {
			return {
				statName: key,

				value: calculateStat(
					value,
					ivs[key],
					evs[key],
					nature,
					50,
					key as Stat,
					true
				),
			};
		});
	}, [baseStats, evs, ivs, nature]);

	const statListData: StatChartData = useMemo(() => {
		return Object.entries(baseStats).map(([key, value]) => {
			return {
				statName: key,

				value: calculateStat(
					value,
					ivs[key],
					evs[key],
					nature,
					level,
					key as Stat
				),
			};
		});
	}, [baseStats, evs, ivs, level, nature]);

	return (
		<div className="statSection">
			<RadarChart
				cx={200}
				cy={200}
				outerRadius={130}
				width={400}
				height={400}
				data={statChartData}
			>
				<PolarGrid />
				<PolarAngleAxis dataKey="statName" />
				<PolarRadiusAxis />
				<Radar
					dataKey="value"
					stroke="#8884d8"
					fill="#8884d8"
					fillOpacity={0.6}
				/>
			</RadarChart>
			<div>
				<h2>Stats:</h2>
				<div className="statsGrid">
					{bst && <h3>Total: {bst}</h3>}
					<h3>Nature: {nature}</h3>
					{statListData.map((s) => (
						<p key={s.statName}>
							<strong>{s.statName} :</strong> {s.value}
						</p>
					))}
				</div>
			</div>
		</div>
	);
};
