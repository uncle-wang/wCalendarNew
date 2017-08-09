(function(global, factory) {

	// 判断jQuery
	if (!global.$wCalendar) {
		throw new Error('$wCalendar is not defined');
	}
	else {
		factory(global, global.$wCalendar);
	}
	return;

})(typeof window !== "undefined" ? window : this, function(window, $) {

	var cssContent = '\
		.wCalendar-box-c {\
			top: 0;\
			left: 0;\
			z-index: 9998;\
			position: absolute;\
			display: none;\
		}\
		.wCalendar-box-c * {\
			cursor: default;\
		}\
		.wCalendar-box-layer {\
			top: 0;\
			left: 0;\
			z-index: 1;\
			width: 100%;\
			height: 100%;\
			position: fixed;\
			background: rgba(0, 0, 0, 0.3);\
		}\
		.wCalendar-box {\
			color: #9e9e9e;\
			font-family: "Arial";\
			width: 497px;\
			height: 324px;\
			border: 1px solid #d2d9de;\
			background: #fff;\
			position: fixed;\
			border-bottom: none;\
			border-radius: 4px;\
			z-index: 2;\
			box-sizing: content-box;\
		}\
		.wCalendar-box .arrow {\
			width: 0;\
			height: 0;\
			left: 25%;\
			margin-left: -8px;\
			position: absolute;\
			border-style: solid;\
			display: none;\
		}\
		.wCalendar-box.arrow-right .arrow {\
			left: auto;\
			margin-left: 0;\
			right: 25%;\
			margin-right: -8px;\
		}\
		.wCalendar-box .arrow .arrow-bg {\
			width: 0;\
			height: 0;\
			position: absolute;\
			border-style: solid;\
		}\
		.wCalendar-box .arrow.top {\
			top: -16px;\
			border-width: 0 13px 16px 13px;\
			border-color: transparent transparent #d2d9de transparent;\
		}\
		.wCalendar-box .arrow.top .arrow-bg {\
			top: 1px;\
			left: -11px;\
			border-width: 0px 11px 15px 11px;\
			border-color: transparent transparent #fff transparent;\
		}\
		.wCalendar-box .arrow.bottom {\
			bottom: -16px;\
			border-width: 16px 13px 0 13px;\
			border-color: #3b78e7 transparent transparent transparent;\
		}\
		.wCalendar-box .folding {\
			top: 164px;\
			left: 50%;\
			margin-left: -17px;\
			width: 32px;\
			height: 32px;\
			color: #3b78e7;\
			font-size: 15px;\
			font-weight: bold;\
			position: absolute;\
			border-radius: 32px;\
			line-height: 32px;\
			text-align: center;\
			border: 1px solid #d2d9de;\
			background: #fff;\
		}\
		.wCalendar-box .start-box {\
			top: 0;\
			left: 0;\
			width: 248px;\
			height: 100%;\
			position: absolute;\
		}\
		.wCalendar-box .end-box {\
			top: 0;\
			right: 0;\
			width: 248px;\
			height: 100%;\
			position: absolute;\
			border-left: 1px solid #d2d9de;\
			box-sizing: content-box;\
		}\
		.wCalendar-box .cal-description {\
			height: 42px;\
			color: #3b78e7;\
			font-size: 14px;\
			line-height: 44px;\
			text-align: center;\
		}\
		.wCalendar-box .cal-month {\
			height: 32px;\
			color: #3e3e3e;\
			font-size: 14px;\
			background: #f1f1f1;\
			text-align: center;\
			line-height: 32px;\
			position: relative;\
		}\
		.wCalendar-box .cal-month .turn-left, .wCalendar-box .cal-month .turn-rigt {\
			width: 54px;\
			font-size: 18px;\
			cursor: pointer;\
			font-family: "Sim Hei";\
			font-weight: bold;\
			transition: all .4s;\
			-moz-transition: all .4s;\
			-webkit-transition: all .4s;\
			-o-transition: all .4s;\
		}\
		.wCalendar-box .cal-month .turn-left:hover, .wCalendar-box .cal-month .turn-rigt:hover {\
			color: #3b78e7;\
			background: rgba(0, 0, 0, .1);\
		}\
		.wCalendar-box .cal-month .turn-left {\
			left: 0;\
			text-align: left;\
			padding-left: 18px;\
			position: absolute;\
		}\
		.wCalendar-box .cal-month .turn-rigt {\
			right: 0;\
			text-align: right;\
			padding-right: 18px;\
			position: absolute;\
		}\
		.wCalendar-box .cal-calendar {\
		}\
		.wCalendar-box .cal-calendar .cal-week, .wCalendar-box .cal-calendar .cal-date {\
			width: 196px;\
			margin-left: auto;\
			margin-right: auto;\
			overflow: hidden;\
		}\
		.wCalendar-box .cal-calendar span {\
			width: 22px;\
			height: 22px;\
			margin: 3px 3px 0 3px;\
			line-height: 22px;\
			font-size: 12px;\
			text-align: center;\
			display: block;\
			float: left;\
		}\
		.wCalendar-box .cal-calendar .cal-week {\
			margin-top: 12px;\
		}\
		.wCalendar-box .cal-calendar .cal-week span {\
			color: #3b78e7;\
		}\
		.wCalendar-box .cal-calendar .cal-date {\
			height: 160px;\
		}\
		.wCalendar-box .cal-calendar .cal-date span {\
			border-radius: 2px;\
		}\
		.wCalendar-box .cal-calendar .cal-date span.disabled {\
			color: #bdbdbd;\
			cursor: default;\
		}\
		.wCalendar-box .cal-calendar .cal-date span.enabled {\
			color: #000;\
			cursor: pointer;\
		}\
		.wCalendar-box .cal-calendar .cal-date span.enabled:hover {\
			color: #fff;\
			background: #3b78e7;\
		}\
		.wCalendar-box .cal-calendar .cal-date span.current {\
			color: #fff;\
			background: #3b78e7;\
			cursor: default;\
		}\
		.wCalendar-box .cal-progress {\
			width: 196px;\
			height: 1px;\
			background: #d2d9de;\
			margin: 2px auto 0 auto;\
		}\
		.wCalendar-box .cal-progress .cal-sub-pro {\
			width: 0%;\
			height: 100%;\
			background: #3b78e7;\
			position: relative;\
		}\
		.wCalendar-box .cal-progress .cal-sub-pro .cal-pro-point {\
			width: 9px;\
			height: 9px;\
			top: -4px;\
			right: -5px;\
			background: #3b78e7;\
			border-radius: 10px;\
			position: absolute;\
		}\
		.wCalendar-box div.cal-buttons {\
			left: 0;\
			bottom: 0;\
			width: 100%;\
			height: 36px;\
			position: absolute;\
			overflow: hidden;\
			border-radius: 0 0 4px 4px;\
		}\
		.wCalendar-box .cal-buttons input.cal-button {\
			width: 248px;\
			height: 100%;\
			color: #fff;\
			font-size: 14px;\
			font-family: "Arial";\
			cursor: pointer;\
			border: none;\
			background: #3b78e7;\
			top: 0;\
			left: 0;\
			margin: 0;\
			transition: color 300ms, background 300ms;\
			-moz-transition: color 300ms, background 300ms;\
			-webkit-transition: color 300ms, background 300ms;\
			-o-transition: color 300ms, background 300ms;\
		}\
		.wCalendar-box .cal-buttons input.cal-button:hover {\
			color: #3b78e7;\
			background: #e0e0e0;\
		}\
		.wCalendar-box .cal-buttons input.cal-button:focus {\
			outline: 0;\
		}\
		.wCalendar-box .cal-buttons input.cancel {\
			float: left;\
		}\
		.wCalendar-box .cal-buttons input.confirm {\
			float: right;\
		}\
	';
	var htmlContent = '\
		<div class="wCalendar-box-layer"></div>\
		<div class="wCalendar-box">\
			<div class="start-box">\
				<div class="cal-description"></div>\
				<div class="cal-month">\
					<span class="turn-left">&lt;</span>\
					<span class="show-mnth"></span>\
					<span class="turn-rigt">&gt;</span>\
				</div>\
				<div class="cal-calendar">\
					<div class="cal-week">\
						<span>S</span>\
						<span>M</span>\
						<span>T</span>\
						<span>W</span>\
						<span>T</span>\
						<span>F</span>\
						<span>S</span>\
					</div>\
					<div class="cal-date"></div>\
				</div>\
				<div class="cal-progress">\
					<div class="cal-sub-pro">\
						<div class="cal-pro-point"></div>\
					</div>\
				</div>\
			</div>\
			<div class="end-box">\
				<div class="cal-description"></div>\
				<div class="cal-month">\
					<span class="turn-left">&lt;</span>\
					<span class="show-mnth"></span>\
					<span class="turn-rigt">&gt;</span>\
				</div>\
				<div class="cal-calendar">\
					<div class="cal-week">\
						<span>S</span>\
						<span>M</span>\
						<span>T</span>\
						<span>W</span>\
						<span>T</span>\
						<span>F</span>\
						<span>S</span>\
					</div>\
					<div class="cal-date"></div>\
				</div>\
				<div class="cal-progress">\
					<div class="cal-sub-pro">\
						<div class="cal-pro-point"></div>\
					</div>\
				</div>\
			</div>\
			<div class="cal-buttons">\
				<input class="cal-button cancel" type="button" value="Cancel">\
				<input class="cal-button confirm" type="button" value="Confirm">\
			</div>\
			<div class="arrow top">\
				<div class="arrow-bg"></div>\
			</div>\
			<div class="arrow bottom"></div>\
			<div class="folding">to</div>\
		</div>\
	';

	// 所有calendar实例共享一个样式
	var cssNode = $('style#wCalendarStyle');
	if (cssNode.nodeList.length <= 0) {
		var cssNode = $(document.createElement('style'));
		cssNode.html(cssContent);
		$('body').append(cssNode);
	}

	// 判断返回key的值或默认的值
	var _deal = function(obj, key, defaultValue) {

		if (typeof obj === 'object') {
			if (obj[key] !== undefined) {
				return obj[key];
			}
		}
		return defaultValue;
	};
	// 控制台报错
	var _error = function(info) {

		throw new Error(info);
	};
	// 获取给定月份的天数
	var _getDate = function(date) {

		var formatDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		return formatDate.getDate();
	};

	// Calendar节点构造函数
	var CalendarNode = function(calendarInstance) {

		// 根节点
		var wCalendarBoxRootNode = $(document.createElement('div'));
		wCalendarBoxRootNode
		.attr('unselectable', 'on')
		.attr('onselectstart', 'return false;')
		.attr('class', 'wCalendar-box-c')
		.html(htmlContent);
		$('body').append(wCalendarBoxRootNode);

		this.node = wCalendarBoxRootNode;
		this.calendar = calendarInstance;

		this.bindInitEvents().setTitle().update();
	};
	// 绑定事件
	CalendarNode.prototype.bindInitEvents = function() {

		var self = this;
		var node = self.node;
		var calendar = self.calendar;

		node.find('.wCalendar-box-layer, .cal-button.cancel').click(function() {

			self.hide();
		});
		node.find('.cal-button.confirm').click(function() {

			self.confirmUserSelectedTime();
		});
		node.find('.start-box .turn-left').click(function() {

			var timeTurned = new Date(calendar.startTimeTurned.getTime());
			calendar.startTimeTurned = new Date(timeTurned.getFullYear(), timeTurned.getMonth() - 1);
			self.update();
		});
		node.find('.start-box .turn-rigt').click(function() {

			var timeTurned = new Date(calendar.startTimeTurned.getTime());
			calendar.startTimeTurned = new Date(timeTurned.getFullYear(), timeTurned.getMonth() + 1);
			self.update();
		});
		node.find('.end-box .turn-left').click(function() {

			var timeTurned = new Date(calendar.endTimeTurned.getTime());
			calendar.endTimeTurned = new Date(timeTurned.getFullYear(), timeTurned.getMonth() - 1);
			self.update();
		});
		node.find('.end-box .turn-rigt').click(function() {

			var timeTurned = new Date(calendar.endTimeTurned.getTime());
			calendar.endTimeTurned = new Date(timeTurned.getFullYear(), timeTurned.getMonth() + 1);
			self.update();
		});
		return this;
	};
	// 设置title
	CalendarNode.prototype.setTitle = function() {

		var node = this.node;
		var calendar = this.calendar;
		node.find('.start-box .cal-description').text(calendar.titleLeft);
		node.find('.end-box .cal-description').text(calendar.titleRight);
		return this;
	};
	// 设置月份
	CalendarNode.prototype.setMonth = function() {

		var node = this.node;
		var calendar = this.calendar;
		var startTime = calendar.startTimeTurned;
		var endTime = calendar.endTimeTurned;
		var monthStrStart = startTime.getFullYear() + '.' + (startTime.getMonth() + 1);
		var monthStrEnd = endTime.getFullYear() + '.' + (endTime.getMonth() + 1);
		node.find('.start-box .show-mnth').text(monthStrStart);
		node.find('.end-box .show-mnth').text(monthStrEnd);
		return this;
	};
	// 选择日期
	CalendarNode.prototype.selectDate = function(date, type) {

		var calendar = this.calendar;
		var timeTurned;
		// 左侧
		if (type === 0) {
			timeTurned = calendar.startTimeTurned;
			calendar.startTimeSelected = new Date(timeTurned.getFullYear(), timeTurned.getMonth(), date);
		}
		// 右侧
		else if (type === 1) {
			timeTurned = calendar.endTimeTurned;
			calendar.endTimeSelected = new Date(timeTurned.getFullYear(), timeTurned.getMonth(), date);
		}
		this.setItems(0).setItems(1);
	};
	// 确认选择的日期
	CalendarNode.prototype.confirmUserSelectedTime = function() {

		var calendar = this.calendar;
		var startTimeSelected = calendar.startTimeSelected.getTime();
		var endTimeSelected = calendar.endTimeSelected.getTime();
		calendar.startTime = new Date(startTimeSelected);
		calendar.endTime = new Date(endTimeSelected);
		calendar.startTimeTurned = new Date(startTimeSelected);
		Calendar.endTimeTurned = new Date(endTimeSelected);
		this.setItems(0).setItems(1);
		this.hide();
	};
	// 设置日期
	CalendarNode.prototype.setItems = function(type) {

		var self = this;
		var node = this.node;
		var calendar = this.calendar;
		var timeTurned, timeSelected, container;
		// 左侧
		if (type === 0) {
			timeTurned = calendar.startTimeTurned;
			timeSelected = calendar.startTimeSelected;
			container = node.find('.start-box .cal-date');
		}
		// 右侧
		else if (type === 1) {
			timeTurned = calendar.endTimeTurned;
			timeSelected = calendar.endTimeSelected;
			container = node.find('.end-box .cal-date');
		}

		var firstDay = new Date(timeTurned.getFullYear(), timeTurned.getMonth(), 1).getDay();
		var dateSelected = timeSelected.getDate();
		var totalDate = _getDate(timeTurned);
		container.empty();
		// 绘制空白部分
		for (var i = 0; i < firstDay; i ++) {
			var span = $(document.createElement('span'));
			container.append(span);
		}
		// 绘制日期部分
		for (var j = 0; j < totalDate; j ++) {
			var span = $(document.createElement('span'));
			span.text(j + 1);
			container.append(span);
			if (timeSelected.getFullYear() === timeTurned.getFullYear() && timeSelected.getMonth() === timeTurned.getMonth() && timeSelected.getDate() === j + 1) {
				span.addClass('current');
			}
			else {
				span.addClass('enabled');
			}
		}
		container.find('span.enabled').click(function(e) {
			var item = $(e.target);
			self.selectDate(Number(item.text()), type);
		});
		return this;
	};
	// 设置进度条
	CalendarNode.prototype.setProgress = function() {

		var node = this.node;
		var calendar = this.calendar;
		var startTimeSelected = calendar.startTimeSelected;
		var endTimeSelected = calendar.endTimeSelected;
		var totalStart = _getDate(startTimeSelected);
		var totalEnd = _getDate(endTimeSelected);
		var pctStart = startTimeSelected.getDate() / totalStart * 100;
		var pctEnd = endTimeSelected.getDate() / totalEnd * 100;
		node.find('.start-box .cal-progress .cal-sub-pro').css('width', pctStart + '%');
		node.find('.end-box .cal-progress .cal-sub-pro').css('width', pctEnd + '%');
		return this;
	};
	// 显示
	CalendarNode.prototype.show = function() {

		var calendarEle = this.node;
		var ele = this.calendar.outsetNode;
		var top, left, calendarBox = calendarEle.find('.wCalendar-box'), offsetX = ele.fixedOffset().left, offsetY = ele.fixedOffset().top, width = ele.width(), height = ele.height();
		calendarEle.find('.arrow').hide();
		if ($(window).width() - offsetX - width > offsetX) {
			left = offsetX;
			calendarBox.removeClass('arrow-right');
		}
		else {
			left = offsetX + width - 499;
			calendarBox.addClass('arrow-right');
		}
		if ($(window).height() - offsetY - height > offsetY) {
			top = offsetY + height + 20;
			calendarEle.find('.arrow.top').show();
		}
		else {
			top = offsetY - 346;
			calendarEle.find('.arrow.bottom').show();
		}
		calendarBox.css('top', top + 'px').css('left', left + 'px');
		calendarEle.show();
		return this;
	};
	// 隐藏
	CalendarNode.prototype.hide = function() {

		var calendar = this.calendar;
		// 恢复用户选中的时间为日历时间并且定位到当前页
		var startTime = new Date(calendar.startTime.getTime());
		var endTime = new Date(calendar.endTime.getTime());
		calendar.startTimeSelected = new Date(startTime.getTime());
		calendar.startTimeTurned = new Date(startTime.getTime());
		calendar.endTimeSelected = new Date(endTime.getTime());
		calendar.endTimeTurned = new Date(endTime.getTime());
		this.node.hide();
		this.update();
		return this;
	};
	// 更新
	CalendarNode.prototype.update = function() {

		this.setMonth().setItems(0).setItems(1).setProgress();
		return this;
	};

	// 构造函数
	var Calendar = function(outsetNode, config) {

		var self = this, stamp, startTimeStamp, endTimeStamp, wCalendarBoxRootNode;

		// 依据定位的元素(必填)
		self.outsetNode = $(outsetNode);

		// 日历模式: 0-日，1-周，2-月
		self.mode = _deal(config, 'mode', 0);
		// 是否单个模式
		self.single = _deal(config, 'single', false);
		// title
		self.titleLeft = _deal(config, 'titleLeft', 'Start Date and Time');
		self.titleRight = _deal(config, 'titleRight', 'End Date and Time');

		stamp = Date.now();
		// 开始时间
		self.startTime = _deal(config, 'startTime', new Date(stamp));
		// 结束时间
		self.endTime = _deal(config, 'endTime', new Date(stamp));

		// 用户选定的时间
		startTimeStamp = self.startTime.getTime();
		endTimeStamp = self.endTime.getTime();
		self.startTimeSelected = new Date(startTimeStamp);
		self.endTimeSelected = new Date(endTimeStamp);

		// 当前所在页面的时间
		self.startTimeTurned = new Date(startTimeStamp);
		self.endTimeTurned = new Date(endTimeStamp);

		// 日历元素实例
		self.calendarNodeInstance = new CalendarNode(self);

		self.outsetNode.click(function() {

			self.calendarNodeInstance.show();
		});
	};

	var fn = Calendar.prototype;

	//显示日历
	fn.show = function() {

		// 显示元素
		this.calendarNodeInstance.show();
	};

	//隐藏日历
	fn.hide = function() {

		// 隐藏并更新元素
		this.calendarNodeInstance.hide();
	};

	//设置日历时间；可传入两个13位时间戳格式的参数或六个年月日的组合，如setTime(1466352000000, 1466438399000)，或setTime(2015,1,2,2015,12,20);设置成功返回true，失败返回false
	fn.setTime = function() {};

	//获取日历时间；返回包含startTime和endTime两个属性的对象，type参数可选，当type的值为number类型时，返回13位时间戳格式，当type的值为string类型时，返回八位长度的字符串，并以type的值作为分隔符，不传参数及传入其他值返回Date对象
	fn.getTime = function() {};

	//设置日历标题，参数可选，格式为字符串，只传入一个参数时设置开始日历的标题，传入的值为空字符串时，不设置对应的标题，如calendar.setTitle('', 'demo')，将只设置结束日历(右半部分)的标题
	fn.setTitle = function() {};

	window.wCalendar = {

		// 实例化对象
		init: function(outsetNode, config) {

			// 判断传入的参数是否合法
			// outsetNode必传
			if (outsetNode === undefined) {
				_error('1 argument required');
				return;
			}
			// config可选
			if (config !== undefined) {
				// 如果传入config参数，则要求为object类型
				if (typeof config !== 'object') {
					_error('the second argument should be an object');
					return;
				}
				else {
					// mode的值只能为0,1或2
					if (config.mode !== undefined) {
						if (config.mode !== 0 && config.mode !== 1 && config.mode !== 2) {
							_error('the value of config.mode should be 0, 1 or 2');
							return;
						}
					}
					// single的值只能为true或false
					if (config.single !== undefined) {
						if (config.single !== true && config.single !== false) {
							_error('the value of config.single should be true or false');
							return;
						}
					}
					// startTime必须是Date类型
					if (config.startTime !== undefined) {
						if ((config.startTime instanceof Date) !== true) {
							_error('startTime: a Date instance required');
							return;
						}
					}
					if (config.endTime !== undefined) {
						// endTime必须是Date类型
						if ((config.endTime instanceof Date) !== true) {
							_error('endTime: a Date instance required');
							return;
						}
						// 不允许在没有传入startTime的情况下传入endTime
						if (config.startTime === undefined) {
							_error('startTime required');
							return;
						}
					}
					// endTime必须大于或等于startTime(single=true即单日历模式下endTime会被忽略，因此不需验证)
					if (config.single === false) {
						if (config.endTime !== undefined) {
							if (config.endTime.getTime() < config.startTime.getTime()) {
								_error('endTime should be larger than startTime');
								return;
							}
						}
					}
				}
			}
			// 生成Calendar实例
			var calendar = new Calendar(outsetNode, config);
			return calendar;
		},
		// 配置
		config: function(configs) {}
	};

	return;
});