'use strict'
const QuineMcCluskey = require("./QuineMcCluskeyIterative")
const Utils = require("./Utils")
const evaluator = require('./evaluator')

class FormulaGenerator {

    getMinTerms(tableEntries, tableResult) {
        let minTerms = []
        for (let i = 0; i < tableResult.length; i++) {
            if (tableResult[i] == 1) {
                minTerms.push(tableEntries[i])
            }
        }
        return minTerms
    }

    primeImplicantToSum(primeImplicant, header) {
        let monome = ""
        for (let i = 0; i < primeImplicant.length; i++) {
            for (let j = 0; j < primeImplicant[i].length; j++) {
                if (primeImplicant[i][j] == 1) {
                    monome += header[j]
                }
                if (primeImplicant[i][j] == 0) {
                    monome += "~" + header[j]
                }
            }
            monome += "+"
        }
        return monome.slice(0, monome.length - 1)
    }


    generateFormulaFromTable(tableInput, tableOutput, header) {
        let minterms = this.getMinTerms(tableInput, tableOutput)
        return this.primeImplicantToSum(QuineMcCluskey.findPrimeImplicant(minterms), header)
    }
    generateFormulaFromFunction(functionExpression, header) {
        let h1
        if (header) {
            h1 = header
        } else {
            h1 = Utils.generateHeaderFromFuncExpr(functionExpression)
        }
        let tableInput = Utils.makeTruthTableEntries(h1.length)
        return this.generateFormulaFromTable(tableInput, evaluator.evaluateFunction(h1, functionExpression, tableInput), h1)
    }
    generateFormulaFromMinTerm(mintermsB10) {
        let header=Utils.generateHeaderFromMinTermsB10(mintermsB10)
        let tableInput = Utils.makeTruthTableEntries(header.length)
        let minterm = Utils.getMinTermFromInputTable(mintermsB10, tableInput)
        return this.primeImplicantToSum(QuineMcCluskey.findPrimeImplicant(minterm),header )

    }
}

module.exports = new FormulaGenerator()