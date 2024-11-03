import type {Mealy, Moore} from '../types'
import {createMealyMachine} from './mealyMachine'

describe('moore to mealy', () => {
	it('only 1 state', () => {
		const mealyMachine = createMealyMachine({
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
		})

		const expected: Moore = {
			type: 'moore',
			states: {
				'S1': {
					output: '',
					transitions: {
						'1': 'S2_w2',
					},
				},
				'S2_w2': {
					output: 'w2',
					transitions: {},
				},
			},
		}

		expect(mealyMachine.toMoore()).toEqual(expected)
	})

	it('increasing number of states', () => {
		const mealyMachine = createMealyMachine({
			type: 'mealy',
			states: {
				'S1': {
					'1': {
						nextState: 'S2',
						output: 'w2',
					},
					'2': {
						nextState: 'S2',
						output: 'w3',
					},
				},
				'S2': {},
			},
		})

		const expected: Moore = {
			type: 'moore',
			states: {
				'S1': {
					output: '',
					transitions: {
						'1': 'S2_w2',
						'2': 'S2_w3',
					},
				},
				'S2_w2': {
					output: 'w2',
					transitions: {},
				},
				'S2_w3': {
					output: 'w3',
					transitions: {},
				},
			},
		}

		expect(mealyMachine.toMoore()).toEqual(expected)
	})

	it('test with doubling', () => {
		const mealyMachine = createMealyMachine({
			type: 'mealy',
			states: {
				'S1': {
					'1': {
						nextState: 'S3',
						output: 'w1',
					},
					'2': {
						nextState: 'S2',
						output: 'w1',
					},
				},
				'S2': {
					'1': {
						nextState: 'S3',
						output: 'w2',
					},
				},
				'S3': {
					'1': {
						nextState: 'S4',
						output: 'w2',
					},
				},
				'S4': {},
			},
		})

		const expected: Moore = {
			type: 'moore',
			states: {
				'S1': {
					output: '',
					transitions: {
						'1': 'S3_w1',
						'2': 'S2_w1',
					},
				},
				'S2_w1': {
					output: 'w1',
					transitions: {
						'1': 'S3_w2',
					},
				},
				'S3_w1': {
					output: 'w1',
					transitions: {
						'1': 'S4_w2',
					},
				},
				'S3_w2': {
					output: 'w2',
					transitions: {
						'1': 'S4_w2',
					},
				},
				'S4_w2': {
					output: 'w2',
					transitions: {},
				},
			},
		}

		expect(mealyMachine.toMoore()).toEqual(expected)
	})
})

describe('Mealy Machine Minimization', () => {
	it('minimizes a simple Mealy machine', () => {
		const data: Mealy = {
			type: 'mealy',
			states: {
				S0: {
					x1: {
						nextState: 'S1',
						output: 'a',
					},
					x2: {
						nextState: 'S2',
						output: 'b',
					},
				},
				S1: {
					x1: {
						nextState: 'S0',
						output: 'a',
					},
					x2: {
						nextState: 'S2',
						output: 'b',
					},
				},
				S2: {
					x1: {
						nextState: 'S0',
						output: 'c',
					},
					x2: {
						nextState: 'S1',
						output: 'd',
					},
				},
			},
		}

		const machine = createMealyMachine(data)
		const minimizedMachine = machine.minimize()

		expect(minimizedMachine).toEqual({
			type: 'mealy',
			states: {
				S0: {
					x1: {
						nextState: 'S0',
						output: 'a',
					},
					x2: {
						nextState: 'S1',
						output: 'b',
					},
				},
				S1: {
					x1: {
						nextState: 'S0',
						output: 'c',
					},
					x2: {
						nextState: 'S0',
						output: 'd',
					},
				},
			},
		})
	})

	it('handles unreachable states', () => {
		const data: Mealy = {
			type: 'mealy',
			states: {
				S0: {
					x1: {
						nextState: 'S1',
						output: 'a',
					},
					x2: {
						nextState: 'S2',
						output: 'b',
					},
				},
				S1: {
					x1: {
						nextState: 'S1',
						output: 'a',
					},
					x2: {
						nextState: 'S0',
						output: 'b',
					},
				},
				S2: {
					x1: {
						nextState: 'S3',
						output: 'c',
					},
					x2: {
						nextState: 'S4',
						output: 'd',
					},
				},
				S3: {
					x1: {
						nextState: 'S1',
						output: 'e',
					},
					x2: {
						nextState: 'S2',
						output: 'f',
					},
				},
				S4: {
					x1: {
						nextState: 'S1',
						output: 'g',
					},
					x2: {
						nextState: 'S2',
						output: 'h',
					},
				},
			},
		}

		const machine = createMealyMachine(data)
		const minimizedMachine = machine.minimize()

		expect(minimizedMachine).toEqual({
			type: 'mealy',
			states: {
				S0: {
					x1: {
						nextState: 'S1',
						output: 'a',
					},
					x2: {
						nextState: 'S2',
						output: 'b',
					},
				},
				S1: {
					x1: {
						nextState: 'S1',
						output: 'a',
					},
					x2: {
						nextState: 'S0',
						output: 'b',
					},
				},
				// Убедитесь, что состояния S3 и S4 не включены, если они недостижимы
			},
		})
	})
})
