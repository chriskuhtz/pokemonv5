import { useNavigate, useLocation } from 'react-router-dom';
import { Headline } from '../../components/Headline/Headline';
import { useGetCurrentSaveFile } from '../../hooks/xata/useCurrentSaveFile';
import { Pill } from '../../ui_components/Pill/Pill';

export const SellOrBuyScreen = ({}: {}): JSX.Element => {
	const navigate = useNavigate();
	const saveFile = useGetCurrentSaveFile();

	const { state } = useLocation();

	if (saveFile) {
		return (
			<div className="container">
				<Headline text="What do you want to do?" />
				<Pill
					onClick={() =>
						navigate('/market', { state: { inventory: state, mode: 'BUY' } })
					}
					center="Buy"
				/>
				<Pill
					onClick={() =>
						navigate('/sell', {
							state: {
								inventory: Object.fromEntries(
									Object.entries(saveFile.inventory).filter(
										([key, value]) => value > 0
									)
								),
								mode: 'SELL',
							},
						})
					}
					center="Sell"
				/>
			</div>
		);
	}
	return <></>;
};
