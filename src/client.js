'use strict'

const Travis = require('travis-ci')
const _ = require('lodash')
const chalk = require('chalk')

/**
 * @param {Mozaik} mozaik
 * @returns {Function}
 */
const client = mozaik => {
    const travis = new Travis({
        version: '2.0.0',
    })

    return {
        /**
         * Fetch repository info.
         *
         * @param {object} params
         * @param {string} params.owner
         * @param {string} params.repository
         * @returns {Promise}
         */
        repository({ owner, repository }) {
            return new Promise((resolve, reject) => {
                mozaik.logger.info(
                    chalk.yellow(`[travis] calling repository: ${owner}/${repository}`)
                )

                travis.repos(owner, repository).get((err, res) => {
                    if (err) return reject(err)

                    resolve(res.repo)
                })
            })
        },

        /**
         * Fetch repository build history.
         *
         * @param {object} params
         * @param {string} params.owner
         * @param {string} params.repository
         * @returns {Promise}
         */
        buildHistory({ owner, repository }) {
            return new Promise((resolve, reject) => {
                mozaik.logger.info(
                    chalk.yellow(`[travis] calling buildHistory: ${owner}/${repository}`)
                )

                travis.repos(owner, repository).builds.get((err, res) => {
                    if (err) return reject(err)

                    res.builds.forEach(build => {
                        const commit = _.find(res.commits, {
                            id: build.commit_id,
                        })
                        if (commit) {
                            build.commit = commit
                        }
                    })

                    resolve({ builds: res.builds })
                })
            })
        },
    }
}

module.exports = client
