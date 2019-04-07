'use strict'

class Utils {

    getMinTermFromInputTable(minTerm, inputTable) {
        let res = []
        for (let i = 0; i < minTerm.length; i++) {
            res.push(inputTable[minTerm[i]])
        }
        return res
    }
    /**
     * make a 2 dimentions array
     * covering all possible combination for i boolean entry
     * 
     * @param {number} i entries number
     */
    makeTruthTableEntries(i) {
        if (i == 1) {
            return [[0], [1]]// => [[0,1],[]]
        }
        let old = this.makeTruthTableEntries(i - 1)
        let res = []
        for (let j in old) {
            res.push(old[j].concat([0]), old[j].concat([1]))
        }
        return res
    }
    /**
     *  make a 2 dimentions array
     *  covering all possible combination for i boolean entry
     *  str is slower for later calculations
     * @param {number} i entries number
     */
    makeTruthTableEntriesStr(i) {
        if (i == 1) {
            return ["0", "1"]// => [[0,1],[]]
        }
        let old = this.makeTruthTableEntriesStr(i - 1)
        let res = []
        for (let j = 0; j < old.length; j++) {
            res.push(old[j] + "0", old[j] + "1")
        }
        return res
    }
    getIndexes(letters, header) {

        let res = {}
        for (let i = 0; i < letters.length; i++) {
            res[letters[i]] = header.indexOf(letters[i])
            if (res[letters[i]] == -1) {
                throw "invalid expression !"
            }
        }
        return res
    }
    uniqFast(a) {
        let seen = {};
        let out = [];
        let len = a.length;
        let j = 0;
        for (let i = 0; i < len; i++) {
            let item = a[i];
            if (seen[item] !== 1) {
                seen[item] = 1;
                out[j++] = item;
            }
        }
        return out;
    }
    generateHeaderFromFuncExpr(functionExpression) {
        let match = functionExpression.match(/[a-zA-Z]/g).sort()
        return this.uniqFast(match)
    }
    generateHeaderFromMinTermsB10(minTermsB10) {
        let max=minTermsB10.reduce((prev, curr, index) => prev = curr > prev ? curr : prev)
        let i=0
        while((2**i)-1<max){
            i++
        }
        let header=[]
        while(i--){
            header.push(String.fromCharCode('A'.charCodeAt(0)+i))

        }
        header.sort()
        return header
    }
}

module.exports = new Utils()