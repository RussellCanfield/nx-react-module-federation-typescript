"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("@testing-library/react");
var app_1 = __importDefault(require("./app"));
describe('App', function () {
    it('should render successfully', function () {
        var baseElement = (0, react_1.render)((0, jsx_runtime_1.jsx)(app_1["default"], {}, void 0)).baseElement;
        expect(baseElement).toBeTruthy();
    });
    it('should have a greeting as the title', function () {
        var getByText = (0, react_1.render)((0, jsx_runtime_1.jsx)(app_1["default"], {}, void 0)).getByText;
        expect(getByText(/Welcome react-app/gi)).toBeTruthy();
    });
});
