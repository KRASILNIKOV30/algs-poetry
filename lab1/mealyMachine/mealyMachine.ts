import {
	forEachRec, isEmpty, reduceRec,
} from '../reduceRec'
import type {
	Mealy, MealyState, Moore, MooreStates,
	Transitions,
} from '../types'

type Outs = Record<string, Set<string>>

function createMealyMachine(mealyData: Mealy) {
	const data = mealyData

	function toMoore(): Moore {

		const outputs: Outs = {}

		const makeState = (stateName: string, output: string) =>
			`${stateName}_${output}`

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

		const reduceTransitions = (state: MealyState): Transitions =>
			isEmpty(state)
				? {}
				: reduceRec(state, (acc, [input, {nextState, output}]) => ({
					...acc,
					[input]: makeState(nextState, output),
				}), {})

		const createState = (state: MealyState, output: string = '') => ({
			output,
			transitions: reduceTransitions(state),
		})

		const reduceState = ([name, state]: [string, MealyState]): MooreStates =>
			outputs[name]
				? [...outputs[name]].reduce((acc, output) => ({
					...acc,
					[makeState(name, output)]: createState(state, output),
				}), {})
				: {
					[name]: createState(state),
				}

		const result: Moore = {
			type: 'moore',
			states: reduceRec(data.states, (acc, state) => ({
				...acc,
				...reduceState(state),
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
