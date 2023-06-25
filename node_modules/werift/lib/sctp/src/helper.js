"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventsFromList = exports.enumerate = void 0;
const rx_mini_1 = __importDefault(require("rx.mini"));
function enumerate(arr) {
    return arr.map((v, i) => [i, v]);
}
exports.enumerate = enumerate;
function createEventsFromList(list) {
    return list.reduce((acc, cur) => {
        acc[cur] = new rx_mini_1.default();
        return acc;
    }, {});
}
exports.createEventsFromList = createEventsFromList;
//# sourceMappingURL=helper.js.map