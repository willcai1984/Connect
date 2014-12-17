function long_pull(log_file){
	console.log("Start long pull, and the log file is "+log_file)
	var updater = {
	    poll_post: function(){
	        $.ajax({
	        	url: "/connect/process/longpull/",
	            type: "Post", 
	            data: '{"logfile" : "'+logfile+'"}',
	            dataType: 'json',
	            contentType : 'application/json',
	            success: updater.onSuccess,
	            error: updater.onError
	            });
	    },

	    onSuccess: function(data){
	    	log=data.log
	    	std=data.std	
		    //Write log parter, due to contains html sign, cannot use text 
		    try{
				$("#log").html(log);
				slider_down("#log");
			}
			catch(e){
				console.log(e);
				updater.onError();
				return;
			}
		    try{
				$("#std").html(std);
				slider_down("#std");
			}
			catch(e){
				console.log(e);
				updater.onError();
				return;
			}
			interval = window.setTimeout(updater.poll_post, 500);
		}, 
		  
	    onError: function(){
	        console.log("Poll error;");
	    }
	}    
	updater.poll_post();
}


//pull down the slider
function slider_down(id){
	$(id).scrollTop($(id)[0].scrollHeight); 
	console.log("pull down the slider successfully");
}