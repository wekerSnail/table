// 菜单栏
function menuList(args) {
	this.init(args);
}
// 初始化参数
menuList.prototype.init = function(args) {
	this.renderTo = $("#" + args.renderTo);
	this.dataSource = args.dataSource;
	this.onClick = args.onClick;
	this.chose = args.chose;
	this.getDataByDataSource();
};
// 根据数据源类型，判断是否发起ajax请求
menuList.prototype.getDataByDataSource = function() {
	var t = this;
	if (typeof (this.dataSource) == "string")
		$.post(this.dataSource, this.ajax, function(obj) {
			t.dataSource = obj;
			// 生成元素
			t.build();
		});
	else if ($.isArray(this.dataSource))
		// 生成元素
		this.build();
};
// 创建元素
menuList.prototype.build = function() {
	var t = this;
	this.menuList = $("<ul class='menuList'></ul>").appendTo(this.renderTo);
	this.Bg = $("<div class='bgcolor hidden'></div>").appendTo(this.renderTo);
	this.BgChose = $("<div class='liChose hidden'></div>").css("top", 0)
			.appendTo(this.renderTo);
	$(this.dataSource)
			.each(
					function(i, obj) {
						t.menu = $(
								"<li class='menu' url='" + obj.url
										+ "' index='" + obj.id + "'></li>")
								.appendTo(t.menuList);
						t.icon = $("<i class='" + obj.icon + "'></i>")
								.appendTo(t.menu);
						t.txt = $(
								"<span class='txtMenu'>" + obj.type + "</span>")
								.appendTo(t.menu);
					});
	this.eventBind();
};
menuList.prototype.eventBind = function() {
	var t = this;
	this.renderTo.hover(function() {
		// 鼠标进入菜单区域显示背景
		t.Bg.removeClass("hidden");
	}, function() {
		t.Bg.addClass("hidden");
	});
	$(".menu", this.renderTo).on({
		// 菜单点击事件
		click : function() {
			t.select(this);
		},
		// 鼠标进入菜单项
		mouseenter : function() {
			if (util.isLTIE10()) {
				t.Bg.stop().animate({
					top : $(this).index() * $(this).outerHeight()
				}, 250);
			} else {
				t.Bg.css("top", $(this).index() * $(this).outerHeight());
			}
		}
	});
	// 组件加载完成
	this.onComplete();
};

// 组件加载完成
menuList.prototype.onComplete = function() {
	// 设置选中第一个li
	if (this.chose == null) {
		this.select($("li:eq(0)", this.menuList));
		// 取消隐藏
		$(this.BgChose).removeClass("hidden");
	}
};

// 设置选中项
menuList.prototype.select = function(li) {
	$(this.BgChose).removeClass("hidden");
	// 清除页面上所有菜单选中效果
	$(".menu").removeClass("fontWhite");
	// 给当前被点击的菜单项加选中效果
	$(li).addClass("fontWhite");
	// 如果当前浏览器版本小于IE10
	if (util.isLTIE10()) {
		this.BgChose.animate({
			top : $(li).index() * $(li).outerHeight()
		}, 250);
	} else {
		this.BgChose.css("top", $(li).index() * $(li).outerHeight());
	}
	// cellbacl
	this.onClick(li);
};
