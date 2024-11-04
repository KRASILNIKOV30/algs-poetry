/* eslint-disable no-mixed-spaces-and-tabs */

import { reduceRec } from '../reduceRec'
import type {
	Mealy,
	MealyState,
	MealyStates,
	Moore,
	MooreStates,
} from '../types'

function createMooreMachine(mooreData: Moore) {
	const data = mooreData

	const morph = (): Mealy => ({
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

    type GroupTransitions = Record<string, number>

    function minimize(): Moore {
    	const states = Object.keys(data.states)
    	const outputGroups = new Map<string, string[]>()

    	for (const state of states) {
    		const output = data.states[state].output
    		if (!outputGroups.has(output)) {
    			outputGroups.set(output, [])
    		}
    		outputGroups.get(output)?.push(state)
    	}

    	let partitions = Array.from(outputGroups.values())

    	const getStateGroupIndex = (state: string) => partitions.reduce((res, group, i) => {
    		if (group.includes(state)) {
    			return i
    		}
    		return res
    	}, -1)

    	let stable = false

    	while (!stable) {
    		stable = true
    		const newPartitions: string[][] = []

    		for (const group of partitions) {
    			const transitionMap = new Map<string, string[]>()

    			for (const state of group) {
    				const transitions = reduceRec(data.states[state].transitions, (acc, [input, stateName]) => ({
    					...acc,
    					[input]: getStateGroupIndex(stateName),
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

    	const newStates: MooreStates = {}

    	partitions.forEach((group, index) => {
    		const representative = group[0]
    		const newState = `S${index}`
    		const output = data.states[representative].output
    		newStates[newState] = {
    			output,
    			transitions: {},
    		}

    		group.forEach(state => {
    			const transitions = data.states[state].transitions
    			for (const symbol of Object.keys(transitions)) {
    				const nextState = transitions[symbol]
    				const nextGroupIndex = partitions.findIndex(g => g.includes(nextState))
    				newStates[newState].transitions[symbol] = `S${nextGroupIndex}`
    			}
    		})
    	})

    	return {
    		type: 'moore',
    		states: newStates,
    	}
    }

    return {
    	morph,
    	minimize,
    }
}

type MooreMachine = ReturnType<typeof createMooreMachine>

export type {
	MooreMachine
}

export {
	createMooreMachine
}

