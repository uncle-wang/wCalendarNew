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

	var cssContent = '{cssContent}';
	var htmlContent = '{htmlContent}';

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
		.attr('class', 'wCalendar_box_c')
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

		node.find('.start-box .turn-left').click(function() {

			var timeTurned = new Date(calendar.startTimeTurned.getTime());
			calendar.startTimeTurned = new Date(timeTurned.getFullYear(), timeTurned.getMonth() - 1);
			self.setItems(0);
		});
		node.find('.start-box .turn-right').click(function() {

			var timeTurned = new Date(calendar.startTimeTurned.getTime());
			calendar.startTimeTurned = new Date(timeTurned.getFullYear(), timeTurned.getMonth() + 1);
			self.setItems(0);
		});
		node.find('.end-box .turn-left').click(function() {

			var timeTurned = new Date(calendar.endTimeTurned.getTime());
			calendar.endTimeTurned = new Date(timeTurned.getFullYear(), timeTurned.getMonth() - 1);
			self.setItems(1);
		});
		node.find('.end-box .turn-right').click(function() {

			var timeTurned = new Date(calendar.endTimeTurned.getTime());
			calendar.endTimeTurned = new Date(timeTurned.getFullYear(), timeTurned.getMonth() + 1);
			self.setItems(1);
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
		this.setItems();
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
			span.text('&nbsp;');
			container.append(span);
		}
		// 绘制日期部分
		for (var j = 0; j < totalDate; j ++) {
			var span = $(document.createElement('span'));
			span.text(i + 1);
			if (timeSelected.getFullYear() === timeTurned.getFullYear() && timeSelected.getMonth() === timeTurned.getMonth() && timeSelected.getDate() === i + 1) {
				span.addClass('current');
			}
			else {
				span.click(function() {
					self.selectDate(Number(span.text()), type);
				});
			}
		}
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
	// 更新
	CalendarNode.prototype.update = function() {

		this.setMonth().setItems().setProgress();
		return this;
	};

	// 构造函数
	var Calendar = function(outsetNode, config) {

		var self = this, stamp, startTimeStamp, endTimeStamp, wCalendarBoxRootNode;

		// 依据定位的元素(必填)
		self.outsetNode = outsetNode;

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
	};

	var fn = Calendar.prototype;

	//显示日历
	fn.show = function() {

		// 显示元素
		this.calendarBox.show();
	};

	//隐藏日历
	fn.hide = function() {

		// 隐藏元素
		this.calendarBox.hide();
		// 恢复用户选中的时间为日历时间并且定位到当前页
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