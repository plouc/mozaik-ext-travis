import Promise from 'bluebird';
import Travis  from 'travis-ci';
import _       from 'lodash';
import chalk   from 'chalk';


/**
 * @param {Mozaik} mozaik
 * @returns {Function}
 */
const client = mozaik => {
    const travis = new Travis({
        version: '2.0.0'
    });

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
            const def = Promise.defer();

            mozaik.logger.info(chalk.yellow(`[travis] calling repository: ${owner}/${repository}`));

            travis.repos(owner, repository).get((err, res) => {
                if (err) {
                    def.reject(err);
                }

                def.resolve(res.repo);
            });

            return def.promise;
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
            const def = Promise.defer();

            mozaik.logger.info(chalk.yellow(`[travis] calling buildHistory: ${owner}/${repository}`));

            travis.repos(owner, repository).builds.get((err, res) => {
                if (err) {
                    def.reject(err);
                }

                res.builds.forEach(build => {
                    const commit = _.find(res.commits, { id: build.commit_id });
                    if (commit) {
                        build.commit = commit;
                    }
                });

                def.resolve(res.builds);
            });

            return def.promise;
        }
    };
};


export default client;
