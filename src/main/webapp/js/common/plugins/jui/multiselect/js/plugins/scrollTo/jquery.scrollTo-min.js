/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery. Copyright (c)
 * 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com |
 * http://flesler.blogspot.com Dual licensed under MIT and GPL. Date: 3/9/2009
 * 
 * @author Ariel Flesler
 * @version 1.4.1
 * 
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;
(function($) {
	var m = $.scrollTo = function(b, h, f) {
		$(window).scrollTo(b, h, f)
	};
	m.defaults = {
		axis : 'xy',
		duration : parseFloat($.fn.jquery) >= 1.3 ? 0 : 1
	};
	m.window = function(b) {
		return $(window).scrollable()
	};
	$.fn.scrollable = function() {
		return this.map(function() {
					var b = this, h = !b.nodeName
							|| $.inArray(b.nodeName.toLowerCase(), ['iframe',
											'#document', 'html', 'body']) != -1;
					if (!h)
						return b;
					var f = (b.contentWindow || b).document || b.ownerDocument
							|| b;
					return $.browser.safari || f.compatMode == 'BackCompat'
							? f.body
							: f.documentElement
				})
	};
	$.fn.scrollTo = function(l, j, a) {
		if (typeof j == 'object') {
			a = j;
			j = 0
		}
		if (typeof a == 'function')
			a = {
				onAfter : a
			};
		if (l == 'max')
			l = 9e9;
		a = $.extend({}, m.defaults, a);
		j = j || a.speed || a.duration;
		a.queue = a.queue && a.axis.length > 1;
		if (a.queue)
			j /= 2;
		a.offset = n(a.offset);
		a.over = n(a.over);
		return this.scrollable().each(function() {
			var k = this, o = $(k), d = l, p, g = {}, q = o.is('html,body');
			switch (typeof d) {
				case 'number' :
				case 'string' :
					if (/^([+-]=)?\d+(\.\d+)?(px)?$/.test(d)) {
						d = n(d);
						break
					}
					d = $(d, this);
				case 'object' :
					if (d.is || d.style)
						p = (d = $(d)).offset()
			}
			$.each(a.axis.split(''), function(b, h) {
				var f = h == 'x' ? 'Left' : 'Top', i = f.toLowerCase(), c = 'scroll'
						+ f, r = k[c], s = h == 'x' ? 'Width' : 'Height';
				if (p) {
					g[c] = p[i] + (q ? 0 : r - o.offset()[i]);
					if (a.margin) {
						g[c] -= parseInt(d.css('margin' + f)) || 0;
						g[c] -= parseInt(d.css('border' + f + 'Width')) || 0
					}
					g[c] += a.offset[i] || 0;
					if (a.over[i])
						g[c] += d[s.toLowerCase()]() * a.over[i]
				} else
					g[c] = d[i];
				if (/^\d+$/.test(g[c]))
					g[c] = g[c] <= 0 ? 0 : Math.min(g[c], u(s));
				if (!b && a.queue) {
					if (r != g[c])
						t(a.onAfterFirst);
					delete g[c]
				}
			});
			t(a.onAfter);
			function t(b) {
				o.animate(g, j, a.easing, b && function() {
							b.call(this, l, a)
						})
			};
			function u(b) {
				var h = 'scroll' + b;
				if (!q)
					return k[h];
				var f = 'client' + b, i = k.ownerDocument.documentElement, c = k.ownerDocument.body;
				return Math.max(i[h], c[h]) - Math.min(i[f], c[f])
			}
		}).end()
	};
	function n(b) {
		return typeof b == 'object' ? b : {
			top : b,
			left : b
		}
	}
})(jQuery);