import React, { Component, PropTypes }     from 'react'
import BuildHistoryItem, { BuildPropType } from './BuildHistoryItem'
import {
    TrapApiError,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'


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
                <WidgetHeader
                    title="build history"
                    subject={`${owner}/${repository}`}
                    icon="bug"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        <div>
                            {builds.map(build => (
                                <BuildHistoryItem key={build.id} build={build} />
                            ))}
                        </div>
                    </TrapApiError>
                </WidgetBody>
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
