import React, { Component, PropTypes } from 'react'
import moment                          from 'moment'
import {
    WidgetListItem,
    WidgetStatusChip,
} from 'mozaik/ui'


class BuildHistoryItem extends Component {
    render() {
        const { build } = this.props

        return (
            <WidgetListItem
                title={
                    <span>#{build.number} {build.commit ? build.commit.message : null}</span>
                }
                meta={
                    <span>
                        <i className="fa fa-clock-o" />&nbsp;
                        {moment(build.finished_at).fromNow()}
                    </span>
                }
                pre={
                    <WidgetStatusChip
                        status={build.state}
                    />
                }
            />
        )
    }
}

export const BuildPropType = PropTypes.shape({
    number:      PropTypes.string.isRequired,
    state:       PropTypes.string.isRequired,
    duration:    PropTypes.number.isRequired,
    finished_at: PropTypes.string.isRequired,
    commit:      PropTypes.shape({
        message: PropTypes.string.isRequired
    })
})

BuildHistoryItem.propTypes = {
    build: BuildPropType.isRequired,
}


export default BuildHistoryItem
