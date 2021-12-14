/**
 * 购物车js文件  
 */
$(function() {
    //把三个类型的input分别获取
    var $theadInput = $('thead input[type=checkbox]'); //表头中的全选框
    var $tbodyInputs = $('tbody input[type=checkbox]'); //表格中的每一行框
    var $totalPriceInput = $('.totalPrice input[type=checkbox]'); //计算总价的全选框

    //全选
    /*
    1.把表头的全选按钮绑定事件点击时后去到它的状态(true/false)
    2.给表格中的每一行的数据的input选择框，赋值为表头的选中状态(true/false)
    3.给计算总价的全选框也赋值为表头的选中状态(true/false)
    */
    $theadInput.change(function() {
            var checkState = $(this).prop('checked'); //获取全选框的选中状态
            $tbodyInputs.prop('checked', checkState); //把状态给表格中的选择框
            $totalPriceInput.prop('checked', checkState); //把状态给计算总价中的全选框

            //调用计算总价函数
            allTotal()

        })
        /*
    // 计算总价的全选
    1.把计算总价的全选按钮绑定点击事件后去选中状态(true/false)
    2.把状态给表头的全选
    3.把状态给表格中的全选框
*/
    $totalPriceInput.change(function() {
        var checkState = $(this).prop('checked'); //获取计算总价中的全选状态
        $theadInput.prop('checked', checkState); //赋值给表头选择框
        $tbodyInputs.prop('checked', checkState); //赋值给表格的全选框

        allTotal() //小计
    })

    /*
    表格中的选择框反过来影响两个全选框
    1.给表格中的选择框绑定点击事件(true/)
    2.循环表格中的选择框
    3.获取每一个选择框的选中状态
    判断:如果有一个是false 那么就不是全选。flag=false
    把flag的值赋值给两个全选框  因为flag就是对应选中状态
*/
    $tbodyInputs.change(function() { //给表格总单选框绑事件
        var flag = true; //定标竿为true
        $tbodyInputs.each(function(index, input) { //循环表格input
            var checkState = $(this).prop('checked') //获取选中状态
            if (!checkState) { //如果有一个等于false
                flag = false; //标杆变为false全选状态变为false
            }
        })
        $theadInput.prop('checked', flag) //把状态赋值给头部全选框
        $totalPriceInput.prop('checked', flag) //把状态赋值给计算价格

        //调用计算总价函数
        allTotal()
    })

    /**
     * 加法功能：
     * 1.获取+按钮，绑定点击事件
     * 2.点击的时候后去后面输入框的值
     * 3.输入框的值自增
     * 4.把后面自增的值重新赋值给后面输入框
     */

    $('.add').click(function() { //给增加绑定事件
            var count = parseInt($(this).next().val()); //获取输入框值
            count++; //自增
            $(this).next().val(count); //自增的值赋值给输入框

            // 小计
            subTotal($(this), count);
            //总计
            allTotal()

        })
        /**
         * 减法功能：
         * 1.获取-按钮，绑定点击事件
         * 2.获取输入框的值
         * 3.值自减，边界判定，如果小于1，那么等于一，否则等于自己
         * 4.把后面减少的值重新赋值给后面输入框
         */

    $('.reduce').click(function() { //绑事件
            var count = parseInt($(this).prev().val()); //获取前面输入框值
            count--; //自减
            count = count < 1 ? 1 : count;
            $(this).prev().val(count);

            // 小计
            subTotal($(this), count);
            //总计
            allTotal()
        })
        /**
         * 封装一个小计函数 点击+ 或者-的时候需要调用小计
         */
    function subTotal(dom, count) {
        // 找到单价
        var singlePrice = parseFloat(dom.closest('tr').find('.price').text());
        var subtotalPrice = singlePrice * count; // 单价*数量=小计
        dom.closest('tr').find('.subprice').text(subtotalPrice.toFixed(2)); // 把小计的结果渲染页面，保留两位小数

        //总计
        allTotal()
    }
    /*
    总计功能实现  头部全选  计算总价全选  表格的选择框 =- 删除  六个地方调用总计
    定义一个变量，用于保存总价 定义一个变量  用于保存已选商品数量
    1.获取所有表格的选择框，循环，后去选中状态 判断
    2.如果选中，那么就要累加这一行的小计
    */
    function allTotal() {
        var allPrice = 0; //定义一个变量 用于保存总价
        var selectedCount = 0; //定义一个变量 用于保存已选商品数量

        $('tbody input[type=checkbox]').each(function() { //获取表格中的选择框 循环
                var checkState = $(this).prop('checked'); //获取选中状态
                if (checkState) { //如果是true
                    allPrice += parseFloat($(this).closest('tr').find('.subprice').text()); //累加这一行的小计
                    selectedCount++; //数量+1
                }

            })
            //渲染
        $('.total').text(allPrice.toFixed(2)); //渲染总价
        $('.count').text(selectedCount); //渲染数量
    }

    /*
    光宇下面的删除功能  模拟，不是真正的逻辑  伪删除
    */
    //删除
    $('.del').click(function() {
        $(this).closest('tr').remove()

        allTotal() //计算总价
        getGoodsCount(); //重新计算商品数量
    })

    //删除选中
    $('.deleteChecked').click(function() {
        $('tbody input[type=checkbox]').each(function() { //获取表格中的选择框 循环
            var checkState = $(this).prop('checked'); //获取选中状态
            if (checkState) { //如果是true
                $(this).closest('tr').remove(); //干掉自己

            }

        })
        allTotal() //计算总价
        getGoodsCount(); //重新计算商品数量

    })

    //封装一个获取全部商品的函数
    function getGoodsCount() {
        //获取数量
        var goodsCount = $('table tbody tr').length;
        //渲染
        $('.goodsCount').text(goodsCount);
    }
    getGoodsCount(); //页面加载调用一次
})