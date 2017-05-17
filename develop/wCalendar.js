(function(global, factory) {

	// 判断jQuery
	if (!global.jQuery) {
		throw new Error('wCalendar requires a window with a jQuery');
	}
	else {
		factory(global);
	}
	return;

})(typeof window !== "undefined" ? window : this, function(window) {

	// 构造函数
	var _wCalendar = function(element, callback) {

		// 绑定事件的元素
		this.btn = element;
	};

	_wCalendar.fn = _wCalendar.prototype;

	//显示日历
	_wCalendar.fn.show = function() {};

	//隐藏日历
	_wCalendar.fn.hide = function() {};

	//日历以单个模式显示
	_wCalendar.fn.single = function() {};

	//日历以双个模式显示
	_wCalendar.fn.double = function() {};

	//设置日历时间；可传入两个13位时间戳格式的参数或六个年月日的组合，如setTime(1466352000000, 1466438399000)，或setTime(2015,1,2,2015,12,20);设置成功返回true，失败返回false
	_wCalendar.fn.setTime = function() {};

	//获取日历时间；返回包含startTime和endTime两个属性的对象，type参数可选，当type的值为number类型时，返回13位时间戳格式，当type的值为string类型时，返回八位长度的字符串，并以type的值作为分隔符，不传参数及传入其他值返回Date对象
	_wCalendar.fn.getTime = function() {};

	//设置日历的模式；mode参数必填，可能的值为1、2、3，1位日期模式，2为星期模式，3为月份模式
	_wCalendar.fn.setMode = function() {};

	//设置日历标题，参数可选，格式为字符串，只传入一个参数时设置开始日历的标题，传入的值为空字符串时，不设置对应的标题，如calendar.setTitle('', 'demo')，将只设置结束日历(右半部分)的标题
	_wCalendar.fn.setTitle = function() {};

	var wCalendar = {

		// 实例化对象
		init: function(element, callback) {

			var calendar = new _wCalendar(element, callback);
			return calendar;
		},
		// 配置
		config: function(configs) {}
	};

	window.wCalendar = wCalendar;

	return;
});