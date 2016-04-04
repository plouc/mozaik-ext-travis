import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import BuildHistoryItem                from './BuildHistoryItem.jsx';
import Mozaik                          from 'mozaik/browser';


class BuildHistory extends Component {
    constructor(props) {
        super(props);

        this.state = { builds: [] };
    }

    getApiRequest() {
        const { owner, repository } = this.props;

        return {
            id:     `travis.buildHistory.${owner}.${repository}`,
            params: { owner, repository }
        };
    }

    onApiData(builds) {
        this.setState({ builds });
    }

    render() {
        const { owner, repository } = this.props;
        const { builds }            = this.state;

        const buildNodes = builds.map(build => (
            <BuildHistoryItem key={build.id} build={build} />
        ));

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{owner}/{repository}</span> build history
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {buildNodes}
                </div>
            </div>
        );
    }
}

BuildHistory.displayName = 'BuildHistory';

BuildHistory.propTypes = {
    owner:      React.PropTypes.string.isRequired,
    repository: React.PropTypes.string.isRequired
};

reactMixin(BuildHistory.prototype, ListenerMixin);
reactMixin(BuildHistory.prototype, Mozaik.Mixin.ApiConsumer);


export default BuildHistory;
