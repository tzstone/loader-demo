const { getOptions } = require('loader-utils')
const css = require('css')

module.exports = function(cssText) {
    var options = getOptions(this)
    var astTree = css.parse(cssText)
    var firstRule = astTree.stylesheet.rules[0]
    var reg = /\b(\d+(\.\d+)?)px\b/g

    if (!firstRule) return cssText

    var px2rem = function(val) {
        return val.replace(reg, function($0, $1) {
            return `${$1/options.base}rem`
        })
    }   

    var processRules = function(rules) {
        rules.forEach(function(rule, idx, arr) {
            console.log('rule', rule)
            if (rule.type === 'media') return processRules(rule.rules)
            if (rule.type === 'keyframes') return processRules(rule.keyframes)
            if (rule.type !== 'rule' && rule.type !== 'keyframe') return

            rule.declarations.forEach(function(dec, i) {
             //    console.log('dec', dec)
                if (dec.type === 'declaration' && reg.test(dec.value)) {
                    dec.value = px2rem(dec.value)
                }
            })
         })
    }

    processRules(astTree.stylesheet.rules)
    
    // console.log('css cssText', cssText, 'astTree', astTree)
    
    return css.stringify(astTree)
}