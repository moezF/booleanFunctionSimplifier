'use strict'
const Utils = require('./Utils')
class QuineMcCluskey {

    
    ChechAndCombine(minTerm1, minTerm2) {
        let res = []
        let changes = 0
        for (let i = 0; i < minTerm1.length; i++) {
            if (minTerm1[i] == minTerm2[i]) {
                res.push(minTerm1[i])
            } else {
                res.push(-1)
                changes++
            }
        }
        if (changes > 1) {
            return null
        }
        return res
    }

    hasEqualValues(arr1, arr2) {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                return false
            }
        }
        return true
    }

    removeDuplicate(matDup) {
        //remove duplicates
        let doubleMark = []
        let matNoDouble = []
        for (let i = 0; i < matDup.length; i++) {
            for (let j = i + 1; j < matDup.length; j++) {
                if (doubleMark[i] != 1 && this.hasEqualValues(matDup[i], matDup[j])) {
                    doubleMark[j] = 1
                }
            }
        }
        for (let i = 0; i < matDup.length; i++) {
            if (doubleMark[i] != 1) {
                matNoDouble.push(matDup[i])
            }
        }
        return matNoDouble
    }

    findPrimeImplicant(mat) {
        let combinedMark = []
        let newMat = []
        //combine 
        for (let i = 0; i < mat.length; i++) {
            for (let j = i + 1; j < mat.length; j++) {
                let combination = this.ChechAndCombine(mat[i], mat[j])
                if (combination != null) {
                    newMat.push(combination)
                    combinedMark[i] = 1
                    combinedMark[j] = 1
                }
            }
        }

        // let newMatNoDouble = this.removeDuplicate(newMat)
        let newMatNoDouble = Utils.uniqFast(newMat)

        //get the ones that can't be combined
        let lastMat = []
        for (let i = 0; i < mat.length; i++) {
            if (combinedMark[i] != 1) {
                lastMat.push(mat[i])
            }
        }

        if (lastMat.length != mat.length && mat.length != 1) {
            return lastMat.concat(this.findPrimeImplicant(newMatNoDouble))
        }
        return lastMat
    }
}

module.exports = new QuineMcCluskey()