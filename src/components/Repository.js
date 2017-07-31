import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import RepositoryIcon from 'react-icons/lib/fa/bug'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import LanguageIcon from 'react-icons/lib/fa/code'
import QuestionIcon from 'react-icons/lib/fa/question'
import PassedIcon from 'react-icons/lib/fa/check'
import StartedIcon from 'react-icons/lib/fa/play'
import FailedIcon from 'react-icons/lib/fa/exclamation-triangle'
import { withTheme } from 'styled-components'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    WidgetLabel as Label,
} from '@mozaik/ui'

class Repository extends Component {
    static propTypes = {
        owner: PropTypes.string.isRequired,
        repository: PropTypes.string.isRequired,
        title: PropTypes.string,
        apiError: PropTypes.object,
        apiData: PropTypes.shape({
            last_build_number: PropTypes.string,
            last_build_state: PropTypes.string,
            last_build_started_at: PropTypes.string,
            last_build_duration: PropTypes.number,
            slug: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            github_language: PropTypes.string,
        }),
    }

    static getApiRequest({ owner, repository }) {
        return {
            id: `travis.repository.${owner}.${repository}`,
            params: { owner, repository },
        }
    }

    render() {
        const {
            owner,
            repository,
            title,
            apiData: repoInfo,
            apiError,
            theme,
        } = this.props

        let body = <WidgetLoader />
        let ref
        if (repoInfo) {
            ref = `#${repoInfo.last_build_number}`

            let Icon = QuestionIcon
            let color = theme.colors.unknown
            if (repoInfo.last_build_state === 'passed') {
                Icon = PassedIcon
                color = theme.colors.success
            } else if (repoInfo.last_build_state === 'started') {
                Icon = StartedIcon
            } else if (repoInfo.last_build_state === 'failed') {
                Icon = FailedIcon
                color = theme.colors.failure
            }

            const wrapperStyle = {
                display: 'flex',
                flexDirection: 'column',
            }

            body = (
                <div style={{ margin: '1.2vmin 1.8vmin' }}>
                    <div style={{ marginBottom: '2vmin' }}>
                        {repoInfo.description}
                    </div>
                    <div style={wrapperStyle}>
                        <Label
                            label="last build"
                            prefix={<Icon style={{ color }} />}
                            style={{ marginBottom: '2vmin' }}
                        />
                        <Label
                            label={
                                <span>
                                    last build&nbsp;
                                    <span className="prop__value">
                                        {moment(
                                            repoInfo.last_build_started_at
                                        ).fromNow()}
                                    </span>
                                </span>
                            }
                            prefix={<ClockIcon />}
                            suffix={
                                <span>
                                    in{' '}
                                    <span className="count">
                                        {repoInfo.last_build_duration}s
                                    </span>
                                </span>
                            }
                            style={{ marginBottom: '2vmin' }}
                        />
                        <Label
                            label="language"
                            prefix={<LanguageIcon />}
                            suffix={
                                repoInfo.github_language
                                    ? repoInfo.github_language
                                    : 'n/a'
                            }
                        />
                    </div>
                </div>
            )
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || ''}
                    subject={title ? null : `${owner}/${repository}`}
                    count={ref}
                    icon={RepositoryIcon}
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

export default withTheme(Repository)
