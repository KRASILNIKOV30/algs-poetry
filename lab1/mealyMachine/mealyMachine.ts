import { forEachRec, reduceRec } from '../reduceRec';
import type { Mealy, Moore, MooreState, MooreStates } from '../types';
 
function createMealyMachine(mealyData: Mealy) {
    const data = mealyData


    // Сначала пробежаться по всем состояниям и закинуть 
    function toMoore(): Moore {
        const outputs: [string, string][] = reduceRec(data.states, (acc, [name, state]) => 
            reduceRec(state, (acc, []) => [
                
            ]), [])

        forEachRec(data.states, ([name, state]) => {

        })

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
