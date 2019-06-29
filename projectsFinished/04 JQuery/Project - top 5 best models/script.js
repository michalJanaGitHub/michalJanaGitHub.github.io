var sSpeed = 500;

$(function () {
    var $mainMenuItems = $("#main-menu ul").children("li"),
        totalMainMenuItems = $mainMenuItems.length;
    var openedIndex = 2,
    init = function () {
        bindEvents();
        if (validIndex(openedIndex)) {
            animateItem($mainMenuItems.eq(openedIndex), true, sSpeed);
        }
    };

    var bindEvents = function () {
        $mainMenuItems.children(".images").click(function () {
            var newIndex = $(this).parent().index();
            checkAndAnimateItem(newIndex);
        });

        $(".button").hover(
            function () {
                $(this).addClass("hovered");
            },
            function () {
                $(this).removeClass("hovered");
            }
        );

        $(".button").click(function () {
            var newIndex = $(this).index();
            checkAndAnimateItem(newIndex);
        });
    };

    var validIndex = function (indexToCheck) {
        return ((indexToCheck >= 0) && (indexToCheck < totalMainMenuItems));
    };

    var animateItem = function ($item, toOpen, speed) {
        var $colorImage = $item.find(".color"),
        itemParam = toOpen ? { width: "420px" } : { width: "140px" },
        colorImageParam = toOpen ? { left: "0px" } : { left: "140px" };
        $colorImage.animate(colorImageParam, speed);
        $item.animate(itemParam, speed);
    };

    var checkAndAnimateItem = function (indexToCheckAndAnimate) {
        if (openedIndex === indexToCheckAndAnimate) {
            animateItem($mainMenuItems.eq(indexToCheckAndAnimate), false, sSpeed);
            openedIndex = -1;
        }
        else {
            if (validIndex(indexToCheckAndAnimate)) {
                animateItem($mainMenuItems.eq(openedIndex), false, sSpeed);
                openedIndex = indexToCheckAndAnimate;
                animateItem($mainMenuItems.eq(indexToCheckAndAnimate), true, sSpeed);
            }
        }
    };

    init();

});
