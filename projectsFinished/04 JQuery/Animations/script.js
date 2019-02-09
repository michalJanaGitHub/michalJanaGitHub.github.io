
/* -------------------------------------------------------------------- */
/* animations */

// $(function () {
//     $("#start").click(function () {
//         $("div").animate(
//             {
//                 left: '600px',
//                 opacity: 0.2,
//                 width: '250px',
//                 height: '+=250px'
//             }, 5000);
//     });

//     $("#stop").click(function () {
//         $("div").stop(true);
//     });
// });

// $(function () {
//     $("#start").click(function () {
//         $("div").slideUp(3000).slideDown(3000).fadeOut(3000).fadeIn(300);
//     });

//     $("#stop").click(function () {
//         $("div").stop(true);
//     });
// });

$(function () {
    $("#start").click(function () {
        $("div").slideUp(3000);        
        $("div").slideDown(500);
        $("div").fadeOut(3000);
        $("div").fadeIn(500);
    });

    $("#stop").click(function () {
        $("div").stop(true);
        // $("div").stop(true, true);
    });
});


// $(function(){  
//     $("button").click(function(){
//         $("div").animate({left:'1000px'}, 1000, function(){
//             $("div").hide();
//     });
//     });
    
// });