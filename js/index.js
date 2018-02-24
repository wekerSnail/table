window.onload = function() {
	new menuList({
		renderTo : "menu",
		dataSource : [ {
			icon : "fa fa-address-book-o",
			url : "",
			id : "1",
			type : "Survey"
		}, {
			icon : "fa fa-cart-plus",
			url : "",
			id : "2",
			type : "Poll"
		}, {
			icon : "fa fa-folder-o",
			url : "",
			id : "3",
			type : "Templateles"
		}, {
			icon : "fa fa-commenting-o",
			url : "",
			id : "4",
			type : "Support"
		} ],
		onClick : function(li) {
			// 获取当前被点击元素的URL属性的值
			var url = $(li).attr("url");
			// 设置到iframe的src属性
			$(".ifrWeb").attr("src", url);
		}
	});
	new table({
		renderTo : "table",
		columns : [ {
			name : "Title",
			alias : "title",
		}, {
			name : "ID",
			alias : "id"
		}, {
			name : "Time",
			alias : "time",

		}, {
			name : "States",
			alias : "states",

		}, {
			name : "Number",
			alias : "number",

		}, {
			name : "Operation",
			alias : "operation",

		} ],
		dataSource : [ {
			title : "Questionnaire",
			id : "23423523",
			time : "2014-09-27",
			states : "underway",
			number : "12",
			operation : "一个"
		}, {
			title : "Questionnaire",
			id : "76386426",
			time : "2016-07-13",
			states : "down",
			number : "23",
			operation : "jq"
		}, {
			title : "Questionnaire",
			id : "86928733",
			time : "2017-08-23",
			states : "underway",
			number : "19",
			operation : "table"
		}, {
			title : "Questionnaire",
			id : "89577389",
			time : "2012-08-12",
			states : "down",
			number : "14",
			operation : "小组件"
		}, {
			title : "Questionnaire",
			id : "23423422",
			time : "2013-09-30",
			states : "underway",
			number : "12",
			operation : "Demo"
		}, {
			title : "Questionnaire",
			id : "21585422",
			time : "2013-02-13",
			states : "down",
			number : "29",
			operation : "By"
		}, {
			title : "Questionnaire",
			id : "23423522",
			time : "2013-01-30",
			states : "underway",
			number : "15",
			operation : "snail"
		} ]
	});
	// 浏览器窗体大小改变时触发该事件
	$(window).resize(function() {
		updateSize();
	});
	updateSize();
	$(".exit").click(function(event) {
		show();
		event.stopPropagation();
	});
	$("body").click(function() {
		hide();
	});
	function show() {
		$(".exitPoppPanel").removeClass("hidden");
		$(".loginMenu").removeClass("hidden");
		setTimeout(function() {
			if (util.isLTIE10()) {
				$(".loginMenu").css("opacity", 0);
				$(".loginMenu").animate({
					"opacity" : 1,
					"margin" : "1em 0"
				}, 250);
			} else {
				$(".loginMenu").addClass("showLoginMenu");
			}
		}, 10);
	}
	function hide() {
		$(".exitPoppPanel").addClass("hidden");
		if (util.isLTIE10()) {
			$(".loginMenu").animate({
				"opacity" : 0,
				"margin" : "0"
			}, 250);
		} else {
			$(".loginMenu").removeClass("showLoginMenu");
		}
		setTimeout(function() {
			$(".loginMenu").addClass("hidden");
		}, 250);
	}
	// 更新框架大小
	function updateSize() {
		$(".webContant").height($(window).height() - 80);
		$(".webContant").width($(window).width() - 192);
		$(".BodyLeft").height($(window).height() - 80);
	}
};
