var components = {
    Repository:     require('./Repository.jsx'),
    BuildHistory:   require('./BuildHistory.jsx'),
    BuildHistogram: require('./BuildHistogram.jsx')
};

require('mozaik/browser')
    .add('travis.repository',      components.Repository)
    .add('travis.build_history',   components.BuildHistory)
    .add('travis.build_histogram', components.BuildHistogram)
;

module.exports = components;