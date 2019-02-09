
    document.onkeydown = function handleKeyDown(e) 
    {
        var key = e.keyCode;
        var paragraph = document.getElementById("idFirsParagraph");
        paragraph.innerHTML = key;
    };
    


