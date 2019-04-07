'use strict'
const Utils = require('./Utils')

class Evaluator {
    evaluate(operator, value1, value2) {
        switch (operator) {
            case "&":
                return value1 & value2
                break;
            case "|":
                return value1 | value2
                break;
            case "=>":
                return !value1 | value2
                break;
            case "!":
                return !parseInt(value1)
                break;
        }
    }

    evaluateExpr(expr) {

        let res = expr.match(/(\(([&|]),(\(.*?\)|[10]),(\(.*\)|[10])\))|(\((!),(\(.*\)|[01])\))/)
        let param

        if (res[1]) {
            param = [res[2], res[3], res[4],]
        }
        else if (res[5]) {
            param = [res[6], res[7]]
        } else {
            throw "no match for the regex"
        }

        for (let i = 1; i < param.length; i++) {
            if (param[i].indexOf('(') != -1) {
                param[i] = this.evaluateExpr(param[i])
            }
        }

        return this.evaluate.apply(this, param)
    }

    letterValMapper(entry, header, expr) {
        let col = []
        let letters = expr.match(/[A-Za-z]/g)
        let indexes = Utils.getIndexes(letters, header)

        for (let i = 0; i < entry.length; i++) {
            let tempExpr = expr
            for (let letter in indexes) {
                let reg = RegExp(letter, 'g')
                tempExpr = tempExpr.replace(reg, entry[i][indexes[letter]])
            }
            col.push(tempExpr)
        }
        return col
    }

    evaluateFunction(header, expr, entry) {
        let tableInput
        if (arguments[2]) {
            tableInput = entry
        } else {
            tableInput = Utils.makeTruthTableEntries(header.length)
        }
        let expressions = this.letterValMapper(entry, header, expr)
        let res = []
        for (let i = 0; i < expressions.length; i++) {
            res.push(this.evaluateExpr(expressions[i]))
        }
        return res
    }
}

module.exports = new Evaluator