import React, { Component, PropTypes } from 'react'
import moment                          from 'moment'
import {
    TrapApiError,
    Widget,
    WidgetHeader,
    WidgetBody,
    WidgetLoader,
    WidgetLabel as Label,
} from 'mozaik/ui'


export default class Repository extends Component {
    static propTypes = {
        owner:      PropTypes.string.isRequired,
        repository: PropTypes.string.isRequired,
        title:      PropTypes.string,
        apiError:   PropTypes.object,
        apiData:    PropTypes.shape({
            last_build_number:     PropTypes.string,
            last_build_state:      PropTypes.string,
            last_build_started_at: PropTypes.string,
            last_build_duration:   PropTypes.number,
            slug:                  PropTypes.string.isRequired,
            description:           PropTypes.string.isRequired,
            github_language:       PropTypes.string,
        }),
    }

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    }

    static getApiRequest({ owner, repository }) {
        return {
            id:     `travis.repository.${ owner }.${ repository }`,
            params: { owner, repository }
        }
    }

    render() {
        const { owner, repository, title, apiData: repoInfo, apiError } = this.props
        const { theme } = this.context

        let body = <WidgetLoader />
        let ref
        if (repoInfo) {
            ref = `#${repoInfo.last_build_number}`

            let icon  = 'question'
            let color = theme.colors.unknown
            if (repoInfo.last_build_state === 'passed') {
                icon = 'check'
                color = theme.colors.success
            } else if (repoInfo.last_build_state === 'started') {
                icon = 'play'
            } else if (repoInfo.last_build_state === 'failed') {
                icon  = 'warning'
                color = theme.colors.failure
            }

            const wrapperStyle = {
                display:       'flex',
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
                            prefix={<i className={`fa fa-${icon}`} style={{ color }}/>}
                            style={{ marginBottom: '2vmin' }}
                        />
                        <Label
                            label={
                                <span>
                                    last build&nbsp;
                                    <span className="prop__value">
                                        {moment(repoInfo.last_build_started_at).fromNow()}
                                    </span>
                                </span>
                            }
                            prefix={<i className="fa fa-clock-o" />}
                            suffix={
                                <span>
                                    in <span className="count">{repoInfo.last_build_duration}s</span>
                                </span>
                            }
                            style={{ marginBottom: '2vmin' }}
                        />
                        <Label
                            label="language"
                            prefix={<i className="fa fa-code" />}
                            suffix={repoInfo.github_language ? repoInfo.github_language : 'n/a'}
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
                    icon="bug"
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
