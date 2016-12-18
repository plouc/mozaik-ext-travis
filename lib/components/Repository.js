'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ui = require('mozaik/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var Repository = function (_Component) {
    _inherits(Repository, _Component);

    function Repository() {
        _classCallCheck(this, Repository);

        return _possibleConstructorReturn(this, (Repository.__proto__ || Object.getPrototypeOf(Repository)).apply(this, arguments));
    }

    _createClass(Repository, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                repository = _props.apiData,
                apiError = _props.apiError;


            var cssClasses = '';
            var infoNode = _react2.default.createElement('div', null);

            if (repository) {
                var statusClass = '';
                if (repository.last_build_state === 'passed') {
                    statusClass = 'fa fa-check txt--success';
                } else if (repository.last_build_state === 'started') {
                    statusClass = 'fa fa-play-circle-o';
                }

                infoNode = _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        'div',
                        { className: 'travis__repository__description' },
                        repository.description
                    ),
                    _react2.default.createElement(
                        'ul',
                        { className: 'list list--compact' },
                        _react2.default.createElement(
                            'li',
                            { className: 'list__item' },
                            _react2.default.createElement('i', { className: statusClass }),
                            ' last build\xA0',
                            _react2.default.createElement(
                                'span',
                                { className: 'prop__value' },
                                repository.last_build_state
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'list__item' },
                            _react2.default.createElement('i', { className: 'fa fa-clock-o' }),
                            '\xA0 last build ',
                            _react2.default.createElement(
                                'span',
                                { className: 'prop__value' },
                                (0, _moment2.default)(repository.last_build_started_at).fromNow()
                            ),
                            '\xA0 in ',
                            _react2.default.createElement(
                                'span',
                                { className: 'count' },
                                repository.last_build_duration,
                                's'
                            )
                        ),
                        _react2.default.createElement(
                            'li',
                            { className: 'list__item' },
                            _react2.default.createElement('i', { className: 'fa fa-code' }),
                            ' language:\xA0',
                            _react2.default.createElement(
                                'span',
                                { className: 'prop__value' },
                                repository.github_language ? repository.github_language : 'n/a'
                            )
                        )
                    )
                );

                cssClasses = 'travis__repository--' + repository.last_build_state;
            }

            return _react2.default.createElement(
                'div',
                { className: cssClasses },
                _react2.default.createElement(_ui.WidgetHeader, {
                    title: '',
                    subject: repository ? repository.slug : '',
                    count: repository ? '#' + repository.last_build_number : '',
                    icon: 'bug'
                }),
                _react2.default.createElement(
                    _ui.WidgetBody,
                    null,
                    _react2.default.createElement(
                        _ui.TrapApiError,
                        { error: apiError },
                        infoNode
                    )
                )
            );
        }
    }], [{
        key: 'getApiRequest',
        value: function getApiRequest(_ref) {
            var owner = _ref.owner,
                repository = _ref.repository;

            return {
                id: 'travis.repository.' + owner + '.' + repository,
                params: { owner: owner, repository: repository }
            };
        }
    }]);

    return Repository;
}(_react.Component);

Repository.propTypes = {
    owner: _react.PropTypes.string.isRequired,
    repository: _react.PropTypes.string.isRequired,
    apiError: _react.PropTypes.object,
    apiData: _react.PropTypes.shape({
        last_build_number: _react.PropTypes.string,
        last_build_state: _react.PropTypes.string,
        last_build_started_at: _react.PropTypes.string,
        last_build_duration: _react.PropTypes.number,
        slug: _react.PropTypes.string.isRequired,
        description: _react.PropTypes.string.isRequired,
        github_language: _react.PropTypes.string
    })
};

exports.default = Repository;