import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import { GitCommitIcon, ClockIcon, Text, typography } from '@mozaik/ui'
import { colorByState, iconByState } from '../lib/state'
import { secondsToString } from '../lib/duration'

export const BuildPropType = PropTypes.shape({
    number: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    finished_at: PropTypes.string.isRequired,
    branch: PropTypes.shape({
        name: PropTypes.string.isRequired,
    }).isRequired,
    commit: PropTypes.shape({
        message: PropTypes.string.isRequired,
    }).isRequired,
})

const Container = styled.div`
    display: grid;
    grid-template-columns: 0.6vmin auto;
    background: ${props => props.theme.list.item.background};
    ${props => props.theme.list.item.extend.trim()} &:hover {
        background: ${props => props.theme.list.item.hover.background};
    }
`

const Content = styled.div`
    padding: 1.2vmin 2vmin 1.8vmin 1.2vmin;
    display: grid;
    grid-template-columns: 2.6vmin 2fr 1fr;
    grid-column-gap: 1vmin;
    grid-row-gap: 0.2vmin;
    align-items: center;
`

const CommitMessage = styled.div`
    grid-column-start: 2;
    grid-column-end: 4;
    padding-top: 0.8vmin;
    ${props => typography(props.theme, 'default', 'small')};
`

const TextHighlight = styled.span`
    color: ${props => props.theme.colors.textHighlight};
`

class BuildHistoryItem extends Component {
    static propTypes = {
        build: BuildPropType.isRequired,
        theme: PropTypes.object.isRequired,
    }

    render() {
        const { build, theme } = this.props

        const color = colorByState(theme.colors, build.state)
        const Icon = iconByState(build.state)

        return (
            <Container>
                <div style={{ background: color }} />
                <Content>
                    <Icon size="2vmin" color={color} />
                    <span style={{ whiteSpace: 'pre' }}>
                        <Text variant="strong" style={{ color: theme.colors.textHighlight }}>
                            {build.branch.name}
                        </Text>{' '}
                        <GitCommitIcon
                            size="1.6vmin"
                            style={{ display: 'inline-block', verticalAlign: 'middle' }}
                        />{' '}
                        <Text variant="small">{build.commit.sha.slice(0, 7)}</Text>
                    </span>
                    <span style={{ whiteSpace: 'pre' }}>
                        #{build.number}{' '}
                        <Text variant="small" style={{ color }}>
                            {build.state}
                        </Text>
                    </span>
                    <CommitMessage>{build.commit.message}</CommitMessage>
                    {build.finished_at && (
                        <Fragment>
                            <span style={{ gridColumnStart: 2, gridColumnEnd: 4 }}>
                                <Text variant="small" style={{ whiteSpace: 'pre' }}>
                                    <ClockIcon
                                        size="1.6vmin"
                                        style={{ display: 'inline-block', verticalAlign: 'middle' }}
                                    />{' '}
                                    about{' '}
                                    <TextHighlight>
                                        {moment(build.started_at).fromNow()}
                                    </TextHighlight>{' '}
                                    in{' '}
                                    <TextHighlight>{secondsToString(build.duration)}</TextHighlight>
                                </Text>
                            </span>
                        </Fragment>
                    )}
                </Content>
            </Container>
        )
    }
}

export default BuildHistoryItem
