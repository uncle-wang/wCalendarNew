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

		if (selector) {
			if (selector === window) {
				this.nodeList = [window];
			}
			else if (typeof selector === 'string') {
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
		}
		else {
			throw new Error('1 argument required');
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
			return this;
		}
		return;
	};
	$.prototype.html = function(content) {
		
		if (content === undefined) {
			var ele = this.nodeList[0];
			if (ele) {
				return ele.innerHTML;
			}
		}
		else {
			_loop(this.nodeList, function(item) {
				item.innerHTML = content;
			});
			return this;
		}
		return;
	};
	$.prototype.text = function(content) {
		
		if (content === undefined) {
			var ele = this.nodeList[0];
			if (ele) {
				return ele.innerText;
			}
		}
		else {
			_loop(this.nodeList, function(item) {
				item.innerText = content;
			});
			return this;
		}
		return;
	};
	$.prototype.empty = function() {

		_loop(this.nodeList, function(item) {
			item.innerHTML = '';
		});
		return this;
	};
	$.prototype.append = function(node) {

		_loop(this.nodeList, function(item) {
			item.appendChild(node.nodeList[0]);
		});
		return this;
	};
	$.prototype.find = function(selector) {

		var nodeList = [];
		_loop(this.nodeList, function(item) {
			var resultList = item.querySelectorAll(selector);
			for (var i = 0; i < resultList.length; i ++) {
				nodeList.push(resultList[i]);
			}
		});
		return new $(nodeList);
	};
	$.prototype.click = function(callback) {

		_loop(this.nodeList, function(item) {
			if (item.addEventListener) {
				item.addEventListener('click', function(e) {
					callback(e);
				});
			}
			else if (item.attachEvent) {
				item.attachEvent('onclick', function(e) {
					callback(e);
				});
			}
		});
		return this;
	};
	$.prototype.css = function(key, value) {

		if (value === undefined) {
			var ele = this.nodeList[0];
			if (ele) {
				return ele.style.getPropertyValue(key);
			}
		}
		else {
			_loop(this.nodeList, function(item) {
				item.style.setProperty(key, value);
			});
			return this;
		}
		return;
	};
	$.prototype.addClass = function(className) {

		_loop(this.nodeList, function(item) {
			item.classList.add(className);
		});
		return this;
	};
	$.prototype.removeClass = function(className) {

		_loop(this.nodeList, function(item) {
			item.classList.remove(className);
		});
		return this;
	};
	$.prototype.width = function() {

		var ele = this.nodeList[0];
		if (ele) {
			if (ele === window) {
				if (ele.innerWidth) {
					return ele.innerWidth;
				}
				else if (document.body.clientWidth) {
					return document.body.clientWidth;
				}
			}
			else {
				if (ele.offsetWidth) {
					return ele.offsetWidth;
				}
				else if (ele.clientWidth) {
					return ele.clientWidth;
				}
			}
		}
		return;
	};
	$.prototype.height = function() {

		var ele = this.nodeList[0];
		if (ele) {
			if (ele === window) {
				if (ele.innerHeight) {
					return ele.innerHeight;
				}
				else if (document.body.clientHeight) {
					return document.body.clientHeight;
				}
			}
			else {
				if (ele.offsetHeight) {
					return ele.offsetHeight;
				}
				else if (ele.clientHeight) {
					return ele.clientHeight;
				}
			}
		}
		return;
	};
	$.prototype.fixedOffset = function() {

		var ele = this.nodeList[0];
		if (ele) {
			var y = ele.offsetTop - document.body.scrollTop;
			var x = ele.offsetLeft - document.body.scrollLeft;
			return {
				top: y,
				left: x
			};
		}
	};
	$.prototype.show = function() {

		_loop(this.nodeList, function(item) {
			item.style.display = 'block';
		});
		return this;
	};
	$.prototype.hide = function() {

		_loop(this.nodeList, function(item) {
			item.style.display = 'none';
		});
		return this;
	};

	// 添加到window对象中
	window.$wCalendar = function(selector) {
		return new $(selector);
	};
}());