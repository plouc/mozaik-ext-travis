'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BuildHistoryItem = require('./BuildHistoryItem');

var _BuildHistoryItem2 = _interopRequireDefault(_BuildHistoryItem);

var _ui = require('mozaik/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BuildHistory = function (_Component) {
    _inherits(BuildHistory, _Component);

    function BuildHistory() {
        _classCallCheck(this, BuildHistory);

        return _possibleConstructorReturn(this, (BuildHistory.__proto__ || Object.getPrototypeOf(BuildHistory)).apply(this, arguments));
    }

    _createClass(BuildHistory, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                owner = _props.owner,
                repository = _props.repository,
                builds = _props.apiData,
                apiError = _props.apiError;


            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_ui.WidgetHeader, {
                    title: 'build history',
                    subject: owner + '/' + repository,
                    icon: 'bug'
                }),
                _react2.default.createElement(
                    _ui.WidgetBody,
                    null,
                    _react2.default.createElement(
                        _ui.TrapApiError,
                        { error: apiError },
                        _react2.default.createElement(
                            'div',
                            null,
                            builds.map(function (build) {
                                return _react2.default.createElement(_BuildHistoryItem2.default, { key: build.id, build: build });
                            })
                        )
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
                id: 'travis.buildHistory.' + owner + '.' + repository,
                params: { owner: owner, repository: repository }
            };
        }
    }]);

    return BuildHistory;
}(_react.Component);

BuildHistory.propTypes = {
    owner: _react.PropTypes.string.isRequired,
    repository: _react.PropTypes.string.isRequired,
    apiData: _react.PropTypes.arrayOf(_BuildHistoryItem.BuildPropType),
    apiError: _react.PropTypes.object
};

BuildHistory.defaultProps = {
    apiData: []
};

exports.default = BuildHistory;