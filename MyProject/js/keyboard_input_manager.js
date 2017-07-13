function KeyboardInputManager() 
{
  
	this.events = {};

  
	this.listen();

	this.configure_msf();
}


KeyboardInputManager.prototype.on = function (event, callback) 
{
  
	if (!this.events[event]) 
	{
    
		this.events[event] = [];
  
	}
  
	this.events[event].push(callback);

};


KeyboardInputManager.prototype.emit = function (event, data) 
{
  
	var callbacks = this.events[event];
  
	if (callbacks) 
	{
    
		callbacks.forEach(function (callback) 
		{
      callback(data);
    });
  
	}

};

KeyboardInputManager.prototype.listen = function () 
{
  
	var self = this;

  
	var map = {
				38: { key: 0, type: 'arrow' }, // Up
    
		       39: { key: 1, type: 'arrow' }, // Right
    
		       40: { key: 2, type: 'arrow' }, // Down
    
		       37: { key: 3, type: 'arrow' }, // Left

    
		       81: { x: 0, y: 1, type: 'button' }, // Top-Left
    
		       69: { x: 1, y: 1, type: 'button' }, // Top-Right
    
		       68: { x: 1, y: 0, type: 'button' }, // Bottom-Right
    
		       65: { x: 0, y: 0, type: 'button' }, // Bottom-Left

    
		       82: { key: 'restart', type: 'common' }  // Restart
  
		  };

  
	document.addEventListener('keydown', function (e) 
	{
		console.log('Key code : ' + e.keyCode);
		switch(e.keyCode){
    	case 37: //LEFT arrow
    		break;
    	case 38: //UP arrow
    		break;
    	case 39: //RIGHT arrow
    		break;
    	case 40: //DOWN arrow
    		break;
    	case 13: //OK button
    		break;
    	case 10009: //RETURN button
		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		break;
    	}
		
		var data = map[e.keyCode];

	    
		if (data !== undefined) 
		{
      
			e.preventDefault();
      
			self.emit('move', data);
    
		}
		
		/*var modifiers = event.altKey && event.ctrlKey && event.metaKey &&
 event.shiftKey;
    
		var data = map[event.which];

    
		if (!modifiers && data !== undefined) 
		{
      
			event.preventDefault();
      
			self.emit('move', data);
    
		}*/

  
	});

};

KeyboardInputManager.prototype.configure_msf = function()
{
	var self = this;
	var channel = null;
	
	// Get a reference to the local "service"
    msf.local(function(err, service) {
        if (err) {
            console.log('msf.local error: ' + err /*, logBox*/);
            return;
        }
        // Create a reference to a communication "channel"
        channel = service.channel('com.samsung.multiscreen.MultiScreenSimple');

        // Connect to the channel
        channel.connect({name:"The TV"}, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('MultiScreen initialized, channel opened.');
        });

        // Add a message listener. This is where you will receive messages from mobile devices
        channel.on('say', function(msg, from){
        	var command = extract_command_from_query(msg);
        	console.log(from.attributes.name + ' says: <strong>' + msg + '</strong>');                	
            
        	var data = null;
        	var map = {        
    		       0: { x: 0, y: 1, type: 'button' }, // Top-Left
        
    		       1: { x: 1, y: 1, type: 'button' }, // Top-Right
        
    		       2: { x: 1, y: 0, type: 'button' }, // Bottom-Right
        
    		       3: { x: 0, y: 0, type: 'button' }, // Bottom-Left

        
    		       10: { key: 'restart', type: 'common' }  // Restart
      
    		  };
        	
        	try
        	{
                if (command === "left_up"){
                	//tune_volume(-1);
                	console.log('Command left up.');
                	data = map[0];
                }
                else if (command  === "left_down"){
                	//tune_volume(1);
                	console.log('Command left down.');
                	data = map[1];
                }
                else if (command === "right_up"){
                	//changeSource(1);
                	console.log('Command right up.');
                	data = map[2];
                }
                else if (command === "right_down"){
                	//changeSource(-1);
                	console.log('Command right down.');
                	data = map[3];
                }
                else if (command === "restart"){
                	// restart
                	console.log('Command restart.');
                	data = map[10];
                }
                else
                {
                	console.log('I receive fucking shit. Please do not send it again:(');
                    //echo(from.attributes.name + ' says: <strong>' + msg + '</strong>');                	
                }
        	}
        	catch (e)
        	{
        		console.log(e.toString());
        	}
        	
        	if (data !== undefined) 
    		{
        		self.emit('move', data);
    		}
            
        });

        // Add a listener for when another client connects, such as a mobile device
        channel.on('clientConnect', function(client){
            // Send the new client a message
        	// hannel.publish('say', 'Hello ' + client.attributes.name, client.id);
        	console.log("Let's welcome a new client: " + client.attributes.name);
        });

        // Add a listener for when a client disconnects
        channel.on('clientDisconnect', function(client){
        	console.log("Sorry to see you go, " + client.attributes.name + ". Goodbye!");
        });
    });
}

console.log("keyboard_input_manager.js LOADED!\n");