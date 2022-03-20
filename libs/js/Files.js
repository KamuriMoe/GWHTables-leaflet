$(document).ready(function () {
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

    //tojsonvalue();
    $(".disclose").on("click", function () {
        $(this).closest("li").toggleClass("mjs-nestedSortable-collapsed").toggleClass("mjs-nestedSortable-expanded");
    });
    $('#show3d').on('click', function (e) {
        show3d();
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