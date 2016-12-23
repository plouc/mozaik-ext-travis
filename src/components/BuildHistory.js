import React, { Component, PropTypes }     from 'react'
import BuildHistoryItem, { BuildPropType } from './BuildHistoryItem'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
} from 'mozaik/ui'


export default class BuildHistory extends Component {
    static propTypes = {
        owner:      PropTypes.string.isRequired,
        repository: PropTypes.string.isRequired,
        apiData:    PropTypes.shape({
            builds: PropTypes.arrayOf(BuildPropType).isRequired,
        }),
        apiError:   PropTypes.object,
    }

    static getApiRequest({ owner, repository }) {
        return {
            id:     `travis.buildHistory.${owner}.${repository}`,
            params: { owner, repository }
        }
    }

    render() {
        const { owner, repository, apiData, apiError } = this.props

        let body = <WidgetLoader />
        if (apiData) {
            body = (
                <div>
                    {apiData.builds.map(build => (
                        <BuildHistoryItem key={build.id} build={build} />
                    ))}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title="build history"
                    subject={`${owner}/${repository}`}
                    icon="bug"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
