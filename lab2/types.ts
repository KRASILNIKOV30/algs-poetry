type Machine = {
    states: States,
}

type States = Map<StateName, State>

type State = {
    finish?: boolean,
    transitions?: Map<Input, StateName>
}

type Input = string
type StateName = string

export type {
    Machine,
    States,
    State,
    Input,
    StateName,
}