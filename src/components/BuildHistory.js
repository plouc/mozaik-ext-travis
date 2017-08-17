import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BuildsIcon from 'react-icons/lib/fa/bug'
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui'
import BuildHistoryItem, { BuildPropType } from './BuildHistoryItem'

export default class BuildHistory extends Component {
    static propTypes = {
        owner: PropTypes.string.isRequired,
        repository: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            builds: PropTypes.arrayOf(BuildPropType).isRequired,
        }),
        apiError: PropTypes.object,
    }

    static getApiRequest({ owner, repository }) {
        return {
            id: `travis.buildHistory.${owner}.${repository}`,
            params: { owner, repository },
        }
    }

    render() {
        const { owner, repository, title, apiData, apiError } = this.props

        let body = <WidgetLoader />
        if (apiData) {
            body = (
                <div>
                    {apiData.builds.map(build => <BuildHistoryItem key={build.id} build={build} />)}
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Builds'}
                    subject={title ? null : `${owner}/${repository}`}
                    icon={BuildsIcon}
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
