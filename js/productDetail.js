// 产品详情核心JS文件

$(function() {
    // 调用插件函数
    magnifier({
        magnifier: "#magnifier1", //最外层的大容器
        width: 340, //承载容器宽
        height: 470, //承载容器高		
        zoom: 2 //缩放比例
    }); 
    /*轮播切换 */
        
    //默认后面两个轮播隐藏
        
    $('.ez-banner:gt(0)').hide();     //给导航绑定点击事件
        
    $('.ez-title ul li').on('mouseenter', function() {      //导航切换效果
             
        $(this).addClass('active').siblings('li').removeClass('active')      //获取索引
                  var  index  =  $(this).index();      //显示对应内容
             
        $('.ez-banner').eq(index).show().siblings().hide();    
    })

    //添加购物车数量
    var spinner = $("#spinner").spinner();

    $("#disable").on("click", function() {
        if (spinner.spinner("option", "disabled")) {
            spinner.spinner("enable");
        } else {
            spinner.spinner("disable");
        }
    })
})