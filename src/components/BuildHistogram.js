import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import { BarChart }                    from 'mozaik/ui'
import { BuildPropType }               from './BuildHistoryItem'


class BuildHistogram extends Component {
    static getApiRequest({ owner, repository }) {
        return {
            id:     `travis.buildHistory.${ owner }.${ repository }`,
            params: { owner, repository },
        }
    }

    render() {
        let { owner, repository, apiData: builds } = this.props

        builds = _.clone(builds).reverse()

        // converts to format required by BarChart component
        let data = builds.map(build => {
            return {
                x:     build.number,
                y:     build.duration / 60, // converts s to mn
                state: build.state
            }
        })

        let barChartOptions = {
            mode:            'stacked',
            xLegend:         'build number',
            xLegendPosition: 'right',
            yLegend:         'duration (minutes)',
            yLegendPosition: 'top',
            xPadding:        0.3,
            barClass:        function (d) { return `result--${ d.state }` }
        }

        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{owner}/{repository}</span> build histogram
                    </span>
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    <BarChart data={[{ data: data }]} options={barChartOptions}/>
                </div>
            </div>
        )
    }
}

BuildHistogram.propTypes = {
    owner:      PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
    apiData:    PropTypes.arrayOf(BuildPropType),
}

BuildHistogram.defaultProps = {
    apiData: [],
}


export default BuildHistogram
