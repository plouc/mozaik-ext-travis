import React, { Component, PropTypes } from 'react'
import _                               from 'lodash'
import { BuildPropType }               from './BuildHistoryItem'
import {
    TrapApiError,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'
import {
    ResponsiveChart as Chart,
    Scale,
    Axis,
    Grid,
    Bars,
} from 'nivo'


const margin = { top: 20, right: 20, bottom: 60, left: 70 }


export default class BuildHistogram extends Component {
    static propTypes = {
        owner:      PropTypes.string.isRequired,
        repository: PropTypes.string.isRequired,
        apiData:    PropTypes.arrayOf(BuildPropType),
        apiError:   PropTypes.object,
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest({ owner, repository }) {
        return {
            id:     `travis.buildHistory.${ owner }.${ repository }`,
            params: { owner, repository },
        }
    }

    render() {
        const { owner, repository, apiData: _builds, apiError } = this.props
        const { theme }                                         = this.context

        let body = null
        if (_builds) {
            const data = _.clone(_builds).reverse().map(build => {
                return {
                    id:       build.number,
                    duration: build.duration / 60, // converts s to mn
                    state:    build.state,
                }
            })

            body =(
                <Chart margin={margin} data={data} theme={theme.charts}>
                    <Scale id="duration" type="linear" dataKey="duration" axis="y"/>
                    <Scale id="id" type="band" dataKey="id" axis="x" padding={0.3}/>
                    <Grid yScale="duration"/>
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
                    <Bars xScale="id" x="id" yScale="duration" y="duration" color="#fff"/>
                </Chart>
            )
        }

        return (
            <div>
                <WidgetHeader
                    title="build histogram"
                    subject={`${owner}/${repository}`}
                    icon="bug"
                />
                <WidgetBody style={{ overflowY: 'hidden' }}>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </div>
        )
    }
}
