import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BuildsIcon from 'react-icons/lib/fa/bug'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
} from '@mozaik/ui'
import { ResponsiveChart as Chart, Scale, Axis, Grid, Bars } from 'nivo'
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
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest({ owner, repository }) {
        return {
            id: `travis.buildHistory.${owner}.${repository}`,
            params: { owner, repository },
        }
    }

    render() {
        const { owner, repository, title, apiData, apiError } = this.props
        const { theme } = this.context

        let body = <WidgetLoader />
        if (apiData) {
            const data = apiData.builds
                .map(build => {
                    return {
                        id: build.number,
                        duration: build.duration / 60, // converts s to mn
                        state: build.state,
                    }
                })
                .reverse()

            body = (
                <Chart margin={margin} data={data} theme={theme.charts}>
                    <Scale
                        id="duration"
                        type="linear"
                        dataKey="duration"
                        axis="y"
                    />
                    <Scale
                        id="id"
                        type="band"
                        dataKey="id"
                        axis="x"
                        padding={0.3}
                    />
                    <Grid yScale="duration" />
                    <Axis
                        scaleId="duration"
                        position="left"
                        tickSize={0}
                        tickPadding={7}
                        legend="duration (mn)"
                        legendPosition="center"
                        legendOffset={-40}
                    />
                    <Axis
                        scaleId="id"
                        position="bottom"
                        tickSize={0}
                        tickPadding={7}
                        legend="build number"
                        legendPosition="center"
                        legendOffset={40}
                    />
                    <Bars
                        xScale="id"
                        x="id"
                        yScale="duration"
                        y="duration"
                        color="#fff"
                    />
                </Chart>
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
