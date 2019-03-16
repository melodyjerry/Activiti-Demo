/**
 * angular-ui-utils - Swiss-Army-Knife of AngularJS tools (with no external
 * dependencies!)
 * 
 * @version v0.0.4 - 2013-08-28
 * @link http://angular-ui.github.com
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module("ui.event", []).directive("uiEvent", ["$parse", function(a) {
			return function(b, c, d) {
				var e = b.$eval(d.uiEvent);
				angular.forEach(e, function(d, e) {
							var f = a(d);
							c.bind(e, function(a) {
										var c = Array.prototype.slice
												.call(arguments);
										c = c.splice(1), f(b, {
													$event : a,
													$params : c
												}), b.$$phase || b.$apply()
									})
						})
			}
		}]), angular.module("ui.format", []).filter("format", function() {
	return function(a, b) {
		var c = a;
		if (angular.isString(c) && void 0 !== b)
			if (angular.isArray(b) || angular.isObject(b) || (b = [b]), angular
					.isArray(b)) {
				var d = b.length, e = function(a, c) {
					return c = parseInt(c, 10), c >= 0 && d > c ? b[c] : a
				};
				c = c.replace(/\$([0-9]+)/g, e)
			} else
				angular.forEach(b, function(a, b) {
							c = c.split(":" + b).join(a)
						});
		return c
	}
}), angular.module("ui.highlight", []).filter("highlight", function() {
	return function(a, b, c) {
		return b || angular.isNumber(b)
				? (a = a.toString(), b = b.toString(), c ? a.split(b)
						.join('<span class="ui-match">' + b + "</span>") : a
						.replace(new RegExp(b, "gi"),
								'<span class="ui-match">$&</span>'))
				: a
	}
}), angular.module("ui.include", []).directive(
		"uiInclude",
		["$http", "$templateCache", "$anchorScroll", "$compile",
				function(a, b, c, d) {
					return {
						restrict : "ECA",
						terminal : !0,
						compile : function(e, f) {
							var g = f.uiInclude || f.src, h = f.fragment || "", i = f.onload
									|| "", j = f.autoscroll;
							return function(e, f) {
								function k() {
									var k = ++m, o = e.$eval(g), p = e.$eval(h);
									o ? a.get(o, {
												cache : b
											}).success(function(a) {
										if (k === m) {
											l && l.$destroy(), l = e.$new();
											var b;
											b = p ? angular.element("<div/>")
													.html(a).find(p) : angular
													.element("<div/>").html(a)
													.contents(), f.html(b), d(b)(l), !angular
													.isDefined(j)
													|| j && !e.$eval(j) || c(), l
													.$emit("$includeContentLoaded"), e
													.$eval(i)
										}
									}).error(function() {
												k === m && n()
											})
											: n()
								}
								var l, m = 0, n = function() {
									l && (l.$destroy(), l = null), f.html("")
								};
								e.$watch(h, k), e.$watch(g, k)
							}
						}
					}
				}]), angular.module("ui.indeterminate", []).directive(
		"uiIndeterminate", [function() {
			return {
				compile : function(a, b) {
					return b.type && "checkbox" === b.type.toLowerCase()
							? function(a, b, c) {
								a.$watch(c.uiIndeterminate, function(a) {
											b[0].indeterminate = !!a
										})
							}
							: angular.noop
				}
			}
		}]), angular.module("ui.inflector", []).filter("inflector", function() {
	function a(a) {
		return a.replace(/^([a-z])|\s+([a-z])/g, function(a) {
					return a.toUpperCase()
				})
	}
	function b(a, b) {
		return a.replace(/[A-Z]/g, function(a) {
					return b + a
				})
	}
	var c = {
		humanize : function(c) {
			return a(b(c, " ").split("_").join(" "))
		},
		underscore : function(a) {
			return a.substr(0, 1).toLowerCase()
					+ b(a.substr(1), "_").toLowerCase().split(" ").join("_")
		},
		variable : function(b) {
			return b = b.substr(0, 1).toLowerCase()
					+ a(b.split("_").join(" ")).substr(1).split(" ").join("")
		}
	};
	return function(a, b) {
		return b !== !1 && angular.isString(a)
				? (b = b || "humanize", c[b](a))
				: a
	}
}), angular.module("ui.jq", []).value("uiJqConfig", {}).directive("uiJq",
		["uiJqConfig", "$timeout", function(a, b) {
			return {
				restrict : "A",
				compile : function(c, d) {
					if (!angular.isFunction(c[d.uiJq]))
						throw new Error('ui-jq: The "' + d.uiJq
								+ '" function does not exist');
					var e = a && a[d.uiJq];
					return function(a, c, d) {
						function f() {
							b(function() {
										c[d.uiJq].apply(c, g)
									}, 0, !1)
						}
						var g = [];
						d.uiOptions
								? (g = a.$eval("[" + d.uiOptions + "]"), angular
										.isObject(e)
										&& angular.isObject(g[0])
										&& (g[0] = angular.extend({}, e, g[0])))
								: e && (g = [e]), d.ngModel
								&& c.is("select,input,textarea")
								&& c.bind("change", function() {
											c.trigger("input")
										}), d.uiRefresh
								&& a.$watch(d.uiRefresh, function() {
											f()
										}), f()
					}
				}
			}
		}]), angular.module("ui.keypress", []).factory("keypressHelper",
		["$parse", function(a) {
			var b = {
				8 : "backspace",
				9 : "tab",
				13 : "enter",
				27 : "esc",
				32 : "space",
				33 : "pageup",
				34 : "pagedown",
				35 : "end",
				36 : "home",
				37 : "left",
				38 : "up",
				39 : "right",
				40 : "down",
				45 : "insert",
				46 : "delete"
			}, c = function(a) {
				return a.charAt(0).toUpperCase() + a.slice(1)
			};
			return function(d, e, f, g) {
				var h, i = [];
				h = e.$eval(g["ui" + c(d)]), angular.forEach(h, function(b, c) {
							var d, e;
							e = a(b), angular.forEach(c.split(" "),
									function(a) {
										d = {
											expression : e,
											keys : {}
										}, angular.forEach(a.split("-"),
												function(a) {
													d.keys[a] = !0
												}), i.push(d)
									})
						}), f.bind(d, function(a) {
					var c = !(!a.metaKey || a.ctrlKey), f = !!a.altKey, g = !!a.ctrlKey, h = !!a.shiftKey, j = a.keyCode;
					"keypress" === d && !h && j >= 97 && 122 >= j && (j -= 32), angular
							.forEach(i, function(d) {
								var i = d.keys[b[j]] || d.keys[j.toString()], k = !!d.keys.meta, l = !!d.keys.alt, m = !!d.keys.ctrl, n = !!d.keys.shift;
								i && k === c && l === f && m === g && n === h
										&& e.$apply(function() {
													d.expression(e, {
																$event : a
															})
												})
							})
				})
			}
		}]), angular.module("ui.keypress").directive("uiKeydown",
		["keypressHelper", function(a) {
					return {
						link : function(b, c, d) {
							a("keydown", b, c, d)
						}
					}
				}]), angular.module("ui.keypress").directive("uiKeypress",
		["keypressHelper", function(a) {
					return {
						link : function(b, c, d) {
							a("keypress", b, c, d)
						}
					}
				}]), angular.module("ui.keypress").directive("uiKeyup",
		["keypressHelper", function(a) {
					return {
						link : function(b, c, d) {
							a("keyup", b, c, d)
						}
					}
				}]), angular.module("ui.mask", []).value("uiMaskConfig", {
			maskDefinitions : {
				9 : /\d/,
				A : /[a-zA-Z]/,
				"*" : /[a-zA-Z0-9]/
			}
		}).directive("uiMask", ["uiMaskConfig", function(a) {
	return {
		priority : 100,
		require : "ngModel",
		restrict : "A",
		compile : function() {
			var b = a;
			return function(a, c, d, e) {
				function f(a) {
					return angular.isDefined(a) ? (s(a), N
							? (k(), l(), !0)
							: j()) : j()
				}
				function g(a) {
					angular.isDefined(a) && (D = a, N && w())
				}
				function h(a) {
					return N ? (G = o(a || ""), I = n(G), e.$setValidity(
							"mask", I), I && G.length ? p(G) : void 0) : a
				}
				function i(a) {
					return N
							? (G = o(a || ""), I = n(G), e.$viewValue = G.length
									? p(G)
									: "", e.$setValidity("mask", I), "" === G
									&& void 0 !== e.$error.required
									&& e.$setValidity("required", !1), I
									? G
									: void 0)
							: a
				}
				function j() {
					return N = !1, m(), angular.isDefined(P) ? c.attr(
							"placeholder", P) : c.removeAttr("placeholder"), angular
							.isDefined(Q) ? c.attr("maxlength", Q) : c
							.removeAttr("maxlength"), c.val(e.$modelValue), e.$viewValue = e.$modelValue, !1
				}
				function k() {
					G = K = o(e.$modelValue || ""), H = J = p(G), I = n(G);
					var a = I && G.length ? H : "";
					d.maxlength && c.attr("maxlength", 2 * B[B.length - 1]), c
							.attr("placeholder", D), c.val(a), e.$viewValue = a
				}
				function l() {
					O
							|| (c.bind("blur", t), c.bind("mousedown mouseup",
									u), c.bind("input keyup click focus", w), O = !0)
				}
				function m() {
					O
							&& (c.unbind("blur", t), c.unbind("mousedown", u), c
									.unbind("mouseup", u), c.unbind("input", w), c
									.unbind("keyup", w), c.unbind("click", w), c
									.unbind("focus", w), O = !1)
				}
				function n(a) {
					return a.length ? a.length >= F : !0
				}
				function o(a) {
					var b = "", c = C.slice();
					return a = a.toString(), angular.forEach(E, function(b) {
								a = a.replace(b, "")
							}), angular.forEach(a.split(""), function(a) {
								c.length && c[0].test(a) && (b += a, c.shift())
							}), b
				}
				function p(a) {
					var b = "", c = B.slice();
					return angular.forEach(D.split(""), function(d, e) {
								a.length && e === c[0]
										? (b += a.charAt(0) || "_", a = a
												.substr(1), c.shift())
										: b += d
							}), b
				}
				function q(a) {
					var b = d.placeholder;
					return "undefined" != typeof b && b[a] ? b[a] : "_"
				}
				function r() {
					return D.replace(/[_]+/g, "_").replace(
							/([^_]+)([a-zA-Z0-9])([^_])/g, "$1$2_$3")
							.split("_")
				}
				function s(a) {
					var b = 0;
					if (B = [], C = [], D = "", "string" == typeof a) {
						F = 0;
						var c = !1, d = a.split("");
						angular.forEach(d, function(a, d) {
									R.maskDefinitions[a]
											? (B.push(b), D += q(d), C
													.push(R.maskDefinitions[a]), b++, c
													|| F++)
											: "?" === a
													? c = !0
													: (D += a, b++)
								})
					}
					B.push(B.slice().pop() + 1), E = r(), N = B.length > 1
							? !0
							: !1
				}
				function t() {
					L = 0, M = 0, I && 0 !== G.length
							|| (H = "", c.val(""), a.$apply(function() {
										e.$setViewValue("")
									}))
				}
				function u(a) {
					"mousedown" === a.type ? c.bind("mouseout", v) : c.unbind(
							"mouseout", v)
				}
				function v() {
					M = A(this), c.unbind("mouseout", v)
				}
				function w(b) {
					b = b || {};
					var d = b.which, f = b.type;
					if (16 !== d && 91 !== d) {
						var g, h = c.val(), i = J, j = o(h), k = K, l = !1, m = y(this)
								|| 0, n = L || 0, q = m - n, r = B[0], s = B[j.length]
								|| B.slice().shift(), t = M || 0, u = A(this) > 0, v = t > 0, w = h.length > i.length
								|| t && h.length > i.length - t, C = h.length < i.length
								|| t && h.length === i.length - t, D = d >= 37
								&& 40 >= d && b.shiftKey, E = 37 === d, F = 8 === d
								|| "keyup" !== f && C && -1 === q, G = 46 === d
								|| "keyup" !== f && C && 0 === q && !v, H = (E
								|| F || "click" === f)
								&& m > r;
						if (M = A(this), !D
								&& (!u || "click" !== f && "keyup" !== f)) {
							if ("input" === f && C && !v && j === k) {
								for (; F && m > r && !x(m);)
									m--;
								for (; G && s > m && -1 === B.indexOf(m);)
									m++;
								var I = B.indexOf(m);
								j = j.substring(0, I) + j.substring(I + 1), l = !0
							}
							for (g = p(j), J = g, K = j, c.val(g), l
									&& a.$apply(function() {
												e.$setViewValue(j)
											}), w && r >= m && (m = r + 1), H
									&& m--, m = m > s ? s : r > m ? r : m; !x(m)
									&& m > r && s > m;)
								m += H ? -1 : 1;
							(H && s > m || w && !x(n)) && m++, L = m, z(this, m)
						}
					}
				}
				function x(a) {
					return B.indexOf(a) > -1
				}
				function y(a) {
					if (void 0 !== a.selectionStart)
						return a.selectionStart;
					if (document.selection) {
						a.focus();
						var b = document.selection.createRange();
						return b.moveStart("character", -a.value.length), b.text.length
					}
					return 0
				}
				function z(a, b) {
					if (0 !== a.offsetWidth && 0 !== a.offsetHeight)
						if (a.setSelectionRange)
							a.focus(), a.setSelectionRange(b, b);
						else if (a.createTextRange) {
							var c = a.createTextRange();
							c.collapse(!0), c.moveEnd("character", b), c
									.moveStart("character", b), c.select()
						}
				}
				function A(a) {
					return void 0 !== a.selectionStart ? a.selectionEnd
							- a.selectionStart : document.selection
							? document.selection.createRange().text.length
							: 0
				}
				var B, C, D, E, F, G, H, I, J, K, L, M, N = !1, O = !1, P = d.placeholder, Q = d.maxlength, R = {};
				d.uiOptions ? (R = a.$eval("[" + d.uiOptions + "]"), angular
						.isObject(R[0])
						&& (R = function(a, b) {
							for (var c in a)
								Object.prototype.hasOwnProperty.call(a, c)
										&& (b[c]
												? angular.extend(b[c], a[c])
												: b[c] = angular.copy(a[c]));
							return b
						}(b, R[0]))) : R = b, d.$observe("uiMask", f), d
						.$observe("placeholder", g), e.$formatters.push(h), e.$parsers
						.push(i), c.bind("mousedown mouseup", u), Array.prototype.indexOf
						|| (Array.prototype.indexOf = function(a) {
							"use strict";
							if (null === this)
								throw new TypeError;
							var b = Object(this), c = b.length >>> 0;
							if (0 === c)
								return -1;
							var d = 0;
							if (arguments.length > 1
									&& (d = Number(arguments[1]), d !== d
											? d = 0
											: 0 !== d
													&& 1 / 0 !== d
													&& d !== -1 / 0
													&& (d = (d > 0 || -1)
															* Math.floor(Math
																	.abs(d)))), d >= c)
								return -1;
							for (var e = d >= 0 ? d : Math.max(c - Math.abs(d),
									0); c > e; e++)
								if (e in b && b[e] === a)
									return e;
							return -1
						})
			}
		}
	}
}]), angular.module("ui.reset", []).value("uiResetConfig", null).directive(
		"uiReset", ["uiResetConfig", function(a) {
			var b = null;
			return void 0 !== a && (b = a), {
				require : "ngModel",
				link : function(a, c, d, e) {
					var f;
					f = angular.element('<a class="ui-reset" />'), c
							.wrap('<span class="ui-resetwrap" />').after(f), f
							.bind("click", function(c) {
										c.preventDefault(), a.$apply(
												function() {
													d.uiReset
															? e
																	.$setViewValue(a
																			.$eval(d.uiReset))
															: e
																	.$setViewValue(b), e
															.$render()
												})
									})
				}
			}
		}]), angular.module("ui.route", []).directive("uiRoute",
		["$location", "$parse", function(a, b) {
			return {
				restrict : "AC",
				scope : !0,
				compile : function(c, d) {
					var e;
					if (d.uiRoute)
						e = "uiRoute";
					else if (d.ngHref)
						e = "ngHref";
					else {
						if (!d.href)
							throw new Error("uiRoute missing a route or href property on "
									+ c[0]);
						e = "href"
					}
					return function(c, d, f) {
						function g(b) {
							(hash = b.indexOf("#")) > -1
									&& (b = b.substr(hash + 1)), j = function() {
								i(c, a.path().indexOf(b) > -1)
							}, j()
						}
						function h(b) {
							(hash = b.indexOf("#")) > -1
									&& (b = b.substr(hash + 1)), j = function() {
								var d = new RegExp("^" + b + "$", ["i"]);
								i(c, d.test(a.path()))
							}, j()
						}
						var i = b(f.ngModel || f.routeModel || "$uiRoute").assign, j = angular.noop;
						switch (e) {
							case "uiRoute" :
								f.uiRoute ? h(f.uiRoute) : f.$observe(
										"uiRoute", h);
								break;
							case "ngHref" :
								f.ngHref ? g(f.ngHref) : f
										.$observe("ngHref", g);
								break;
							case "href" :
								g(f.href)
						}
						c.$on("$routeChangeSuccess", function() {
									j()
								}), c.$on("$stateChangeSuccess", function() {
									j()
								})
					}
				}
			}
		}]), angular.module("ui.scrollfix", []).directive("uiScrollfix",
		["$window", function(a) {
			"use strict";
			return {
				require : "^?uiScrollfixTarget",
				link : function(b, c, d, e) {
					var f = c[0].offsetTop, g = e && e.$element
							|| angular.element(a);
					d.uiScrollfix
							? "string" == typeof d.uiScrollfix
									&& ("-" === d.uiScrollfix.charAt(0)
											? d.uiScrollfix = f
													- parseFloat(d.uiScrollfix
															.substr(1))
											: "+" === d.uiScrollfix.charAt(0)
													&& (d.uiScrollfix = f
															+ parseFloat(d.uiScrollfix
																	.substr(1))))
							: d.uiScrollfix = f, g.bind("scroll", function() {
								var b;
								if (angular.isDefined(a.pageYOffset))
									b = a.pageYOffset;
								else {
									var e = document.compatMode
											&& "BackCompat" !== document.compatMode
											? document.documentElement
											: document.body;
									b = e.scrollTop
								}
								!c.hasClass("ui-scrollfix")
										&& b > d.uiScrollfix ? c
										.addClass("ui-scrollfix") : c
										.hasClass("ui-scrollfix")
										&& b < d.uiScrollfix
										&& c.removeClass("ui-scrollfix")
							})
				}
			}
		}]).directive("uiScrollfixTarget", [function() {
					"use strict";
					return {
						controller : function(a) {
							this.$element = a
						}
					}
				}]), angular.module("ui.showhide", []).directive("uiShow",
		[function() {
			return function(a, b, c) {
				a.$watch(c.uiShow, function(a) {
							a ? b.addClass("ui-show") : b
									.removeClass("ui-show")
						})
			}
		}]).directive("uiHide", [function() {
			return function(a, b, c) {
				a.$watch(c.uiHide, function(a) {
							a ? b.addClass("ui-hide") : b
									.removeClass("ui-hide")
						})
			}
		}]).directive("uiToggle", [function() {
	return function(a, b, c) {
		a.$watch(c.uiToggle, function(a) {
					a ? b.removeClass("ui-hide").addClass("ui-show") : b
							.removeClass("ui-show").addClass("ui-hide")
				})
	}
}]), angular.module("ui.unique", []).filter("unique", ["$parse", function(a) {
					return function(b, c) {
						if (c === !1)
							return b;
						if ((c || angular.isUndefined(c)) && angular.isArray(b)) {
							var d = [], e = angular.isString(c)
									? a(c)
									: function(a) {
										return a
									}, f = function(a) {
								return angular.isObject(a) ? e(a) : a
							};
							angular.forEach(b, function(a) {
										for (var b = !1, c = 0; c < d.length; c++)
											if (angular.equals(f(d[c]), f(a))) {
												b = !0;
												break
											}
										b || d.push(a)
									}), b = d
						}
						return b
					}
				}]), angular.module("ui.validate", []).directive("uiValidate",
		function() {
			return {
				restrict : "A",
				require : "ngModel",
				link : function(a, b, c, d) {
					function e(b) {
						return angular.isString(b) ? (a.$watch(b, function() {
									angular.forEach(g, function(a) {
												a(d.$modelValue)
											})
								}), void 0) : angular.isArray(b) ? (angular
								.forEach(b, function(b) {
											a.$watch(b, function() {
														angular.forEach(g,
																function(a) {
																	a(d.$modelValue)
																})
													})
										}), void 0)
								: (angular.isObject(b)
										&& angular.forEach(b, function(b, c) {
											angular.isString(b)
													&& a.$watch(b, function() {
																g[c](d.$modelValue)
															}), angular
													.isArray(b)
													&& angular.forEach(b,
															function(b) {
																a
																		.$watch(
																				b,
																				function() {
																					g[c](d.$modelValue)
																				})
															})
										}), void 0)
					}
					var f, g = {}, h = a.$eval(c.uiValidate);
					h && (angular.isString(h) && (h = {
						validator : h
					}), angular.forEach(h, function(b, c) {
								f = function(e) {
									var f = a.$eval(b, {
												$value : e
											});
									return angular.isObject(f)
											&& angular.isFunction(f.then) ? (f
											.then(function() {
														d.$setValidity(c, !0)
													}, function() {
														d.$setValidity(c, !1)
													}), e) : f ? (d
											.$setValidity(c, !0), e) : (d
											.$setValidity(c, !1), void 0)
								}, g[c] = f, d.$formatters.push(f), d.$parsers
										.push(f)
							}), c.uiValidateWatch
							&& e(a.$eval(c.uiValidateWatch)))
				}
			}
		}), angular.module("ui.utils", ["ui.event", "ui.format",
				"ui.highlight", "ui.include", "ui.indeterminate",
				"ui.inflector", "ui.jq", "ui.keypress", "ui.mask", "ui.reset",
				"ui.route", "ui.scrollfix", "ui.showhide", "ui.unique",
				"ui.validate"]);