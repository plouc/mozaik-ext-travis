'use strict';

var Travis = require('travis-ci');
var _ = require('lodash');
var chalk = require('chalk');

/**
 * @param {Mozaik} mozaik
 * @returns {Function}
 */
var client = function client(mozaik) {
    var travis = new Travis({
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
        repository: function repository(_ref) {
            var owner = _ref.owner,
                _repository = _ref.repository;

            return new Promise(function (resolve, reject) {
                mozaik.logger.info(chalk.yellow('[travis] calling repository: ' + owner + '/' + _repository));

                travis.repos(owner, _repository).get(function (err, res) {
                    if (err) return reject(err);

                    resolve(res.repo);
                });
            });
        },


        /**
         * Fetch repository build history.
         *
         * @param {object} params
         * @param {string} params.owner
         * @param {string} params.repository
         * @returns {Promise}
         */
        buildHistory: function buildHistory(_ref2) {
            var owner = _ref2.owner,
                repository = _ref2.repository;

            return new Promise(function (resolve, reject) {
                mozaik.logger.info(chalk.yellow('[travis] calling buildHistory: ' + owner + '/' + repository));

                travis.repos(owner, repository).builds.get(function (err, res) {
                    if (err) return reject(err);

                    res.builds.forEach(function (build) {
                        var commit = _.find(res.commits, { id: build.commit_id });
                        if (commit) {
                            build.commit = commit;
                        }
                    });

                    resolve(res.builds);
                });
            });
        }
    };
};

module.exports = client;