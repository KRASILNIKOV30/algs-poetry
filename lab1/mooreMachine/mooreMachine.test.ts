import type {Mealy} from '../types'
import {createMooreMachine} from './mooreMachine'

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

		expect(mooreMachine.toMealy()).toEqual(expected)
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

		expect(mooreMachine.toMealy()).toEqual(expected)
	})
})
