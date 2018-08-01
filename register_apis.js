'use strict'

module.exports = server => {
    server.registerApi('travis', require('@mozaik/ext-travis/client'))
}
