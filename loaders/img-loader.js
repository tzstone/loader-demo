const { getOptions } = require('loader-utils')
const mime = require('mime')

module.exports = function(content) {
    const options = getOptions(this)
    var mimetype = mime.getType(this.resourcePath)
    content = new Buffer(content)

    return "module.exports = " + JSON.stringify("data:" + (mimetype ? mimetype + ";" : "") + "base64," + content.toString("base64"));
}

// 通过设置 raw，loader 可以接收原始的 Buffer
module.exports.raw = true;