import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ResponsiveBar } from '@nivo/bar'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    BarChartIcon,
} from '@mozaik/ui'
import { BuildPropType } from './BuildHistoryItem'
import { colorByState } from '../lib/state'

const margin = { top: 10, right: 20, bottom: 80, left: 70 }

export default class BuildHistogram extends Component {
    static propTypes = {
        owner: PropTypes.string.isRequired,
        repository: PropTypes.string.isRequired,
        limit: PropTypes.number.isRequired,
        title: PropTypes.string,
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
        limit: 20,
    }

    static getApiRequest({ owner, repository, limit = BuildHistogram.defaultProps.limit }) {
        return {
            id: `travis.repositoryBuildHistory.${owner}.${repository}.${limit}`,
            params: { owner, repository, limit },
        }
    }

    render() {
        const { owner, repository, title, apiData, apiError, theme } = this.props

        let count
        let body = <WidgetLoader />
        if (apiData) {
            count = apiData.builds.pagination.count
            const chartData = apiData.builds.items
                .map(build => ({
                    build: build.number,
                    duration: Number((build.duration / 60).toFixed(2)), // converts s to mn
                    color: colorByState(theme.colors, build.state),
                }))
                .reverse()

            body = (
                <ResponsiveBar
                    margin={margin}
                    data={chartData}
                    indexBy="build"
                    keys={['duration']}
                    padding={0.2}
                    theme={theme.charts}
                    animate={false}
                    colorBy={d => d.data.color}
                    enableLabel={false}
                    axisLeft={{
                        tickPadding: 7,
                        tickSize: 0,
                        legend: 'duration (mn)',
                        legendPosition: 'center',
                        legendOffset: -40,
                    }}
                    axisBottom={{
                        tickSize: 0,
                        tickPadding: 10,
                        legend: 'build number',
                        legendPosition: 'center',
                        legendOffset: 60,
                        tickRotation: -90,
                        format: number => `#${number}`,
                    }}
                />
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'builds'}
                    subject={title ? null : `${owner}/${repository}`}
                    count={count}
                    icon={BarChartIcon}
                />
                <WidgetBody disablePadding={true} style={{ overflowY: 'hidden' }}>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
