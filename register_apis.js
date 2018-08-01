'use strict'

module.exports = server => {
    server.registerApi('gitlab', require('@mozaik/ext-travis/client'))
}
