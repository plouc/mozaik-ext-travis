import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ResponsivePie } from '@nivo/pie'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    PieChartIcon,
    typography,
} from '@mozaik/ui'
import { colorByState } from '../lib/state'

const margin = { top: 30, right: 70, bottom: 30, left: 70 }

const Total = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.textHighlight};
    ${props => typography(props.theme, 'display')} font-size: 4vmin;
`

export default class RepositoryBuildsStats extends Component {
    static propTypes = {
        owner: PropTypes.string.isRequired,
        repository: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiError: PropTypes.object,
        apiData: PropTypes.shape({
            total: PropTypes.number.isRequired,
            stats: PropTypes.arrayOf(
                PropTypes.shape({
                    count: PropTypes.number.isRequired,
                    state: PropTypes.string.isRequired,
                })
            ).isRequired,
        }),
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest({ owner, repository }) {
        return {
            id: `travis.repositoryBuildsStats.${owner}.${repository}`,
            params: { owner, repository },
        }
    }

    render() {
        const { owner, repository, title, apiData, apiError, theme } = this.props

        let body = <WidgetLoader />
        if (apiData && !apiError) {
            const chartData = apiData.stats.filter(({ count }) => count > 0).map(stat => ({
                ...stat,
                id: stat.state,
                label: stat.state,
                value: stat.count,
                color: colorByState(theme.colors, stat.state),
            }))

            body = (
                <Fragment>
                    <ResponsivePie
                        data={chartData}
                        margin={margin}
                        colorBy={d => d.color}
                        theme={theme.charts}
                        innerRadius={0.7}
                        cornerRadius={3}
                        padAngle={0.8}
                        slicesLabelsTextColor="inherit:darker(2.6)"
                        radialLabelsLinkHorizontalLength={10}
                        radialLabelsLinkDiagonalLength={10}
                        radialLabelsLinkStrokeWidth={2}
                        radialLabelsLinkColor="inherit"
                        radialLabelsTextColor="inherit:brighter(0.6)"
                        animate={false}
                    />
                    <Total>{apiData.total}</Total>
                </Fragment>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'builds'}
                    subject={title ? null : `${owner}/${repository}`}
                    icon={PieChartIcon}
                />
                <WidgetBody disablePadding={true}>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
