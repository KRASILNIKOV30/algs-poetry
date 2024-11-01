import { Mealy } from "../types"
import { createMooreMachine } from "./mooreMachine"

describe('moore to mealy', () => {
    it('only 1 state', () => {
        const mooreMachine = createMooreMachine({
            type: 'moore',
            states: {
                'S1': {
                    output: 'w1',
                    transitions: {
                        '1': 'S2',
                    }
                },
                'S2': {
                    output: 'w2',
                    transitions: {}
                }
            }
        })

        const expected: Mealy = {
            type: 'mealy',
            states: {
                'S1': {
                    '1': {
                        nextState: 'S2',
                        output: 'w2',
                    }
                },
                'S2': {}
            }
        }

        expect(mooreMachine.toMealy()).toEqual(expected)
    })
})