import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import styled from 'styled-components'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    ClockIcon,
    HashIcon,
    CalendarIcon,
    GitBranchIcon,
    GitCommitIcon,
    WidgetLabel,
    typography,
    Text,
} from '@mozaik/ui'
import { colorByState, iconByState } from '../lib/state'
import { secondsToString } from '../lib/duration'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    display: grid;
    grid-row-gap: 1.6vmin;
    grid-template-columns: 0.6vmin 1fr 1fr 1fr;
    grid-column-gap: 2vmin;
    padding-right: 2vmin;
    margin: 2vmin 0;
`

const StateIndicator = styled.div`
    grid-row-start: 1;
    grid-row-end: 3;
`

const Value = styled.span`
    color: ${props => props.theme.colors.textHighlight};
    ${props => typography(props.theme, 'default', 'strong')};
`

const Footer = styled.div`
    flex: 1;
    display: flex;
    align-items: flex-end;
    margin-bottom: 2vmin;
`

const Jobs = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 2vmin;
    grid-row-gap: 1.4vmin;
    padding: 0 2vmin 0 2.6vmin;
`

export default class LatestRepositoryBuild extends Component {
    static propTypes = {
        owner: PropTypes.string.isRequired,
        repository: PropTypes.string.isRequired,
        apiError: PropTypes.object,
        apiData: PropTypes.shape({
            slug: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            github_language: PropTypes.string,
            current_branch: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }).isRequired,
            last_build: PropTypes.shape({
                number: PropTypes.number.string,
                state: PropTypes.string.isRequired,
                started_at: PropTypes.string,
                duration: PropTypes.number,
                jobs: PropTypes.arrayOf(
                    PropTypes.shape({
                        number: PropTypes.string.isRequired,
                        state: PropTypes.string.isRequired,
                        queue: PropTypes.string.isRequired,
                        started_at: PropTypes.string,
                    })
                ).isRequired,
            }),
        }),
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest({ owner, repository }) {
        return {
            id: `travis.latestRepositoryBuild.${owner}.${repository}`,
            params: { owner, repository },
        }
    }

    render() {
        const { owner, repository, apiData: repoInfo, apiError, theme } = this.props

        let subject
        let count
        let body = <WidgetLoader />
        if (repoInfo) {
            subject = repoInfo.current_branch.name
            count = `#${repoInfo.last_build.number}`

            const Icon = iconByState(repoInfo.last_build.state)
            const color = colorByState(theme.colors, repoInfo.last_build.state)

            body = (
                <Container>
                    <Header>
                        <StateIndicator style={{ background: color }} />
                        <WidgetLabel
                            prefix={<Icon size="1.8vmin" color={color} />}
                            label={<Value style={{ color }}>{repoInfo.last_build.state}</Value>}
                        />
                        <WidgetLabel
                            prefix={<GitBranchIcon size="1.8vmin" />}
                            label={
                                <span>
                                    branch <Value>{repoInfo.current_branch.name}</Value>
                                </span>
                            }
                        />
                        <WidgetLabel
                            prefix={<CalendarIcon size="1.8vmin" />}
                            label={
                                repoInfo.last_build.started_at !== null ? (
                                    <Fragment>
                                        about{' '}
                                        <span style={{ color: theme.colors.textHighlight }}>
                                            {moment(repoInfo.last_build.started_at).fromNow()}
                                        </span>
                                    </Fragment>
                                ) : (
                                    'n/a'
                                )
                            }
                        />
                        <WidgetLabel
                            prefix={<GitCommitIcon size="1.8vmin" />}
                            label={
                                <span>
                                    commit{' '}
                                    <Value>{repoInfo.last_build.commit.sha.slice(0, 7)}</Value>
                                </span>
                            }
                            style={{ gridRowStart: 2, gridColumnStart: 3 }}
                        />
                        <WidgetLabel
                            prefix={<ClockIcon size="1.8vmin" />}
                            label={
                                repoInfo.last_build.duration !== null ? (
                                    <span style={{ color: theme.colors.textHighlight }}>
                                        {secondsToString(repoInfo.last_build.duration)}
                                    </span>
                                ) : (
                                    'n/a'
                                )
                            }
                            style={{ gridRowStart: 2, gridColumnStart: 4 }}
                        />
                    </Header>
                    <Footer>
                        <Jobs>
                            <Text variant="small">Build jobs</Text>
                            {repoInfo.last_build.jobs.map((job, i) => {
                                const JobIcon = iconByState(job.state)
                                const jobColor = colorByState(theme.colors, job.state)

                                return (
                                    <Fragment key={job.id}>
                                        <span
                                            style={{
                                                gridColumnStart: 1,
                                                gridRowStart: i + 2,
                                            }}
                                        >
                                            <JobIcon
                                                size="2.2vmin"
                                                color={jobColor}
                                                style={{
                                                    display: 'inline-block',
                                                    verticalAlign: 'middle',
                                                }}
                                            />{' '}
                                            <HashIcon
                                                size="1.6vmin"
                                                style={{
                                                    display: 'inline-block',
                                                    verticalAlign: 'middle',
                                                }}
                                            />
                                            <span style={{ color }}>
                                                <Text variant="strong">{job.number}</Text>{' '}
                                                {job.state}
                                            </span>
                                        </span>
                                        <span
                                            style={{
                                                gridColumnStart: 2,
                                                gridRowStart: i + 2,
                                            }}
                                        >
                                            <CalendarIcon
                                                size="1.6vmin"
                                                style={{
                                                    display: 'inline-block',
                                                    verticalAlign: 'middle',
                                                }}
                                            />{' '}
                                            {job.started_at ? (
                                                <span style={{ color: theme.colors.textHighlight }}>
                                                    {moment(job.started_at).fromNow()}
                                                </span>
                                            ) : (
                                                'n/a'
                                            )}
                                        </span>
                                        <span
                                            style={{
                                                gridColumnStart: 3,
                                                gridRowStart: i + 2,
                                            }}
                                        >
                                            {job.queue}
                                        </span>
                                    </Fragment>
                                )
                            })}
                        </Jobs>
                    </Footer>
                </Container>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={`${owner}/${repository}`}
                    subject={subject}
                    count={count}
                    icon={GitBranchIcon}
                    subjectPlacement="append"
                />
                <WidgetBody disablePadding={true}>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
