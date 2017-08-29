function table(args) {
	// 调用初始化函数
	this.init(args);
}
// 初始化函数
table.prototype.init = function(args) {
	this.tab = $("#" + args.renderTo);
	this.dataSource = args.dataSource;
	this.columns = args.columns;
	this.onClick = args.onClick;
	this.onRowClick = args.onRowClick;
	// 客户端发送到后台的参数
	if (args.ajaxData) {
		if (args.ajaxData.pageNum == null)
			args.ajaxData.pageNum = 1;
		if (args.ajaxData.pageSize == null)
			args.ajaxData.pageSize = 10;
	} else {
		args.ajaxData = {
			pageNum : 1,
			pageSize : 10
		};
	}
	this.onComplete = args.onComplete ? args.onComplete : function() {
	};
	this.ajaxData = args.ajaxData;
	// 判断是否数据源是ajax发起的请求
	this.tab.data("args", args);
	this.getDataByDataSource();
};
// 重载表格
table.prototype.reload = function(pageNum, pageSize) {
	var args = this.tab.data("args");
	if (pageNum)
		args.ajaxData.pageNum = pageNum;
	if (pageSize)
		args.ajaxData.pageSize = pageSize;
	// 重新生成表格，再次传入修改后的初始化参数
	this.init(args);
};

// 根据数据源类型，判断是否发起ajax请求
table.prototype.getDataByDataSource = function() {
	var t = this;
	if (typeof (this.dataSource) == "string")
		$.post(this.dataSource, this.ajaxData, function(obj) {
			t.dataSource = obj;
			// 生成元素
			t.build();
		});
	else if (this.dataSource)
		// 生成元素
		this.build();
};
// 创建元素
table.prototype.build = function() {
	var t = this;
	this.tab.html("");
	var table = $("<table class='tablePanel' cellspacing='0'></table>")
			.appendTo(this.tab);
	// 计算不隐藏的列数
	var count = 0;
	$(this.columns).each(function() {
		if (!this.hide)
			count++;
	});
	var tHead = $("<thead class='tabHead'></thead>").appendTo(table);
	var tHR = $("<tr></tr>").appendTo(tHead);
	$(this.columns).each(function() {
		var th = $("<th></th>").text(this.name).appendTo(tHR);
		// 如果该表头需要被隐藏
		if (this.hide)
			th.addClass("hidden");
		else
			// 给所有的不隐藏列设置宽度
			th.attr("style", "width:" + (100 / count + "%"));
	});
	this.tBody = $("<tbody class='tabBody'></tbody>").appendTo(table);
	var t = this;
	$(this.dataSource)
			.each(
					function(i, row) {
						var tr = $("<tr></tr>").appendTo(t.tBody);
						$(t.columns)
								.each(
										function(j, col) {
											// 单元格新内容和就内容的替换
											var oldText;
											var newText = oldText = row[col.alias];
											// 如果字段拥有属性formatter,同时该属性是一个方法
											if (col.formatter
													&& $
															.isFunction(col.formatter))
												newText = col
														.formatter(oldText);
											// 如果字段拥有属性originalValueFormatter，同时该属性是一个方法
											if (col.originalValueFormatter
													&& $
															.isFunction(col.originalValueFormatter))
												oldText = col
														.originalValueFormatter(oldText);
											var td = $(
													"<td alias='"
															+ col.alias
															+ "' originalValue='"
															+ oldText + "'>"
															+ newText + "</td>")
													.appendTo(tr);
											// 如果该列需要隐藏
											if (col.hide)
												td.addClass("hidden");
											if (col.align)
												td.css("text-align", ""
														+ col.align + "");
										});
					});
	/*
	 * // 生成分页栏 var pager = $("<div class='pager'></div>").appendTo(this.tab);
	 * var total = $("<span class='total'>共" + this.dataSource.total + "项,每页显示</span>").appendTo(pager);
	 * var select = $("<div class='selectPage' id='" + this.tab.attr("id") +
	 * "selectPage" + "'></div>").appendTo(pager); $("<span
	 * class='total_last'>项</span>").appendTo(pager); this.up = $("<span
	 * class='up'></span>").appendTo(pager); this.pageTotal = $("<span
	 * class='CurrentPage'>" + Math.ceil(this.dataSource.total /
	 * this.ajaxData.pageSize) + "</span>").appendTo(pager); $("<span
	 * class='CurrentPage'>/</span>").appendTo(pager); this.CurrentPage = $("<span
	 * class='CurrentPage'>" + this.ajaxData.pageNum + "</span>").appendTo(pager);
	 * this.down = $("<span class='down'></span>").appendTo(pager); $("<i
	 * class='fa fa-chevron-right ' title='下一页'></i>").appendTo(this.up); $("<i
	 * class='fa fa-chevron-left' title='上一页'></i>").appendTo(this.down);
	 */
	// 调用绑定时间
	this.eventBind();
};
// 绑定事件
table.prototype.eventBind = function() {
	var t = this;
	$("tr", this.tBody).each(function() {
		if ($(this).index() % 2 == 0)
			$(this).addClass("trBg2");
		else
			$(this).addClass("trBg");
	});
	var tr = $("tr", this.tBody);
	/*
	 * tr.click(function() { t.onClick(t.dataSource[$(this).index()].num); });
	 */
	$("tr", this.tBody).click(function() {
		if ($(this).hasClass("chose"))
			$(this).removeClass("chose");
		else {
			$("tr", t.tBody).removeClass("chose");
			$(this).addClass("chose");
		}
		// 回调onclickrow时间
		// t.onRowClick();
	});
	/*
	 * new ddl({ renderTo : this.tab.attr("id") + "selectPage", dataSource : [ {
	 * key : "10", value : "10" }, { key : "30", value : "30" }, { key : "50",
	 * value : "50" } ], offset : -6, direction : "up", defaultSelected
	 * :t.ajaxData.pageSize, onClick : function(key) { t.reload(1,key); } }); //
	 * 上一页翻页 $(this.down).click(function() { // 获取分页栏显示的当前页码所在元素 var page =
	 * +t.CurrentPage.text(); // 如果当前页码<1就给页码值赋值为1，否则页码的值是当前的页码-1 page = (page -
	 * 1) < 1 ? 1 : page - 1; // 页码计算结果设置为元素内容 t.CurrentPage.text(page); //
	 * 调用重新加载表格方法 t.reload(page, $("ddlItem", t.tab).attr("key")); }); // 下一页翻页
	 * $(this.up).click(function() { // 获取分页栏显示的当前页码所在元素 var page =
	 * +t.CurrentPage.text(); // 获取最大的页码 var maxPage = t.pageTotal.text(); //
	 * 新页码是当前页码+1 var newPage = Math.min(maxPage, page + 1); // 页码计算结果设置为元素内容
	 * t.CurrentPage.text(page); // 调用重新加载表格方法 t.reload(newPage, $(".ddlItem",
	 * t.tab).attr("key")); });
	 */
	this.onComplete();
};
