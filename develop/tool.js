(function() {

	// dom常用方法封装
	// 循环
	var _loop = function(arr, callback) {

		for (var i = 0; i < arr.length; i ++) {
			callback(arr[i]);
		}
	};
	// dom类
	var $ = function(selector) {

		if (typeof selector === 'string') {
			this.nodeList = document.querySelectorAll(selector);
		}
		else if (typeof selector === 'object') {
			if (selector.length !== undefined) {
				this.nodeList = selector;
			}
			else {
				this.nodeList = [selector];
			}
		}
	};
	// dom类方法
	$.prototype.eq = function(index) {

		if (this.nodeList.length > index) {
			return new $(this.nodeList[index]);
		}
		return;
	};
	$.prototype.attr = function(attr, value) {
		
		// 取值
		if (value === undefined) {
			if (this.nodeList[0]) {
				return this.nodeList[0].getAttribute(attr);
			}
		}
		// 设置值
		else {
			_loop(this.nodeList, function(item) {
				item.setAttribute(attr, value);
			});
		}
		return;
	};
	$.prototype.html = function(content) {
		
		_loop(this.nodeList, function(item) {
			item.innerHTML = content;
		});
	};
	$.prototype.prepend = function(node) {
		
		_loop(this.nodeList, function(item) {
			item.prepend(node.nodeList[0]);
		});
	};
	$.prototype.after = function(node) {

		_loop(this.nodeList, function(item) {
			var parentNode = item.parentNode;
			// 如果目标元素是最后一个元素，则将新元素append到目标元素的父元素下
			if (parentNode.lastChild === item) {
				parentNode.appendChild(node.nodeList[0]);
			}
			// 如果目标元素不是最后一个元素，则在目标元素的下一个兄弟元素前插入新元素
			else {
				parentNode.insertBefore(node.nodeList[0], item.nextSibling);
			}
		});
	};

	// 添加到window对象中
	window.$wCalendar = function(selector) {
		return new $(selector);
	};
}());