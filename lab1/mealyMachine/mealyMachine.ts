import {forEachRec, reduceRec} from '../reduceRec'
import type {
	Mealy, Moore, MooreState, MooreStates,
} from '../types'

type Outs = Record<string, Set<string>>

function createMealyMachine(mealyData: Mealy) {
	const data = mealyData

	function toMoore(): Moore {

		const outputs: Outs = {}

		forEachRec(data.states, ([, state]) => {
			forEachRec(state, ([, {nextState, output}]) => {
				if (outputs[nextState]) {
					outputs[nextState].add(output)
				}
				else {
					outputs[nextState] = new Set([output])
				}
			})
		})

		console.log(outputs)

		const result: Moore = {
			type: 'moore',
			states: reduceRec(data.states, (states, [name, state]) => ({
				...states,
				[name]: reduceRec(state, (acc, [input, {nextState, output}]) => ({
					output: '',
					transitions: {
						...acc.transitions,
						[input]: nextState,
					},
				}), {} as MooreState),
			}), {} as MooreStates),
		}

		return result
	}

	return {
		toMoore,
	}
}

export {
	createMealyMachine,
}
