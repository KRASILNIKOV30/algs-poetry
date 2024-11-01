type Mealy = {
    type: 'mealy',
    states: MealyStates,
}

type MealyStates = Record<string, MealyState>

type MealyState = Record<string, {
    nextState: string,
    output: string,
}>

type Moore = {
    type: 'moore',
    states: MooreStates
}

type MooreStates = Record<string, MooreState>

type MooreState = {
    output: string,
    transitions: Record<string, string>,
}

export type {
    Mealy,
    MealyStates,
    MealyState,
    Moore,
    MooreStates,
    MooreState,
}
