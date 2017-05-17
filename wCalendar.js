
var wCalendar = function() {

	/**********************************private static 属性**********************************/
	// 日历初始颜色
	var __wCalendarColor = '3b78e7';

	// 日历的样式
	var __wCalendarStyle;

	// 日历元素模板
	var __wCalendarHtml = '<div unselectable="on" onselectstart="return false;" class="wCalendar_box_c"><div class="wCalendar_box_layer"></div><div class="wCalendar_box"><div class="start_box"><div class="cal_description">Start Date and Time</div><div class="cal_month"><span class="turn_left">&lt;</span><span class="show_mnth"></span><span class="turn_rigt">&gt;</span></div><div class="cal_calendar"><div class="cal_week"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div><div class="cal_date"></div></div><div class="cal_progress"><div class="cal_sub_pro"><div class="cal_pro_point"></div></div></div></div><div class="end_box"><div class="cal_description">End Date and Time</div><div class="cal_month"><span class="turn_left">&lt;</span><span class="show_mnth"></span><span class="turn_rigt">&gt;</span></div><div class="cal_calendar"><div class="cal_week"><span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span></div><div class="cal_date"></div></div><div class="cal_progress"><div class="cal_sub_pro"><div class="cal_pro_point"></div></div></div></div><div class="cal_buttons"><input class="cal_button" type="button" value="Cancel"><input class="cal_button" type="button" value="Confirm"></div><div class="arrow top"><div class="arrow_bg"></div></div><div class="arrow bottom"></div><div class="folding">to</div></div></div>';

	// 设置样式表
	var __updateWcalendarStyle = function() {

		__wCalendarStyle = '.wCalendar_box_c{top:0;left:0;z-index:9998;position:absolute;display:none;}.wCalendar_box_c *{cursor:default;}.wCalendar_box_layer{top:0;left:0;z-index:1;width:100%;height:100%;position:fixed;background:rgba(0,0,0,0.3);}.wCalendar_box{color:#9e9e9e;font-family:"Arial";width:497px;height:324px;border:1px solid #d2d9de;background:#fff;position:absolute;border-bottom:none;border-radius:4px;z-index:2;box-sizing:content-box;}.wCalendar_box .arrow{width:0;height:0;left:25%;margin-left:-8px;position:absolute;border-style:solid;display:none;}.wCalendar_box .arrow .arrow_bg{width:0;height:0;position:absolute;border-style:solid;}.wCalendar_box .arrow.top{top:-16px;border-width:0 13px 16px 13px;border-color:transparent transparent #d2d9de transparent;}.wCalendar_box .arrow.top .arrow_bg{ top:1px;left:-11px;border-width:0px 11px 15px 11px;border-color:transparent transparent #fff transparent;}.wCalendar_box .arrow.bottom{bottom:-16px;border-width:16px 13px 0 13px;border-color:#' + __wCalendarColor + ' transparent transparent transparent;}.wCalendar_box .folding{top:164px;left:50%;margin-left:-17px;width:32px;height:32px;color:#' + __wCalendarColor + ';font-size:15px;font-weight:bold;position:absolute;border-radius:32px;line-height:32px;text-align:center;border:1px solid #d2d9de;background:#fff;}.wCalendar_box .start_box{top:0;left:0;width:248px;height:100%;position:absolute;}.wCalendar_box .end_box{top:0;right:0;width:248px;height:100%;position:absolute;border-left:1px solid #d2d9de;box-sizing:content-box;}.wCalendar_box .cal_description{height:42px;color:#' + __wCalendarColor + ';font-size:14px;line-height:44px;text-align:center;}.wCalendar_box .cal_month{height:32px;color:#3e3e3e;font-size:14px;background:#f1f1f1;text-align:center;line-height:32px;position:relative;}.wCalendar_box .cal_month .turn_left,.wCalendar_box .cal_month .turn_rigt{width:54px;font-size:18px;cursor:pointer;font-family:"Sim Hei";font-weight:bold;transition:all .4s;-moz-transition:all .4s;-webkit-transition:all .4s;-o-transition:all .4s;}.wCalendar_box .cal_month .turn_left:hover,.wCalendar_box .cal_month .turn_rigt:hover{color:#' + __wCalendarColor + ';background:rgba(0,0,0,.1);}.wCalendar_box .cal_month .turn_left{left:0;text-align:left;padding-left:18px;position:absolute;}.wCalendar_box .cal_month .turn_rigt{right:0;text-align:right;padding-right:18px;position:absolute;}.wCalendar_box .cal_calendar{}.wCalendar_box .cal_calendar .cal_week,.wCalendar_box .cal_calendar .cal_date{width:196px;margin-left:auto;margin-right:auto;}.wCalendar_box .cal_calendar span{width:22px;height:22px;margin:3px 3px 0 3px;line-height:22px;font-size:12px;text-align:center;display:inline-block;}.wCalendar_box .cal_calendar .cal_week{margin-top:12px;}.wCalendar_box .cal_calendar .cal_week span{color:#' + __wCalendarColor + ';}.wCalendar_box .cal_calendar .cal_date{height:160px;}.wCalendar_box .cal_calendar .cal_date span{border-radius:2px;}.wCalendar_box .cal_calendar .cal_date span.disabled{color:#bdbdbd;cursor:default;}.wCalendar_box .cal_calendar .cal_date span.enabled{color:#000;cursor:pointer;}.wCalendar_box .cal_calendar .cal_date span.enabled:hover{color:#fff;background:#' + __wCalendarColor + ';}.wCalendar_box .cal_calendar .cal_date span.current{color:#fff;background:#' + __wCalendarColor + ';cursor:default;}.wCalendar_box .cal_progress{width:196px;height:1px;background:#d2d9de;margin:2px auto 0 auto;}.wCalendar_box .cal_progress .cal_sub_pro{width:0%;height:100%;background:#' + __wCalendarColor + ';position:relative;}.wCalendar_box .cal_progress .cal_sub_pro .cal_pro_point{width:9px;height:9px;top:-4px;right:-5px;background:#' + __wCalendarColor + ';border-radius:10px;position:absolute;}.wCalendar_box div.cal_buttons{left:0;bottom:0;width:100%;height:36px;position:absolute;overflow:hidden;border-radius:0 0 4px 4px;}.wCalendar_box .cal_buttons input.cal_button{width:248px;height:100%;color:#fff;font-size:14px;font-family:"Arial";cursor:pointer;border:none;background:#' + __wCalendarColor + ';top:0;left:0;margin:0;transition:color 300ms,background 300ms;-moz-transition:color 300ms,background 300ms;-webkit-transition:color 300ms,background 300ms;-o-transition:color 300ms,background 300ms;}.wCalendar_box .cal_buttons input.cal_button:hover{color:#' + __wCalendarColor + ';background:#e0e0e0;}.wCalendar_box .cal_buttons input.cal_button:focus{outline:0;}.wCalendar_box .cal_buttons input:first-child{float:left;}.wCalendar_box .cal_buttons input:last-child{float:right;}';
	};

	// 加载样式表
	var __appendStyleSheet = function() {

		if (jQuery('style#wCalendarStyle').length < 1) {
			jQuery('body').append(jQuery('<style type="text/css" id="wCalendarStyle">' + __wCalendarStyle + '</style>'));
		}
	};

	/**********************************public static 方法**********************************/
	// 生成实例
	var init = function(ele, callback) {

		var calendarMode, calendarEle, calendarY;
		var currentTime, currentUserTime, currentPageMonth;

		/**********************************private 方法**********************************/
		// 生成每一项日期
		var __setCalendarItems = function(index) {

			var _year, _month, totalDays = 0, pos = 0;
			var userTime, itemsDiv, monthDiv;
			if (index === 1) {
				userTime = currentUserTime.startDate;
				pageMonth = currentPageMonth.startMonth;
				itemsDiv = calendarEle.find('.start_box .cal_date');
				monthDiv = calendarEle.find('.start_box .show_mnth');
			}
			if (index === 2) {
				userTime = currentUserTime.endDate;
				pageMonth = currentPageMonth.endMonth;
				itemsDiv = calendarEle.find('.end_box .cal_date');
				monthDiv = calendarEle.find('.end_box .show_mnth');
			}
			_year = pageMonth.getFullYear();
			_month = pageMonth.getMonth();
			totalDays = new Date(_year, _month + 1, 0).getDate();
			pos = new Date(_year, _month, 1).getDay();

			monthDiv.html(_year + '.' + (_month + 1));
			itemsDiv.empty();
			for (var i = 0; i < pos; i ++) {
				itemsDiv.append('<span>&nbsp;</span>');
			}
			for (var j = 1; j <= totalDays; j ++) {
				var itemClass = '', temTime = new Date(_year, _month, j);
				// 日期模式
				if (calendarMode === 1) {
					if (temTime - userTime === 0) {
						itemClass = 'current';
					}
					else {
						if (index === 1) {
							itemClass = 'enabled';
						}
						if (index === 2) {
							if (temTime - currentUserTime.startDate >= 0) {
								itemClass = 'enabled';
							}
							else {
								itemClass = 'disabled';
							}
						}
					}
				}
				// 星期模式
				if (calendarMode === 2) {
					if (temTime - userTime === 0) {
						itemClass = 'current';
					}
					else {
						if (index === 1) {
							if (new Date(_year, _month, j).getDay() === 1) {
								itemClass = 'enabled';
							}
							else {
								itemClass = 'disabled';
							}
						}
						if (index === 2) {
							if (temTime - currentUserTime.startDate > 0 && new Date(_year, _month, j).getDay() === 1) {
								itemClass = 'enabled';
							}
							else {
								itemClass = 'disabled';
							}
						}
					}
				}
				// 月份模式
				if (calendarMode === 3) {
					if (temTime - userTime === 0) {
						itemClass = 'current';
					}
					else {
						if (index === 1) {
							if (j === 1) {
								itemClass = 'enabled';
							}
							else {
								itemClass = 'disabled';
							}
						}
						if (index === 2) {
							if (j === 1) {
								if (temTime - currentUserTime.startDate > 0) {
									itemClass = 'enabled';
								}
							}
							else {
								itemClass = 'disabled';
							}
						}
					}
				}
				itemsDiv.append(jQuery('<span class="' + itemClass + '">' + j + '</span>'));
			}
		};

		// 设置进度条
		var __setProgress = function() {

			var totalStart = new Date(currentUserTime.startDate.getFullYear(), currentUserTime.startDate.getMonth() + 1, 0).getDate();
			var totalEnd = new Date(currentUserTime.endDate.getFullYear(), currentUserTime.endDate.getMonth() + 1, 0).getDate();
			var pctStart = currentUserTime.startDate.getDate() / totalStart * 100;
			var pctEnd = currentUserTime.endDate.getDate() / totalEnd * 100;
			calendarEle.find('.start_box .cal_progress .cal_sub_pro').css('width', pctStart + '%');
			calendarEle.find('.end_box .cal_progress .cal_sub_pro').css('width', pctEnd + '%');
		};

		// 绑定日历item的点击事件
		var __bindEvents = function() {

			calendarEle.find('.cal_calendar .cal_date span').unbind();
			calendarEle.find('.start_box .cal_date span.enabled').click(function() {

				var startMonth = currentPageMonth.startMonth;
				var temStartDate = new Date(startMonth.getFullYear(), startMonth.getMonth(), parseInt(jQuery(this).html()));
				var temEndDate = new Date(currentUserTime.endDate.getTime());
				if (calendarMode === 1) {
					if (temStartDate > currentUserTime.endDate) {
						temEndDate = new Date(temStartDate.getTime());
					}
				}
				if (calendarMode === 2) {
					if (currentUserTime.endDate - temStartDate < 604800000) {
						temEndDate = new Date(temStartDate.getTime() + 604800000);
					}
				}
				if (calendarMode === 3) {
					if (currentUserTime.endDate.getMonth() - temStartDate.getMonth() < 1) {
						temEndDate = new Date(temStartDate.getFullYear(), temStartDate.getMonth() + 1, 1);
					}
				}
				currentUserTime.startDate = new Date(temStartDate.getTime());
				currentUserTime.endDate = new Date(temEndDate.getTime());
				currentPageMonth.endMonth = new Date(temEndDate.getTime());
				_updateCalendarItems();
			});
			calendarEle.find('.end_box .cal_date span.enabled').click(function() {

				var endMonth = currentPageMonth.endMonth;
				var temEndDate = new Date(endMonth.getFullYear(), endMonth.getMonth(), parseInt(jQuery(this).html()));
				currentUserTime.endDate = new Date(temEndDate.getTime());
				currentPageMonth.endMonth = new Date(temEndDate.getTime());
				_updateCalendarItems();
			});
		};

		// 日历初始化
		var _init = function() {

			var temDate = new Date();
			var stamp = new Date(temDate.getFullYear(), temDate.getMonth(), temDate.getDate()).getTime();
			__appendStyleSheet();
			currentTime = {startDate: new Date(stamp), endDate: new Date(stamp)};
			currentUserTime = {startDate: new Date(stamp), endDate: new Date(stamp)};
			currentPageMonth = {startMonth: new Date(stamp), endMonth: new Date(stamp)};
			calendarEle = jQuery(__wCalendarHtml).appendTo('body');
			calendarY = calendarY || 0;
			calendarMode = 1;
		};

		// 更新日历的日期项
		var _updateCalendarItems = function() {

			__setCalendarItems(1);
			__setCalendarItems(2);
			__setProgress();
			__bindEvents();
		};

		// 设置日历的时间为用户选择的时间
		var _setCurrentTimeAsUserTime = function() {

			currentTime.startDate.setTime(currentUserTime.startDate.getTime());
			currentTime.endDate.setTime(currentUserTime.endDate.getTime());
		};

		// 显示日历
		var _showCalendar = function() {

			var top, left, offsetX = ele.offset().left, offsetY = ele.offset().top, width = ele.width(), height = ele.height();
			currentUserTime.startDate.setTime(currentTime.startDate.getTime());
			currentUserTime.endDate.setTime(currentTime.endDate.getTime());
			currentPageMonth.startMonth.setTime(currentTime.startDate.getTime());
			currentPageMonth.endMonth.setTime(currentTime.endDate.getTime());
			calendarEle.find('.arrow').hide();
			left = offsetX;
			if (jQuery(window).height() > 2 * calendarY) {
				top = offsetY + height + 20;
				calendarEle.find('.arrow.top').show();
			}
			else {
				top = offsetY - 346;
				calendarEle.find('.arrow.bottom').show();
			}
			calendarEle.find('.wCalendar_box').css({'top': top + 'px', 'left': left + 'px'});
			calendarEle.fadeIn(200);
		};

		// 隐藏日历
		var _hideCalendar = function() {

			calendarEle.fadeOut(300);
		};

		// 执行回调函数
		var _callBack = function() {

			if (callback) {
				callback(
					new Date(currentTime.startDate.getTime()),
					new Date(currentTime.endDate.getTime() + 86399000)
				);
			}
		};

		// 绑定初始事件
		var _bindInitEvents = function() {

			ele.click(function(e) {

				calendarY = e.clientY || e.originalEvent.y;
				_showCalendar(e);
				_updateCalendarItems();
			});
			calendarEle.find('.start_box .cal_month .turn_left').click(function() {

				currentPageMonth.startMonth.setMonth(currentPageMonth.startMonth.getMonth() - 1);
				_updateCalendarItems();
				return false;
			});
			calendarEle.find('.start_box .cal_month .turn_rigt').click(function() {

				currentPageMonth.startMonth.setMonth(currentPageMonth.startMonth.getMonth() + 1);
				_updateCalendarItems();
				return false;
			});
			calendarEle.find('.end_box .cal_month .turn_left').click(function() {

				currentPageMonth.endMonth.setMonth(currentPageMonth.endMonth.getMonth() - 1);
				_updateCalendarItems();
				return false;
			});
			calendarEle.find('.end_box .cal_month .turn_rigt').click(function() {

				currentPageMonth.endMonth.setMonth(currentPageMonth.endMonth.getMonth() + 1);
				_updateCalendarItems();
				return false;
			});
			calendarEle.find('.cal_buttons input.cal_button:first-child, .wCalendar_box_layer').click(function() {

				_hideCalendar();
				return false;
			});
			calendarEle.find('.cal_buttons input.cal_button:last-child').click(function() {

				_setCurrentTimeAsUserTime();
				_callBack();
				_hideCalendar();
				return false;
			});
			calendarEle.click(function() {

				return false;
			});
		};

		/**********************************public 方法**********************************/
		// 显示日历
		var show = function() {

			_showCalendar();
			_updateCalendarItems();
			return this;
		};

		// 隐藏日历
		var hide = function() {

			_hideCalendar();
			return this;
		};

		// 设置单个日历
		var single = function() {

			calendarEle.find('.wCalendar_box').css('width', '248px');
			calendarEle.find('.end_box').css('display', 'none');
			calendarEle.find('.folding').css('display', 'none');
			calendarEle.find('.cal_buttons input.cal_button').css('width', '123.5px');
			return this;
		};

		// 设置双个日历
		var doubles = function() {

			calendarEle.find('.wCalendar_box').css('width', '497px');
			calendarEle.find('.end_box').css('display', 'block');
			calendarEle.find('.folding').css('display', 'block');
			calendarEle.find('.cal_buttons input.cal_button').css('width', '248px');
			return this;
		};

		// 设置时间
		var setTime = function() {

			var startStamp, endStamp, startDate, endDate;
			var paramLength = arguments.length;
			if (paramLength === 2) {
				startStamp = arguments[0];
				endStamp = arguments[1];
				startDate = new Date(startStamp);
				endDate = new Date(endStamp);
				startDate.setHours(0);
				startDate.setMinutes(0);
				startDate.setSeconds(0);
				endDate.setHours(0);
				endDate.setMinutes(0);
				endDate.setSeconds(0);
				startStamp = startDate.getTime();
				endStamp = endDate.getTime();
			}
			else if (paramLength === 6) {
				startDate = new Date(arguments[0], arguments[1] - 1, arguments[2]);
				endDate = new Date(arguments[3], arguments[4] - 1, arguments[5]);
				startStamp = startDate.getTime();
				endStamp = endDate.getTime();
			}
			else {
				return false;
			}
			for (var i = 0; i < arguments.length; i ++) {
				var arg = parseInt(arguments[i]);
				if (arg !== arg) {
					return false;
				}
			}
			if (calendarMode === 1) {
				if (endStamp - startStamp < 0) return false;
			}
			else if (calendarMode === 2) {
				if (new Date(startStamp).getDay() != 1 || new Date(endStamp).getDay() != 1) return false;
				if (endStamp - startStamp < 1) return false;
			}
			else if (calendarMode === 3) {
				if (new Date(startStamp).getDate() != 1 || new Date(endStamp).getDate() != 1) return false;
				if (endStamp - startStamp < 1) return false;
			}
			else {
				return false;
			}
			currentTime.startDate.setTime(startStamp);
			currentTime.endDate.setTime(endStamp);
			currentUserTime.startDate.setTime(startStamp);
			currentUserTime.endDate.setTime(endStamp);
			currentPageMonth.startMonth.setTime(startStamp);
			currentPageMonth.endMonth.setTime(endStamp);
			_updateCalendarItems();
			_callBack();
			return this;
		};

		// 获取时间
		var getTime = function(format) {

			var startTime = currentTime.startDate, endTime = currentTime.endDate;
			if (typeof(format) === 'number') {
				return {startTime: startTime.getTime(), endTime: endTime.getTime() + 86399000};
			}
			else if (typeof(format) === 'string') {
				return {
					startTime: '' + startTime.getFullYear() + '' + format + (startTime.getMonth() < 9 ? '0' : '') + (startTime.getMonth() + 1) + format + (startTime.getDate() < 10 ? '0' : '') + startTime.getDate(),
					endTime: '' + endTime.getFullYear() + format + (endTime.getMonth() < 9 ? '0' : '') + (endTime.getMonth() + 1) + format + (endTime.getDate() < 10 ? '0' : '') + endTime.getDate()
				};
			}
			else {
				return {startTime: new Date(startTime.getTime()), endTime: new Date(endTime.getTime() + 86399000)};
			}
		};

		// 设置模式
		var setMode = function(mode) {

			var time = new Date(), year = time.getFullYear(), month = time.getMonth(), date = time.getDate();
			var stamp = new Date(year, month, date).getTime();
			var firstMonday;
			if (mode === 1 || mode === 2 || mode === 3) {
				calendarMode = mode;
				if (calendarMode === 1) {
					currentTime = {startDate: new Date(stamp), endDate: new Date(stamp)};
					currentUserTime = {startDate: new Date(stamp), endDate: new Date(stamp)};
					currentPageMonth = {startMonth: new Date(stamp), endMonth: new Date(stamp)};
				}
				if (calendarMode === 2) {
					for (var i = 1; i <= 7; i ++) {
						if (new Date(year, month, i).getDay() === 1) {
							firstMonday = i;
							break;
						}
					}
					currentTime = {startDate: new Date(year, month, firstMonday), endDate: new Date(year, month, firstMonday + 7)};
					currentUserTime = {startDate: new Date(year, month, firstMonday), endDate: new Date(year, month, firstMonday + 7)};
					currentPageMonth = {startMonth: new Date(year, month, firstMonday), endMonth: new Date(year, month, firstMonday + 7)};
				}
				if (calendarMode === 3) {
					currentTime = {startDate: new Date(year, month, 1), endDate: new Date(year, month + 1, 1)};
					currentUserTime = {startDate: new Date(year, month, 1), endDate: new Date(year, month + 1, 1)};
					currentPageMonth = {startMonth: new Date(year, month, 1), endMonth: new Date(year, month + 1, 1)};
				}
				_updateCalendarItems();
				return this;
			}
			return false;
		};

		// 设置标题
		var setTitle = function(titleA, titleB) {

			titleA = titleA || '';
			titleA = titleA.replace(/(^\s+)|(\s+$)/g, '');
			titleB = titleB || '';
			titleB = titleB.replace(/(^\s+)|(\s+$)/g, '');
			if (titleA !== '') {
				calendarEle.find('.start_box .cal_description').text(titleA);
			}
			if (titleB !== '') {
				calendarEle.find('.end_box .cal_description').text(titleB);
			}
			return this;
		};

		// 初始化
		_init();
		_updateCalendarItems();
		_setCurrentTimeAsUserTime();
		_bindInitEvents();

		// 返回实例方法
		return {

			show: show,
			hide: hide,
			single: single,
			double: doubles,
			setTime: setTime,
			getTime: getTime,
			setMode: setMode,
			setTitle: setTitle
		};
	};

	// 设置主颜色
	var setColor = function(color) {

		var styleSheet, filter = new RegExp('^[0-9a-fA-F]{6}$|^[0-9a-fA-F]{3}$');
		if (filter.test(color) !== true) {
			return false;
		}
		__wCalendarColor = color;
		__updateWcalendarStyle();
		styleSheet = jQuery('style[id="wCalendarStyle"]');
		if (styleSheet.length === 1) {
			styleSheet.html(__wCalendarStyle);
		}
		return this;
	};

	__updateWcalendarStyle();

	// 返回静态方法
	return {

		init: init,
		setColor: setColor
	};
}();
