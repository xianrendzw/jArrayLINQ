Array.prototype._funcCreator = function(expression) {
	if (expression == undefined || expression == null)
		expression = "";
	if (typeof expression == "string") {
		if (expression == "") {
			return function(x) {
				return x;
			};
		} else if (expression.indexOf("=>") == -1) {
			return new Function("$", "return " + expression);
		} else {
			// 像C#3.0中解析操作符 "=>"
			var expr = expression.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);
			return new Function(expr[1], "return " + expr[2]);
		}
	}
	return expression;
};

// 对序列应用累加器函数
// expr要求一个返回值函数或表达式,返回值不一定为bool值
Array.prototype.aggregate = function(expr) {
	return this.sum(expr);
};

// 如果源序列中的每个元素都通过指定谓词中的测试，或者序列为空，
// 则为 true；否则为 false。
// expr要求一个返回bool值的函数或表达式
Array.prototype.all = function(expr) {
	if (this == null || this.length == 0) {
		return true;
	}

	pred = this._funcCreator(expr);
	for ( var i = 0; i < this.length; i++) {
		if (!pred(this[i]))
			return false;
	}
	return true;
};

// 如果源序列中的任何元素都通过指定谓词中的测试，
// 则为 true；否则为 false。
// expr要求一个返回bool值的函数或表达式
Array.prototype.any = function(expr) {
	return !this.all(pred);
};

// 计算数值序列的平均值
// expr要求一个返回值函数或表达式,返回值不一定为bool值
Array.prototype.average = function(expr) {
	var selector = this._funcCreator(expr);
	var sum = 0;
	var count = 0;

	for ( var i = 0; i < this.length; i++) {
		if (typeof this[i] == "number") {
			sum += selector(this[i]);
			count++;
		}
	}

	return count > 0 ? sum / count : 0;
};

// 连接两个序列。
// expr要求一个返回bool值的函数或表达式
Array.prototype.concat = function(expr, arr) {
	var newArray = this.where(expr);
	return newArray.contact(arr);
};

// 确定序列是否包含指定的元素。
// expr要求一个返回值函数或表达式,返回值不一定为bool值
Array.prototype.contains = function(expr) {
	var pred;

	if (typeof expr == "number") {
		pred = function(x) {
			return x == expr;
		};
	} else {
		pred = this._funcCreator(expr);
	}

	for ( var i = 0; i < this.length; i++) {
		if (pred(this[i]))
			return true;
	}

	return false;
};

// 返回序列中的元素数量
// expr要求一个返回bool值的函数或表达式
Array.prototype.count = function(expr) {
	return expr == null ? this.length : this.where(expr).length;
};

// 如果序列为空，则返回一个具有默认值的单一实例集合。
Array.prototype.defaultIfEmpty = function(defaultValue) {
	return this.length == 0 ? defaultValue : this;
};

// 返回序列中的非重复元素。
// expr要求一个返回值函数或表达式,返回值不一定为bool值
Array.prototype.distinct = function(expr) {
	var newArray = new Array();
	var tempArray = (expr == undefined || expr == null ? this : this.select(expr));
	for ( var i = 0; i < tempArray.length; i++) {
		if (!newArray.contains(tempArray[i]))
			newArray[newArray.length] = tempArray[i];
	}
	return newArray;
};

// 返回序列中指定索引处的元素。
Array.prototype.elementAt = function(index) {
	return this[index];
};

// 返回序列中指定索引处的元素；如果索引超出范围，则返回默认值。
Array.prototype.elementAtOrDefault = function(index, defaultValue) {
	if (index >= 0 && index < this.length) {
		return this[index];
	}
	return defaultValue;
};

// 生成两个序列的差集。
Array.prototype.except = function(arr) {
	var newArray = new Array();
	for ( var a = 0; a < this.length; a++) {
		var isEqual = false;
		for ( var b = 0; b < arr.length; b++) {
			if (this[a] == arr[b]) {
				isEqual = true;
				break;
			}
		}
		if (!isEqual)
			newArray[result.length] = this[a];
	}
	return newArray;
};

// 返回序列中的第一个元素。
// expr要求一个返回bool值的函数或表达式
Array.prototype.first = function(expr) {
	if (expr != null) {
		return this.where(expr).first();
	}
	return this.length > 0 ? this[0] : null;
};

// 返回序列中的第一个元素；如果未找到元素，则返回默认值。
Array.prototype.firstOrDefault = function(defaultValue) {
	return this.first() || defaultValue;
};

// 生成两个序列的交集。
Array.prototype.intersect = function(arr) {
	var newArray = new Array();
	for ( var a = 0; a < this.length; a++) {
		for ( var b = 0; b < arr.length; b++) {
			if (this[a] == arr[b]) {
				newArray[result.length] = this[a];
			}
		}
	}
	return newArray;
};

// 基于匹配键对两个序列的元素进行关联。
Array.prototype.join = function(arr) {
	return this.join(arr);
};

// 返回序列的最后一个元素。
// expr要求一个返回bool值的函数或表达式
Array.prototype.last = function(expr) {
	if (expr != null) {
		return this.where(expr).last();
	}

	return this.length > 0 ? this[this.length - 1] : null;
};

// 返回序列中的最后一个元素；如果未找到元素，则返回默认值。
Array.prototype.lastOrDefault = function(defaultValue) {
	return this.last() || defaultValue;
};

// 返回值序列中的最大值。
Array.prototype.max = function() {
	var max = this[0];
	for ( var i = 1; i < this.length; i++) {
		if (typeof this[i] == "number" && this[i] > max)
			max = this[i];
	}
};

// 返回值序列中的最小值。
Array.prototype.min = function() {
	var min = this[0];
	for ( var i = 1; i < this.length; i++) {
		if (typeof this[i] == "number" && this[i] > min)
			min = this[i];
	}
};

// 按升序对序列的元素排序。
// comparer要求一个返回值的比较函数或表达式
Array.prototype.orderBy = function(comparer) {
	var newArray = new Array();
	for ( var i = 0; i < this.length; i++) {
		newArray[newArray.length] = this[i];
	}
	return newArray.sort(function(a, b) {
		var x = comparer(a);
		var y = comparer(b);
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
};

// 按降序对序列的元素排序。
// comparer要求一个返回值的比较函数或表达式
Array.prototype.orderByDescending = function(comparer) {
	var newArray = new Array();
	for ( var i = 0; i < this.length; i++) {
		newArray[newArray.length] = this[i];
	}
	return newArray.sort(function(a, b) {
		var x = comparer(b);
		var y = comparer(a);
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	});
};

// 生成指定范围内的序列。
Array.prototype.range = function(startIndex, count) {
	var newArray = new Array();
	for ( var i = startIndex; i < count; i++) {
		newArray[newArray.length] = this[i];
	}
	return newArray;
};

// 反转序列中元素的顺序。
// expr要求一个返回bool值的函数或表达式
Array.prototype.reverse = function(expr) {
	var newArray = this.where(expr);
	return newArray.reverse();
};

// 将序列中的每个元素投影到新表中。
// expr要求一个返回值函数或表达式,返回值不一定为bool值
Array.prototype.select = function(expr) {
	var selector = this._funcCreator(expr);
	var newArray = new Array();

	for ( var i = 0; i < this.length; i++) {
		if (selector(this[i]) == this[i]) {
			newArray[newArray.length] = this[i];
		}
	}
};

// 将序列的每个元素投影到集合中并将结果序列合并为一个序列。
// expr要求一个返回值函数或表达式,返回值不一定为bool值
Array.prototype.selectMany = function(expr) {
	var selector = this._funcCreator(expr);
	var newArray = new Array();

	for ( var i = 0; i < this.length; i++) {
		newArray = newArray.concat(selector(this[i]));
	}
	return newArray;
};

// 返回值序列的单个特定元素。
// expr要求一个返回bool值的函数或表达式
Array.prototype.single = function(expr) {
	return this.where(expr).first();
};

// 返回值序列的单个特定元素；如果未找到此类元素，则返回默认值。
// expr要求一个返回bool值的函数或表达式
Array.prototype.singleOrDefault = function(expr, defaultValue) {
	var newArray = this.where(expr);
	if (newArray == null || newArray.length == 0)
		return defaultValue;
	return newArray[0];
};

// 跳过序列中指定数量的元素，然后返回剩余的元素。
Array.prototype.skip = function(count) {
	if (count > this.length)
		count = this.length;
	var newArray = new Array();

	for ( var i = count; i < this.length; i++) {
		newArray[newArray.length] = this[i];
	}
};

// 只要满足指定的条件，就跳过序列中的元素，然后返回剩余元素。
// expr要求一个返回bool值的函数或表达式
Array.prototype.skipWhile = function(expr) {
	var pred = this._funcCreator(expr);
	var newArray = new Array();
	var i = 0;

	for (; i < this.length; i++) {
		if (pred(this[i]))
			break;
	}

	for ( var j = i; j < this.length; j++) {
		newArray[newArray.length] = this[j];
	}

	return newArray;
};

// 计算数值序列之和。
// expr要求一个返回值函数或表达式,返回值不一定为bool值
Array.prototype.sum = function(expr) {
	var selector = this._funcCreator(expr);
	var sum = 0;

	for ( var i = 0; i < this.length; i++) {
		if (typeof this[i] == "number")
			sum += selector(this[i]);
	}

	return sum;
};

// 从序列的开头返回指定数量的连续元素。
// expr要求一个返回bool值的函数或表达式
Array.prototype.take = function(count) {
	if (parseInt(count) >= this.length)
		count = this.length;
	var newArray = [];

	for (var i = 0; i < count; i++) {
		newArray[i] = this[i];
	}

	return newArray;
};

// 只要满足指定的条件，就会返回序列的元素，然后跳过剩余的元素
// expr要求一个返回bool值的函数或表达式
Array.prototype.takeWhile = function(expr) {
	var pred = this._funcCreator(expr);
	var newArray = new Array();

	for ( var i = 0; i < this.length; i++) {
		newArray[newArray.length] = this[i];
		if (pred(this[i]))
			break;
	}

	return newArray;
};

// 返回一个数组。
// expr要求一个返回bool值的函数或表达式
Array.prototype.toArray = function(expr) {
	return this.where(expr);
};

// 生成两个序列的并集。
// expr要求一个返回bool值的函数或表达式
Array.prototype.union = function(expr, arr) {
	var newArray = this.where(expr);
	for ( var i = 0; i < arr.length; i++) {
		if (newArray.contains(arr[i]))
			newArray[newArray.length] = arr[i];
	}
};

// 基于谓词筛选值序列
// expr要求一个返回bool值的函数或表达式
Array.prototype.where = function(expr) {
	var pred = this._funcCreator(expr);
	var newArray = new Array();

	for ( var i = 0; i < this.length; i++) {
		if (pred(this[i])) {
			newArray[newArray.length] = this[i];
		}
	}

	return newArray;
};