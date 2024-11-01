import { Moore } from "../types"
import { createMealyMachine } from "./mealyMachine"

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
            }
        })

        const expected: Moore = {
            type: 'moore',
            states: {
                'S1': {
                    output: '',
                    transitions: {
                        '1': 'S2',
                    }
                },
                'S2': {
                    output: 'w2',
                    transitions: {},
                },
            }
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
                    }
                },
                'S2': {},
            }
        })

        const expected: Moore = {
            type: 'moore',
            states: {
                'S1': {
                    output: '',
                    transitions: {
                        '1': 'S2',
                    }
                },
                'S2_w2': {
                    output: 'w2',
                    transitions: {},
                },
                'S2_w3': {
                    output: 'w3',
                    transitions: {},
                }
            }
        }

        expect(mealyMachine.toMoore()).toEqual(expected)
    })
})