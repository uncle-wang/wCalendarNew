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

	// 构造函数
	var Calendar = function(outsetNode, config) {

		var self = this;

		// 依据定位的元素(必填)
		self.outsetNode = outsetNode;

		// 日历模式: 0-日，1-周，2-月
		self.mode = _deal(config, mode, 0);
		// 是否单个模式
		self.single = _deal(config, single, false);
		// 开始时间
		self.startTime = _deal(config, startTime, new Date());
		// 结束时间
		self.endTime = _deal(config, endTime, new Date(self.startTime.getTime()));

		// 根节点
		var wCalendarBoxRootNode = $(document.createElement('div'));
		// 设置属性
		wCalendarBoxRootNode
		.attr('unselectable', 'on')
		.attr('onselectstart', 'return false;')
		.attr('class', 'wCalendar_box_c')
		.html(htmlContent);
		$('body').append(wCalendarBoxRootNode);

		self.calendarNode = wCalendarBoxRootNode;
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