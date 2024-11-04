import { reduceRec } from "../reduceRec";
import { Mealy, Moore } from "../types";

const visualize = (data: Mealy | Moore) =>
    'digraph machine {\n' +
    visualizeMachine(data) +
    '}\n'

const visualizeMachine = (data: Mealy | Moore): string => {
    if (data.type === 'moore') {
        return visualizeMoore(data)
    }
    if (data.type === 'mealy') {
        return visualizeMealy(data)
    }
    throw new Error('unknown data for visualizing')
}

const visualizeMoore = (data: Moore): string => 
    reduceRec(
        data.states,
        (acc, [name]) => acc + `${name} [label = "${name}"]\n`,
        ''
    ) + '\n' +
    reduceRec(
        data.states,
        (acc, [name, {transitions}]) => acc + reduceRec(
            transitions,
            (accT, [input, next]) => 
                accT + `${name} -> ${next} [label = "${input}"]\n`,
            ''
        ),
        ''
    )

const visualizeMealy = (data: Mealy): string =>  
    reduceRec(
        data.states,
        (acc, [name]) => acc + `${name} [label = "${name}"]\n`,
        ''
    ) + '\n' +
    reduceRec(
        data.states,
        (acc, [name, state]) =>acc + reduceRec(
            state,
            (accT, [input, {nextState, output}]) => 
                accT + `${name} -> ${nextState} [label = "${input}/${output}"]\n`,
            ''
        ),
        ''
    )

export {
    visualize
};
