var util = {
	// 字符串验证validate("AAAA","en")
	validate : function(str, type) {
		var reg = "";
		// 规则
		var rules = {
			c : "\u4E00-\u9Fa5",
			e : "A-Za-z",
			n : "0-9",
			m : "-",
			_ : "_",
			p : ".",
			b : "，。！？,.[]!；（）“*【】|",
			k : " 　",
			a : "@"
		};
		// 遍历对象。根据传入的要求拼接正则表达式。如传入e就会拼接A-Za-z。如果传入en就拼接A-Za-z0-9
		for ( var rule in rules) {
			// 如果当前的规则在传入的type形参中存在
			if (type.indexOf(rule) > -1)
				// 把规则对应的正则表达式拼接起来
				reg += rules[rule];
		}
		// 创建正则表达式
		var regExp = new RegExp(eval("/^[" + reg + "]*$/"));
		// 返回正则验证结果
		return regExp.test(str);
	},
	// 保存和获取cookie方法
	cookie : {
		set : function(name, value) {
			var Days = 7;
			var date = new Date();
			date.setTime(date.getTime() + Days * 24 * 60 * 60 * 1000);
			document.cookie = name + "=" + escape(value) + ";expires="
					+ date.toGMTString();
		},
		get : function(name) {
			var arr, reg = new RegExp("(^|)" + name + "=([^;]*)(;|$)");
			if (arr = document.cookie.match(reg))
				return unescape(arr[2]);
			else
				return null;
		}
	},
	// 判断当前浏览器版本是否小于Ie10
	isLTIE10 : function() {
		var strUA = window.navigator.userAgent;
		return strUA.indexOf("MSIE 8.0") > -1 || strUA.indexOf("MSIE 9.0") > -1;
	},
	GB2312UnicodeConverter : {
		ToUnicode : function(str) {
			return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
		},
		ToGB2312 : function(str) {
			return unescape(str.replace(/\\u/gi, '%u'));
		}
	},
	newGuid : function() {
		var guid = "";
		for ( var i = 1; i <= 32; i++) {
			var n = Math.floor(Math.random() * 16.0).toString(16);
			guid += n;
		}
		return guid;
	},
	isPC : function() {
		var userAgentInfo = navigator.userAgent.toLowerCase();
		var Agents = new Array("android", "iphone", "symbianOS",
				"windows phone", "ipad", "ipod");
		var flag = true;
		for ( var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}
};
