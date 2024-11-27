import { Machine, States } from "./types";

function createMachine(regexp: string): Machine {
    const states: States = new Map([
        ['0', {
            finish: regexp.length === 0
        }]
    ])
    let id = 0


    regexp.split('').forEach(char => {
        states.set((++id).toString(), {})
    })

    return {
        states,
    }
}

export {
    createMachine,
}