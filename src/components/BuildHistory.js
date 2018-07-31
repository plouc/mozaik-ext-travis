import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    ActivityIcon,
} from '@mozaik/ui'
import BuildHistoryItem, { BuildPropType } from './BuildHistoryItem'

export default class BuildHistory extends Component {
    static propTypes = {
        owner: PropTypes.string.isRequired,
        repository: PropTypes.string.isRequired,
        title: PropTypes.string,
        limit: PropTypes.number.isRequired,
        hideHeader: PropTypes.bool.isRequired,
        apiData: PropTypes.shape({
            builds: PropTypes.shape({
                pagination: PropTypes.shape({
                    count: PropTypes.number.isRequired,
                }).isRequired,
                items: PropTypes.arrayOf(BuildPropType).isRequired,
            }).isRequired,
        }),
        apiError: PropTypes.object,
        theme: PropTypes.object.isRequired,
    }

    static defaultProps = {
        limit: 10,
        hideHeader: false,
    }

    static getApiRequest({ owner, repository, limit = BuildHistory.defaultProps.limit }) {
        return {
            id: `travis.repositoryBuildHistory.${owner}.${repository}.${limit}`,
            params: { owner, repository, limit },
        }
    }

    render() {
        const { owner, repository, title, hideHeader, apiData, apiError, theme } = this.props

        let body = <WidgetLoader />
        let buildCount
        if (apiData && !apiError) {
            buildCount = apiData.builds.pagination.count
            body = (
                <div>
                    {apiData.builds.items.map(build => (
                        <BuildHistoryItem key={build.id} build={build} theme={theme} />
                    ))}
                </div>
            )
        }

        return (
            <Widget>
                {!hideHeader && (
                    <WidgetHeader
                        title={title || 'builds'}
                        subject={title ? null : `${owner}/${repository}`}
                        count={buildCount}
                        icon={ActivityIcon}
                    />
                )}
                <WidgetBody disablePadding={true} isHeaderless={hideHeader}>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
