import { Moore } from "../types"
import { visualize } from "./visualize"

describe('visualizing test', () => {
    it('should visualize moore machine', () => {
        const data: Moore = {
			type: 'moore',
			states: {
				'1': {
					output: '',
					transitions: {
						'1': '3',
						'2': '2',
					},
				},
				'2': {
					output: 'w1',
					transitions: {
						'1': '4',
					},
				},
				'3': {
					output: 'w1',
					transitions: {
						'1': '5',
					},
				},
				'4': {
					output: 'w2',
					transitions: {
						'1': '5',
					},
				},
				'5': {
					output: 'w2',
					transitions: {},
				},
			}, 
		}

        expect(visualize(data)).toEqual(
            'digraph machine {\n' +
            "1 [label = \"1\"]\n" +
            "2 [label = \"2\"]\n" +
            "3 [label = \"3\"]\n" +
            "4 [label = \"4\"]\n" +
            "5 [label = \"5\"]\n" +
            '\n' +
            '1 -> 3 [label = "1"]\n' +
            '1 -> 2 [label = "2"]\n' +
            '2 -> 4 [label = "1"]\n' +
            '3 -> 5 [label = "1"]\n' +
            '4 -> 5 [label = "1"]\n' +
            '}\n'
        )
    })
})