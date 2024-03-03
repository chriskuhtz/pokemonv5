import { BattleSprite } from '../../components/BattleSprite/BattleSprite';
import { BattlePokemon } from '../../interfaces/BattlePokemon';

const testMon: BattlePokemon = {
	primaryType: 'fire',
	hp: 20,
	id: 'e9d98e8a-8f70-4743-9456-de8eab4c8026',
	xp: 437,
	name: 'charmander',
	side: 'PLAYER',
	dexId: 4,
	moves: [
		{
			accuracy: 85,
			contest_combos: {
				normal: {
					use_after: [
						{
							name: 'focus-energy',
							url: 'https://pokeapi.co/api/v2/move/116/',
						},
						{
							name: 'mind-reader',
							url: 'https://pokeapi.co/api/v2/move/170/',
						},
					],
					use_before: null,
				},
				super: {
					use_after: null,
					use_before: null,
				},
			},
			contest_effect: {
				url: 'https://pokeapi.co/api/v2/contest-effect/1/',
			},
			contest_type: {
				name: 'tough',
				url: 'https://pokeapi.co/api/v2/contest-type/5/',
			},
			damage_class: {
				name: 'physical',
				url: 'https://pokeapi.co/api/v2/move-damage-class/2/',
			},
			effect_chance: null,
			effect_changes: [],
			effect_entries: [
				{
					effect: 'Inflicts regular damage.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					short_effect: 'Inflicts regular damage with no additional effect.',
				},
			],
			flavor_text_entries: [
				{
					flavor_text: 'A powerful punch\nthrown very hard.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'gold-silver',
						url: 'https://pokeapi.co/api/v2/version-group/3/',
					},
				},
				{
					flavor_text: 'A powerful punch\nthrown very hard.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'crystal',
						url: 'https://pokeapi.co/api/v2/version-group/4/',
					},
				},
				{
					flavor_text: 'A strong punch thrown with\nincredible power.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'ruby-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/5/',
					},
				},
				{
					flavor_text: 'A strong punch thrown with\nincredible power.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'emerald',
						url: 'https://pokeapi.co/api/v2/version-group/6/',
					},
				},
				{
					flavor_text:
						'The foe is slugged\nby a punch thrown\nwith muscle-packed\npower.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'firered-leafgreen',
						url: 'https://pokeapi.co/api/v2/version-group/7/',
					},
				},
				{
					flavor_text:
						'The foe is slugged\nby a punch thrown\nwith muscle-packed\npower.\n',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'diamond-pearl',
						url: 'https://pokeapi.co/api/v2/version-group/8/',
					},
				},
				{
					flavor_text:
						'The foe is slugged\nby a punch thrown\nwith muscle-packed\npower.\n',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'platinum',
						url: 'https://pokeapi.co/api/v2/version-group/9/',
					},
				},
				{
					flavor_text:
						'The foe is slugged\nby a punch thrown\nwith muscle-packed\npower.\n',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'heartgold-soulsilver',
						url: 'https://pokeapi.co/api/v2/version-group/10/',
					},
				},
				{
					flavor_text:
						'L’ennemi reçoit un coup de poing\nd’une puissance incroyable.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'black-white',
						url: 'https://pokeapi.co/api/v2/version-group/11/',
					},
				},
				{
					flavor_text:
						'The target is slugged by a punch thrown\nwith muscle-packed power.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'black-white',
						url: 'https://pokeapi.co/api/v2/version-group/11/',
					},
				},
				{
					flavor_text:
						'The target is slugged by a punch thrown\nwith muscle-packed power.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'black-2-white-2',
						url: 'https://pokeapi.co/api/v2/version-group/14/',
					},
				},
				{
					flavor_text: 'ちからを　こめた　パンチで\nあいてを　こうげきする。\n',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text: '힘을 담은 펀치로\n상대를 공격한다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'L’ennemi reçoit un coup de poing d’une puissance\nincroyable.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text: 'Ein unglaublich kräftiger Hieb.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text: 'Un puñetazo de gran potencia.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text: 'Colpisce il bersaglio con un pugno poderoso.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'The target is slugged by a punch thrown\nwith muscle-packed power.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text: '力を　こめた　パンチで\n相手を　攻撃する。\n',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text: 'ちからを　こめた　パンチで\nあいてを　こうげきする。\n',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text: '힘을 담은 펀치로\n상대를 공격한다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'L’ennemi reçoit un coup de poing d’une puissance\nincroyable.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text: 'Ein unglaublich kräftiger Hieb.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text: 'Un puñetazo de gran potencia.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text: 'Colpisce il bersaglio con un pugno poderoso.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'The target is slugged by a punch thrown\nwith muscle-packed power.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text: '力を　こめた　パンチで\n相手を　攻撃する。\n',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text: 'ちからを　こめた　パンチで\nあいてを　こうげきする。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text: '힘을 담은 펀치로\n상대를 공격한다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text: '用帶有強大力量的拳頭\n攻擊對手。',
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'L’ennemi reçoit un coup de poing d’une puissance\nincroyable.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text: 'Ein unglaublich kräftiger Hieb.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text: 'Un puñetazo de gran potencia.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text: 'Colpisce il bersaglio con un pugno poderoso.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'The target is slugged by a punch thrown with\nmuscle-packed power.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text: '力を　こめた　パンチで\n相手を　攻撃する。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text: '用充满力量的拳头攻击对手。',
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text: 'ちからを　こめた　パンチで\nあいてを　こうげきする。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text: '힘을 담은 펀치로\n상대를 공격한다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text: '用帶有強大力量的拳頭\n攻擊對手。',
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'L’ennemi reçoit un coup de poing d’une puissance\nincroyable.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text: 'Ein unglaublich kräftiger Hieb.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text: 'Un puñetazo de gran potencia.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text: 'Colpisce il bersaglio con un pugno poderoso.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'The target is slugged by a punch thrown with\nmuscle-packed power.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text: '力を　こめた　パンチで\n相手を　攻撃する。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text: '用充满力量的拳头攻击对手。',
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text: 'ちからを　こめた　パンチで\nあいてを　こうげきする。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text: '힘을 담은 펀치로\n상대를 공격한다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text: '用帶有強大力量的拳頭\n攻擊對手。',
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'L’ennemi reçoit un coup de poing d’une puissance\nincroyable.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text: 'Ein unglaublich kräftiger Hieb.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text: 'Un puñetazo de gran potencia.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text: 'Colpisce il bersaglio con un pugno poderoso.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'The target is slugged by a punch thrown with\nmuscle-packed power.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text: '力を　こめた　パンチで\n相手を　攻撃する。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text: '用充满力量的拳头攻击对手。',
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text: 'ちからを　こめた　パンチで\nあいてを　こうげきする。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text: '힘을 담은 펀치로\n상대를 공격한다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text: '用帶有強大力量的拳頭\n攻擊對手。',
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'L’ennemi reçoit un coup de poing d’une puissance\nincroyable.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text: 'Ein unglaublich kräftiger Hieb.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text: 'Un puñetazo de gran potencia.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text: 'Colpisce il bersaglio con un pugno poderoso.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'The target is slugged by a punch thrown with\nmuscle-packed power.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text: '力を　こめた　パンチで\n相手を　攻撃する。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text: '用充满力量的拳头攻击对手。',
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
			],
			generation: {
				name: 'generation-i',
				url: 'https://pokeapi.co/api/v2/generation/1/',
			},
			id: 5,
			learned_by_pokemon: [
				{
					name: 'charmander',
					url: 'https://pokeapi.co/api/v2/pokemon/4/',
				},
				{
					name: 'charmeleon',
					url: 'https://pokeapi.co/api/v2/pokemon/5/',
				},
				{
					name: 'charizard',
					url: 'https://pokeapi.co/api/v2/pokemon/6/',
				},
				{
					name: 'squirtle',
					url: 'https://pokeapi.co/api/v2/pokemon/7/',
				},
				{
					name: 'wartortle',
					url: 'https://pokeapi.co/api/v2/pokemon/8/',
				},
				{
					name: 'blastoise',
					url: 'https://pokeapi.co/api/v2/pokemon/9/',
				},
				{
					name: 'pikachu',
					url: 'https://pokeapi.co/api/v2/pokemon/25/',
				},
				{
					name: 'raichu',
					url: 'https://pokeapi.co/api/v2/pokemon/26/',
				},
				{
					name: 'nidoqueen',
					url: 'https://pokeapi.co/api/v2/pokemon/31/',
				},
				{
					name: 'nidoking',
					url: 'https://pokeapi.co/api/v2/pokemon/34/',
				},
				{
					name: 'clefairy',
					url: 'https://pokeapi.co/api/v2/pokemon/35/',
				},
				{
					name: 'clefable',
					url: 'https://pokeapi.co/api/v2/pokemon/36/',
				},
				{
					name: 'jigglypuff',
					url: 'https://pokeapi.co/api/v2/pokemon/39/',
				},
				{
					name: 'wigglytuff',
					url: 'https://pokeapi.co/api/v2/pokemon/40/',
				},
				{
					name: 'psyduck',
					url: 'https://pokeapi.co/api/v2/pokemon/54/',
				},
				{
					name: 'golduck',
					url: 'https://pokeapi.co/api/v2/pokemon/55/',
				},
				{
					name: 'mankey',
					url: 'https://pokeapi.co/api/v2/pokemon/56/',
				},
				{
					name: 'primeape',
					url: 'https://pokeapi.co/api/v2/pokemon/57/',
				},
				{
					name: 'poliwhirl',
					url: 'https://pokeapi.co/api/v2/pokemon/61/',
				},
				{
					name: 'poliwrath',
					url: 'https://pokeapi.co/api/v2/pokemon/62/',
				},
				{
					name: 'abra',
					url: 'https://pokeapi.co/api/v2/pokemon/63/',
				},
				{
					name: 'kadabra',
					url: 'https://pokeapi.co/api/v2/pokemon/64/',
				},
				{
					name: 'alakazam',
					url: 'https://pokeapi.co/api/v2/pokemon/65/',
				},
				{
					name: 'machop',
					url: 'https://pokeapi.co/api/v2/pokemon/66/',
				},
				{
					name: 'machoke',
					url: 'https://pokeapi.co/api/v2/pokemon/67/',
				},
				{
					name: 'machamp',
					url: 'https://pokeapi.co/api/v2/pokemon/68/',
				},
				{
					name: 'geodude',
					url: 'https://pokeapi.co/api/v2/pokemon/74/',
				},
				{
					name: 'graveler',
					url: 'https://pokeapi.co/api/v2/pokemon/75/',
				},
				{
					name: 'golem',
					url: 'https://pokeapi.co/api/v2/pokemon/76/',
				},
				{
					name: 'slowbro',
					url: 'https://pokeapi.co/api/v2/pokemon/80/',
				},
				{
					name: 'gengar',
					url: 'https://pokeapi.co/api/v2/pokemon/94/',
				},
				{
					name: 'drowzee',
					url: 'https://pokeapi.co/api/v2/pokemon/96/',
				},
				{
					name: 'hypno',
					url: 'https://pokeapi.co/api/v2/pokemon/97/',
				},
				{
					name: 'cubone',
					url: 'https://pokeapi.co/api/v2/pokemon/104/',
				},
				{
					name: 'marowak',
					url: 'https://pokeapi.co/api/v2/pokemon/105/',
				},
				{
					name: 'hitmonlee',
					url: 'https://pokeapi.co/api/v2/pokemon/106/',
				},
				{
					name: 'hitmonchan',
					url: 'https://pokeapi.co/api/v2/pokemon/107/',
				},
				{
					name: 'lickitung',
					url: 'https://pokeapi.co/api/v2/pokemon/108/',
				},
				{
					name: 'rhydon',
					url: 'https://pokeapi.co/api/v2/pokemon/112/',
				},
				{
					name: 'chansey',
					url: 'https://pokeapi.co/api/v2/pokemon/113/',
				},
				{
					name: 'kangaskhan',
					url: 'https://pokeapi.co/api/v2/pokemon/115/',
				},
				{
					name: 'mr-mime',
					url: 'https://pokeapi.co/api/v2/pokemon/122/',
				},
				{
					name: 'jynx',
					url: 'https://pokeapi.co/api/v2/pokemon/124/',
				},
				{
					name: 'electabuzz',
					url: 'https://pokeapi.co/api/v2/pokemon/125/',
				},
				{
					name: 'magmar',
					url: 'https://pokeapi.co/api/v2/pokemon/126/',
				},
				{
					name: 'snorlax',
					url: 'https://pokeapi.co/api/v2/pokemon/143/',
				},
				{
					name: 'dragonite',
					url: 'https://pokeapi.co/api/v2/pokemon/149/',
				},
				{
					name: 'mewtwo',
					url: 'https://pokeapi.co/api/v2/pokemon/150/',
				},
				{
					name: 'mew',
					url: 'https://pokeapi.co/api/v2/pokemon/151/',
				},
				{
					name: 'typhlosion',
					url: 'https://pokeapi.co/api/v2/pokemon/157/',
				},
				{
					name: 'totodile',
					url: 'https://pokeapi.co/api/v2/pokemon/158/',
				},
				{
					name: 'croconaw',
					url: 'https://pokeapi.co/api/v2/pokemon/159/',
				},
				{
					name: 'feraligatr',
					url: 'https://pokeapi.co/api/v2/pokemon/160/',
				},
				{
					name: 'ledyba',
					url: 'https://pokeapi.co/api/v2/pokemon/165/',
				},
				{
					name: 'ledian',
					url: 'https://pokeapi.co/api/v2/pokemon/166/',
				},
				{
					name: 'pichu',
					url: 'https://pokeapi.co/api/v2/pokemon/172/',
				},
				{
					name: 'cleffa',
					url: 'https://pokeapi.co/api/v2/pokemon/173/',
				},
				{
					name: 'igglybuff',
					url: 'https://pokeapi.co/api/v2/pokemon/174/',
				},
				{
					name: 'togepi',
					url: 'https://pokeapi.co/api/v2/pokemon/175/',
				},
				{
					name: 'togetic',
					url: 'https://pokeapi.co/api/v2/pokemon/176/',
				},
				{
					name: 'flaaffy',
					url: 'https://pokeapi.co/api/v2/pokemon/180/',
				},
				{
					name: 'ampharos',
					url: 'https://pokeapi.co/api/v2/pokemon/181/',
				},
				{
					name: 'marill',
					url: 'https://pokeapi.co/api/v2/pokemon/183/',
				},
				{
					name: 'azumarill',
					url: 'https://pokeapi.co/api/v2/pokemon/184/',
				},
				{
					name: 'sudowoodo',
					url: 'https://pokeapi.co/api/v2/pokemon/185/',
				},
				{
					name: 'politoed',
					url: 'https://pokeapi.co/api/v2/pokemon/186/',
				},
				{
					name: 'aipom',
					url: 'https://pokeapi.co/api/v2/pokemon/190/',
				},
				{
					name: 'quagsire',
					url: 'https://pokeapi.co/api/v2/pokemon/195/',
				},
				{
					name: 'slowking',
					url: 'https://pokeapi.co/api/v2/pokemon/199/',
				},
				{
					name: 'snubbull',
					url: 'https://pokeapi.co/api/v2/pokemon/209/',
				},
				{
					name: 'granbull',
					url: 'https://pokeapi.co/api/v2/pokemon/210/',
				},
				{
					name: 'sneasel',
					url: 'https://pokeapi.co/api/v2/pokemon/215/',
				},
				{
					name: 'teddiursa',
					url: 'https://pokeapi.co/api/v2/pokemon/216/',
				},
				{
					name: 'ursaring',
					url: 'https://pokeapi.co/api/v2/pokemon/217/',
				},
				{
					name: 'delibird',
					url: 'https://pokeapi.co/api/v2/pokemon/225/',
				},
				{
					name: 'tyrogue',
					url: 'https://pokeapi.co/api/v2/pokemon/236/',
				},
				{
					name: 'hitmontop',
					url: 'https://pokeapi.co/api/v2/pokemon/237/',
				},
				{
					name: 'smoochum',
					url: 'https://pokeapi.co/api/v2/pokemon/238/',
				},
				{
					name: 'elekid',
					url: 'https://pokeapi.co/api/v2/pokemon/239/',
				},
				{
					name: 'magby',
					url: 'https://pokeapi.co/api/v2/pokemon/240/',
				},
				{
					name: 'miltank',
					url: 'https://pokeapi.co/api/v2/pokemon/241/',
				},
				{
					name: 'blissey',
					url: 'https://pokeapi.co/api/v2/pokemon/242/',
				},
				{
					name: 'tyranitar',
					url: 'https://pokeapi.co/api/v2/pokemon/248/',
				},
				{
					name: 'treecko',
					url: 'https://pokeapi.co/api/v2/pokemon/252/',
				},
				{
					name: 'grovyle',
					url: 'https://pokeapi.co/api/v2/pokemon/253/',
				},
				{
					name: 'sceptile',
					url: 'https://pokeapi.co/api/v2/pokemon/254/',
				},
				{
					name: 'torchic',
					url: 'https://pokeapi.co/api/v2/pokemon/255/',
				},
				{
					name: 'combusken',
					url: 'https://pokeapi.co/api/v2/pokemon/256/',
				},
				{
					name: 'blaziken',
					url: 'https://pokeapi.co/api/v2/pokemon/257/',
				},
				{
					name: 'marshtomp',
					url: 'https://pokeapi.co/api/v2/pokemon/259/',
				},
				{
					name: 'swampert',
					url: 'https://pokeapi.co/api/v2/pokemon/260/',
				},
				{
					name: 'lombre',
					url: 'https://pokeapi.co/api/v2/pokemon/271/',
				},
				{
					name: 'ludicolo',
					url: 'https://pokeapi.co/api/v2/pokemon/272/',
				},
				{
					name: 'ralts',
					url: 'https://pokeapi.co/api/v2/pokemon/280/',
				},
				{
					name: 'kirlia',
					url: 'https://pokeapi.co/api/v2/pokemon/281/',
				},
				{
					name: 'gardevoir',
					url: 'https://pokeapi.co/api/v2/pokemon/282/',
				},
				{
					name: 'breloom',
					url: 'https://pokeapi.co/api/v2/pokemon/286/',
				},
				{
					name: 'slakoth',
					url: 'https://pokeapi.co/api/v2/pokemon/287/',
				},
				{
					name: 'vigoroth',
					url: 'https://pokeapi.co/api/v2/pokemon/288/',
				},
				{
					name: 'slaking',
					url: 'https://pokeapi.co/api/v2/pokemon/289/',
				},
				{
					name: 'whismur',
					url: 'https://pokeapi.co/api/v2/pokemon/293/',
				},
				{
					name: 'loudred',
					url: 'https://pokeapi.co/api/v2/pokemon/294/',
				},
				{
					name: 'exploud',
					url: 'https://pokeapi.co/api/v2/pokemon/295/',
				},
				{
					name: 'makuhita',
					url: 'https://pokeapi.co/api/v2/pokemon/296/',
				},
				{
					name: 'hariyama',
					url: 'https://pokeapi.co/api/v2/pokemon/297/',
				},
				{
					name: 'sableye',
					url: 'https://pokeapi.co/api/v2/pokemon/302/',
				},
				{
					name: 'mawile',
					url: 'https://pokeapi.co/api/v2/pokemon/303/',
				},
				{
					name: 'aggron',
					url: 'https://pokeapi.co/api/v2/pokemon/306/',
				},
				{
					name: 'meditite',
					url: 'https://pokeapi.co/api/v2/pokemon/307/',
				},
				{
					name: 'medicham',
					url: 'https://pokeapi.co/api/v2/pokemon/308/',
				},
				{
					name: 'plusle',
					url: 'https://pokeapi.co/api/v2/pokemon/311/',
				},
				{
					name: 'minun',
					url: 'https://pokeapi.co/api/v2/pokemon/312/',
				},
				{
					name: 'volbeat',
					url: 'https://pokeapi.co/api/v2/pokemon/313/',
				},
				{
					name: 'illumise',
					url: 'https://pokeapi.co/api/v2/pokemon/314/',
				},
				{
					name: 'grumpig',
					url: 'https://pokeapi.co/api/v2/pokemon/326/',
				},
				{
					name: 'spinda',
					url: 'https://pokeapi.co/api/v2/pokemon/327/',
				},
				{
					name: 'flygon',
					url: 'https://pokeapi.co/api/v2/pokemon/330/',
				},
				{
					name: 'cacnea',
					url: 'https://pokeapi.co/api/v2/pokemon/331/',
				},
				{
					name: 'cacturne',
					url: 'https://pokeapi.co/api/v2/pokemon/332/',
				},
				{
					name: 'zangoose',
					url: 'https://pokeapi.co/api/v2/pokemon/335/',
				},
				{
					name: 'kecleon',
					url: 'https://pokeapi.co/api/v2/pokemon/352/',
				},
				{
					name: 'dusclops',
					url: 'https://pokeapi.co/api/v2/pokemon/356/',
				},
				{
					name: 'regirock',
					url: 'https://pokeapi.co/api/v2/pokemon/377/',
				},
				{
					name: 'regice',
					url: 'https://pokeapi.co/api/v2/pokemon/378/',
				},
				{
					name: 'registeel',
					url: 'https://pokeapi.co/api/v2/pokemon/379/',
				},
				{
					name: 'groudon',
					url: 'https://pokeapi.co/api/v2/pokemon/383/',
				},
				{
					name: 'jirachi',
					url: 'https://pokeapi.co/api/v2/pokemon/385/',
				},
				{
					name: 'buneary',
					url: 'https://pokeapi.co/api/v2/pokemon/427/',
				},
				{
					name: 'lopunny',
					url: 'https://pokeapi.co/api/v2/pokemon/428/',
				},
				{
					name: 'munchlax',
					url: 'https://pokeapi.co/api/v2/pokemon/446/',
				},
				{
					name: 'riolu',
					url: 'https://pokeapi.co/api/v2/pokemon/447/',
				},
				{
					name: 'lucario',
					url: 'https://pokeapi.co/api/v2/pokemon/448/',
				},
				{
					name: 'croagunk',
					url: 'https://pokeapi.co/api/v2/pokemon/453/',
				},
				{
					name: 'toxicroak',
					url: 'https://pokeapi.co/api/v2/pokemon/454/',
				},
				{
					name: 'snover',
					url: 'https://pokeapi.co/api/v2/pokemon/459/',
				},
				{
					name: 'abomasnow',
					url: 'https://pokeapi.co/api/v2/pokemon/460/',
				},
				{
					name: 'weavile',
					url: 'https://pokeapi.co/api/v2/pokemon/461/',
				},
				{
					name: 'lickilicky',
					url: 'https://pokeapi.co/api/v2/pokemon/463/',
				},
				{
					name: 'rhyperior',
					url: 'https://pokeapi.co/api/v2/pokemon/464/',
				},
				{
					name: 'electivire',
					url: 'https://pokeapi.co/api/v2/pokemon/466/',
				},
				{
					name: 'magmortar',
					url: 'https://pokeapi.co/api/v2/pokemon/467/',
				},
				{
					name: 'togekiss',
					url: 'https://pokeapi.co/api/v2/pokemon/468/',
				},
				{
					name: 'gallade',
					url: 'https://pokeapi.co/api/v2/pokemon/475/',
				},
				{
					name: 'dusknoir',
					url: 'https://pokeapi.co/api/v2/pokemon/477/',
				},
				{
					name: 'regigigas',
					url: 'https://pokeapi.co/api/v2/pokemon/486/',
				},
				{
					name: 'victini',
					url: 'https://pokeapi.co/api/v2/pokemon/494/',
				},
				{
					name: 'audino',
					url: 'https://pokeapi.co/api/v2/pokemon/531/',
				},
				{
					name: 'timburr',
					url: 'https://pokeapi.co/api/v2/pokemon/532/',
				},
				{
					name: 'gurdurr',
					url: 'https://pokeapi.co/api/v2/pokemon/533/',
				},
				{
					name: 'conkeldurr',
					url: 'https://pokeapi.co/api/v2/pokemon/534/',
				},
				{
					name: 'seismitoad',
					url: 'https://pokeapi.co/api/v2/pokemon/537/',
				},
				{
					name: 'throh',
					url: 'https://pokeapi.co/api/v2/pokemon/538/',
				},
				{
					name: 'sawk',
					url: 'https://pokeapi.co/api/v2/pokemon/539/',
				},
				{
					name: 'krokorok',
					url: 'https://pokeapi.co/api/v2/pokemon/552/',
				},
				{
					name: 'krookodile',
					url: 'https://pokeapi.co/api/v2/pokemon/553/',
				},
				{
					name: 'darumaka',
					url: 'https://pokeapi.co/api/v2/pokemon/554/',
				},
				{
					name: 'darmanitan-standard',
					url: 'https://pokeapi.co/api/v2/pokemon/555/',
				},
				{
					name: 'scraggy',
					url: 'https://pokeapi.co/api/v2/pokemon/559/',
				},
				{
					name: 'scrafty',
					url: 'https://pokeapi.co/api/v2/pokemon/560/',
				},
				{
					name: 'zoroark',
					url: 'https://pokeapi.co/api/v2/pokemon/571/',
				},
				{
					name: 'reuniclus',
					url: 'https://pokeapi.co/api/v2/pokemon/579/',
				},
				{
					name: 'cubchoo',
					url: 'https://pokeapi.co/api/v2/pokemon/613/',
				},
				{
					name: 'beartic',
					url: 'https://pokeapi.co/api/v2/pokemon/614/',
				},
				{
					name: 'mienfoo',
					url: 'https://pokeapi.co/api/v2/pokemon/619/',
				},
				{
					name: 'mienshao',
					url: 'https://pokeapi.co/api/v2/pokemon/620/',
				},
				{
					name: 'druddigon',
					url: 'https://pokeapi.co/api/v2/pokemon/621/',
				},
				{
					name: 'golett',
					url: 'https://pokeapi.co/api/v2/pokemon/622/',
				},
				{
					name: 'golurk',
					url: 'https://pokeapi.co/api/v2/pokemon/623/',
				},
				{
					name: 'diggersby',
					url: 'https://pokeapi.co/api/v2/pokemon/660/',
				},
				{
					name: 'pancham',
					url: 'https://pokeapi.co/api/v2/pokemon/674/',
				},
				{
					name: 'pangoro',
					url: 'https://pokeapi.co/api/v2/pokemon/675/',
				},
				{
					name: 'heliolisk',
					url: 'https://pokeapi.co/api/v2/pokemon/695/',
				},
				{
					name: 'hawlucha',
					url: 'https://pokeapi.co/api/v2/pokemon/701/',
				},
				{
					name: 'goodra',
					url: 'https://pokeapi.co/api/v2/pokemon/706/',
				},
				{
					name: 'incineroar',
					url: 'https://pokeapi.co/api/v2/pokemon/727/',
				},
				{
					name: 'stufful',
					url: 'https://pokeapi.co/api/v2/pokemon/759/',
				},
				{
					name: 'bewear',
					url: 'https://pokeapi.co/api/v2/pokemon/760/',
				},
				{
					name: 'oranguru',
					url: 'https://pokeapi.co/api/v2/pokemon/765/',
				},
				{
					name: 'passimian',
					url: 'https://pokeapi.co/api/v2/pokemon/766/',
				},
				{
					name: 'turtonator',
					url: 'https://pokeapi.co/api/v2/pokemon/776/',
				},
				{
					name: 'hakamo-o',
					url: 'https://pokeapi.co/api/v2/pokemon/783/',
				},
				{
					name: 'kommo-o',
					url: 'https://pokeapi.co/api/v2/pokemon/784/',
				},
				{
					name: 'tapu-bulu',
					url: 'https://pokeapi.co/api/v2/pokemon/787/',
				},
				{
					name: 'buzzwole',
					url: 'https://pokeapi.co/api/v2/pokemon/794/',
				},
				{
					name: 'guzzlord',
					url: 'https://pokeapi.co/api/v2/pokemon/799/',
				},
				{
					name: 'marshadow',
					url: 'https://pokeapi.co/api/v2/pokemon/802/',
				},
				{
					name: 'zeraora',
					url: 'https://pokeapi.co/api/v2/pokemon/807/',
				},
				{
					name: 'melmetal',
					url: 'https://pokeapi.co/api/v2/pokemon/809/',
				},
				{
					name: 'grookey',
					url: 'https://pokeapi.co/api/v2/pokemon/810/',
				},
				{
					name: 'thwackey',
					url: 'https://pokeapi.co/api/v2/pokemon/811/',
				},
				{
					name: 'rillaboom',
					url: 'https://pokeapi.co/api/v2/pokemon/812/',
				},
				{
					name: 'coalossal',
					url: 'https://pokeapi.co/api/v2/pokemon/839/',
				},
				{
					name: 'toxtricity-amped',
					url: 'https://pokeapi.co/api/v2/pokemon/849/',
				},
				{
					name: 'clobbopus',
					url: 'https://pokeapi.co/api/v2/pokemon/852/',
				},
				{
					name: 'grapploct',
					url: 'https://pokeapi.co/api/v2/pokemon/853/',
				},
				{
					name: 'impidimp',
					url: 'https://pokeapi.co/api/v2/pokemon/859/',
				},
				{
					name: 'morgrem',
					url: 'https://pokeapi.co/api/v2/pokemon/860/',
				},
				{
					name: 'grimmsnarl',
					url: 'https://pokeapi.co/api/v2/pokemon/861/',
				},
				{
					name: 'obstagoon',
					url: 'https://pokeapi.co/api/v2/pokemon/862/',
				},
				{
					name: 'mr-rime',
					url: 'https://pokeapi.co/api/v2/pokemon/866/',
				},
				{
					name: 'dracozolt',
					url: 'https://pokeapi.co/api/v2/pokemon/880/',
				},
				{
					name: 'arctozolt',
					url: 'https://pokeapi.co/api/v2/pokemon/881/',
				},
				{
					name: 'kubfu',
					url: 'https://pokeapi.co/api/v2/pokemon/891/',
				},
				{
					name: 'urshifu-single-strike',
					url: 'https://pokeapi.co/api/v2/pokemon/892/',
				},
				{
					name: 'zarude',
					url: 'https://pokeapi.co/api/v2/pokemon/893/',
				},
				{
					name: 'deoxys-attack',
					url: 'https://pokeapi.co/api/v2/pokemon/10001/',
				},
				{
					name: 'deoxys-defense',
					url: 'https://pokeapi.co/api/v2/pokemon/10002/',
				},
				{
					name: 'deoxys-speed',
					url: 'https://pokeapi.co/api/v2/pokemon/10003/',
				},
				{
					name: 'darmanitan-zen',
					url: 'https://pokeapi.co/api/v2/pokemon/10017/',
				},
				{
					name: 'kangaskhan-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10039/',
				},
				{
					name: 'pikachu-original-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10094/',
				},
				{
					name: 'pikachu-hoenn-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10095/',
				},
				{
					name: 'pikachu-sinnoh-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10096/',
				},
				{
					name: 'pikachu-unova-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10097/',
				},
				{
					name: 'pikachu-kalos-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10098/',
				},
				{
					name: 'pikachu-alola-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10099/',
				},
				{
					name: 'raichu-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10100/',
				},
				{
					name: 'golem-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10111/',
				},
				{
					name: 'marowak-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10115/',
				},
				{
					name: 'lycanroc-midnight',
					url: 'https://pokeapi.co/api/v2/pokemon/10126/',
				},
				{
					name: 'pikachu-partner-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10148/',
				},
				{
					name: 'pikachu-world-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10160/',
				},
				{
					name: 'slowbro-galar',
					url: 'https://pokeapi.co/api/v2/pokemon/10165/',
				},
				{
					name: 'mr-mime-galar',
					url: 'https://pokeapi.co/api/v2/pokemon/10168/',
				},
				{
					name: 'slowking-galar',
					url: 'https://pokeapi.co/api/v2/pokemon/10172/',
				},
				{
					name: 'darumaka-galar',
					url: 'https://pokeapi.co/api/v2/pokemon/10176/',
				},
				{
					name: 'darmanitan-galar-standard',
					url: 'https://pokeapi.co/api/v2/pokemon/10177/',
				},
				{
					name: 'darmanitan-galar-zen',
					url: 'https://pokeapi.co/api/v2/pokemon/10178/',
				},
				{
					name: 'toxtricity-low-key',
					url: 'https://pokeapi.co/api/v2/pokemon/10184/',
				},
				{
					name: 'urshifu-rapid-strike',
					url: 'https://pokeapi.co/api/v2/pokemon/10191/',
				},
				{
					name: 'zarude-dada',
					url: 'https://pokeapi.co/api/v2/pokemon/10192/',
				},
			],
			machines: [
				{
					machine: {
						url: 'https://pokeapi.co/api/v2/machine/1/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					machine: {
						url: 'https://pokeapi.co/api/v2/machine/2/',
					},
					version_group: {
						name: 'red-blue',
						url: 'https://pokeapi.co/api/v2/version-group/1/',
					},
				},
				{
					machine: {
						url: 'https://pokeapi.co/api/v2/machine/3/',
					},
					version_group: {
						name: 'yellow',
						url: 'https://pokeapi.co/api/v2/version-group/2/',
					},
				},
			],
			meta: {
				ailment: {
					name: 'none',
					url: 'https://pokeapi.co/api/v2/move-ailment/0/',
				},
				ailment_chance: 0,
				category: {
					name: 'damage',
					url: 'https://pokeapi.co/api/v2/move-category/0/',
				},
				crit_rate: 0,
				drain: 0,
				flinch_chance: 0,
				healing: 0,
				max_hits: null,
				max_turns: null,
				min_hits: null,
				min_turns: null,
				stat_chance: 0,
			},
			name: 'mega-punch',
			names: [
				{
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					name: 'メガトンパンチ',
				},
				{
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					name: '메가톤펀치',
				},
				{
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					name: '百萬噸重拳',
				},
				{
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					name: 'Ultimapoing',
				},
				{
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					name: 'Megahieb',
				},
				{
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					name: 'Megapuño',
				},
				{
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					name: 'Megapugno',
				},
				{
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					name: 'Mega Punch',
				},
				{
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					name: 'メガトンパンチ',
				},
				{
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					name: '百万吨重拳',
				},
			],
			past_values: [],
			power: 80,
			pp: 20,
			priority: 0,
			stat_changes: [],
			super_contest_effect: {
				url: 'https://pokeapi.co/api/v2/super-contest-effect/18/',
			},
			target: {
				name: 'selected-pokemon',
				url: 'https://pokeapi.co/api/v2/move-target/10/',
			},
			type: {
				name: 'normal',
				url: 'https://pokeapi.co/api/v2/type/1/',
			},
		},
		{
			accuracy: 100,
			contest_combos: {
				normal: {
					use_after: [
						{
							name: 'ice-punch',
							url: 'https://pokeapi.co/api/v2/move/8/',
						},
						{
							name: 'thunder-punch',
							url: 'https://pokeapi.co/api/v2/move/9/',
						},
						{
							name: 'sunny-day',
							url: 'https://pokeapi.co/api/v2/move/241/',
						},
					],
					use_before: [
						{
							name: 'ice-punch',
							url: 'https://pokeapi.co/api/v2/move/8/',
						},
						{
							name: 'thunder-punch',
							url: 'https://pokeapi.co/api/v2/move/9/',
						},
					],
				},
				super: {
					use_after: null,
					use_before: null,
				},
			},
			contest_effect: {
				url: 'https://pokeapi.co/api/v2/contest-effect/1/',
			},
			contest_type: {
				name: 'beauty',
				url: 'https://pokeapi.co/api/v2/contest-type/2/',
			},
			damage_class: {
				name: 'physical',
				url: 'https://pokeapi.co/api/v2/move-damage-class/2/',
			},
			effect_chance: 10,
			effect_changes: [],
			effect_entries: [
				{
					effect:
						'Inflicts regular damage.  Has a 10% chance to burn the target.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					short_effect: 'Has a 10% chance to burn the target.',
				},
			],
			flavor_text_entries: [
				{
					flavor_text: 'A fiery punch. May\ncause a burn.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'gold-silver',
						url: 'https://pokeapi.co/api/v2/version-group/3/',
					},
				},
				{
					flavor_text: 'A fiery punch. May\ncause a burn.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'crystal',
						url: 'https://pokeapi.co/api/v2/version-group/4/',
					},
				},
				{
					flavor_text: 'A fiery punch that may burn\nthe foe.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'ruby-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/5/',
					},
				},
				{
					flavor_text: 'A fiery punch that may burn\nthe foe.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'emerald',
						url: 'https://pokeapi.co/api/v2/version-group/6/',
					},
				},
				{
					flavor_text:
						'The foe is punched\nwith a fiery fist.\nIt may leave the\nfoe with a burn.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'firered-leafgreen',
						url: 'https://pokeapi.co/api/v2/version-group/7/',
					},
				},
				{
					flavor_text:
						'The foe is punched\nwith a fiery fist.\nIt may leave the\ntarget with a burn.\n',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'diamond-pearl',
						url: 'https://pokeapi.co/api/v2/version-group/8/',
					},
				},
				{
					flavor_text:
						'The foe is punched\nwith a fiery fist.\nIt may leave the\ntarget with a burn.\n',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'platinum',
						url: 'https://pokeapi.co/api/v2/version-group/9/',
					},
				},
				{
					flavor_text:
						'The foe is punched\nwith a fiery fist.\nIt may leave the\ntarget with a burn.\n',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'heartgold-soulsilver',
						url: 'https://pokeapi.co/api/v2/version-group/10/',
					},
				},
				{
					flavor_text:
						'Un coup de poing enflammé vient\nfrapper l’ennemi. Peut le brûler.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'black-white',
						url: 'https://pokeapi.co/api/v2/version-group/11/',
					},
				},
				{
					flavor_text:
						'The target is punched with a fiery fist.\nIt may also leave the target with a burn.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'black-white',
						url: 'https://pokeapi.co/api/v2/version-group/11/',
					},
				},
				{
					flavor_text:
						'The target is punched with a fiery fist.\nIt may also leave the target with a burn.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'black-2-white-2',
						url: 'https://pokeapi.co/api/v2/version-group/14/',
					},
				},
				{
					flavor_text:
						'ほのおを　こめた　パンチで\nあいてを　こうげきする。\nやけど　じょうたいに　することが　ある。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'불꽃을 담은 펀치로\n상대를 공격한다.\n화상 상태로 만들 때가 있다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'Un coup de poing enflammé vient frapper l’ennemi.\nPeut le brûler.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'Feuriger Schlag, der dem Ziel eventuell\nVerbrennungen zufügt.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text: 'Puñetazo ardiente. Puede quemar.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'Colpisce il bersaglio con un pugno ardente\nche può scottarlo.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'The target is punched with a fiery fist.\nThis may also leave the target with a burn.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'炎を　こめた　パンチで\n相手を　攻撃する。\nやけど状態に　することが　ある。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'ほのおを　こめた　パンチで\nあいてを　こうげきする。\nやけど　じょうたいに　することが　ある。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'불꽃을 담은 펀치로\n상대를 공격한다.\n화상 상태로 만들 때가 있다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'Un coup de poing enflammé vient frapper l’ennemi.\nPeut le brûler.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'Feuriger Schlag, der dem Ziel eventuell\nVerbrennungen zufügt.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text: 'Puñetazo ardiente. Puede quemar.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'Colpisce il bersaglio con un pugno ardente\nche può scottarlo.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'The target is punched with a fiery fist.\nThis may also leave the target with a burn.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'炎を　こめた　パンチで\n相手を　攻撃する。\nやけど状態に　することが　ある。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'ほのおを　こめた　パンチで\nあいてを　こうげきする。\nやけど　じょうたいに　することが　ある。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'불꽃을 담은 펀치로\n상대를 공격한다.\n화상 상태로 만들 때가 있다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'用帶有火焰的拳頭\n攻擊對手。\n有時會讓對手陷入灼傷狀態。',
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'Un coup de poing enflammé vient frapper l’ennemi.\nPeut le brûler.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'Feuriger Schlag, der dem Ziel eventuell\nVerbrennungen zufügt.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text: 'Puñetazo ardiente. Puede quemar.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'Colpisce il bersaglio con un pugno ardente\nche può scottarlo.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'The target is punched with a fiery fist. This may also\nleave the target with a burn.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'炎を　こめた　パンチで\n相手を　攻撃する。\nやけど状態に　することが　ある。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text: '用充满火焰的拳头攻击对手。\n有时会让对手陷入灼伤状态。',
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'ほのおを　こめた　パンチで\nあいてを　こうげきする。\nやけど　じょうたいに　することが　ある。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'불꽃을 담은 펀치로\n상대를 공격한다.\n화상 상태로 만들 때가 있다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'用帶有火焰的拳頭\n攻擊對手。\n有時會讓對手陷入灼傷狀態。',
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'Un coup de poing enflammé vient frapper l’ennemi.\nPeut le brûler.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'Feuriger Schlag, der dem Ziel eventuell\nVerbrennungen zufügt.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text: 'Puñetazo ardiente. Puede quemar.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'Colpisce il bersaglio con un pugno ardente\nche può scottarlo.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'The target is punched with a fiery fist. This may also\nleave the target with a burn.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'炎を　こめた　パンチで\n相手を　攻撃する。\nやけど状態に　することが　ある。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text: '用充满火焰的拳头攻击对手。\n有时会让对手陷入灼伤状态。',
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'ほのおを　こめた　パンチで\nあいてを　こうげきする。\nやけど　じょうたいに　することが　ある。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'불꽃을 담은 펀치로\n상대를 공격한다.\n화상 상태로 만들 때가 있다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'用帶有火焰的拳頭\n攻擊對手。\n有時會讓對手陷入灼傷狀態。',
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'Un coup de poing enflammé vient frapper l’ennemi.\nPeut le brûler.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'Feuriger Schlag, der dem Ziel eventuell\nVerbrennungen zufügt.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text: 'Puñetazo ardiente. Puede quemar.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'Colpisce il bersaglio con un pugno ardente\nche può scottarlo.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'The target is punched with a fiery fist. This may also\nleave the target with a burn.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'炎を　こめた　パンチで\n相手を　攻撃する。\nやけど状態に　することが　ある。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text: '用充满火焰的拳头攻击对手。\n有时会让对手陷入灼伤状态。',
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'ほのおを　こめた　パンチで\nあいてを　こうげきする。\nやけど　じょうたいに　することが　ある。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'불꽃을 담은 펀치로\n상대를 공격한다.\n화상 상태로 만들 때가 있다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'用帶有火焰的拳頭\n攻擊對手。\n有時會讓對手陷入灼傷狀態。',
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'Un coup de poing enflammé vient frapper l’ennemi.\nPeut le brûler.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'Ein feuriger Schlag, der dem Ziel eventuell\nVerbrennungen zufügt.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text: 'Puñetazo ardiente que puede causar quemaduras.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'Colpisce il bersaglio con un pugno ardente\nche può scottarlo.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'The target is punched with a fiery fist. This may also\nleave the target with a burn.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'炎を　こめた　パンチで\n相手を　攻撃する。\nやけど状態に　することが　ある。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text: '用充满火焰的拳头攻击对手。\n有时会让对手陷入灼伤状态。',
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
			],
			generation: {
				name: 'generation-i',
				url: 'https://pokeapi.co/api/v2/generation/1/',
			},
			id: 7,
			learned_by_pokemon: [
				{
					name: 'charmander',
					url: 'https://pokeapi.co/api/v2/pokemon/4/',
				},
				{
					name: 'charmeleon',
					url: 'https://pokeapi.co/api/v2/pokemon/5/',
				},
				{
					name: 'charizard',
					url: 'https://pokeapi.co/api/v2/pokemon/6/',
				},
				{
					name: 'nidoqueen',
					url: 'https://pokeapi.co/api/v2/pokemon/31/',
				},
				{
					name: 'nidoking',
					url: 'https://pokeapi.co/api/v2/pokemon/34/',
				},
				{
					name: 'clefairy',
					url: 'https://pokeapi.co/api/v2/pokemon/35/',
				},
				{
					name: 'clefable',
					url: 'https://pokeapi.co/api/v2/pokemon/36/',
				},
				{
					name: 'jigglypuff',
					url: 'https://pokeapi.co/api/v2/pokemon/39/',
				},
				{
					name: 'wigglytuff',
					url: 'https://pokeapi.co/api/v2/pokemon/40/',
				},
				{
					name: 'mankey',
					url: 'https://pokeapi.co/api/v2/pokemon/56/',
				},
				{
					name: 'primeape',
					url: 'https://pokeapi.co/api/v2/pokemon/57/',
				},
				{
					name: 'abra',
					url: 'https://pokeapi.co/api/v2/pokemon/63/',
				},
				{
					name: 'kadabra',
					url: 'https://pokeapi.co/api/v2/pokemon/64/',
				},
				{
					name: 'alakazam',
					url: 'https://pokeapi.co/api/v2/pokemon/65/',
				},
				{
					name: 'machop',
					url: 'https://pokeapi.co/api/v2/pokemon/66/',
				},
				{
					name: 'machoke',
					url: 'https://pokeapi.co/api/v2/pokemon/67/',
				},
				{
					name: 'machamp',
					url: 'https://pokeapi.co/api/v2/pokemon/68/',
				},
				{
					name: 'geodude',
					url: 'https://pokeapi.co/api/v2/pokemon/74/',
				},
				{
					name: 'graveler',
					url: 'https://pokeapi.co/api/v2/pokemon/75/',
				},
				{
					name: 'golem',
					url: 'https://pokeapi.co/api/v2/pokemon/76/',
				},
				{
					name: 'grimer',
					url: 'https://pokeapi.co/api/v2/pokemon/88/',
				},
				{
					name: 'muk',
					url: 'https://pokeapi.co/api/v2/pokemon/89/',
				},
				{
					name: 'gastly',
					url: 'https://pokeapi.co/api/v2/pokemon/92/',
				},
				{
					name: 'haunter',
					url: 'https://pokeapi.co/api/v2/pokemon/93/',
				},
				{
					name: 'gengar',
					url: 'https://pokeapi.co/api/v2/pokemon/94/',
				},
				{
					name: 'drowzee',
					url: 'https://pokeapi.co/api/v2/pokemon/96/',
				},
				{
					name: 'hypno',
					url: 'https://pokeapi.co/api/v2/pokemon/97/',
				},
				{
					name: 'cubone',
					url: 'https://pokeapi.co/api/v2/pokemon/104/',
				},
				{
					name: 'marowak',
					url: 'https://pokeapi.co/api/v2/pokemon/105/',
				},
				{
					name: 'hitmonchan',
					url: 'https://pokeapi.co/api/v2/pokemon/107/',
				},
				{
					name: 'lickitung',
					url: 'https://pokeapi.co/api/v2/pokemon/108/',
				},
				{
					name: 'rhydon',
					url: 'https://pokeapi.co/api/v2/pokemon/112/',
				},
				{
					name: 'chansey',
					url: 'https://pokeapi.co/api/v2/pokemon/113/',
				},
				{
					name: 'kangaskhan',
					url: 'https://pokeapi.co/api/v2/pokemon/115/',
				},
				{
					name: 'mr-mime',
					url: 'https://pokeapi.co/api/v2/pokemon/122/',
				},
				{
					name: 'electabuzz',
					url: 'https://pokeapi.co/api/v2/pokemon/125/',
				},
				{
					name: 'magmar',
					url: 'https://pokeapi.co/api/v2/pokemon/126/',
				},
				{
					name: 'snorlax',
					url: 'https://pokeapi.co/api/v2/pokemon/143/',
				},
				{
					name: 'dragonite',
					url: 'https://pokeapi.co/api/v2/pokemon/149/',
				},
				{
					name: 'mewtwo',
					url: 'https://pokeapi.co/api/v2/pokemon/150/',
				},
				{
					name: 'mew',
					url: 'https://pokeapi.co/api/v2/pokemon/151/',
				},
				{
					name: 'typhlosion',
					url: 'https://pokeapi.co/api/v2/pokemon/157/',
				},
				{
					name: 'sentret',
					url: 'https://pokeapi.co/api/v2/pokemon/161/',
				},
				{
					name: 'furret',
					url: 'https://pokeapi.co/api/v2/pokemon/162/',
				},
				{
					name: 'flaaffy',
					url: 'https://pokeapi.co/api/v2/pokemon/180/',
				},
				{
					name: 'ampharos',
					url: 'https://pokeapi.co/api/v2/pokemon/181/',
				},
				{
					name: 'sudowoodo',
					url: 'https://pokeapi.co/api/v2/pokemon/185/',
				},
				{
					name: 'aipom',
					url: 'https://pokeapi.co/api/v2/pokemon/190/',
				},
				{
					name: 'slowking',
					url: 'https://pokeapi.co/api/v2/pokemon/199/',
				},
				{
					name: 'snubbull',
					url: 'https://pokeapi.co/api/v2/pokemon/209/',
				},
				{
					name: 'granbull',
					url: 'https://pokeapi.co/api/v2/pokemon/210/',
				},
				{
					name: 'teddiursa',
					url: 'https://pokeapi.co/api/v2/pokemon/216/',
				},
				{
					name: 'ursaring',
					url: 'https://pokeapi.co/api/v2/pokemon/217/',
				},
				{
					name: 'elekid',
					url: 'https://pokeapi.co/api/v2/pokemon/239/',
				},
				{
					name: 'magby',
					url: 'https://pokeapi.co/api/v2/pokemon/240/',
				},
				{
					name: 'miltank',
					url: 'https://pokeapi.co/api/v2/pokemon/241/',
				},
				{
					name: 'blissey',
					url: 'https://pokeapi.co/api/v2/pokemon/242/',
				},
				{
					name: 'tyranitar',
					url: 'https://pokeapi.co/api/v2/pokemon/248/',
				},
				{
					name: 'combusken',
					url: 'https://pokeapi.co/api/v2/pokemon/256/',
				},
				{
					name: 'blaziken',
					url: 'https://pokeapi.co/api/v2/pokemon/257/',
				},
				{
					name: 'lombre',
					url: 'https://pokeapi.co/api/v2/pokemon/271/',
				},
				{
					name: 'ludicolo',
					url: 'https://pokeapi.co/api/v2/pokemon/272/',
				},
				{
					name: 'ralts',
					url: 'https://pokeapi.co/api/v2/pokemon/280/',
				},
				{
					name: 'kirlia',
					url: 'https://pokeapi.co/api/v2/pokemon/281/',
				},
				{
					name: 'gardevoir',
					url: 'https://pokeapi.co/api/v2/pokemon/282/',
				},
				{
					name: 'slakoth',
					url: 'https://pokeapi.co/api/v2/pokemon/287/',
				},
				{
					name: 'vigoroth',
					url: 'https://pokeapi.co/api/v2/pokemon/288/',
				},
				{
					name: 'slaking',
					url: 'https://pokeapi.co/api/v2/pokemon/289/',
				},
				{
					name: 'whismur',
					url: 'https://pokeapi.co/api/v2/pokemon/293/',
				},
				{
					name: 'loudred',
					url: 'https://pokeapi.co/api/v2/pokemon/294/',
				},
				{
					name: 'exploud',
					url: 'https://pokeapi.co/api/v2/pokemon/295/',
				},
				{
					name: 'makuhita',
					url: 'https://pokeapi.co/api/v2/pokemon/296/',
				},
				{
					name: 'hariyama',
					url: 'https://pokeapi.co/api/v2/pokemon/297/',
				},
				{
					name: 'nosepass',
					url: 'https://pokeapi.co/api/v2/pokemon/299/',
				},
				{
					name: 'sableye',
					url: 'https://pokeapi.co/api/v2/pokemon/302/',
				},
				{
					name: 'aggron',
					url: 'https://pokeapi.co/api/v2/pokemon/306/',
				},
				{
					name: 'meditite',
					url: 'https://pokeapi.co/api/v2/pokemon/307/',
				},
				{
					name: 'medicham',
					url: 'https://pokeapi.co/api/v2/pokemon/308/',
				},
				{
					name: 'gulpin',
					url: 'https://pokeapi.co/api/v2/pokemon/316/',
				},
				{
					name: 'swalot',
					url: 'https://pokeapi.co/api/v2/pokemon/317/',
				},
				{
					name: 'grumpig',
					url: 'https://pokeapi.co/api/v2/pokemon/326/',
				},
				{
					name: 'spinda',
					url: 'https://pokeapi.co/api/v2/pokemon/327/',
				},
				{
					name: 'flygon',
					url: 'https://pokeapi.co/api/v2/pokemon/330/',
				},
				{
					name: 'zangoose',
					url: 'https://pokeapi.co/api/v2/pokemon/335/',
				},
				{
					name: 'kecleon',
					url: 'https://pokeapi.co/api/v2/pokemon/352/',
				},
				{
					name: 'dusclops',
					url: 'https://pokeapi.co/api/v2/pokemon/356/',
				},
				{
					name: 'regirock',
					url: 'https://pokeapi.co/api/v2/pokemon/377/',
				},
				{
					name: 'groudon',
					url: 'https://pokeapi.co/api/v2/pokemon/383/',
				},
				{
					name: 'jirachi',
					url: 'https://pokeapi.co/api/v2/pokemon/385/',
				},
				{
					name: 'deoxys-normal',
					url: 'https://pokeapi.co/api/v2/pokemon/386/',
				},
				{
					name: 'chimchar',
					url: 'https://pokeapi.co/api/v2/pokemon/390/',
				},
				{
					name: 'monferno',
					url: 'https://pokeapi.co/api/v2/pokemon/391/',
				},
				{
					name: 'infernape',
					url: 'https://pokeapi.co/api/v2/pokemon/392/',
				},
				{
					name: 'cranidos',
					url: 'https://pokeapi.co/api/v2/pokemon/408/',
				},
				{
					name: 'rampardos',
					url: 'https://pokeapi.co/api/v2/pokemon/409/',
				},
				{
					name: 'ambipom',
					url: 'https://pokeapi.co/api/v2/pokemon/424/',
				},
				{
					name: 'buneary',
					url: 'https://pokeapi.co/api/v2/pokemon/427/',
				},
				{
					name: 'lopunny',
					url: 'https://pokeapi.co/api/v2/pokemon/428/',
				},
				{
					name: 'munchlax',
					url: 'https://pokeapi.co/api/v2/pokemon/446/',
				},
				{
					name: 'lickilicky',
					url: 'https://pokeapi.co/api/v2/pokemon/463/',
				},
				{
					name: 'rhyperior',
					url: 'https://pokeapi.co/api/v2/pokemon/464/',
				},
				{
					name: 'electivire',
					url: 'https://pokeapi.co/api/v2/pokemon/466/',
				},
				{
					name: 'magmortar',
					url: 'https://pokeapi.co/api/v2/pokemon/467/',
				},
				{
					name: 'gallade',
					url: 'https://pokeapi.co/api/v2/pokemon/475/',
				},
				{
					name: 'probopass',
					url: 'https://pokeapi.co/api/v2/pokemon/476/',
				},
				{
					name: 'dusknoir',
					url: 'https://pokeapi.co/api/v2/pokemon/477/',
				},
				{
					name: 'uxie',
					url: 'https://pokeapi.co/api/v2/pokemon/480/',
				},
				{
					name: 'mesprit',
					url: 'https://pokeapi.co/api/v2/pokemon/481/',
				},
				{
					name: 'azelf',
					url: 'https://pokeapi.co/api/v2/pokemon/482/',
				},
				{
					name: 'regigigas',
					url: 'https://pokeapi.co/api/v2/pokemon/486/',
				},
				{
					name: 'victini',
					url: 'https://pokeapi.co/api/v2/pokemon/494/',
				},
				{
					name: 'tepig',
					url: 'https://pokeapi.co/api/v2/pokemon/498/',
				},
				{
					name: 'pignite',
					url: 'https://pokeapi.co/api/v2/pokemon/499/',
				},
				{
					name: 'emboar',
					url: 'https://pokeapi.co/api/v2/pokemon/500/',
				},
				{
					name: 'watchog',
					url: 'https://pokeapi.co/api/v2/pokemon/505/',
				},
				{
					name: 'pansear',
					url: 'https://pokeapi.co/api/v2/pokemon/513/',
				},
				{
					name: 'simisear',
					url: 'https://pokeapi.co/api/v2/pokemon/514/',
				},
				{
					name: 'audino',
					url: 'https://pokeapi.co/api/v2/pokemon/531/',
				},
				{
					name: 'timburr',
					url: 'https://pokeapi.co/api/v2/pokemon/532/',
				},
				{
					name: 'gurdurr',
					url: 'https://pokeapi.co/api/v2/pokemon/533/',
				},
				{
					name: 'conkeldurr',
					url: 'https://pokeapi.co/api/v2/pokemon/534/',
				},
				{
					name: 'throh',
					url: 'https://pokeapi.co/api/v2/pokemon/538/',
				},
				{
					name: 'sawk',
					url: 'https://pokeapi.co/api/v2/pokemon/539/',
				},
				{
					name: 'darumaka',
					url: 'https://pokeapi.co/api/v2/pokemon/554/',
				},
				{
					name: 'darmanitan-standard',
					url: 'https://pokeapi.co/api/v2/pokemon/555/',
				},
				{
					name: 'scraggy',
					url: 'https://pokeapi.co/api/v2/pokemon/559/',
				},
				{
					name: 'scrafty',
					url: 'https://pokeapi.co/api/v2/pokemon/560/',
				},
				{
					name: 'reuniclus',
					url: 'https://pokeapi.co/api/v2/pokemon/579/',
				},
				{
					name: 'eelektross',
					url: 'https://pokeapi.co/api/v2/pokemon/604/',
				},
				{
					name: 'druddigon',
					url: 'https://pokeapi.co/api/v2/pokemon/621/',
				},
				{
					name: 'golett',
					url: 'https://pokeapi.co/api/v2/pokemon/622/',
				},
				{
					name: 'golurk',
					url: 'https://pokeapi.co/api/v2/pokemon/623/',
				},
				{
					name: 'heatmor',
					url: 'https://pokeapi.co/api/v2/pokemon/631/',
				},
				{
					name: 'meloetta-aria',
					url: 'https://pokeapi.co/api/v2/pokemon/648/',
				},
				{
					name: 'braixen',
					url: 'https://pokeapi.co/api/v2/pokemon/654/',
				},
				{
					name: 'delphox',
					url: 'https://pokeapi.co/api/v2/pokemon/655/',
				},
				{
					name: 'diggersby',
					url: 'https://pokeapi.co/api/v2/pokemon/660/',
				},
				{
					name: 'pancham',
					url: 'https://pokeapi.co/api/v2/pokemon/674/',
				},
				{
					name: 'pangoro',
					url: 'https://pokeapi.co/api/v2/pokemon/675/',
				},
				{
					name: 'heliolisk',
					url: 'https://pokeapi.co/api/v2/pokemon/695/',
				},
				{
					name: 'hawlucha',
					url: 'https://pokeapi.co/api/v2/pokemon/701/',
				},
				{
					name: 'goodra',
					url: 'https://pokeapi.co/api/v2/pokemon/706/',
				},
				{
					name: 'hoopa',
					url: 'https://pokeapi.co/api/v2/pokemon/720/',
				},
				{
					name: 'incineroar',
					url: 'https://pokeapi.co/api/v2/pokemon/727/',
				},
				{
					name: 'gumshoos',
					url: 'https://pokeapi.co/api/v2/pokemon/735/',
				},
				{
					name: 'kommo-o',
					url: 'https://pokeapi.co/api/v2/pokemon/784/',
				},
				{
					name: 'marshadow',
					url: 'https://pokeapi.co/api/v2/pokemon/802/',
				},
				{
					name: 'blacephalon',
					url: 'https://pokeapi.co/api/v2/pokemon/806/',
				},
				{
					name: 'zeraora',
					url: 'https://pokeapi.co/api/v2/pokemon/807/',
				},
				{
					name: 'cinderace',
					url: 'https://pokeapi.co/api/v2/pokemon/815/',
				},
				{
					name: 'coalossal',
					url: 'https://pokeapi.co/api/v2/pokemon/839/',
				},
				{
					name: 'toxtricity-amped',
					url: 'https://pokeapi.co/api/v2/pokemon/849/',
				},
				{
					name: 'grimmsnarl',
					url: 'https://pokeapi.co/api/v2/pokemon/861/',
				},
				{
					name: 'obstagoon',
					url: 'https://pokeapi.co/api/v2/pokemon/862/',
				},
				{
					name: 'kubfu',
					url: 'https://pokeapi.co/api/v2/pokemon/891/',
				},
				{
					name: 'urshifu-single-strike',
					url: 'https://pokeapi.co/api/v2/pokemon/892/',
				},
				{
					name: 'ursaluna',
					url: 'https://pokeapi.co/api/v2/pokemon/901/',
				},
				{
					name: 'sneasler',
					url: 'https://pokeapi.co/api/v2/pokemon/903/',
				},
				{
					name: 'pawmot',
					url: 'https://pokeapi.co/api/v2/pokemon/923/',
				},
				{
					name: 'garganacl',
					url: 'https://pokeapi.co/api/v2/pokemon/934/',
				},
				{
					name: 'annihilape',
					url: 'https://pokeapi.co/api/v2/pokemon/979/',
				},
				{
					name: 'scream-tail',
					url: 'https://pokeapi.co/api/v2/pokemon/985/',
				},
				{
					name: 'iron-hands',
					url: 'https://pokeapi.co/api/v2/pokemon/992/',
				},
				{
					name: 'iron-thorns',
					url: 'https://pokeapi.co/api/v2/pokemon/995/',
				},
				{
					name: 'iron-valiant',
					url: 'https://pokeapi.co/api/v2/pokemon/1006/',
				},
				{
					name: 'okidogi',
					url: 'https://pokeapi.co/api/v2/pokemon/1014/',
				},
				{
					name: 'deoxys-attack',
					url: 'https://pokeapi.co/api/v2/pokemon/10001/',
				},
				{
					name: 'deoxys-defense',
					url: 'https://pokeapi.co/api/v2/pokemon/10002/',
				},
				{
					name: 'deoxys-speed',
					url: 'https://pokeapi.co/api/v2/pokemon/10003/',
				},
				{
					name: 'darmanitan-zen',
					url: 'https://pokeapi.co/api/v2/pokemon/10017/',
				},
				{
					name: 'meloetta-pirouette',
					url: 'https://pokeapi.co/api/v2/pokemon/10018/',
				},
				{
					name: 'charizard-mega-x',
					url: 'https://pokeapi.co/api/v2/pokemon/10034/',
				},
				{
					name: 'charizard-mega-y',
					url: 'https://pokeapi.co/api/v2/pokemon/10035/',
				},
				{
					name: 'alakazam-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10037/',
				},
				{
					name: 'gengar-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10038/',
				},
				{
					name: 'kangaskhan-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10039/',
				},
				{
					name: 'mewtwo-mega-x',
					url: 'https://pokeapi.co/api/v2/pokemon/10043/',
				},
				{
					name: 'mewtwo-mega-y',
					url: 'https://pokeapi.co/api/v2/pokemon/10044/',
				},
				{
					name: 'ampharos-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10045/',
				},
				{
					name: 'tyranitar-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10049/',
				},
				{
					name: 'blaziken-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10050/',
				},
				{
					name: 'gardevoir-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10051/',
				},
				{
					name: 'aggron-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10053/',
				},
				{
					name: 'medicham-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10054/',
				},
				{
					name: 'sableye-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10066/',
				},
				{
					name: 'gallade-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10068/',
				},
				{
					name: 'audino-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10069/',
				},
				{
					name: 'groudon-primal',
					url: 'https://pokeapi.co/api/v2/pokemon/10078/',
				},
				{
					name: 'hoopa-unbound',
					url: 'https://pokeapi.co/api/v2/pokemon/10086/',
				},
				{
					name: 'lopunny-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10088/',
				},
				{
					name: 'geodude-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10109/',
				},
				{
					name: 'graveler-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10110/',
				},
				{
					name: 'golem-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10111/',
				},
				{
					name: 'grimer-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10112/',
				},
				{
					name: 'muk-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10113/',
				},
				{
					name: 'marowak-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10115/',
				},
				{
					name: 'gumshoos-totem',
					url: 'https://pokeapi.co/api/v2/pokemon/10121/',
				},
				{
					name: 'lycanroc-midnight',
					url: 'https://pokeapi.co/api/v2/pokemon/10126/',
				},
				{
					name: 'kommo-o-totem',
					url: 'https://pokeapi.co/api/v2/pokemon/10146/',
				},
				{
					name: 'marowak-totem',
					url: 'https://pokeapi.co/api/v2/pokemon/10149/',
				},
				{
					name: 'slowking-galar',
					url: 'https://pokeapi.co/api/v2/pokemon/10172/',
				},
				{
					name: 'darumaka-galar',
					url: 'https://pokeapi.co/api/v2/pokemon/10176/',
				},
				{
					name: 'darmanitan-galar-standard',
					url: 'https://pokeapi.co/api/v2/pokemon/10177/',
				},
				{
					name: 'darmanitan-galar-zen',
					url: 'https://pokeapi.co/api/v2/pokemon/10178/',
				},
				{
					name: 'toxtricity-low-key',
					url: 'https://pokeapi.co/api/v2/pokemon/10184/',
				},
				{
					name: 'urshifu-rapid-strike',
					url: 'https://pokeapi.co/api/v2/pokemon/10191/',
				},
				{
					name: 'typhlosion-hisui',
					url: 'https://pokeapi.co/api/v2/pokemon/10233/',
				},
				{
					name: 'goodra-hisui',
					url: 'https://pokeapi.co/api/v2/pokemon/10242/',
				},
				{
					name: 'ursaluna-bloodmoon',
					url: 'https://pokeapi.co/api/v2/pokemon/10272/',
				},
			],
			machines: [
				{
					machine: {
						url: 'https://pokeapi.co/api/v2/machine/61/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					machine: {
						url: 'https://pokeapi.co/api/v2/machine/620/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					machine: {
						url: 'https://pokeapi.co/api/v2/machine/944/',
					},
					version_group: {
						name: 'gold-silver',
						url: 'https://pokeapi.co/api/v2/version-group/3/',
					},
				},
				{
					machine: {
						url: 'https://pokeapi.co/api/v2/machine/945/',
					},
					version_group: {
						name: 'crystal',
						url: 'https://pokeapi.co/api/v2/version-group/4/',
					},
				},
			],
			meta: {
				ailment: {
					name: 'burn',
					url: 'https://pokeapi.co/api/v2/move-ailment/4/',
				},
				ailment_chance: 10,
				category: {
					name: 'damage+ailment',
					url: 'https://pokeapi.co/api/v2/move-category/4/',
				},
				crit_rate: 0,
				drain: 0,
				flinch_chance: 0,
				healing: 0,
				max_hits: null,
				max_turns: null,
				min_hits: null,
				min_turns: null,
				stat_chance: 0,
			},
			name: 'fire-punch',
			names: [
				{
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					name: 'ほのおのパンチ',
				},
				{
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					name: '불꽃펀치',
				},
				{
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					name: '火焰拳',
				},
				{
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					name: 'Poing Feu',
				},
				{
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					name: 'Feuerschlag',
				},
				{
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					name: 'Puño Fuego',
				},
				{
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					name: 'Fuocopugno',
				},
				{
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					name: 'Fire Punch',
				},
				{
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					name: 'ほのおのパンチ',
				},
				{
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					name: '火焰拳',
				},
			],
			past_values: [],
			power: 75,
			pp: 15,
			priority: 0,
			stat_changes: [],
			super_contest_effect: {
				url: 'https://pokeapi.co/api/v2/super-contest-effect/17/',
			},
			target: {
				name: 'selected-pokemon',
				url: 'https://pokeapi.co/api/v2/move-target/10/',
			},
			type: {
				name: 'fire',
				url: 'https://pokeapi.co/api/v2/type/10/',
			},
		},
		{
			accuracy: 100,
			contest_combos: {
				normal: {
					use_after: [
						{
							name: 'fire-punch',
							url: 'https://pokeapi.co/api/v2/move/7/',
						},
						{
							name: 'ice-punch',
							url: 'https://pokeapi.co/api/v2/move/8/',
						},
						{
							name: 'charge',
							url: 'https://pokeapi.co/api/v2/move/268/',
						},
					],
					use_before: [
						{
							name: 'fire-punch',
							url: 'https://pokeapi.co/api/v2/move/7/',
						},
						{
							name: 'ice-punch',
							url: 'https://pokeapi.co/api/v2/move/8/',
						},
					],
				},
				super: {
					use_after: null,
					use_before: null,
				},
			},
			contest_effect: {
				url: 'https://pokeapi.co/api/v2/contest-effect/1/',
			},
			contest_type: {
				name: 'cool',
				url: 'https://pokeapi.co/api/v2/contest-type/1/',
			},
			damage_class: {
				name: 'physical',
				url: 'https://pokeapi.co/api/v2/move-damage-class/2/',
			},
			effect_chance: 10,
			effect_changes: [],
			effect_entries: [
				{
					effect:
						'Inflicts regular damage.  Has a 10% chance to paralyze the target.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					short_effect: 'Has a 10% chance to paralyze the target.',
				},
			],
			flavor_text_entries: [
				{
					flavor_text: 'An electric punch.\nIt may paralyze.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'gold-silver',
						url: 'https://pokeapi.co/api/v2/version-group/3/',
					},
				},
				{
					flavor_text: 'An electric punch.\nIt may paralyze.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'crystal',
						url: 'https://pokeapi.co/api/v2/version-group/4/',
					},
				},
				{
					flavor_text: 'An electrified punch that\nmay paralyze the foe.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'ruby-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/5/',
					},
				},
				{
					flavor_text: 'An electrified punch that\nmay paralyze the foe.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'emerald',
						url: 'https://pokeapi.co/api/v2/version-group/6/',
					},
				},
				{
					flavor_text:
						'The foe is punched\nwith an electrified\nfist. It may leave\nthe foe paralyzed.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'firered-leafgreen',
						url: 'https://pokeapi.co/api/v2/version-group/7/',
					},
				},
				{
					flavor_text:
						'The foe is punched\nwith an electrified\nfist. It may leave\nthe target with\nparalysis.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'diamond-pearl',
						url: 'https://pokeapi.co/api/v2/version-group/8/',
					},
				},
				{
					flavor_text:
						'The foe is punched\nwith an electrified\nfist. It may leave\nthe target with\nparalysis.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'platinum',
						url: 'https://pokeapi.co/api/v2/version-group/9/',
					},
				},
				{
					flavor_text:
						'The foe is punched\nwith an electrified\nfist. It may leave\nthe target with\nparalysis.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'heartgold-soulsilver',
						url: 'https://pokeapi.co/api/v2/version-group/10/',
					},
				},
				{
					flavor_text:
						'Un coup de poing électrique vient\nfrapper l’ennemi. Peut le paralyser.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'black-white',
						url: 'https://pokeapi.co/api/v2/version-group/11/',
					},
				},
				{
					flavor_text:
						'The target is punched with an electrified\nfist. It may also leave the target\nwith paralysis.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'black-white',
						url: 'https://pokeapi.co/api/v2/version-group/11/',
					},
				},
				{
					flavor_text:
						'The target is punched with an electrified\nfist. It may also leave the target\nwith paralysis.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'black-2-white-2',
						url: 'https://pokeapi.co/api/v2/version-group/14/',
					},
				},
				{
					flavor_text:
						'でんげきを　こめた　パンチで\nあいてを　こうげきする。\nまひ　じょうたいに　することが　ある。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'전격을 담은 펀치로\n상대를 공격한다.\n마비 상태로 만들 때가 있다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'Un coup de poing électrique vient frapper l’ennemi.\nPeut le paralyser.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'Ein elektrischer Schlag, der das Ziel eventuell\nparalysiert.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text: 'Puñetazo eléctrico. Puede paralizar.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'Colpisce il bersaglio con un pugno elettrico\nche può paralizzarlo.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'The target is punched with an electrified\nfist. This may also leave the target\nwith paralysis.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'電撃を　こめた　パンチで\n相手を　攻撃する。\nまひ状態に　することが　ある。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'x-y',
						url: 'https://pokeapi.co/api/v2/version-group/15/',
					},
				},
				{
					flavor_text:
						'でんげきを　こめた　パンチで\nあいてを　こうげきする。\nまひ　じょうたいに　することが　ある。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'전격을 담은 펀치로\n상대를 공격한다.\n마비 상태로 만들 때가 있다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'Un coup de poing électrique vient frapper l’ennemi.\nPeut le paralyser.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'Ein elektrischer Schlag, der das Ziel eventuell\nparalysiert.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text: 'Puñetazo eléctrico. Puede paralizar.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'Colpisce il bersaglio con un pugno elettrico\nche può paralizzarlo.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'The target is punched with an electrified\nfist. This may also leave the target\nwith paralysis.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'電撃を　こめた　パンチで\n相手を　攻撃する。\nまひ状態に　することが　ある。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'omega-ruby-alpha-sapphire',
						url: 'https://pokeapi.co/api/v2/version-group/16/',
					},
				},
				{
					flavor_text:
						'でんげきを　こめた　パンチで\nあいてを　こうげきする。\nまひ　じょうたいに　することが　ある。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'전격을 담은 펀치로\n상대를 공격한다.\n마비 상태로 만들 때가 있다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'用帶有電流的拳頭\n攻擊對手。\n有時會讓對手陷入麻痺狀態。',
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'Un coup de poing électrique vient frapper l’ennemi.\nPeut le paralyser.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'Ein elektrischer Schlag, der das Ziel eventuell\nparalysiert.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text: 'Puñetazo eléctrico. Puede paralizar.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'Colpisce il bersaglio con un pugno elettrico\nche può paralizzarlo.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'The target is punched with an electrified fist.\nThis may also leave the target with paralysis.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'電撃を　こめた　パンチで\n相手を　攻撃する。\nまひ状態に　することが　ある。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text: '用充满电流的拳头攻击对手。\n有时会让对手陷入麻痹状态。',
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					version_group: {
						name: 'sun-moon',
						url: 'https://pokeapi.co/api/v2/version-group/17/',
					},
				},
				{
					flavor_text:
						'でんげきを　こめた　パンチで\nあいてを　こうげきする。\nまひ　じょうたいに　することが　ある。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'전격을 담은 펀치로\n상대를 공격한다.\n마비 상태로 만들 때가 있다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'用帶有電流的拳頭\n攻擊對手。\n有時會讓對手陷入麻痺狀態。',
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'Un coup de poing électrique vient frapper l’ennemi.\nPeut le paralyser.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'Ein elektrischer Schlag, der das Ziel eventuell\nparalysiert.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text: 'Puñetazo eléctrico. Puede paralizar.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'Colpisce il bersaglio con un pugno elettrico\nche può paralizzarlo.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'The target is punched with an electrified fist.\nThis may also leave the target with paralysis.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'電撃を　こめた　パンチで\n相手を　攻撃する。\nまひ状態に　することが　ある。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text: '用充满电流的拳头攻击对手。\n有时会让对手陷入麻痹状态。',
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					version_group: {
						name: 'ultra-sun-ultra-moon',
						url: 'https://pokeapi.co/api/v2/version-group/18/',
					},
				},
				{
					flavor_text:
						'でんげきを　こめた　パンチで\nあいてを　こうげきする。\nまひ　じょうたいに　することが　ある。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'전격을 담은 펀치로\n상대를 공격한다.\n마비 상태로 만들 때가 있다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'用帶有電流的拳頭\n攻擊對手。\n有時會讓對手陷入麻痺狀態。',
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'Un coup de poing électrique vient frapper l’ennemi.\nPeut le paralyser.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'Ein elektrischer Schlag, der das Ziel eventuell\nparalysiert.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text: 'Puñetazo eléctrico. Puede paralizar.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'Colpisce il bersaglio con un pugno elettrico\nche può paralizzarlo.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'The target is punched with an electrified fist.\nThis may also leave the target with paralysis.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'電撃を　こめた　パンチで\n相手を　攻撃する。\nまひ状態に　することが　ある。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text: '用充满电流的拳头攻击对手。\n有时会让对手陷入麻痹状态。',
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					version_group: {
						name: 'lets-go-pikachu-lets-go-eevee',
						url: 'https://pokeapi.co/api/v2/version-group/19/',
					},
				},
				{
					flavor_text:
						'でんげきを　こめた　パンチで\nあいてを　こうげきする。\nまひ　じょうたいに　することが　ある。',
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'전격을 담은 펀치로\n상대를 공격한다.\n마비 상태로 만들 때가 있다.',
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'用帶有電流的拳頭\n攻擊對手。\n有時會讓對手陷入麻痺狀態。',
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'Un coup de poing électrique vient frapper l’ennemi.\nPeut le paralyser.',
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'Ein elektrischer Schlag, der das Ziel eventuell\nparalysiert.',
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text: 'Puñetazo eléctrico que puede paralizar al adversario.',
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'Colpisce il bersaglio con un pugno elettrico\nche può paralizzarlo.',
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'The target is punched with an electrified fist.\nThis may also leave the target with paralysis.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text:
						'電撃を　こめた　パンチで\n相手を　攻撃する。\nまひ状態に　することが　ある。',
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
				{
					flavor_text: '用充满电流的拳头攻击对手。\n有时会让对手陷入麻痹状态。',
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					version_group: {
						name: 'sword-shield',
						url: 'https://pokeapi.co/api/v2/version-group/20/',
					},
				},
			],
			generation: {
				name: 'generation-i',
				url: 'https://pokeapi.co/api/v2/generation/1/',
			},
			id: 9,
			learned_by_pokemon: [
				{
					name: 'charmander',
					url: 'https://pokeapi.co/api/v2/pokemon/4/',
				},
				{
					name: 'charmeleon',
					url: 'https://pokeapi.co/api/v2/pokemon/5/',
				},
				{
					name: 'charizard',
					url: 'https://pokeapi.co/api/v2/pokemon/6/',
				},
				{
					name: 'pikachu',
					url: 'https://pokeapi.co/api/v2/pokemon/25/',
				},
				{
					name: 'raichu',
					url: 'https://pokeapi.co/api/v2/pokemon/26/',
				},
				{
					name: 'nidoqueen',
					url: 'https://pokeapi.co/api/v2/pokemon/31/',
				},
				{
					name: 'nidoking',
					url: 'https://pokeapi.co/api/v2/pokemon/34/',
				},
				{
					name: 'clefairy',
					url: 'https://pokeapi.co/api/v2/pokemon/35/',
				},
				{
					name: 'clefable',
					url: 'https://pokeapi.co/api/v2/pokemon/36/',
				},
				{
					name: 'jigglypuff',
					url: 'https://pokeapi.co/api/v2/pokemon/39/',
				},
				{
					name: 'wigglytuff',
					url: 'https://pokeapi.co/api/v2/pokemon/40/',
				},
				{
					name: 'mankey',
					url: 'https://pokeapi.co/api/v2/pokemon/56/',
				},
				{
					name: 'primeape',
					url: 'https://pokeapi.co/api/v2/pokemon/57/',
				},
				{
					name: 'abra',
					url: 'https://pokeapi.co/api/v2/pokemon/63/',
				},
				{
					name: 'kadabra',
					url: 'https://pokeapi.co/api/v2/pokemon/64/',
				},
				{
					name: 'alakazam',
					url: 'https://pokeapi.co/api/v2/pokemon/65/',
				},
				{
					name: 'machop',
					url: 'https://pokeapi.co/api/v2/pokemon/66/',
				},
				{
					name: 'machoke',
					url: 'https://pokeapi.co/api/v2/pokemon/67/',
				},
				{
					name: 'machamp',
					url: 'https://pokeapi.co/api/v2/pokemon/68/',
				},
				{
					name: 'geodude',
					url: 'https://pokeapi.co/api/v2/pokemon/74/',
				},
				{
					name: 'graveler',
					url: 'https://pokeapi.co/api/v2/pokemon/75/',
				},
				{
					name: 'golem',
					url: 'https://pokeapi.co/api/v2/pokemon/76/',
				},
				{
					name: 'grimer',
					url: 'https://pokeapi.co/api/v2/pokemon/88/',
				},
				{
					name: 'muk',
					url: 'https://pokeapi.co/api/v2/pokemon/89/',
				},
				{
					name: 'gastly',
					url: 'https://pokeapi.co/api/v2/pokemon/92/',
				},
				{
					name: 'haunter',
					url: 'https://pokeapi.co/api/v2/pokemon/93/',
				},
				{
					name: 'gengar',
					url: 'https://pokeapi.co/api/v2/pokemon/94/',
				},
				{
					name: 'drowzee',
					url: 'https://pokeapi.co/api/v2/pokemon/96/',
				},
				{
					name: 'hypno',
					url: 'https://pokeapi.co/api/v2/pokemon/97/',
				},
				{
					name: 'cubone',
					url: 'https://pokeapi.co/api/v2/pokemon/104/',
				},
				{
					name: 'marowak',
					url: 'https://pokeapi.co/api/v2/pokemon/105/',
				},
				{
					name: 'hitmonchan',
					url: 'https://pokeapi.co/api/v2/pokemon/107/',
				},
				{
					name: 'lickitung',
					url: 'https://pokeapi.co/api/v2/pokemon/108/',
				},
				{
					name: 'rhydon',
					url: 'https://pokeapi.co/api/v2/pokemon/112/',
				},
				{
					name: 'chansey',
					url: 'https://pokeapi.co/api/v2/pokemon/113/',
				},
				{
					name: 'kangaskhan',
					url: 'https://pokeapi.co/api/v2/pokemon/115/',
				},
				{
					name: 'mr-mime',
					url: 'https://pokeapi.co/api/v2/pokemon/122/',
				},
				{
					name: 'electabuzz',
					url: 'https://pokeapi.co/api/v2/pokemon/125/',
				},
				{
					name: 'magmar',
					url: 'https://pokeapi.co/api/v2/pokemon/126/',
				},
				{
					name: 'snorlax',
					url: 'https://pokeapi.co/api/v2/pokemon/143/',
				},
				{
					name: 'dragonite',
					url: 'https://pokeapi.co/api/v2/pokemon/149/',
				},
				{
					name: 'mewtwo',
					url: 'https://pokeapi.co/api/v2/pokemon/150/',
				},
				{
					name: 'mew',
					url: 'https://pokeapi.co/api/v2/pokemon/151/',
				},
				{
					name: 'typhlosion',
					url: 'https://pokeapi.co/api/v2/pokemon/157/',
				},
				{
					name: 'sentret',
					url: 'https://pokeapi.co/api/v2/pokemon/161/',
				},
				{
					name: 'furret',
					url: 'https://pokeapi.co/api/v2/pokemon/162/',
				},
				{
					name: 'ledyba',
					url: 'https://pokeapi.co/api/v2/pokemon/165/',
				},
				{
					name: 'ledian',
					url: 'https://pokeapi.co/api/v2/pokemon/166/',
				},
				{
					name: 'pichu',
					url: 'https://pokeapi.co/api/v2/pokemon/172/',
				},
				{
					name: 'flaaffy',
					url: 'https://pokeapi.co/api/v2/pokemon/180/',
				},
				{
					name: 'ampharos',
					url: 'https://pokeapi.co/api/v2/pokemon/181/',
				},
				{
					name: 'sudowoodo',
					url: 'https://pokeapi.co/api/v2/pokemon/185/',
				},
				{
					name: 'aipom',
					url: 'https://pokeapi.co/api/v2/pokemon/190/',
				},
				{
					name: 'slowking',
					url: 'https://pokeapi.co/api/v2/pokemon/199/',
				},
				{
					name: 'snubbull',
					url: 'https://pokeapi.co/api/v2/pokemon/209/',
				},
				{
					name: 'granbull',
					url: 'https://pokeapi.co/api/v2/pokemon/210/',
				},
				{
					name: 'teddiursa',
					url: 'https://pokeapi.co/api/v2/pokemon/216/',
				},
				{
					name: 'ursaring',
					url: 'https://pokeapi.co/api/v2/pokemon/217/',
				},
				{
					name: 'elekid',
					url: 'https://pokeapi.co/api/v2/pokemon/239/',
				},
				{
					name: 'magby',
					url: 'https://pokeapi.co/api/v2/pokemon/240/',
				},
				{
					name: 'miltank',
					url: 'https://pokeapi.co/api/v2/pokemon/241/',
				},
				{
					name: 'blissey',
					url: 'https://pokeapi.co/api/v2/pokemon/242/',
				},
				{
					name: 'tyranitar',
					url: 'https://pokeapi.co/api/v2/pokemon/248/',
				},
				{
					name: 'treecko',
					url: 'https://pokeapi.co/api/v2/pokemon/252/',
				},
				{
					name: 'grovyle',
					url: 'https://pokeapi.co/api/v2/pokemon/253/',
				},
				{
					name: 'sceptile',
					url: 'https://pokeapi.co/api/v2/pokemon/254/',
				},
				{
					name: 'combusken',
					url: 'https://pokeapi.co/api/v2/pokemon/256/',
				},
				{
					name: 'blaziken',
					url: 'https://pokeapi.co/api/v2/pokemon/257/',
				},
				{
					name: 'lombre',
					url: 'https://pokeapi.co/api/v2/pokemon/271/',
				},
				{
					name: 'ludicolo',
					url: 'https://pokeapi.co/api/v2/pokemon/272/',
				},
				{
					name: 'ralts',
					url: 'https://pokeapi.co/api/v2/pokemon/280/',
				},
				{
					name: 'kirlia',
					url: 'https://pokeapi.co/api/v2/pokemon/281/',
				},
				{
					name: 'gardevoir',
					url: 'https://pokeapi.co/api/v2/pokemon/282/',
				},
				{
					name: 'breloom',
					url: 'https://pokeapi.co/api/v2/pokemon/286/',
				},
				{
					name: 'slakoth',
					url: 'https://pokeapi.co/api/v2/pokemon/287/',
				},
				{
					name: 'vigoroth',
					url: 'https://pokeapi.co/api/v2/pokemon/288/',
				},
				{
					name: 'slaking',
					url: 'https://pokeapi.co/api/v2/pokemon/289/',
				},
				{
					name: 'whismur',
					url: 'https://pokeapi.co/api/v2/pokemon/293/',
				},
				{
					name: 'loudred',
					url: 'https://pokeapi.co/api/v2/pokemon/294/',
				},
				{
					name: 'exploud',
					url: 'https://pokeapi.co/api/v2/pokemon/295/',
				},
				{
					name: 'makuhita',
					url: 'https://pokeapi.co/api/v2/pokemon/296/',
				},
				{
					name: 'hariyama',
					url: 'https://pokeapi.co/api/v2/pokemon/297/',
				},
				{
					name: 'nosepass',
					url: 'https://pokeapi.co/api/v2/pokemon/299/',
				},
				{
					name: 'sableye',
					url: 'https://pokeapi.co/api/v2/pokemon/302/',
				},
				{
					name: 'mawile',
					url: 'https://pokeapi.co/api/v2/pokemon/303/',
				},
				{
					name: 'aggron',
					url: 'https://pokeapi.co/api/v2/pokemon/306/',
				},
				{
					name: 'meditite',
					url: 'https://pokeapi.co/api/v2/pokemon/307/',
				},
				{
					name: 'medicham',
					url: 'https://pokeapi.co/api/v2/pokemon/308/',
				},
				{
					name: 'plusle',
					url: 'https://pokeapi.co/api/v2/pokemon/311/',
				},
				{
					name: 'minun',
					url: 'https://pokeapi.co/api/v2/pokemon/312/',
				},
				{
					name: 'volbeat',
					url: 'https://pokeapi.co/api/v2/pokemon/313/',
				},
				{
					name: 'illumise',
					url: 'https://pokeapi.co/api/v2/pokemon/314/',
				},
				{
					name: 'gulpin',
					url: 'https://pokeapi.co/api/v2/pokemon/316/',
				},
				{
					name: 'swalot',
					url: 'https://pokeapi.co/api/v2/pokemon/317/',
				},
				{
					name: 'grumpig',
					url: 'https://pokeapi.co/api/v2/pokemon/326/',
				},
				{
					name: 'spinda',
					url: 'https://pokeapi.co/api/v2/pokemon/327/',
				},
				{
					name: 'flygon',
					url: 'https://pokeapi.co/api/v2/pokemon/330/',
				},
				{
					name: 'cacnea',
					url: 'https://pokeapi.co/api/v2/pokemon/331/',
				},
				{
					name: 'cacturne',
					url: 'https://pokeapi.co/api/v2/pokemon/332/',
				},
				{
					name: 'zangoose',
					url: 'https://pokeapi.co/api/v2/pokemon/335/',
				},
				{
					name: 'kecleon',
					url: 'https://pokeapi.co/api/v2/pokemon/352/',
				},
				{
					name: 'dusclops',
					url: 'https://pokeapi.co/api/v2/pokemon/356/',
				},
				{
					name: 'metang',
					url: 'https://pokeapi.co/api/v2/pokemon/375/',
				},
				{
					name: 'metagross',
					url: 'https://pokeapi.co/api/v2/pokemon/376/',
				},
				{
					name: 'regirock',
					url: 'https://pokeapi.co/api/v2/pokemon/377/',
				},
				{
					name: 'regice',
					url: 'https://pokeapi.co/api/v2/pokemon/378/',
				},
				{
					name: 'registeel',
					url: 'https://pokeapi.co/api/v2/pokemon/379/',
				},
				{
					name: 'groudon',
					url: 'https://pokeapi.co/api/v2/pokemon/383/',
				},
				{
					name: 'jirachi',
					url: 'https://pokeapi.co/api/v2/pokemon/385/',
				},
				{
					name: 'deoxys-normal',
					url: 'https://pokeapi.co/api/v2/pokemon/386/',
				},
				{
					name: 'chimchar',
					url: 'https://pokeapi.co/api/v2/pokemon/390/',
				},
				{
					name: 'monferno',
					url: 'https://pokeapi.co/api/v2/pokemon/391/',
				},
				{
					name: 'infernape',
					url: 'https://pokeapi.co/api/v2/pokemon/392/',
				},
				{
					name: 'cranidos',
					url: 'https://pokeapi.co/api/v2/pokemon/408/',
				},
				{
					name: 'rampardos',
					url: 'https://pokeapi.co/api/v2/pokemon/409/',
				},
				{
					name: 'pachirisu',
					url: 'https://pokeapi.co/api/v2/pokemon/417/',
				},
				{
					name: 'ambipom',
					url: 'https://pokeapi.co/api/v2/pokemon/424/',
				},
				{
					name: 'buneary',
					url: 'https://pokeapi.co/api/v2/pokemon/427/',
				},
				{
					name: 'lopunny',
					url: 'https://pokeapi.co/api/v2/pokemon/428/',
				},
				{
					name: 'munchlax',
					url: 'https://pokeapi.co/api/v2/pokemon/446/',
				},
				{
					name: 'riolu',
					url: 'https://pokeapi.co/api/v2/pokemon/447/',
				},
				{
					name: 'lucario',
					url: 'https://pokeapi.co/api/v2/pokemon/448/',
				},
				{
					name: 'croagunk',
					url: 'https://pokeapi.co/api/v2/pokemon/453/',
				},
				{
					name: 'toxicroak',
					url: 'https://pokeapi.co/api/v2/pokemon/454/',
				},
				{
					name: 'lickilicky',
					url: 'https://pokeapi.co/api/v2/pokemon/463/',
				},
				{
					name: 'rhyperior',
					url: 'https://pokeapi.co/api/v2/pokemon/464/',
				},
				{
					name: 'electivire',
					url: 'https://pokeapi.co/api/v2/pokemon/466/',
				},
				{
					name: 'magmortar',
					url: 'https://pokeapi.co/api/v2/pokemon/467/',
				},
				{
					name: 'gallade',
					url: 'https://pokeapi.co/api/v2/pokemon/475/',
				},
				{
					name: 'probopass',
					url: 'https://pokeapi.co/api/v2/pokemon/476/',
				},
				{
					name: 'dusknoir',
					url: 'https://pokeapi.co/api/v2/pokemon/477/',
				},
				{
					name: 'uxie',
					url: 'https://pokeapi.co/api/v2/pokemon/480/',
				},
				{
					name: 'mesprit',
					url: 'https://pokeapi.co/api/v2/pokemon/481/',
				},
				{
					name: 'azelf',
					url: 'https://pokeapi.co/api/v2/pokemon/482/',
				},
				{
					name: 'regigigas',
					url: 'https://pokeapi.co/api/v2/pokemon/486/',
				},
				{
					name: 'victini',
					url: 'https://pokeapi.co/api/v2/pokemon/494/',
				},
				{
					name: 'pignite',
					url: 'https://pokeapi.co/api/v2/pokemon/499/',
				},
				{
					name: 'emboar',
					url: 'https://pokeapi.co/api/v2/pokemon/500/',
				},
				{
					name: 'watchog',
					url: 'https://pokeapi.co/api/v2/pokemon/505/',
				},
				{
					name: 'audino',
					url: 'https://pokeapi.co/api/v2/pokemon/531/',
				},
				{
					name: 'timburr',
					url: 'https://pokeapi.co/api/v2/pokemon/532/',
				},
				{
					name: 'gurdurr',
					url: 'https://pokeapi.co/api/v2/pokemon/533/',
				},
				{
					name: 'conkeldurr',
					url: 'https://pokeapi.co/api/v2/pokemon/534/',
				},
				{
					name: 'throh',
					url: 'https://pokeapi.co/api/v2/pokemon/538/',
				},
				{
					name: 'sawk',
					url: 'https://pokeapi.co/api/v2/pokemon/539/',
				},
				{
					name: 'scraggy',
					url: 'https://pokeapi.co/api/v2/pokemon/559/',
				},
				{
					name: 'scrafty',
					url: 'https://pokeapi.co/api/v2/pokemon/560/',
				},
				{
					name: 'reuniclus',
					url: 'https://pokeapi.co/api/v2/pokemon/579/',
				},
				{
					name: 'eelektross',
					url: 'https://pokeapi.co/api/v2/pokemon/604/',
				},
				{
					name: 'druddigon',
					url: 'https://pokeapi.co/api/v2/pokemon/621/',
				},
				{
					name: 'golett',
					url: 'https://pokeapi.co/api/v2/pokemon/622/',
				},
				{
					name: 'golurk',
					url: 'https://pokeapi.co/api/v2/pokemon/623/',
				},
				{
					name: 'heatmor',
					url: 'https://pokeapi.co/api/v2/pokemon/631/',
				},
				{
					name: 'thundurus-incarnate',
					url: 'https://pokeapi.co/api/v2/pokemon/642/',
				},
				{
					name: 'zekrom',
					url: 'https://pokeapi.co/api/v2/pokemon/644/',
				},
				{
					name: 'meloetta-aria',
					url: 'https://pokeapi.co/api/v2/pokemon/648/',
				},
				{
					name: 'chespin',
					url: 'https://pokeapi.co/api/v2/pokemon/650/',
				},
				{
					name: 'quilladin',
					url: 'https://pokeapi.co/api/v2/pokemon/651/',
				},
				{
					name: 'chesnaught',
					url: 'https://pokeapi.co/api/v2/pokemon/652/',
				},
				{
					name: 'braixen',
					url: 'https://pokeapi.co/api/v2/pokemon/654/',
				},
				{
					name: 'delphox',
					url: 'https://pokeapi.co/api/v2/pokemon/655/',
				},
				{
					name: 'diggersby',
					url: 'https://pokeapi.co/api/v2/pokemon/660/',
				},
				{
					name: 'pancham',
					url: 'https://pokeapi.co/api/v2/pokemon/674/',
				},
				{
					name: 'pangoro',
					url: 'https://pokeapi.co/api/v2/pokemon/675/',
				},
				{
					name: 'heliolisk',
					url: 'https://pokeapi.co/api/v2/pokemon/695/',
				},
				{
					name: 'hawlucha',
					url: 'https://pokeapi.co/api/v2/pokemon/701/',
				},
				{
					name: 'dedenne',
					url: 'https://pokeapi.co/api/v2/pokemon/702/',
				},
				{
					name: 'goodra',
					url: 'https://pokeapi.co/api/v2/pokemon/706/',
				},
				{
					name: 'hoopa',
					url: 'https://pokeapi.co/api/v2/pokemon/720/',
				},
				{
					name: 'incineroar',
					url: 'https://pokeapi.co/api/v2/pokemon/727/',
				},
				{
					name: 'gumshoos',
					url: 'https://pokeapi.co/api/v2/pokemon/735/',
				},
				{
					name: 'crabrawler',
					url: 'https://pokeapi.co/api/v2/pokemon/739/',
				},
				{
					name: 'crabominable',
					url: 'https://pokeapi.co/api/v2/pokemon/740/',
				},
				{
					name: 'stufful',
					url: 'https://pokeapi.co/api/v2/pokemon/759/',
				},
				{
					name: 'bewear',
					url: 'https://pokeapi.co/api/v2/pokemon/760/',
				},
				{
					name: 'kommo-o',
					url: 'https://pokeapi.co/api/v2/pokemon/784/',
				},
				{
					name: 'tapu-koko',
					url: 'https://pokeapi.co/api/v2/pokemon/785/',
				},
				{
					name: 'buzzwole',
					url: 'https://pokeapi.co/api/v2/pokemon/794/',
				},
				{
					name: 'xurkitree',
					url: 'https://pokeapi.co/api/v2/pokemon/796/',
				},
				{
					name: 'marshadow',
					url: 'https://pokeapi.co/api/v2/pokemon/802/',
				},
				{
					name: 'zeraora',
					url: 'https://pokeapi.co/api/v2/pokemon/807/',
				},
				{
					name: 'melmetal',
					url: 'https://pokeapi.co/api/v2/pokemon/809/',
				},
				{
					name: 'toxtricity-amped',
					url: 'https://pokeapi.co/api/v2/pokemon/849/',
				},
				{
					name: 'grimmsnarl',
					url: 'https://pokeapi.co/api/v2/pokemon/861/',
				},
				{
					name: 'obstagoon',
					url: 'https://pokeapi.co/api/v2/pokemon/862/',
				},
				{
					name: 'morpeko-full-belly',
					url: 'https://pokeapi.co/api/v2/pokemon/877/',
				},
				{
					name: 'dracozolt',
					url: 'https://pokeapi.co/api/v2/pokemon/880/',
				},
				{
					name: 'arctozolt',
					url: 'https://pokeapi.co/api/v2/pokemon/881/',
				},
				{
					name: 'kubfu',
					url: 'https://pokeapi.co/api/v2/pokemon/891/',
				},
				{
					name: 'urshifu-single-strike',
					url: 'https://pokeapi.co/api/v2/pokemon/892/',
				},
				{
					name: 'ursaluna',
					url: 'https://pokeapi.co/api/v2/pokemon/901/',
				},
				{
					name: 'floragato',
					url: 'https://pokeapi.co/api/v2/pokemon/907/',
				},
				{
					name: 'meowscarada',
					url: 'https://pokeapi.co/api/v2/pokemon/908/',
				},
				{
					name: 'pawmo',
					url: 'https://pokeapi.co/api/v2/pokemon/922/',
				},
				{
					name: 'pawmot',
					url: 'https://pokeapi.co/api/v2/pokemon/923/',
				},
				{
					name: 'garganacl',
					url: 'https://pokeapi.co/api/v2/pokemon/934/',
				},
				{
					name: 'annihilape',
					url: 'https://pokeapi.co/api/v2/pokemon/979/',
				},
				{
					name: 'scream-tail',
					url: 'https://pokeapi.co/api/v2/pokemon/985/',
				},
				{
					name: 'iron-hands',
					url: 'https://pokeapi.co/api/v2/pokemon/992/',
				},
				{
					name: 'iron-thorns',
					url: 'https://pokeapi.co/api/v2/pokemon/995/',
				},
				{
					name: 'gholdengo',
					url: 'https://pokeapi.co/api/v2/pokemon/1000/',
				},
				{
					name: 'iron-valiant',
					url: 'https://pokeapi.co/api/v2/pokemon/1006/',
				},
				{
					name: 'okidogi',
					url: 'https://pokeapi.co/api/v2/pokemon/1014/',
				},
				{
					name: 'deoxys-attack',
					url: 'https://pokeapi.co/api/v2/pokemon/10001/',
				},
				{
					name: 'deoxys-defense',
					url: 'https://pokeapi.co/api/v2/pokemon/10002/',
				},
				{
					name: 'deoxys-speed',
					url: 'https://pokeapi.co/api/v2/pokemon/10003/',
				},
				{
					name: 'meloetta-pirouette',
					url: 'https://pokeapi.co/api/v2/pokemon/10018/',
				},
				{
					name: 'thundurus-therian',
					url: 'https://pokeapi.co/api/v2/pokemon/10020/',
				},
				{
					name: 'charizard-mega-x',
					url: 'https://pokeapi.co/api/v2/pokemon/10034/',
				},
				{
					name: 'charizard-mega-y',
					url: 'https://pokeapi.co/api/v2/pokemon/10035/',
				},
				{
					name: 'alakazam-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10037/',
				},
				{
					name: 'gengar-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10038/',
				},
				{
					name: 'kangaskhan-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10039/',
				},
				{
					name: 'mewtwo-mega-x',
					url: 'https://pokeapi.co/api/v2/pokemon/10043/',
				},
				{
					name: 'mewtwo-mega-y',
					url: 'https://pokeapi.co/api/v2/pokemon/10044/',
				},
				{
					name: 'ampharos-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10045/',
				},
				{
					name: 'tyranitar-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10049/',
				},
				{
					name: 'blaziken-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10050/',
				},
				{
					name: 'gardevoir-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10051/',
				},
				{
					name: 'mawile-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10052/',
				},
				{
					name: 'aggron-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10053/',
				},
				{
					name: 'medicham-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10054/',
				},
				{
					name: 'lucario-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10059/',
				},
				{
					name: 'sceptile-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10065/',
				},
				{
					name: 'sableye-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10066/',
				},
				{
					name: 'gallade-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10068/',
				},
				{
					name: 'audino-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10069/',
				},
				{
					name: 'metagross-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10076/',
				},
				{
					name: 'groudon-primal',
					url: 'https://pokeapi.co/api/v2/pokemon/10078/',
				},
				{
					name: 'pikachu-rock-star',
					url: 'https://pokeapi.co/api/v2/pokemon/10080/',
				},
				{
					name: 'pikachu-belle',
					url: 'https://pokeapi.co/api/v2/pokemon/10081/',
				},
				{
					name: 'pikachu-pop-star',
					url: 'https://pokeapi.co/api/v2/pokemon/10082/',
				},
				{
					name: 'pikachu-phd',
					url: 'https://pokeapi.co/api/v2/pokemon/10083/',
				},
				{
					name: 'pikachu-libre',
					url: 'https://pokeapi.co/api/v2/pokemon/10084/',
				},
				{
					name: 'pikachu-cosplay',
					url: 'https://pokeapi.co/api/v2/pokemon/10085/',
				},
				{
					name: 'hoopa-unbound',
					url: 'https://pokeapi.co/api/v2/pokemon/10086/',
				},
				{
					name: 'lopunny-mega',
					url: 'https://pokeapi.co/api/v2/pokemon/10088/',
				},
				{
					name: 'pikachu-original-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10094/',
				},
				{
					name: 'pikachu-hoenn-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10095/',
				},
				{
					name: 'pikachu-sinnoh-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10096/',
				},
				{
					name: 'pikachu-unova-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10097/',
				},
				{
					name: 'pikachu-kalos-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10098/',
				},
				{
					name: 'pikachu-alola-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10099/',
				},
				{
					name: 'raichu-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10100/',
				},
				{
					name: 'geodude-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10109/',
				},
				{
					name: 'graveler-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10110/',
				},
				{
					name: 'golem-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10111/',
				},
				{
					name: 'grimer-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10112/',
				},
				{
					name: 'muk-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10113/',
				},
				{
					name: 'marowak-alola',
					url: 'https://pokeapi.co/api/v2/pokemon/10115/',
				},
				{
					name: 'gumshoos-totem',
					url: 'https://pokeapi.co/api/v2/pokemon/10121/',
				},
				{
					name: 'lycanroc-midnight',
					url: 'https://pokeapi.co/api/v2/pokemon/10126/',
				},
				{
					name: 'kommo-o-totem',
					url: 'https://pokeapi.co/api/v2/pokemon/10146/',
				},
				{
					name: 'pikachu-partner-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10148/',
				},
				{
					name: 'marowak-totem',
					url: 'https://pokeapi.co/api/v2/pokemon/10149/',
				},
				{
					name: 'pikachu-starter',
					url: 'https://pokeapi.co/api/v2/pokemon/10158/',
				},
				{
					name: 'pikachu-world-cap',
					url: 'https://pokeapi.co/api/v2/pokemon/10160/',
				},
				{
					name: 'slowking-galar',
					url: 'https://pokeapi.co/api/v2/pokemon/10172/',
				},
				{
					name: 'toxtricity-low-key',
					url: 'https://pokeapi.co/api/v2/pokemon/10184/',
				},
				{
					name: 'morpeko-hangry',
					url: 'https://pokeapi.co/api/v2/pokemon/10187/',
				},
				{
					name: 'urshifu-rapid-strike',
					url: 'https://pokeapi.co/api/v2/pokemon/10191/',
				},
				{
					name: 'typhlosion-hisui',
					url: 'https://pokeapi.co/api/v2/pokemon/10233/',
				},
				{
					name: 'goodra-hisui',
					url: 'https://pokeapi.co/api/v2/pokemon/10242/',
				},
				{
					name: 'ursaluna-bloodmoon',
					url: 'https://pokeapi.co/api/v2/pokemon/10272/',
				},
			],
			machines: [],
			meta: {
				ailment: {
					name: 'paralysis',
					url: 'https://pokeapi.co/api/v2/move-ailment/1/',
				},
				ailment_chance: 10,
				category: {
					name: 'damage+ailment',
					url: 'https://pokeapi.co/api/v2/move-category/4/',
				},
				crit_rate: 0,
				drain: 0,
				flinch_chance: 0,
				healing: 0,
				max_hits: null,
				max_turns: null,
				min_hits: null,
				min_turns: null,
				stat_chance: 0,
			},
			name: 'thunder-punch',
			names: [
				{
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					name: 'かみなりパンチ',
				},
				{
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					name: '번개펀치',
				},
				{
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					name: '雷電拳',
				},
				{
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					name: 'Poing Éclair',
				},
				{
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					name: 'Donnerschlag',
				},
				{
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					name: 'Puño Trueno',
				},
				{
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					name: 'Tuonopugno',
				},
				{
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					name: 'Thunder Punch',
				},
				{
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					name: 'かみなりパンチ',
				},
				{
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					name: '雷电拳',
				},
			],
			past_values: [],
			power: 75,
			pp: 15,
			priority: 0,
			stat_changes: [],
			super_contest_effect: {
				url: 'https://pokeapi.co/api/v2/super-contest-effect/17/',
			},
			target: {
				name: 'selected-pokemon',
				url: 'https://pokeapi.co/api/v2/move-target/10/',
			},
			type: {
				name: 'electric',
				url: 'https://pokeapi.co/api/v2/type/13/',
			},
		},
		{
			accuracy: 100,
			contest_combos: {
				normal: {
					use_after: [
						{
							name: 'leer',
							url: 'https://pokeapi.co/api/v2/move/43/',
						},
					],
					use_before: [
						{
							name: 'fury-swipes',
							url: 'https://pokeapi.co/api/v2/move/154/',
						},
						{
							name: 'slash',
							url: 'https://pokeapi.co/api/v2/move/163/',
						},
					],
				},
				super: {
					use_after: null,
					use_before: null,
				},
			},
			contest_effect: {
				url: 'https://pokeapi.co/api/v2/contest-effect/1/',
			},
			contest_type: {
				name: 'tough',
				url: 'https://pokeapi.co/api/v2/contest-type/5/',
			},
			damage_class: {
				name: 'physical',
				url: 'https://pokeapi.co/api/v2/move-damage-class/2/',
			},
			effect_chance: null,
			effect_changes: [],
			effect_entries: [
				{
					effect: 'Inflicts regular damage.',
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					short_effect: 'Inflicts regular damage with no additional effect.',
				},
			],
			flavor_text_entries: [],
			generation: {
				name: 'generation-i',
				url: 'https://pokeapi.co/api/v2/generation/1/',
			},
			id: 10,

			machines: [],
			meta: {
				ailment: {
					name: 'none',
					url: 'https://pokeapi.co/api/v2/move-ailment/0/',
				},
				ailment_chance: 0,
				category: {
					name: 'damage',
					url: 'https://pokeapi.co/api/v2/move-category/0/',
				},
				crit_rate: 0,
				drain: 0,
				flinch_chance: 0,
				healing: 0,
				max_hits: null,
				max_turns: null,
				min_hits: null,
				min_turns: null,
				stat_chance: 0,
			},
			name: 'scratch',
			names: [
				{
					language: {
						name: 'ja-Hrkt',
						url: 'https://pokeapi.co/api/v2/language/1/',
					},
					name: 'ひっかく',
				},
				{
					language: {
						name: 'ko',
						url: 'https://pokeapi.co/api/v2/language/3/',
					},
					name: '할퀴기',
				},
				{
					language: {
						name: 'zh-Hant',
						url: 'https://pokeapi.co/api/v2/language/4/',
					},
					name: '抓',
				},
				{
					language: {
						name: 'fr',
						url: 'https://pokeapi.co/api/v2/language/5/',
					},
					name: 'Griffe',
				},
				{
					language: {
						name: 'de',
						url: 'https://pokeapi.co/api/v2/language/6/',
					},
					name: 'Kratzer',
				},
				{
					language: {
						name: 'es',
						url: 'https://pokeapi.co/api/v2/language/7/',
					},
					name: 'Arañazo',
				},
				{
					language: {
						name: 'it',
						url: 'https://pokeapi.co/api/v2/language/8/',
					},
					name: 'Graffio',
				},
				{
					language: {
						name: 'en',
						url: 'https://pokeapi.co/api/v2/language/9/',
					},
					name: 'Scratch',
				},
				{
					language: {
						name: 'ja',
						url: 'https://pokeapi.co/api/v2/language/11/',
					},
					name: 'ひっかく',
				},
				{
					language: {
						name: 'zh-Hans',
						url: 'https://pokeapi.co/api/v2/language/12/',
					},
					name: '抓',
				},
			],
			past_values: [],
			power: 40,
			pp: 35,
			priority: 0,
			stat_changes: [],
			super_contest_effect: {
				url: 'https://pokeapi.co/api/v2/super-contest-effect/5/',
			},
			target: {
				name: 'selected-pokemon',
				url: 'https://pokeapi.co/api/v2/move-target/10/',
			},
			type: {
				name: 'normal',
				url: 'https://pokeapi.co/api/v2/type/1/',
			},
		},
	],
	spatk: 17,
	spdef: 17,
	speed: 12,
	attack: 11,
	damage: 15,
	onTeam: true,
	defence: 17,
	ownerId: '04122f88-28c5-4846-b6d3-8136414dae5e',
	moveNames: ['mega-punch', 'fire-punch', 'thunder-punch', 'scratch'],
	evasiveness: 1,
	base_experience: 62,
	stats: {
		hp: 22,
		attack: 12,
		spatk: 19,
		spdef: 19,
		speed: 14,
		defence: 19,
	},
	statModifiers: {
		hp: 6,
		attack: -1,
		def: 2,
		spatk: 4,
		spdef: -3,
		speed: 0,
	},
};

export const TestArea = (): JSX.Element => {
	return (
		<div
			style={{
				padding: '5rem 2rem',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<BattleSprite pokemon={testMon} />
		</div>
	);
};
