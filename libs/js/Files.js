function show3d(selector) {
    $(selector).dialog({
        autoOpen: false,  //设置对话框打开的方式 不是自动打开
        show: "blind",    //打开时的动画效果
        hide: "blind",    //关闭是的动画效果
        modal: false,          //true代表运用遮罩效果
        draggable: true,   //是否可以拖动的效果  true可以拖动  默认值是true    ，false代表不可以拖动
        //closeOnEscape:false,   //是否采用esc键退出对话框，如果为false则不采用 ，true则采用
        title: "3d模型展示",    //对话框的标题
        position: {my: 'center', at: 'center', of: window},         //对话框打开的位置，默认center，有top、left、right、center、bottom
        width: 1000,      //设置对话框的宽度
        height: 600,     //设置对话框的高度
        resizable: true,   //是否可以改变对话框的尺寸的操作，默认true
        // 层叠效果
        // 层叠效果
        drag: function (event, ui) {
            //可以测试出 对话框当前的坐标位置
        },
        create: function (event, ui) {
            console.log(event, ui)
            $(event.target).parents('[tabindex]').css('z-index', '1000');
        }
    });
    //触发连接的事件   当你点击 连接  打开一个对话框
    $(selector).dialog("open");  //open参数  作用  打开对话框
    MountainLoad(selector)
    //我怎么获取 我设置的options中的参数值
    //var modalValue = $("#luoyue2").find('.filename').dialog("option","modal");
    //window.console.log(modalValue);
    //我怎么设置options中的参数值
    //$("#luoyue2").find('.filename').dialog("option","modal",false);
}

$(function () {
    $("ol.sortable").nestedSortable({
        forcePlaceholderSize: true,
        handle: "div",
        helper: "clone",
        items: "li",
        opacity: .6,
        placeholder: "placeholder",
        revert: 250,
        tabSize: 25,
        tolerance: "pointer",
        toleranceElement: "> div",
        maxLevels: 3,
        isTree: true,
        expandOnHover: 700,
        startCollapsed: false,
        isAllowed: function (placeholder, placeholderParent, currentItem) {

                switch (currentItem[0].classList[0]) {
                    case 'file':
                        return placeholderParent ? false : true
                        break;
                    case 'sub':
                        if (placeholderParent && placeholderParent[0].classList[0] === 'file') return true
                        else return false
                        break;
                    case 'tri':
                        if (placeholderParent && placeholderParent[0].classList[0] === 'sub') return true
                        else return false
                        break;

            }
        }
    });

//
    $(".disclose").on("click", function () {
        $(this).closest("li").toggleClass("mjs-nestedSortable-collapsed").toggleClass("mjs-nestedSortable-expanded");
    });
    $('#show3d').on('click', function (e) {
        show3d('#3d');
        e.preventDefault();
    })
});

// function tojsonvalue() {
//     var hiered = $('ol.sortable').nestedSortable('toHierarchy', { startDepthCount: 0 });
//     //hiered.push()
//     var first = '{"id":"'+$("ul.sortable li").eq(0).attr("id").replace("list_", "")+'"},';
//     hiered = window.JSON.stringify(hiered);
//     hiered = hiered.replace("[{", "[" + first + "{");
//     $('#toJsonOutput').text(hiered);
// }