function extract_command_from_query(query){
	var splitted_query = null;
	if (query){
		splitted_query = query.split(' ');
		return splitted_query[0];
	}
	
	return null;
}

//Initialize function
var init = function () {
    console.log('init() called');
    
    document.addEventListener('visibilitychange', function() {
        if(document.hidden){
            // Something you want to do when hide or exit.
        } else {
            // Something you want to do when resume.
        }
    });
 
    //configure_msf();
    
    // add eventListener for keydown
    document.addEventListener('keydown', function(e) {
    	
    });
    
};
window.onload = init;


