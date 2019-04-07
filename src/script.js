'use strict'
const fs = require('fs')
const evaluator = require('./evaluator')
const FormulaGenerator = require('./FormulaGenerator')
const QuineMcCluskey = require("./QuineMcCluskey")
const Utils = require('./Utils')

function entryValToString(entryval) {
    let res = ''
    let line = ''
    for (let key in entryval) {
        let line = ''
        for (let i = 0; i < entryval[key].length; i++) {
            line += entryval[key][i] + '\t'
        }
        res += line + '\n'
    }
    return res
}
function printHowToUse() {
    console.log("enter -m 'minter1,minterm2....' to get simplified formula from minterms")
    console.log('enter -t \'variableNames\' (function) to get simplified formula from function with the specified header')
    console.log('enter (function)  to get simplified formula from function')
}
function lunch() {
    let start = new Date().getTime()
    let header, result
    if (process.argv[2] == "-h" | process.argv[2] == "-help" | process.argv[2] == "--help") {
        printHowToUse()
        return
    }else
    if (process.argv[2] == "-m") {
        let minterm=process.argv[3].split(',')
        minterm=minterm.map((value)=>parseInt(value))
        result = FormulaGenerator.generateFormulaFromMinTerm(minterm)
    } else if (process.argv[2] == "-t") {
        header = process.argv[3].split('')
        result = FormulaGenerator.generateFormulaFromFunction(process.argv[4], header)
    } else {
        result = FormulaGenerator.generateFormulaFromFunction(process.argv[2])
    }
    console.log(result)


    // let header = ["A", "B", "C", "D", "E"]//, "F", "G", "H", "I", "P", "Q", "R", "S", "T", "U"
    // let tableInput=Utils.makeTruthTableEntries(header.length)
    // let minterm=[tableInput[7],tableInput[11],tableInput[17],tableInput[30]]
    // let formula=FormulaGenerator.primeImplicantToSum(QuineMcCluskey.findPrimeImplicant(minterm),header)
    console.log("processing time: "+(new Date().getTime() - start)+"ms")
}
lunch()
process.argv[0]
