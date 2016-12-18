'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BuildPropType = undefined;

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

var BuildHistoryItem = function (_Component) {
    _inherits(BuildHistoryItem, _Component);

    function BuildHistoryItem() {
        _classCallCheck(this, BuildHistoryItem);

        return _possibleConstructorReturn(this, (BuildHistoryItem.__proto__ || Object.getPrototypeOf(BuildHistoryItem)).apply(this, arguments));
    }

    _createClass(BuildHistoryItem, [{
        key: 'render',
        value: function render() {
            var build = this.props.build;


            return _react2.default.createElement(_ui.WidgetListItem, {
                title: _react2.default.createElement(
                    'span',
                    null,
                    '#',
                    build.number,
                    ' ',
                    build.commit ? build.commit.message : null
                ),
                meta: _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement('i', { className: 'fa fa-clock-o' }),
                    '\xA0',
                    (0, _moment2.default)(build.finished_at).fromNow()
                ),
                pre: _react2.default.createElement(_ui.WidgetStatusChip, {
                    status: build.state
                })
            });
        }
    }]);

    return BuildHistoryItem;
}(_react.Component);

var BuildPropType = exports.BuildPropType = _react.PropTypes.shape({
    number: _react.PropTypes.string.isRequired,
    state: _react.PropTypes.string.isRequired,
    duration: _react.PropTypes.number.isRequired,
    finished_at: _react.PropTypes.string.isRequired,
    commit: _react.PropTypes.shape({
        message: _react.PropTypes.string.isRequired
    })
});

BuildHistoryItem.propTypes = {
    build: BuildPropType.isRequired
};

exports.default = BuildHistoryItem;