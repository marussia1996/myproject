window.onload = function() {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if (e.keyName === "back") {
            try {
                tizen.application.getCurrentApplication().exit();
            } catch (ignore) {}
        }
    });
    
    $("#LeftUp").click(function(){
        console.log("LeftUp");
    });
    
    $("#RightUp").click(function(){
        console.log("RightUp");
    });
    
    $("#LeftDown").click(function(){
        console.log("LeftDown");
    });
    
    $("#RightDown").click(function(){
        console.log("RightDown");
    });

    $("#Stop").click(function(){
        console.log("Pause");
    });
    
    $("#Restart").click(function(){
        console.log("Restart");
    });

};