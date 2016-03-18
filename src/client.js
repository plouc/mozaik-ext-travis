import Promise from 'bluebird';
import Travis  from 'travis-ci';
import _       from 'lodash';
import chalk   from 'chalk';

var travis = new Travis({
    version: '2.0.0'
});

/**
 * @param {Mozaik} context
 */
const client = (context) => {
    return {
        repository(params) {
            const def = Promise.defer();

            travis.repos(params.owner, params.repository).get((err, res) => {
                if (err) {
                    def.reject(err);
                }

                def.resolve(res.repo);
            });

            return def.promise;
        },

        buildHistory(params) {
            const def = Promise.defer();

            travis.repos(params.owner, params.repository).builds.get((err, res) => {
                if (err) {
                    def.reject(err);
                }

                res.builds.forEach(build => {
                    let commit = _.find(res.commits, { id: build.commit_id });
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
