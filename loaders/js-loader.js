const { getOptions } = require('loader-utils')

module.exports = function(content) {
    var options = getOptions(this)
    return content.replace(/\[name\]/g, options.name)
}