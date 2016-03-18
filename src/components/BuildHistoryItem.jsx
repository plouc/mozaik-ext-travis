import React, { Component, PropTypes } from 'react';
import moment                          from 'moment';


class BuildHistoryItem extends Component {
    render() {
        const { build } = this.props;

        let commitNode = null;
        if (build.commit) {
            commitNode = (
                <span className="travis__build-history__item__message">{build.commit.message}</span>
            );
        }

        const cssClasses = `list__item list__item--with-status travis__build-history__item travis__build-history__item--${build.state}`;

        return (
            <div className={cssClasses}>
                #{build.number} {commitNode}<br />
                <time className="list__item__time">
                    <i className="fa fa-clock-o" />&nbsp;
                    {moment(build.finished_at).fromNow()}
                </time>
            </div>
        );
    }
}

BuildHistoryItem.displayName = 'BuildHistoryItem';

BuildHistoryItem.propTypes = {
    build: PropTypes.shape({
        number:      PropTypes.string.isRequired,
        state:       PropTypes.string.isRequired,
        finished_at: PropTypes.string.isRequired,
        commit:      PropTypes.shape({
            message: PropTypes.string.isRequired
        })
    }).isRequired
};


export default BuildHistoryItem;
