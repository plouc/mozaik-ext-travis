import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import ClockIcon from 'react-icons/lib/fa/clock-o'
import { WidgetListItem, WidgetStatusChip } from '@mozaik/ui'

export const BuildPropType = PropTypes.shape({
    number: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    finished_at: PropTypes.string.isRequired,
    commit: PropTypes.shape({
        message: PropTypes.string.isRequired,
    }),
})

class BuildHistoryItem extends Component {
    static propTypes = {
        build: BuildPropType.isRequired,
    }

    render() {
        const { build } = this.props

        return (
            <WidgetListItem
                title={
                    <span>
                        #{build.number}{' '}
                        {build.commit ? build.commit.message : null}
                    </span>
                }
                meta={
                    <span
                        style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <ClockIcon />&nbsp;
                        {moment(build.finished_at).fromNow()}
                    </span>
                }
                pre={<WidgetStatusChip status={build.state} />}
            />
        )
    }
}

export default BuildHistoryItem
