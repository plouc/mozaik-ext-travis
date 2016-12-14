import React, { Component, PropTypes }     from 'react'
import BuildHistoryItem, { BuildPropType } from './BuildHistoryItem'
import { TrapApiError }                    from 'mozaik/ui'


class BuildHistory extends Component {
    static getApiRequest({ owner, repository }) {
        return {
            id:     `travis.buildHistory.${owner}.${repository}`,
            params: { owner, repository }
        }
    }

    render() {
        const { owner, repository, apiData: builds, apiError } = this.props

        return (
            <div>
                <div className="widget__header">
                    <span>
                        <span className="widget__header__subject">{owner}/{repository}</span> build history
                    </span>
                    <i className="fa fa-bug" />
                </div>
                <div className="widget__body">
                    <TrapApiError error={apiError}>
                        <div>
                            {builds.map(build => (
                                <BuildHistoryItem key={build.id} build={build} />
                            ))}
                        </div>
                    </TrapApiError>
                </div>
            </div>
        )
    }
}

BuildHistory.propTypes = {
    owner:      PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
    apiData:    PropTypes.arrayOf(BuildPropType),
    apiError:   PropTypes.object,
}

BuildHistory.defaultProps = {
    apiData: [],
}


export default BuildHistory
