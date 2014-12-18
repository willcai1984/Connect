function long_pull(logfile){
	console.log("Start long pull, and the log file is "+logfile)
	//console.log('Json data is {"logfile" : "'+logfile+'"}')
	var updater = {
	    poll_post: function(){
	        $.ajax({
	        	url: "/connect/process/longpull/",
	            type: "POST", 
	            //data: '{"logfile" : "'+logfile+'"}',
	            //dataType: 'json',
	            //contentType : 'application/json',
	            data="logfile="+logfile,
	            cache: false,
	            success: updater.onSuccess,
	            error: updater.onError
	            });
	    },

	    onSuccess: function(data){
	    	log=data.log
	    	std=data.std
	    	console.log("Get data successfully, start replace")
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
			interval = window.setTimeout(updater.poll_post, 1000);
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