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
					headline={'Changelog'}
					content={
						<>
							<div style={{ display: 'flex' }}>
								<div>
									<h3>V0.0.4</h3>
									<ul>
										<li>fixed all reported bugs</li>
										<li>more items</li>
										<li>more abilities</li>
										<li>more moves</li>
										<li>held items</li>
										<li>friendship</li>
										<li>power points</li>
										<li>Shiny Pokemon</li>
										<li>battle ui improvements</li>
										<li>new Route: Flaming Desert</li>
										<li>
											2 new Quests:
											(berry-patch-catch-quest,flaming-desert-catch-quest)
										</li>
									</ul>
								</div>
							</div>{' '}
							<div style={{ display: 'flex' }}>
								<div>
									<h3>V0.0.5</h3>
									<ul>
										<li>fixed all reported bugs</li>
										<li>more items</li>
										<li>more abilities</li>
										<li>more moves</li>
										<li>held items</li>
										<li>time based pokemon encounters</li>
										<li>rearrange team by dragging</li>
										<li>basic attack animation</li>
										<li>randomised starters (optional)</li>
										<li>better ailment tags</li>
										<li>pokemon cries in battle</li>
										<li>new Route: Pokemon Center</li>
										<li>
											2 new Quests:
											(catch-nocturnal-pokemon,reach-level-fifteen)
										</li>
									</ul>
								</div>
							</div>
						</>
					}
				/>
			}
		/>
	);
};
