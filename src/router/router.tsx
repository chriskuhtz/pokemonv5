import { createBrowserRouter } from 'react-router-dom';
import { QuestRecord } from '../interfaces/Quest';
import { BagScreen } from '../screens/BagScreen/BagScreen';
import { BattleScreenWrapper } from '../screens/BattleScreen/components/BattleScreenWrapper/BattleScreenWrapper';
import { LoginScreen } from '../screens/LoginScreen/LoginScreen';
import { MarketScreen } from '../screens/MarketScreen/MarketScreen';
import { NewGameProcess } from '../screens/NewGameProcessScreen/NewGameProcess';
import { Overworld } from '../screens/OverworldScreen/Overworld';
import { PlayerCardScreen } from '../screens/PlayerCardScreen/PlayerCardScreen';
import { PlayerMenu } from '../screens/PlayerMenuScreen/PlayerMenuScreen';
import { PokedexScreen } from '../screens/PokedexScreen/PokedexScreen';
import { PokemonSelectionScreen } from '../screens/PokemonSelection/PokemonSelectionScreen';
import { QuestsScreen } from '../screens/QuestsScreen/QuestsScreen';
import { StorageScreen } from '../screens/StorageScreen/StorageScreen';
import { TeamScreen } from '../screens/TeamScreen/TeamScreen';
import { TestArea } from '../screens/TestArea/TestArea';

export enum RoutesEnum {
	overworld = '/overworld',
	menu = '/menu',
	battle = '/battle',
	newGame = '/newgame',
	playercard = '/playercard',
	team = '/team',
	storage = '/storage',
	pokedex = '/pokedex',
	bag = '/bag',
	quests = '/quests',
	market = '/market',
	starterSelection = '/starterSelection',
	test = '/test',
	newFulfilledQuest = '/newFulfilledQuest',
	login = '/login',
}

export const router = createBrowserRouter([
	{
		path: '/',
		element: <LoginScreen />,
	},
	{
		path: RoutesEnum.overworld,
		element: <Overworld />,
	},
	{
		path: RoutesEnum.battle,
		element: <BattleScreenWrapper />,
	},
	{
		path: RoutesEnum.menu,
		element: <PlayerMenu />,
	},
	{ path: RoutesEnum.playercard, element: <PlayerCardScreen /> },
	{ path: RoutesEnum.team, element: <TeamScreen /> },
	{ path: RoutesEnum.storage, element: <StorageScreen /> },
	{ path: RoutesEnum.pokedex, element: <PokedexScreen /> },
	{ path: RoutesEnum.bag, element: <BagScreen /> },
	{
		path: RoutesEnum.quests,
		element: (
			<QuestsScreen
				headlineProps={{
					text: 'Quests',
					routerButtonProps: { text: 'Menu', to: RoutesEnum.menu },
				}}
			/>
		),
	},
	{
		path: RoutesEnum.newFulfilledQuest,
		element: (
			<QuestsScreen
				headlineProps={{
					text: 'Claim your Quest Rewards',
				}}
				routeAwayAfterAllClaimed={{ to: RoutesEnum.overworld }}
			/>
		),
	},
	{ path: RoutesEnum.market, element: <MarketScreen /> },
	{
		path: RoutesEnum.newGame,
		element:
			import.meta.env.MODE === 'development' ? <NewGameProcess /> : <></>,
	},
	{
		path: RoutesEnum.starterSelection,
		element: (
			<PokemonSelectionScreen
				choices={[1, 4, 7]}
				headline={'Select your First Pokemon'}
				quest={QuestRecord.pickStarter}
			/>
		),
	},
	{ path: RoutesEnum.test, element: <TestArea /> },
]);
