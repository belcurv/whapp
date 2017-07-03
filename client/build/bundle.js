(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* controller.js -- connects our model and view */
/* jshint esversion:6, devel:true */

var Controller = function () {
    function Controller(model, view) {
        _classCallCheck(this, Controller);

        this.model = model;
        this.view = view;
    }

    _createClass(Controller, [{
        key: 'render',
        value: function render(data) {
            this.view.render(data);
        }
    }, {
        key: 'setView',
        value: function setView() {
            var _this = this;

            console.log('controller setView fired');
            this.model.getTeamSkills('T3BC1RPPH').then(function (data) {
                return _this.render(data);
            });
        }
    }]);

    return Controller;
}();

exports.default = Controller;

},{}],2:[function(require,module,exports){
'use strict';

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _util = require('./util');

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* jshint esversion:6, browser:true */

var App = function App() {
    _classCallCheck(this, App);

    var model = new _model2.default();
    var view = new _view2.default();

    this.controller = new _controller2.default(model, view);
};

var app = new App();

var setView = function setView() {
    app.controller.setView();
};

(0, _util.$on)(window, 'load', setView);

},{"./controller":1,"./model":3,"./util":6,"./view":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* jshint esversion:6, devel:true */
/*
   T3BC1RPPH = chingu central
   T4ZS2DFAA = chingu rhinos
   T5518TKBR = extemporaneous
*/

var _service = require('./service');

var _util = require('./util');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
    function Model() {
        _classCallCheck(this, Model);
    }

    /* fetch user profiles for a given team ID
    */


    _createClass(Model, [{
        key: 'getProfiles',
        value: function getProfiles(team) {
            return (0, _service.getJSON)('/api/team/' + team).then(function (profiles) {
                //                console.log('Profiles from model.js', profiles);
                return profiles;
            });
        }

        /* fetch team skills*/

    }, {
        key: 'getTeamSkills',
        value: function getTeamSkills(team) {
            return (0, _service.getJSON)('/api/team/' + team).then(function (profiles) {
                var skillsMap = (0, _util.mapSkillCounts)(profiles);
                return (0, _util.makeFormattedSkillsArr)(skillsMap);
            });
        }
    }]);

    return Model;
}();

exports.default = Model;

},{"./service":4,"./util":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* jshint esversion:6, devel:true, browser:true */

///* a get JSON function using callbacks
//*/
//const getJSON = (url, success, error) => {
//    const xhr = new XMLHttpRequest();
//    xhr.onreadystatechange = () => {
//        if (xhr.readyState === 4) {
//            if (xhr.status === 200) {
//                success(JSON.parse(xhr.responseText));
//            } else {
//                error(xhr.responseText);
//            }
//        }
//    };
//    xhr.open('GET', url);
//    xhr.send();
//};


/* a get JSON function using promises
*/
var getJSON = function getJSON(url) {
    var xhr = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.responseText);
                }
            }
        };
        xhr.open('GET', url);
        xhr.send();
    });
};

exports.getJSON = getJSON;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _templateObject = _taggedTemplateLiteral(['\n    <tr>\n        <td>', '</td>\n        <td>', '</td>\n    </tr>\n'], ['\n    <tr>\n        <td>', '</td>\n        <td>', '</td>\n    </tr>\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    <table class="table">\n        <thead>\n            <th>Skill</th>\n            <th>Count</th>\n        </thead>\n        <tbody>\n            ', '\n        </tbody>\n    </table>\n'], ['\n    <table class="table">\n        <thead>\n            <th>Skill</th>\n            <th>Count</th>\n        </thead>\n        <tbody>\n            ', '\n        </tbody>\n    </table>\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/* jshint esversion:6, devel:true */

/* utility method for easy templating of repeating html elements
 * such as lists.
 *
 * 'tagged template literals' are strings that are first passed
 * through a custom function which returns the processed string.
 *
 * @params  [array]  literal     [array of all the literal secti
 * @params  [array]  ...cooked   [rest param: all the proccessed expressions]
 * @returns [string]             [the processed string]
 */
var html = function html(literalsArr) {
    for (var _len = arguments.length, cooked = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        cooked[_key - 1] = arguments[_key];
    }

    var result = '';

    cooked.forEach(function (cook, i) {
        var lit = literalsArr[i];
        if (Array.isArray(cook)) {
            cook = cook.join('');
        }
        result += lit;
        result += cook;
    });
    result += literalsArr[literalsArr.length - 1];
    return result;
};

/* template that returns a 'tr'
*/
//const table_row = (profile) => html `
//    <tr>
//        <td>${profile.team_domain}</td>
//        <td>${profile.user_name}</td>
//        <td>${(profile.timestamp).slice(3,15)}</td>
//        <td>${profile.skills.length}</td>
//        <td>${profile.skills.join(', ')}</td>
//    </tr>
//`;
var table_row = function table_row(skill) {
    return html(_templateObject, skill.skill, skill.count);
};

/* template that loops over the array of profiles adding a 'tr' for each
*/
//const table_template = (data) => html `
//    <table class="table">
//        <thead>
//            <th>Team</th>
//            <th>Team Member</th>
//            <th>Last Updated</th>
//            <th>Total Skills</th>
//            <th>Skills</th>
//        </thead>
//        <tbody>
//            ${data.map( profile => table_row(profile) )}
//        </tbody>
//    </table>
//`;
var table_template = function table_template(data) {
    return html(_templateObject2, data.map(function (skill) {
        return table_row(skill);
    }));
};

//console.log(table_template(temp_data));

exports.table_template = table_template;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/* library of helper functions */
/* jshint esversion:6 */

/* register handler to an event emitted by a target */
var $on = function $on(target, event, handler) {
    return target.addEventListener(event, handler);
};

/* build map of unique skills and counts
 * 
 * @params    [array]   profiles   [array of profile objects]
 * @returns   [object]             [map of unique skills and counts]
*/
var mapSkillCounts = function mapSkillCounts(profiles) {
    var skillCounts = {};
    profiles.forEach(function (profile) {
        profile.skills.forEach(function (skill) {
            if (skillCounts[skill]) {
                skillCounts[skill] += 1;
            } else {
                skillCounts[skill] = 1;
            }
        });
    });
    return skillCounts;
};

/* build formatted array of skill & count objects
 * 
 * @params    [object]   inputObj   [map of unique skills and counts]
 * @returns   [array]               [array of skill & count objects]
*/
var makeFormattedSkillsArr = function makeFormattedSkillsArr(inputObj) {
    return Object.keys(inputObj).map(function (key) {
        return {
            skill: key,
            count: inputObj[key]
        };
    });
};

exports.$on = $on;
exports.mapSkillCounts = mapSkillCounts;
exports.makeFormattedSkillsArr = makeFormattedSkillsArr;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* view.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        handles rendering and DOM events.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        uses the template strings, feeds them data, and adds their output
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        to the right DOM elements.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     */
/* jshint esversion:6, browser: true */

var _template = require('./template');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
    function View() {
        _classCallCheck(this, View);

        this.el = document.getElementById('target');
    }

    _createClass(View, [{
        key: 'render',
        value: function render(data) {
            console.log('data from view', data);
            this.el.innerHTML = (0, _template.table_template)(data);
        }
    }]);

    return View;
}();

exports.default = View;

},{"./template":5}]},{},[2])

//# sourceMappingURL=bundle.js.map
