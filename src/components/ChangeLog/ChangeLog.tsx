import { useState } from 'react';
import { Collapse } from '../../ui_components/Collapse/Collapse';
import { Pill } from '../../ui_components/Pill/Pill';

export const Changelog = () => {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<Pill
			center={
				<Collapse
					open={open}
					setOpen={setOpen}
					headline={'Changelog (V.0.0.3)'}
					content={
						<div style={{ display: 'flex' }}>
							<div>
								<h3>Working</h3>
								<ul>
									<li>Overworld</li>
									<li>Catching</li>
									<li>Quests</li>
									<li>Storage</li>
									<li>Market</li>
									<li>Standard Battle Moves</li>
									<li>Running away</li>
									<li>Items (currently infinite)</li>
								</ul>
							</div>
							<div>
								<h3>In Progress:</h3>
								<ul>
									<li>Evolving</li>
									<li>Learning new Moves</li>
									<li>Specialty Moves</li>
									<li>remove Items after use</li>
									<li>Rearranging Team</li>
									<li>More Content, etc.</li>
								</ul>
							</div>
						</div>
					}
				/>
			}
		/>
	);
};
