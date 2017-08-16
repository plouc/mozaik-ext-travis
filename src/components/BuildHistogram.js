import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BuildsIcon from 'react-icons/lib/fa/bug'
import { TrapApiError, Widget, WidgetHeader, WidgetBody, WidgetLoader } from '@mozaik/ui'
import { ResponsiveBar } from 'nivo'
import { BuildPropType } from './BuildHistoryItem'

const margin = { top: 20, right: 20, bottom: 60, left: 70 }

export default class BuildHistogram extends Component {
    static propTypes = {
        owner: PropTypes.string.isRequired,
        repository: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiData: PropTypes.shape({
            builds: PropTypes.arrayOf(BuildPropType).isRequired,
        }),
        apiError: PropTypes.object,
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest({ owner, repository }) {
        return {
            id: `travis.buildHistory.${owner}.${repository}`,
            params: { owner, repository },
        }
    }

    render() {
        const { owner, repository, title, apiData, apiError, theme } = this.props

        const colorsMapping = {
            failed: theme.colors.failure,
            errored: theme.colors.success,
            passed: theme.colors.success,
            canceled: theme.colors.unknown,
        }

        let body = <WidgetLoader />
        if (apiData) {
            const chartData = [
                {
                    id: 'builds',
                    data: apiData.builds
                        .map(build => ({
                            x: build.number,
                            y: Number((build.duration / 60).toFixed(2)), // converts s to mn
                            color: colorsMapping[build.state],
                        }))
                        .reverse(),
                },
            ]

            body = (
                <ResponsiveBar
                    margin={margin}
                    data={chartData}
                    xPadding={0.3}
                    theme={theme.charts}
                    animate={false}
                    colorBy={d => d.color}
                    enableLabels={false}
                    axisLeft={{
                        tickPadding: 7,
                        tickSize: 0,
                        legend: 'duration (mn)',
                        legendPosition: 'center',
                        legendOffset: -40,
                    }}
                    axisBottom={{
                        tickSize: 0,
                        tickPadding: 7,
                        legend: 'build number',
                        legendPosition: 'center',
                        legendOffset: 40,
                    }}
                />
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Builds'}
                    subject={title ? null : `${owner}/${repository}`}
                    icon={BuildsIcon}
                />
                <WidgetBody style={{ overflowY: 'hidden' }}>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
