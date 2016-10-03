'use strict'

var cheerio = require('cheerio')
var Acho = require('acho')
var decode = require('he').decode
var got = require('got')
var fs = require('fs')
var log = Acho()

var CONST = {
  URL: 'https://twitter.github.io/twemoji/2/test/preview.html',
  MAIN_FILE: 'index.js'
}

function exitOnError (err) {
  log.error(err)
  process.exit(err.code || 1)
}

function stringify (val) {
  return JSON.stringify(val, null, 2)
}

got(CONST.URL, function (err, data, res) {
  if (err) return exitOnError(err)
  var $ = cheerio.load(data)

  var emojis = $('li').map(function (i, el) {
    console.log(decode(el.children[0].data))

    var emoji = 'decode($(this).text())'
    // log.debug('detected', emoji)
    return emoji
  }).get()

  log.info('total:', emojis.length)
  fs.writeFileSync(CONST.MAIN_FILE, 'module.exports = ' + stringify(emojis), 'utf8')
  log.info('saved at', CONST.MAIN_FILE)
})
