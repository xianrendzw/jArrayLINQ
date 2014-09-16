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
			// ��C#3.0�н��������� "=>"
			var expr = expression.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/);
			return new Function(expr[1], "return " + expr[2]);
		}
	}
	return expression;
};

// ������Ӧ���ۼ�������
// exprҪ��һ������ֵ��������ʽ,����ֵ��һ��Ϊboolֵ
Array.prototype.aggregate = function(expr) {
	return this.sum(expr);
};

// ���Դ�����е�ÿ��Ԫ�ض�ͨ��ָ��ν���еĲ��ԣ���������Ϊ�գ�
// ��Ϊ true������Ϊ false��
// exprҪ��һ������boolֵ�ĺ�������ʽ
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

// ���Դ�����е��κ�Ԫ�ض�ͨ��ָ��ν���еĲ��ԣ�
// ��Ϊ true������Ϊ false��
// exprҪ��һ������boolֵ�ĺ�������ʽ
Array.prototype.any = function(expr) {
	return !this.all(pred);
};

// ������ֵ���е�ƽ��ֵ
// exprҪ��һ������ֵ��������ʽ,����ֵ��һ��Ϊboolֵ
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

// �����������С�
// exprҪ��һ������boolֵ�ĺ�������ʽ
Array.prototype.concat = function(expr, arr) {
	var newArray = this.where(expr);
	return newArray.contact(arr);
};

// ȷ�������Ƿ����ָ����Ԫ�ء�
// exprҪ��һ������ֵ��������ʽ,����ֵ��һ��Ϊboolֵ
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

// ���������е�Ԫ������
// exprҪ��һ������boolֵ�ĺ�������ʽ
Array.prototype.count = function(expr) {
	return expr == null ? this.length : this.where(expr).length;
};

// �������Ϊ�գ��򷵻�һ������Ĭ��ֵ�ĵ�һʵ�����ϡ�
Array.prototype.defaultIfEmpty = function(defaultValue) {
	return this.length == 0 ? defaultValue : this;
};

// ���������еķ��ظ�Ԫ�ء�
// exprҪ��һ������ֵ��������ʽ,����ֵ��һ��Ϊboolֵ
Array.prototype.distinct = function(expr) {
	var newArray = new Array();
	var tempArray = (expr == undefined || expr == null ? this : this.select(expr));
	for ( var i = 0; i < tempArray.length; i++) {
		if (!newArray.contains(tempArray[i]))
			newArray[newArray.length] = tempArray[i];
	}
	return newArray;
};

// ����������ָ����������Ԫ�ء�
Array.prototype.elementAt = function(index) {
	return this[index];
};

// ����������ָ����������Ԫ�أ��������������Χ���򷵻�Ĭ��ֵ��
Array.prototype.elementAtOrDefault = function(index, defaultValue) {
	if (index >= 0 && index < this.length) {
		return this[index];
	}
	return defaultValue;
};

// �����������еĲ��
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

// ���������еĵ�һ��Ԫ�ء�
// exprҪ��һ������boolֵ�ĺ�������ʽ
Array.prototype.first = function(expr) {
	if (expr != null) {
		return this.where(expr).first();
	}
	return this.length > 0 ? this[0] : null;
};

// ���������еĵ�һ��Ԫ�أ����δ�ҵ�Ԫ�أ��򷵻�Ĭ��ֵ��
Array.prototype.firstOrDefault = function(defaultValue) {
	return this.first() || defaultValue;
};

// �����������еĽ�����
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

// ����ƥ������������е�Ԫ�ؽ��й�����
Array.prototype.join = function(arr) {
	return this.join(arr);
};

// �������е����һ��Ԫ�ء�
// exprҪ��һ������boolֵ�ĺ�������ʽ
Array.prototype.last = function(expr) {
	if (expr != null) {
		return this.where(expr).last();
	}

	return this.length > 0 ? this[this.length - 1] : null;
};

// ���������е����һ��Ԫ�أ����δ�ҵ�Ԫ�أ��򷵻�Ĭ��ֵ��
Array.prototype.lastOrDefault = function(defaultValue) {
	return this.last() || defaultValue;
};

// ����ֵ�����е����ֵ��
Array.prototype.max = function() {
	var max = this[0];
	for ( var i = 1; i < this.length; i++) {
		if (typeof this[i] == "number" && this[i] > max)
			max = this[i];
	}
};

// ����ֵ�����е���Сֵ��
Array.prototype.min = function() {
	var min = this[0];
	for ( var i = 1; i < this.length; i++) {
		if (typeof this[i] == "number" && this[i] > min)
			min = this[i];
	}
};

// ����������е�Ԫ������
// comparerҪ��һ������ֵ�ıȽϺ�������ʽ
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

// ����������е�Ԫ������
// comparerҪ��һ������ֵ�ıȽϺ�������ʽ
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

// ����ָ����Χ�ڵ����С�
Array.prototype.range = function(startIndex, count) {
	var newArray = new Array();
	for ( var i = startIndex; i < count; i++) {
		newArray[newArray.length] = this[i];
	}
	return newArray;
};

// ��ת������Ԫ�ص�˳��
// exprҪ��һ������boolֵ�ĺ�������ʽ
Array.prototype.reverse = function(expr) {
	var newArray = this.where(expr);
	return newArray.reverse();
};

// �������е�ÿ��Ԫ��ͶӰ���±��С�
// exprҪ��һ������ֵ��������ʽ,����ֵ��һ��Ϊboolֵ
Array.prototype.select = function(expr) {
	var selector = this._funcCreator(expr);
	var newArray = new Array();

	for ( var i = 0; i < this.length; i++) {
		if (selector(this[i]) == this[i]) {
			newArray[newArray.length] = this[i];
		}
	}
};

// �����е�ÿ��Ԫ��ͶӰ�������в���������кϲ�Ϊһ�����С�
// exprҪ��һ������ֵ��������ʽ,����ֵ��һ��Ϊboolֵ
Array.prototype.selectMany = function(expr) {
	var selector = this._funcCreator(expr);
	var newArray = new Array();

	for ( var i = 0; i < this.length; i++) {
		newArray = newArray.concat(selector(this[i]));
	}
	return newArray;
};

// ����ֵ���еĵ����ض�Ԫ�ء�
// exprҪ��һ������boolֵ�ĺ�������ʽ
Array.prototype.single = function(expr) {
	return this.where(expr).first();
};

// ����ֵ���еĵ����ض�Ԫ�أ����δ�ҵ�����Ԫ�أ��򷵻�Ĭ��ֵ��
// exprҪ��һ������boolֵ�ĺ�������ʽ
Array.prototype.singleOrDefault = function(expr, defaultValue) {
	var newArray = this.where(expr);
	if (newArray == null || newArray.length == 0)
		return defaultValue;
	return newArray[0];
};

// ����������ָ��������Ԫ�أ�Ȼ�󷵻�ʣ���Ԫ�ء�
Array.prototype.skip = function(count) {
	if (count > this.length)
		count = this.length;
	var newArray = new Array();

	for ( var i = count; i < this.length; i++) {
		newArray[newArray.length] = this[i];
	}
};

// ֻҪ����ָ���������������������е�Ԫ�أ�Ȼ�󷵻�ʣ��Ԫ�ء�
// exprҪ��һ������boolֵ�ĺ�������ʽ
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

// ������ֵ����֮�͡�
// exprҪ��һ������ֵ��������ʽ,����ֵ��һ��Ϊboolֵ
Array.prototype.sum = function(expr) {
	var selector = this._funcCreator(expr);
	var sum = 0;

	for ( var i = 0; i < this.length; i++) {
		if (typeof this[i] == "number")
			sum += selector(this[i]);
	}

	return sum;
};

// �����еĿ�ͷ����ָ������������Ԫ�ء�
// exprҪ��һ������boolֵ�ĺ�������ʽ
Array.prototype.take = function(count) {
	if (parseInt(count) >= this.length)
		count = this.length;
	var newArray = [];

	for (var i = 0; i < count; i++) {
		newArray[i] = this[i];
	}

	return newArray;
};

// ֻҪ����ָ�����������ͻ᷵�����е�Ԫ�أ�Ȼ������ʣ���Ԫ��
// exprҪ��һ������boolֵ�ĺ�������ʽ
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

// ����һ�����顣
// exprҪ��һ������boolֵ�ĺ�������ʽ
Array.prototype.toArray = function(expr) {
	return this.where(expr);
};

// �����������еĲ�����
// exprҪ��һ������boolֵ�ĺ�������ʽ
Array.prototype.union = function(expr, arr) {
	var newArray = this.where(expr);
	for ( var i = 0; i < arr.length; i++) {
		if (newArray.contains(arr[i]))
			newArray[newArray.length] = arr[i];
	}
};

// ����ν��ɸѡֵ����
// exprҪ��һ������boolֵ�ĺ�������ʽ
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