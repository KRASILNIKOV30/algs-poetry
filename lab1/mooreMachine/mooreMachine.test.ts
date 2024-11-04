import type { Mealy, Moore } from '../types'
import { createMooreMachine } from './mooreMachine'

describe('moore to mealy', () => {
	it('only 1 state', () => {
		const mooreMachine = createMooreMachine({
			type: 'moore',
			states: {
				'S1': {
					output: 'w1',
					transitions: {
						'1': 'S2',
					},
				},
				'S2': {
					output: 'w2',
					transitions: {},
				},
			},
		})

		const expected: Mealy = {
			type: 'mealy',
			states: {
				'S1': {
					'1': {
						nextState: 'S2',
						output: 'w2',
					},
				},
				'S2': {},
			},
		}

		expect(mooreMachine.morph()).toEqual(expected)
	})

	it('5 states', () => {
		const mooreMachine = createMooreMachine({
			type: 'moore',
			states: {
				'1': {
					output: '',
					transitions: {
						'1': '3',
						'2': '2',
					},
				},
				'2': {
					output: 'w1',
					transitions: {
						'1': '4',
					},
				},
				'3': {
					output: 'w1',
					transitions: {
						'1': '5',
					},
				},
				'4': {
					output: 'w2',
					transitions: {
						'1': '5',
					},
				},
				'5': {
					output: 'w2',
					transitions: {},
				},
			},
		})

		const expected: Mealy = {
			type: 'mealy',
			states: {
				'1': {
					'1': {
						nextState: '3',
						output: 'w1',
					},
					'2': {
						nextState: '2',
						output: 'w1',
					},
				},
				'2': {
					'1': {
						nextState: '4',
						output: 'w2',
					},
				},
				'3': {
					'1': {
						nextState: '5',
						output: 'w2',
					},
				},
				'4': {
					'1': {
						nextState: '5',
						output: 'w2',
					},
				},
				'5': {},
			},
		}

		expect(mooreMachine.morph()).toEqual(expected)
	})
})

describe('createMooreMachine', () => {
	it('should minimize a simple Moore machine', () => {
		const machine = createMooreMachine({
			type: 'moore',
			states: {
				A: {
					output: 'X',
					transitions: {
						'0': 'B',
						'1': 'C',
					},
				},
				B: {
					output: 'Y',
					transitions: {
						'0': 'A',
						'1': 'D',
					},
				},
				C: {
					output: 'X',
					transitions: {
						'0': 'B',
						'1': 'C',
					},
				},
				D: {
					output: 'Z',
					transitions: {
						'0': 'D',
						'1': 'D',
					},
				},
			},
		})

		const minimizedMachine = machine.minimize()

		expect(minimizedMachine).toEqual({
			type: 'moore',
			states: {
				S0: {
					output: 'X',
					transitions: {
						'0': 'S1',
						'1': 'S0',
					},
				},
				S1: {
					output: 'Y',
					transitions: {
						'0': 'S0',
						'1': 'S2',
					},
				},
				S2: {
					output: 'Z',
					transitions: {
						'0': 'S2',
						'1': 'S2',
					},
				},
			},
		})
	})

	it('should handle a machine with only one state', () => {
		const machine = createMooreMachine({
			type: 'moore',
			states: {
				A: {
					output: 'X',
					transitions: {},
				},
			},
		})

		const minimizedMachine = machine.minimize()

		expect(minimizedMachine).toEqual({
			type: 'moore',
			states: {
				S0: {
					output: 'X',
					transitions: {},
				},
			},
		})
	})

	it('should minimize a machine with equivalent states', () => {
		const machine = createMooreMachine({
			type: 'moore',
			states: {
				A: {
					output: 'X',
					transitions: {'0': 'B'},
				},
				B: {
					output: 'X',
					transitions: {'0': 'A'},
				},
			},
		})

		const minimizedMachine = machine.minimize()

		expect(minimizedMachine).toEqual({
			type: 'moore',
			states: {
				S0: {
					output: 'X',
					transitions: {'0': 'S0'},
				},
			},
		})
	})

	it('should correctly handle more complex machines', () => {
		const machine = createMooreMachine({
			type: 'moore',
			states: {
				a1: {
					output: 'u1',
					transitions: {
						x1: 'a3',
						x2: 'a5',
					},
				},
				a2: {
					output: 'u1',
					transitions: {
						x1: 'a4',
						x2: 'a6',
					},
				},
				a3: {
					output: 'u2',
					transitions: {
						x1: 'a3',
						x2: 'a5',
					},
				},
				a4: {
					output: 'u2',
					transitions: {
						x1: 'a4',
						x2: 'a6',
					},
				},
				a5: {
					output: 'u1',
					transitions: {
						x1: 'a5',
						x2: 'a1',
					},
				},
				a6: {
					output: 'u1',
					transitions: {
						x1: 'a6',
						x2: 'a2',
					},
				},
			},
		})

		const expected: Moore = {
			type: 'moore',
			states: {
				S0: {
					output: 'u1',
					transitions: {
						x1: 'S2',
						x2: 'S1',
					},
				},
				S1: {
					output: 'u1',
					transitions: {
						x1: 'S1',
						x2: 'S0',
					},
				},
				S2: {
					output: 'u2',
					transitions: {
						x1: 'S2',
						x2: 'S1',
					},
				},
			},
		}

		expect(machine.minimize()).toEqual(expected)
	})
})
