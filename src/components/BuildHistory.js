import React, { Component, PropTypes }     from 'react'
import BuildHistoryItem, { BuildPropType } from './BuildHistoryItem'


class BuildHistory extends Component {
    static getApiRequest({ owner, repository }) {
        return {
            id:     `travis.buildHistory.${owner}.${repository}`,
            params: { owner, repository }
        }
    }

    render() {
        const { owner, repository, apiData: builds } = this.props

        const buildNodes = builds.map(build => (
            <BuildHistoryItem key={build.id} build={build} />
        ))

        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{owner}/{repository}</span> build history
                    </span>
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    {buildNodes}
                </div>
            </div>
        )
    }
}

BuildHistory.propTypes = {
    owner:      PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
    apiData:    PropTypes.arrayOf(BuildPropType),
}

BuildHistory.defaultProps = {
    apiData: [],
}


export default BuildHistory
