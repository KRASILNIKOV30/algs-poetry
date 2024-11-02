
import {reduceRec} from '../reduceRec'
import type {
	Mealy,
	MealyState,
	MealyStates,
	Moore,
} from '../types'

function createMooreMachine(mooreData: Moore) {
	const data = mooreData

	const toMealy = (): Mealy => ({
		type: 'mealy',
		states: reduceRec(data.states, (states, [stateName, state]) => ({
			...states,
			[stateName]: reduceRec(state.transitions, (transitions, cur) => ({
				...transitions,
				[cur[0]]: {
					nextState: cur[1],
					output: data.states[cur[1]].output,
				},
			}), {} as MealyState),
		}), {} as MealyStates),
	})

	return {
		toMealy,
	}
}

export {
	createMooreMachine,
}
