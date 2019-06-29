$(function(){
    $("#start").click(function(){
        $("#p1").addClass("red");
        $("#p2").addClass("red bold");
        // $("#p2").attr("class","red");
    });
    
    $("#but1").click(function(){
        $("#p3").addClass("red bold");
    });
    
    $("#but2").click(function(){
        $("#p3").removeClass("red");
    });

    $("#but3").click(function(){
        $("#p4").toggleClass(";red bold");
    });

    $("#but4").click(function(){
        $("#p5").css("color","red");
        console.log($("#p5").css("color"));
    });

    $("#but5").click(function(){
        $("#p6").css(
            {"color":"red",
            "font-weight": "bold",
            "background": "yellow"}
        );

        console.log($("#but5").width());
        $("#but5").width(100);
        $("#but5").height(100);

    });

      
});