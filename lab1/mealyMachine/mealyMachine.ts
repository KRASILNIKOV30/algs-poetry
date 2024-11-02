import { reduceRec } from '../reduceRec';
import type { Mealy, Moore, MooreState, MooreStates } from '../types';
 
type Outs = [string, string][]

function createMealyMachine(mealyData: Mealy) {
    const data = mealyData

    function toMoore(): Moore {    
        const outputs = reduceRec(data.states, (acc, [_, state]) => (
            acc.concat(reduceRec(state, (acc, [_, { nextState, output }]) => (
                acc.concat([[nextState, output]])
            ), [] as Outs))
        ), [] as Outs)

        console.log(outputs)

        const result: Moore = {
            type: 'moore',
            states: reduceRec(data.states, (acc, [name, state]) => ({
                ...acc,
                [name]: reduceRec(state, (acc, cur) => ({
                    output: '',
                    transitions: {
                        ...acc.transitions,
                        [cur[0]]: (
                            outputs.push([cur[1].nextState, cur[1].output]),
                            cur[1].nextState
                        ),
                    }
                }), {} as MooreState)
            }), {} as MooreStates),
        }

        console.log(outputs)

        outputs.forEach(([state, output]) => {
            result.states[state] = {
                output,
                transitions: result.states[state].transitions ?? {}
            }
            result.states[state].output
        })

        return result
    }

    return {
        toMoore,
    }
}

export {
    createMealyMachine
};
