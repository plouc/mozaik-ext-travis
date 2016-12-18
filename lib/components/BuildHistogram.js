'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _BuildHistoryItem = require('./BuildHistoryItem');

var _ui = require('mozaik/ui');

var _nivo = require('nivo');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var margin = { top: 20, right: 20, bottom: 40, left: 40 };

var BuildHistogram = function (_Component) {
    _inherits(BuildHistogram, _Component);

    function BuildHistogram() {
        _classCallCheck(this, BuildHistogram);

        return _possibleConstructorReturn(this, (BuildHistogram.__proto__ || Object.getPrototypeOf(BuildHistogram)).apply(this, arguments));
    }

    _createClass(BuildHistogram, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                owner = _props.owner,
                repository = _props.repository,
                _builds = _props.apiData,
                apiError = _props.apiError;
            var theme = this.context.theme;


            var body = null;
            if (_builds) {
                var data = _lodash2.default.clone(_builds).reverse().map(function (build) {
                    return {
                        id: build.number,
                        duration: build.duration / 60, // converts s to mn
                        state: build.state
                    };
                });

                body = _react2.default.createElement(
                    _nivo.ResponsiveChart,
                    { margin: margin, data: data, theme: theme.charts },
                    _react2.default.createElement(_nivo.Scale, { id: 'duration', type: 'linear', dataKey: 'duration', axis: 'y' }),
                    _react2.default.createElement(_nivo.Scale, { id: 'id', type: 'band', dataKey: 'id', axis: 'x', padding: 0.3 }),
                    _react2.default.createElement(_nivo.Grid, { yScale: 'duration' }),
                    _react2.default.createElement(_nivo.Axis, { scaleId: 'id', position: 'bottom', axis: 'x' }),
                    _react2.default.createElement(_nivo.Axis, { scaleId: 'duration', position: 'left', axis: 'y' }),
                    _react2.default.createElement(_nivo.Bars, { xScale: 'id', x: 'id', yScale: 'duration', y: 'duration', color: '#fff' })
                );
            }

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(_ui.WidgetHeader, {
                    title: 'build histogram',
                    subject: owner + '/' + repository,
                    icon: 'bug'
                }),
                _react2.default.createElement(
                    _ui.WidgetBody,
                    { style: { overflowY: 'hidden' } },
                    _react2.default.createElement(
                        _ui.TrapApiError,
                        { error: apiError },
                        body
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

    return BuildHistogram;
}(_react.Component);

BuildHistogram.propTypes = {
    owner: _react.PropTypes.string.isRequired,
    repository: _react.PropTypes.string.isRequired,
    apiData: _react.PropTypes.arrayOf(_BuildHistoryItem.BuildPropType),
    apiError: _react.PropTypes.object
};
BuildHistogram.contextTypes = {
    theme: _react.PropTypes.object.isRequired
};
exports.default = BuildHistogram;