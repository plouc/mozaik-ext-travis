import React, { Component, PropTypes } from 'react';
import reactMixin                      from 'react-mixin';
import { ListenerMixin }               from 'reflux';
import _                               from 'lodash';
import Mozaik                          from 'mozaik/browser';
const { BarChart }                     = Mozaik.Component;


class BuildHistogram extends Component {
    constructor(props) {
        super(props);
        this.state = { builds: [] };
    }

    getApiRequest() {
        let { owner, repository } = this.props;

        return {
            id:     `travis.buildHistory.${ owner }.${ repository }`,
            params: {
                owner:      owner,
                repository: repository
            }
        };
    }

    onApiData(builds) {
        this.setState({ builds: _.clone(builds).reverse() });
    }

    render() {
        let { owner, repository } = this.props;
        let { builds }            = this.state;

        // converts to format required by BarChart component
        let data = builds.map(build => {
            return {
                x:     build.number,
                y:     build.duration / 60, // converts s to mn
                state: build.state
            };
        });

        let barChartOptions = {
            mode:            'stacked',
            xLegend:         'build number',
            xLegendPosition: 'right',
            yLegend:         'duration (minutes)',
            yLegendPosition: 'top',
            xPadding:        0.3,
            barClass:        function (d) { return `result--${ d.state }`; }
        };

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">{owner}/{repository}</span> build histogram
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    <BarChart data={[{ data: data }]} options={barChartOptions}/>
                </div>
            </div>
        );
    }
}

BuildHistogram.propTypes = {
    owner:      PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired
};

reactMixin(BuildHistogram.prototype, ListenerMixin);
reactMixin(BuildHistogram.prototype, Mozaik.Mixin.ApiConsumer);

export { BuildHistogram as default };
