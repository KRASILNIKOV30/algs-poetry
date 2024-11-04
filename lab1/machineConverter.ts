import fs from 'fs'
import { createMealyMachine, MealyMachine } from './mealyMachine/mealyMachine'
import { MooreMachine } from './mooreMachine/mooreMachine'
import { Mealy, Moore } from './types'
import { visualize } from './visualizing/visualize'

const [,, action, input, output] = process.argv
const inputDataStr = fs.readFileSync(input, {encoding: 'utf8'})
const inputData = JSON.parse(inputDataStr)
const machine = createMachine(inputData)

console.log(visualize(inputData))

fs.writeFile('input.dot', visualize(inputData), err => {
    if (err) {
        console.log(err);
    } 
    else {
        console.log("Input visualized\n");
    }

    const outputData = action === 'morph'
    ? machine.morph()
    : action === 'min'
        ? machine.minimize()
        : undefined

    if (!outputData) {
        throw new Error(`unknown action: ${action}`)
    }

    fs.writeFile(output, JSON.stringify(outputData), err => {
        if (err) {
            console.log(err);
        } 
        else {
            console.log("Result written successfully\n");
        }

        fs.writeFile('output.dot', visualize(outputData), err => {
            if (err) {
                console.log(err);
            } 
            else {
                console.log("Input visualized\n");
            }
        })
    })
})

function createMachine(data: Mealy | Moore): MooreMachine | MealyMachine {
    if (data.type === 'mealy') {
        return createMealyMachine(data)
    }
    if (data.type === 'moore') {
        return createMachine(data)
    }
    throw new Error(`unknown machine type`)
}

