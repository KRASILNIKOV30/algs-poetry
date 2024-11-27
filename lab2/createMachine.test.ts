import { createMachine } from "./createMachine"
import { Machine } from "./types"

describe('create machine from regexp tests', () => {
    it('regexp from simple regexp', () => {
        const regexp = 'a'

        const expected: Machine = {
            states: new Map([
                ['0', {
                    finish: false,
                    transitions: new Map([
                        ['a', '1']
                    ])
                }],
                ['1', {
                    finish: true,
                }]
            ])
        }

        expect(createMachine(regexp)).toEqual(expected)
    })
})