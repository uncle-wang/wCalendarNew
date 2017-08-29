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

	var cssContent = 'CSSPLACEHOLDER';
	var htmlContent = 'HTMLPLACEHOLDER';

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
		if (calendar.callback) {
			calendar.callback(new Date(startTimeSelected), new Date(endTimeSelected));
		}
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

		var self = this, tempDay, tempTime, stamp, startTimeStamp, endTimeStamp, wCalendarBoxRootNode;

		// 依据定位的元素(必填)
		self.outsetNode = $(outsetNode);

		// 日历模式: 0-日，1-周，2-月
		self.mode = _deal(config, 'mode', 0);
		// 是否单个模式
		self.single = _deal(config, 'single', false);
		// title
		self.titleLeft = _deal(config, 'titleLeft', 'Start Date and Time');
		self.titleRight = _deal(config, 'titleRight', 'End Date and Time');

		tempTime = new Date();
		// 星期模式
		if (config.mode === 1) {
			tempDay = tempTime.getDay() || 7;
			tempTime.setDate(tempTime.getDate() - tempDay + 1);
		}
		// 月份模式
		else if (config.mode === 2) {
			tempTime.setDate(1);
		}
		stamp = tempTime.getTime();
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

		// 回调函数
		if (config.callback) {
			self.callback = config.callback;
		}

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
	fn.setTime = function(startTime, endTime) {

		/****************参数验证****************/
		var startStamp, endStamp;
		// startTime必传
		if (startTime === undefined) {
			throw new Error('startTime required');
		}
		// Date类型
		if (!(startTime instanceof Date)) {
			throw new Error('Date instance required');
		}
		startStamp = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate()).getTime();
		// 如果没有传入endTime,则和开始时间相同
		if (endTime === undefined) {
			endTime = new Date(startStamp);
			endStamp = startStamp;
		}
		// 如果传入endTime,进行验证
		else {
			if (!(endTime instanceof Date)) {
				throw new Error('Date instance required');
			}
			endStamp = new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate()).getTime();
		}
		// 结束时间小于开始时间报错
		if (endStamp < startStamp) {
			throw new Error('endTime smaller than startTime');
		}
		// 星期模式下只允许传入星期一的Date对象
		if (this.mode === 1) {
			if (startTime.getDay() !== 1 || endTime.getDay() !== 1) {
				throw new Error('Monday required in week mode');
			}
		}
		// 月份模式下只允许传入x月1日的Date对象
		if (this.mode === 2) {
			if (startTime.getDate() !== 1 || endTime.getDate() !== 1) {
				throw new Error('1st day required in month mode');
			}
		}

		/****************设置时间****************/
		this.startTime = new Date(startStamp);
		this.endTime = new Date(endStamp);
		this.startTimeSelected = new Date(startStamp);
		this.endTimeSelected = new Date(endStamp);
		this.startTimeTurned = new Date(startStamp);
		this.endTimeTurned = new Date(endStamp);
		this.calendarNodeInstance.update();
	};

	//获取日历时间；返回包含startTime和endTime两个属性的对象
	fn.getTime = function() {

		var startTime = new Date(this.startTime.getTime());
		var endTime = new Date(this.endTime.getTime());
		return {
			startTime: startTime,
			endTime: endTime
		};
	};

	window.wCalendar = {

		// 实例化对象
		init: function(outsetNode, config) {

			// 判断传入的参数是否合法
			// outsetNode必传
			if (outsetNode === undefined) {
				_error('1 argument required');
				return;
			}
			else {
				if (!$(outsetNode).nodeList[0]) {
					_error(outsetNode + ' doesn\'t exist');
					return;
				}
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
					// 回调函数
					if (config.callback !== undefined) {
						if (typeof config.callback !== 'function') {
							_error('callback: function required');
							return;
						}
					}
				}
			}
			// 生成Calendar实例
			var calendar = new Calendar($(outsetNode).nodeList[0], config);
			return calendar;
		},
		// 配置
		config: function(config) {}
	};

	return;
});