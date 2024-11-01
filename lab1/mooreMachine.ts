import type { Mealy, MealyState, MealyStates, Moore } from './types';
 
function reduceRec<T, U>(
    rec: Record<string, T>,
    callback: (prev: U, cur: [string, T]) => U,
    initValue: U,
): U {
    return Object.entries(rec).reduce(callback, initValue)
}

function createMooreMachine(mooreData: Moore) {
    const data = mooreData

    const toMealy = (): Mealy => ({
        type: 'mealy',
        states: reduceRec(data.states, (acc, [stateName, state]) => ({
            ...acc,
            [stateName]: reduceRec(state.transitions, (acc, cur) => ({
                ...acc,
                [cur[0]]: {
                    nextState: cur[1],
                    output: data.states[cur[1]].output,
                }
            }), {} as MealyState),
        }), {} as MealyStates),
    })

    return {
        toMealy,
    }
}

export {
    createMooreMachine
};
