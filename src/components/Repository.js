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
    WidgetLabel as Label,
    InfoIcon,
    ClockIcon,
    GitBranchIcon,
    CodeIcon,
    Text,
    typography,
} from '@mozaik/ui'
import { colorByState, iconByState } from '../lib/state'
import { secondsToString } from '../lib/duration'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const Description = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    ${props => typography(props.theme, 'default', 'small')};
`

const Grid = styled.div`
    display: grid;
    grid-row-gap: 1.6vmin;
`

export default class Repository extends Component {
    static propTypes = {
        owner: PropTypes.string.isRequired,
        repository: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiError: PropTypes.object,
        apiData: PropTypes.shape({
            slug: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            github_language: PropTypes.string,
            default_branch: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }).isRequired,
            last_build: PropTypes.shape({
                state: PropTypes.string.isRequired,
                started_at: PropTypes.string,
                duration: PropTypes.number,
            }),
        }),
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest({ owner, repository }) {
        return {
            id: `travis.repository.${owner}.${repository}`,
            params: { owner, repository },
        }
    }

    render() {
        const { owner, repository, title, apiData: repoInfo, apiError, theme } = this.props

        let body = <WidgetLoader />
        if (repoInfo) {
            const Icon = iconByState(repoInfo.last_build.state)
            const color = colorByState(theme.colors, repoInfo.last_build.state)

            body = (
                <Container>
                    <Description>{repoInfo.description}</Description>
                    <Grid>
                        <Label
                            label={
                                <Text
                                    variant="strong"
                                    style={{ color: theme.colors.textHighlight }}
                                >
                                    {repoInfo.default_branch.name}
                                </Text>
                            }
                            prefix={<GitBranchIcon size="1.8vmin" />}
                        />
                        <Label
                            label={
                                repoInfo.last_build ? (
                                    <Fragment>
                                        last build{' '}
                                        <Text variant="strong" style={{ color }}>
                                            {repoInfo.last_build.state}
                                        </Text>
                                    </Fragment>
                                ) : (
                                    'n/a'
                                )
                            }
                            prefix={<Icon size="1.8vmin" style={{ color }} />}
                        />
                        <Label
                            label={
                                repoInfo.last_build ? (
                                    <span>
                                        {moment(repoInfo.last_build.started_at).fromNow()} in{' '}
                                        {secondsToString(repoInfo.last_build.duration)}
                                    </span>
                                ) : (
                                    'n/a'
                                )
                            }
                            prefix={<ClockIcon size="1.8vmin" />}
                        />
                        <Label
                            label="language"
                            prefix={<CodeIcon size="1.8vmin" />}
                            suffix={repoInfo.github_language ? repoInfo.github_language : 'n/a'}
                        />
                    </Grid>
                </Container>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || ''}
                    subject={title ? null : `${owner}/${repository}`}
                    icon={InfoIcon}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>{body}</TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
