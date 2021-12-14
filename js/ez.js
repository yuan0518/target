// 产品详情列表交互JS
$(function() {

    /*首页大图轮播*/
    $("#banner").tyslide({
        boxh: 460, //盒子的高度
        w: 1000, //盒子的宽度
        h: 390, //图片的高度
        isShow: true, //是否显示控制器
        isShowBtn: true, //是否显示左右按钮
        controltop: 40, //控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
        controlsW: 20, //控制按钮宽度
        controlsH: 20, //控制按钮高度
        radius: 10, //控制按钮圆角度数
        controlsColor: "#d7d7d7", //普通控制按钮的颜色
        controlsCurrentColor: "#ff6600", //当前控制按钮的颜色
        isShowNum: true //是否显示数字
    });
    $('.hot .hot-sell ul>li').mouseenter(function() {
        // 所有兄弟：隐藏详情 显示标题
        $(this).siblings().find('.desc').hide();
        $(this).siblings().find('.ebooks-title').show();

        // 当前 隐藏标题显示详情
        $(this).find('.ebooks-title').hide(); //隐藏标题
        $(this).find('.desc').show(); //显示详情
    })

    // 独家提供轮播
    $('.ez-banner').tyslide({
        boxh: 500, //盒子的高度
        w: 1200, //盒子的宽度
        h: 440, //图片的高度
        isShow: true, //是否显示控制器
        isShowBtn: true, //是否显示左右按钮
        controltop: 20, //控制按钮上下偏移的位置,要将按钮向下移动   首先保证boxh 高度>图片 h
        controlsW: 15, //控制按钮宽度
        controlsH: 15, //控制按钮高度
        radius: 10, //控制按钮圆角度数
        controlsColor: "#d7d7d7", //普通控制按钮的颜色
        controlsCurrentColor: "#ff6600", //当前控制按钮的颜色

    });
    // 轮播切换
    // 默认后两个轮播隐藏
    $('.ez-banner:gt(0)').hide();
    // 给导航绑定点击事件
    $('.ez-title ul li').on('mouseenter', function() {
            // 导航切换效果
            $(this).addClass('active').siblings().removeClass('active')
                // 获取索引
            var index = $(this).index();
            // 显示对应内容
            $('.ez-banner').eq(index).show().siblings().hide();
        })
        // 新书上架 手风琴效果
    $('.new-books .right-box ul>li').mouseenter(function() {
        // 所有兄弟：隐藏详情 显示标题
        $(this).siblings().find('.desc').hide();
        $(this).siblings().find('.ebooks-title').show();

        // 当前 隐藏标题显示详情
        $(this).find('.ebooks-title').hide(); //隐藏标题
        $(this).find('.desc').show(); //显示详情
    })

    // 换一批
    $('.change').click(function() {
        // 定义一个索引
        var index = 0;
        // 自
        index++;
        // 边界判断
        index = index > 2 ? 0 : index;
        // 让里面的inner-box自己动
        $('.inner-box').animate({
            top: -index * 500
        })
    })
})