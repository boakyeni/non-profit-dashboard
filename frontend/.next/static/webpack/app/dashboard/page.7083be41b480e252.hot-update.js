"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/page",{

/***/ "(app-pages-browser)/./src/app/components/SidebarAccordian.js":
/*!************************************************!*\
  !*** ./src/app/components/SidebarAccordian.js ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_FaChevronDown_FaTasks_react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=FaChevronDown,FaTasks!=!react-icons/fa */ \"(app-pages-browser)/./node_modules/react-icons/fa/index.esm.js\");\n/* harmony import */ var _barrel_optimize_names_GoTasklist_react_icons_go__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! __barrel_optimize__?names=GoTasklist!=!react-icons/go */ \"(app-pages-browser)/./node_modules/react-icons/go/index.esm.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"(app-pages-browser)/./node_modules/react-redux/dist/react-redux.mjs\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst SidebarAccordian = (param)=>{\n    let { title, subtitles, type } = param;\n    _s();\n    // const [open, setOpen] = useState(false)\n    const openState = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state1)=>state1.dropdown.type);\n    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();\n    console.log(state.dropdown.type);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"text-white font-bold text-lg py-3\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                className: \"cursor-pointer flex flex-row justify-between w-full place-items-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex flex-row place-items-center pl--2\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_GoTasklist_react_icons_go__WEBPACK_IMPORTED_MODULE_3__.GoTasklist, {\n                                className: \"scale-[1.5]\"\n                            }, void 0, false, {\n                                fileName: \"/Users/kojo/apps/bsystems/nonprofit_dashboard/dashboard_src/frontend/src/app/components/SidebarAccordian.js\",\n                                lineNumber: 22,\n                                columnNumber: 21\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"pl-3\",\n                                children: title\n                            }, void 0, false, {\n                                fileName: \"/Users/kojo/apps/bsystems/nonprofit_dashboard/dashboard_src/frontend/src/app/components/SidebarAccordian.js\",\n                                lineNumber: 23,\n                                columnNumber: 21\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/kojo/apps/bsystems/nonprofit_dashboard/dashboard_src/frontend/src/app/components/SidebarAccordian.js\",\n                        lineNumber: 21,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_FaChevronDown_FaTasks_react_icons_fa__WEBPACK_IMPORTED_MODULE_4__.FaChevronDown, {\n                        onClick: ()=>{\n                            dispatch({\n                                type: type\n                            });\n                        }\n                    }, void 0, false, {\n                        fileName: \"/Users/kojo/apps/bsystems/nonprofit_dashboard/dashboard_src/frontend/src/app/components/SidebarAccordian.js\",\n                        lineNumber: 25,\n                        columnNumber: 17\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/kojo/apps/bsystems/nonprofit_dashboard/dashboard_src/frontend/src/app/components/SidebarAccordian.js\",\n                lineNumber: 20,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"transition-all overflow-hidden duration-[350ms] px-2 \".concat(openState ? \"max-h-screen opacity-100\" : \"max-h-0 opacity-0\"),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                    children: subtitles.map((item, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                            children: item\n                        }, index, false, {\n                            fileName: \"/Users/kojo/apps/bsystems/nonprofit_dashboard/dashboard_src/frontend/src/app/components/SidebarAccordian.js\",\n                            lineNumber: 30,\n                            columnNumber: 25\n                        }, undefined))\n                }, void 0, false, {\n                    fileName: \"/Users/kojo/apps/bsystems/nonprofit_dashboard/dashboard_src/frontend/src/app/components/SidebarAccordian.js\",\n                    lineNumber: 28,\n                    columnNumber: 17\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/kojo/apps/bsystems/nonprofit_dashboard/dashboard_src/frontend/src/app/components/SidebarAccordian.js\",\n                lineNumber: 27,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/kojo/apps/bsystems/nonprofit_dashboard/dashboard_src/frontend/src/app/components/SidebarAccordian.js\",\n        lineNumber: 19,\n        columnNumber: 9\n    }, undefined);\n};\n_s(SidebarAccordian, \"p+flBFkhpe1ujqsSwrA0SRVqowE=\", false, function() {\n    return [\n        react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector,\n        react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch\n    ];\n});\n_c = SidebarAccordian;\n/* harmony default export */ __webpack_exports__[\"default\"] = (SidebarAccordian);\nvar _c;\n$RefreshReg$(_c, \"SidebarAccordian\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvY29tcG9uZW50cy9TaWRlYmFyQWNjb3JkaWFuLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNnQztBQUN1QjtBQUNaO0FBQ1c7QUFLdEQsTUFBTU0sbUJBQW1CO1FBQUMsRUFBRUMsS0FBSyxFQUFFQyxTQUFTLEVBQUVDLElBQUksRUFBRTs7SUFDaEQsMENBQTBDO0lBQzFDLE1BQU1DLFlBQVlOLHdEQUFXQSxDQUFDLENBQUNPLFNBQVVBLE9BQU1DLFFBQVEsQ0FBQ0gsSUFBSTtJQUM1RCxNQUFNSSxXQUFXUix3REFBV0E7SUFDNUJTLFFBQVFDLEdBQUcsQ0FBQ0osTUFBTUMsUUFBUSxDQUFDSCxJQUFJO0lBSS9CLHFCQUNJLDhEQUFDTztRQUFJQyxXQUFVOzswQkFDWCw4REFBQ0M7Z0JBQU9ELFdBQVU7O2tDQUNkLDhEQUFDRDt3QkFBSUMsV0FBVTs7MENBQ1gsOERBQUNkLHdGQUFVQTtnQ0FBQ2MsV0FBVTs7Ozs7OzBDQUN0Qiw4REFBQ0U7Z0NBQUVGLFdBQVU7MENBQVFWOzs7Ozs7Ozs7Ozs7a0NBRXpCLDhEQUFDTixzR0FBYUE7d0JBQUNtQixTQUFTOzRCQUFRUCxTQUFTO2dDQUFFSixNQUFNQTs0QkFBSzt3QkFBRzs7Ozs7Ozs7Ozs7OzBCQUU3RCw4REFBQ087Z0JBQUlDLFdBQVcsd0RBQXFILE9BQTdEUCxZQUFZLDZCQUE2QjswQkFDN0csNEVBQUNXOzhCQUNJYixVQUFVYyxHQUFHLENBQUMsQ0FBQ0MsTUFBTUMsc0JBQ2xCLDhEQUFDQztzQ0FBZ0JGOzJCQUFSQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUWpDO0dBNUJNbEI7O1FBRWdCRixvREFBV0E7UUFDWkMsb0RBQVdBOzs7S0FIMUJDO0FBOEJOLCtEQUFlQSxnQkFBZ0JBLEVBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9jb21wb25lbnRzL1NpZGViYXJBY2NvcmRpYW4uanM/NThlZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7IEZhQ2hldnJvbkRvd24sIEZhVGFza3MgfSBmcm9tIFwicmVhY3QtaWNvbnMvZmFcIlxuaW1wb3J0IHsgR29UYXNrbGlzdCB9IGZyb20gJ3JlYWN0LWljb25zL2dvJ1xuaW1wb3J0IHsgdXNlU2VsZWN0b3IsIHVzZURpc3BhdGNoIH0gZnJvbSBcInJlYWN0LXJlZHV4XCJcblxuXG5cblxuY29uc3QgU2lkZWJhckFjY29yZGlhbiA9ICh7IHRpdGxlLCBzdWJ0aXRsZXMsIHR5cGUgfSkgPT4ge1xuICAgIC8vIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKVxuICAgIGNvbnN0IG9wZW5TdGF0ZSA9IHVzZVNlbGVjdG9yKChzdGF0ZSkgPT4gc3RhdGUuZHJvcGRvd24udHlwZSlcbiAgICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKClcbiAgICBjb25zb2xlLmxvZyhzdGF0ZS5kcm9wZG93bi50eXBlKVxuXG5cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LWJvbGQgdGV4dC1sZyBweS0zXCI+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImN1cnNvci1wb2ludGVyIGZsZXggZmxleC1yb3cganVzdGlmeS1iZXR3ZWVuIHctZnVsbCBwbGFjZS1pdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1yb3cgcGxhY2UtaXRlbXMtY2VudGVyIHBsLS0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxHb1Rhc2tsaXN0IGNsYXNzTmFtZT1cInNjYWxlLVsxLjVdXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwicGwtM1wiPnt0aXRsZX08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPEZhQ2hldnJvbkRvd24gb25DbGljaz17KCkgPT4geyBkaXNwYXRjaCh7IHR5cGU6IHR5cGUgfSkgfX0gLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2B0cmFuc2l0aW9uLWFsbCBvdmVyZmxvdy1oaWRkZW4gZHVyYXRpb24tWzM1MG1zXSBweC0yICR7b3BlblN0YXRlID8gJ21heC1oLXNjcmVlbiBvcGFjaXR5LTEwMCcgOiAnbWF4LWgtMCBvcGFjaXR5LTAnfWB9PlxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAge3N1YnRpdGxlcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkga2V5PXtpbmRleH0+e2l0ZW19PC9saT5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgPC9kaXY+XG4gICAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaWRlYmFyQWNjb3JkaWFuIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwiRmFDaGV2cm9uRG93biIsIkZhVGFza3MiLCJHb1Rhc2tsaXN0IiwidXNlU2VsZWN0b3IiLCJ1c2VEaXNwYXRjaCIsIlNpZGViYXJBY2NvcmRpYW4iLCJ0aXRsZSIsInN1YnRpdGxlcyIsInR5cGUiLCJvcGVuU3RhdGUiLCJzdGF0ZSIsImRyb3Bkb3duIiwiZGlzcGF0Y2giLCJjb25zb2xlIiwibG9nIiwiZGl2IiwiY2xhc3NOYW1lIiwiYnV0dG9uIiwicCIsIm9uQ2xpY2siLCJ1bCIsIm1hcCIsIml0ZW0iLCJpbmRleCIsImxpIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/components/SidebarAccordian.js\n"));

/***/ })

});