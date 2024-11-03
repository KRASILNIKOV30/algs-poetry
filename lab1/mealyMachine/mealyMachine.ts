import {
	forEachRec, isEmpty, reduceRec,
} from '../reduceRec'
import type {
	Mealy, MealyState, MealyStates, Moore, MooreStates,
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

	type GroupTransitions = Record<string, number>

	function minimize(): Mealy {
		const states = Object.keys(data.states)
		const outputGroups = new Map<string, string[]>()

		for (const state of states) {
			const outputsKey = reduceRec(data.states[state], (key, cur) => key + cur[1].output, '')
			if (!outputGroups.has(outputsKey)) {
				outputGroups.set(outputsKey, [])
			}
			outputGroups.get(outputsKey)?.push(state)
		}

		let partitions = Array.from(outputGroups.values())

		const getStateGroupIndex = (state: string) =>
			partitions.reduce((res, group, i) =>
				group.includes(state)
					? i
					: res,
			-1)

		let stable = false

		while (!stable) {
			stable = true
			const newPartitions: string[][] = []
			for (const group of partitions) {
				const transitionMap = new Map<string, string[]>()
				for (const state of group) {
					const transitions = reduceRec(data.states[state], (acc, [input, {nextState}]) => ({
						...acc,
						[input]: getStateGroupIndex(nextState),
					}), {} as GroupTransitions)
					const transitionKey = JSON.stringify(transitions) + JSON.stringify(group)
					if (transitionMap.has(transitionKey)) {
						transitionMap.get(transitionKey)?.push(state)
					}
					else {
						transitionMap.set(transitionKey, [state])
					}
				}
				const newGroups = Array.from(transitionMap.values())
				if (newGroups.length > 1) {
					stable = false
					newGroups.forEach(newGroup => {
						newPartitions.push(newGroup)
					})
				}
				else {
					newPartitions.push(group)
				}
			}
			partitions = newPartitions
		}
		const newStates: MealyStates = {}

		partitions.forEach((group, index) => {
			const newState = `S${index}`

			newStates[newState] = {}

			group.forEach(state => {
				const transitions = data.states[state]
				for (const [input, {nextState, output}] of Object.entries(transitions)) {
					const nextGroupIndex = partitions.findIndex(g => g.includes(nextState))
					newStates[newState][input] = {
						nextState: `S${nextGroupIndex}`,
						output,
					}
				}
			})
		})

		const reachableStates = checkReachability(newStates, 'S0')


		return {
			type: 'mealy',
			states: reduceRec(newStates, (acc, [name, state]) => (
				reachableStates.has(name)
					? {
						...acc,
						[name]: state,
					}
					: acc
			), {} as MealyStates),
		}
	}

	return {
		toMoore,
		minimize,
	}
}

function checkReachability(states: MealyStates, startState: string): Set<string> {
	const reachableStates = new Set<string>()
	const stack: string[] = [startState]

	while (stack.length) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const currentState = stack.pop()!
		if (!reachableStates.has(currentState)) {
			reachableStates.add(currentState)
			const transitions = states[currentState]
			for (const transition of Object.values(transitions)) {
				const nextState = transition.nextState
				if (!reachableStates.has(nextState)) {
					stack.push(nextState)
				}
			}
		}
	}

	return reachableStates
}

export {
	createMealyMachine,
}
