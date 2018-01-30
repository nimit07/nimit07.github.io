var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Wiki = function (_React$Component) {
  _inherits(Wiki, _React$Component);

  function Wiki(props) {
    _classCallCheck(this, Wiki);

    var _this2 = _possibleConstructorReturn(this, (Wiki.__proto__ || Object.getPrototypeOf(Wiki)).call(this, props));

    _this2.state = {
      results: [],
      refresh: false
    };
    return _this2;
  }

  _createClass(Wiki, [{
    key: "handleClick",
    value: function handleClick() {
      var _this = this;
      var data = _this.refs.search.value;
      _this.state.refresh = false;
      _this.setState(_this.state);
      var url = "https://api.github.com/search/users?q=" + data + "&sort=followers&order=desc";

      $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: "json",
        success: function success(data, textStatus, jqXHR) {
          _this.state.results = data.items;
          _this.state.refresh = true;
          setTimeout(function () {
            _this.setState(_this.state);
          }.bind(_this), 500);
        },
        error: function error(errorMessage) {}
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      var res = void 0;

      if (_this.state.results && _this.state.refresh) {
        res = React.createElement(List, { data: _this.state.results });
      } else res = [];
      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "section center" },
          React.createElement(
            "h1",
            null,
            "Github Search"
          )
        ),
        React.createElement(
          "div",
          { className: "section" },
          React.createElement(
            "div",
            { className: "input-field col l6 m12 s12 center" },
            React.createElement(
              "i",
              { className: "material-icons prefix" },
              "search"
            ),
            React.createElement("input", { id: "search", type: "text", "class": "validate", ref: "search", onChange: _this.handleClick.bind(_this) }),
            React.createElement(
              "label",
              { "for": "search" },
              "Enter User Name"
            )
          ),
          React.createElement(
            "div",
            { className: "section" },
            res
          )
        )
      );
    }
  }]);

  return Wiki;
}(React.Component);

var List = function (_React$Component2) {
  _inherits(List, _React$Component2);

  function List(props) {
    _classCallCheck(this, List);

    var _this3 = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

    _this3.state = {
      results: []
    };
    return _this3;
  }

  _createClass(List, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;
      var list = _this.props.data;
      //alert(JSON.stringify(_this.props.data).length);
      for (var k in list) {
        _this.state.results.push(list[k]);
      }
      _this.setState(_this.state);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      return React.createElement(
        "div",
        { className: "collection" },
        _this.state.results.map(function (result, i) {
          var image = void 0;
          if (result.avatar_url) {
            image = React.createElement("img", { src: result.avatar_url, alt: "", className: "circle" });
          }
          return React.createElement(
            "a",
            { href: result.html_url, className: "collection-item avatar", key: i, target: "_blank" },
            image,
            React.createElement(
              "span",
              { className: "title" },
              result.login
            )
          );
        }, _this)
      );
    }
  }]);

  return List;
}(React.Component);

React.render(React.createElement(Wiki, null), document.body);