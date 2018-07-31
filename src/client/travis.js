'use strict'

const chalk = require('chalk')
const { omit } = require('lodash')

class Travis {
    constructor(baseUrl, token, request, logger) {
        this.baseUrl = baseUrl
        this.token = token
        this.request = request
        this.logger = logger
    }

    makeRequest(path, qs) {
        const uri = `${this.baseUrl}${path}`

        const options = {
            uri,
            qs,
            json: true,
            resolveWithFullResponse: true,
            headers: {
                'Travis-API-Version': '3',
                Authorization: `token ${this.token}`,
            },
        }

        const paramsDebug = qs ? ` ${JSON.stringify(qs)}` : ''
        this.logger.info(chalk.yellow(`[travis] calling ${uri}${paramsDebug}`))

        return this.request(options)
    }

    removeItemMeta(entity) {
        return omit(entity, ['@href', '@permissions', '@representation', '@type'])
    }

    getRepository(repositoryId) {
        return this.makeRequest(`/repo/${encodeURIComponent(repositoryId)}`).then(res => {
            return this.removeItemMeta(res.body)
        })
    }

    getRepositoryBranch(repositoryId, branchName) {
        return this.makeRequest(
            `/repo/${encodeURIComponent(repositoryId)}/branch/${branchName}`
        ).then(res => {
            return this.removeItemMeta(res.body)
        })
    }

    getRepositoryBuilds(repositoryId, options = {}) {
        return this.makeRequest(`/repo/${encodeURIComponent(repositoryId)}/builds`, options).then(
            res => {
                return {
                    pagination: res.body['@pagination'],
                    items: res.body.builds.map(build => this.removeItemMeta(build)),
                }
            }
        )
    }

    getBuild(buildId, include = []) {
        return this.makeRequest(`/build/${buildId}`, {
            include: include.join(','),
        }).then(res => {
            return this.removeItemMeta(res.body)
        })
    }
}

exports.Travis = Travis
