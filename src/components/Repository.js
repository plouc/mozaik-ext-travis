import React, { Component, PropTypes } from 'react'
import moment                          from 'moment'
import {
    TrapApiError,
    WidgetHeader,
    WidgetBody,
} from 'mozaik/ui'


/*
.travis__repository .widget__header {
  padding-left: 35px;
}
.travis__repository .widget__header:before {
  content " ";
  display block;
  width  16px;
  height 16px;
  position absolute;
  themify: top @(c) { return (c.widget-header-height - 16px) / 2 };
  left 12px;
  themify: border @(c) { return 2px solid c.widget-bg-color };
  border-radius 100%;
  themify: background-color color-unknown;
}
.travis__repository--errored .widget__header:before,
.travis__repository--failed .widget__header:before {
  themify: background-color failure-color;
}
.travis__repository--passed .widget__header:before {
  themify: background-color success-color;
}
.travis__repository__description {
  margin 10px 15px;
}
*/

class Repository extends Component {
    static getApiRequest({ owner, repository }) {
        return {
            id:     `travis.repository.${ owner }.${ repository }`,
            params: { owner, repository }
        }
    }

    render() {
        const { apiData: repository, apiError } = this.props

        let cssClasses = ''
        let infoNode   = <div />

        if (repository) {
            let statusClass = ''
            if (repository.last_build_state === 'passed') {
                statusClass = 'fa fa-check txt--success'
            } else if (repository.last_build_state === 'started') {
                statusClass = 'fa fa-play-circle-o'
            }

            infoNode = (
                <div>
                    <div className="travis__repository__description">{repository.description}</div>
                    <ul className="list list--compact">
                        <li className="list__item">
                            <i className={statusClass} /> last build&nbsp;
                            <span className="prop__value">{repository.last_build_state}</span>
                        </li>
                        <li className="list__item">
                            <i className="fa fa-clock-o" />&nbsp;
                            last build <span className="prop__value">{moment(repository.last_build_started_at).fromNow()}</span>&nbsp;
                            in <span className="count">{repository.last_build_duration}s</span>
                        </li>
                        <li className="list__item">
                            <i className="fa fa-code" /> language:&nbsp;
                            <span className="prop__value">{repository.github_language ? repository.github_language : 'n/a'}</span>
                        </li>
                    </ul>
                </div>
            )

            cssClasses = `travis__repository--${repository.last_build_state}`
        }

        return (
            <div className={cssClasses}>
                <WidgetHeader
                    title=""
                    subject={repository ? repository.slug : ''}
                    count={repository ? `#${repository.last_build_number}` : ''}
                    icon="bug"
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {infoNode}
                    </TrapApiError>
                </WidgetBody>
            </div>
        )
    }
}

Repository.propTypes = {
    owner:      PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
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


export default Repository
