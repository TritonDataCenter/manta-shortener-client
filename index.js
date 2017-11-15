var assert = require('assert-plus');
var restifyclients = require('restify-clients');

var NO_DE_URL = 'http://i.no.de/';
// var NO_DE_URL = 'http://localhost:8080/';

/**
 * Shorten the provided url using the no.de shortener service.
 *
 * @param {Object} opts Must include the url.
 * @param {Function} callback (err, shorturl)
 */
function shorten(opts, callback) {
    assert.object(opts, 'opts');
    assert.string(opts.url, 'opts.url');
    assert.optionalNumber(opts.expires, 'opts.expires');

    var jsonClient = restifyclients.createJsonClient({
        url: NO_DE_URL,
    });

    jsonClient.post('/', opts, function _noDeCb(err, req, res, obj) {
        if (err) {
            callback(err);
            return;
        }

        callback(null, obj.link);
    });
}

module.exports = {
    shorten: shorten
};
