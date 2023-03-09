/**
 * locutus.js contains few functions from: https://locutus.io/
 * @since 2019-12-20
 */

// jshint esversion: 8

exports.ucfirst = function (str) {
	//  discuss at: https://locutus.io/php/ucfirst/
	// original by: Kevin van Zonneveld (https://kvz.io)
	// bugFixed by: Onno Marsman (https://twitter.com/onnomarsman)
	// improved by: Brett Zamir (https://brett-zamir.me)
	//   example 1: ucfirst('kevin van Zonneveld')
	//   returns 1: 'Kevin van Zonneveld'

	str += ''
	var f = str.charAt(0).toUpperCase()

	return f + str.substr(1)
};

exports.ucwords = function (str) {
	//  discuss at: https://locutus.io/php/ucwords/
	// original by: Jonas Raoni Soares Silva (https://www.jsfromhell.com)
	// improved by: Waldo Malqui Silva (https://waldo.malqui.info)
	// improved by: Robin
	// improved by: Kevin van Zonneveld (https://kvz.io)
	// bugFixed by: Onno Marsman (https://twitter.com/onnomarsman)
	// bugFixed by: Cetvertacov Alexandr (https://github.com/cetver)
	//    input by: James (https://www.james-bell.co.uk/)
	//   example 1: ucwords('kevin van Zonneveld')
	//   returns 1: 'Kevin Van Zonneveld'
	//   example 2: ucwords('HELLO WORLD')
	//   returns 2: 'HELLO WORLD'
	//   example 3: ucwords('у мэри был маленький ягненок и она его очень любила')
	//   returns 3: 'У Мэри Был Маленький Ягненок И Она Его Очень Любила'
	//   example 4: ucwords('τάχιστη αλώπηξ βαφής ψημένη γη, δρασκελίζει υπέρ νωθρού κυνός')
	//   returns 4: 'Τάχιστη Αλώπηξ Βαφής Ψημένη Γη, Δρασκελίζει Υπέρ Νωθρού Κυνός'

	return (str + '')
		.replace(/^(.)|\s+(.)/g, function ($1) {
			return $1.toUpperCase()
		})
};

exports.utf8_decode = function (strData) { // eslint-disable-line camelCase
	//  discuss at: https://locutus.io/php/utf8_decode/
	// original by: WebToolkit.info (https://www.webtoolkit.info/)
	//    input by: Aman Gupta
	//    input by: Brett Zamir (https://brett-zamir.me)
	// improved by: Kevin van Zonneveld (https://kvz.io)
	// improved by: Norman "zEh" Fuchs
	// bugFixed by: hitWork
	// bugFixed by: Onno Marsman (https://twitter.com/onnomarsman)
	// bugFixed by: Kevin van Zonneveld (https://kvz.io)
	// bugFixed by: kirilloid
	// bugFixed by: w35l3y (https://www.wesley.eti.br)
	//   example 1: utf8_decode('Kevin van Zonneveld')
	//   returns 1: 'Kevin van Zonneveld'

	var tmpArr = []
	var i = 0
	var c1 = 0
	var seqLen = 0

	strData += ''

	while (i < strData.length) {
		c1 = strData.charCodeAt(i) & 0xFF
		seqLen = 0

		// https://en.wikipedia.org/wiki/UTF-8#Codepage_layout
		if (c1 <= 0xBF) {
			c1 = (c1 & 0x7F)
			seqLen = 1
		} else if (c1 <= 0xDF) {
			c1 = (c1 & 0x1F)
			seqLen = 2
		} else if (c1 <= 0xEF) {
			c1 = (c1 & 0x0F)
			seqLen = 3
		} else {
			c1 = (c1 & 0x07)
			seqLen = 4
		}

		for (var ai = 1; ai < seqLen; ++ai) {
			c1 = ((c1 << 0x06) | (strData.charCodeAt(ai + i) & 0x3F))
		}

		if (seqLen === 4) {
			c1 -= 0x10000
			tmpArr.push(String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF)))
			tmpArr.push(String.fromCharCode(0xDC00 | (c1 & 0x3FF)))
		} else {
			tmpArr.push(String.fromCharCode(c1))
		}

		i += seqLen
	}

	return tmpArr.join('')
}

// vim: noexpandtab
