'use strict'

const { omit } = require('lodash')
const { Travis } = require('./travis')

const states = ['received', 'created', 'started', 'errored', 'failed', 'passed']

/**
 * @param {Mozaik} mozaik
 * @returns {Function}
 */
const client = mozaik => {
    const travis = new Travis(
        'https://api.travis-ci.org',
        process.env.TRAVIS_API_TOKEN,
        mozaik.request,
        mozaik.logger
    )

    return {
        /**
         * Fetch repository info.
         *
         * @param {string} owner
         * @param {string} repository
         *
         * @returns {Promise}
         */
        async repository({ owner, repository: repo }) {
            const repositoryId = `${owner}/${repo}`

            const repository = await travis.getRepository(repositoryId)
            const default_branch = await travis.getRepositoryBranch(
                repositoryId,
                repository.default_branch.name
            )

            let last_build
            if (default_branch.last_build !== undefined) {
                last_build = travis.removeItemMeta(default_branch.last_build)
            }

            return {
                ...repository,
                default_branch: omit(default_branch, ['last_build']),
                last_build,
            }
        },

        /**
         * Fetch latest build.
         *
         * @param {string} owner
         * @param {string} repository
         * @param {string} [branchName]
         *
         * @returns {Promise}
         */
        async latestRepositoryBuild({ owner, repository: repo, branchName }) {
            const repositoryId = `${owner}/${repo}`

            const repository = await travis.getRepository(repositoryId)
            const branch = await travis.getRepositoryBranch(
                repositoryId,
                branchName || repository.default_branch.name
            )

            let last_build
            if (branch.last_build !== undefined) {
                last_build = await travis.getBuild(branch.last_build.id, [
                    'job.state',
                    'job.number',
                    'job.started_at',
                    'job.finished_at',
                    'job.queue',
                ])
            }

            return {
                ...repository,
                current_branch: omit(branch, ['last_build']),
                last_build,
            }
        },

        /**
         * Fetch repository build history.
         *
         * @param {string} owner
         * @param {string} repository
         * @param {number} limit
         *
         * @returns {Promise}
         */
        async repositoryBuildHistory({ owner, repository: repo, limit }) {
            const repositoryId = `${owner}/${repo}`

            const repository = await travis.getRepository(repositoryId)
            const builds = await travis.getRepositoryBuilds(repositoryId, { limit })

            return {
                repository,
                builds,
            }
        },

        /**
         * Fetch repository builds stats.
         *
         * @param {string} owner
         * @param {string} repository
         *
         * @returns {Promise}
         */
        async repositoryBuildsStats({ owner, repository: repo }) {
            const repositoryId = `${owner}/${repo}`

            const total = await travis
                .getRepositoryBuilds(repositoryId, { limit: 1 })
                .then(({ pagination }) => pagination.count)
            const byState = await Promise.all(
                states.map(state =>
                    travis
                        .getRepositoryBuilds(repositoryId, {
                            limit: 1,
                            state,
                        })
                        .then(({ pagination }) => pagination.count)
                )
            ).then(counts =>
                counts.map((count, i) => ({
                    state: states[i],
                    count,
                }))
            )

            return { total, stats: byState }
        },
    }
}

module.exports = client
