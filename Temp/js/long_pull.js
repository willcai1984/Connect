function long_pull(logfile,stdfile){
	console.log("Start long pull, and the log file is "+logfile)
	//console.log('Json data is {"logfile" : "'+logfile+'"}')
	var jsondata={"logfile":logfile}
	var updater = {
	    poll_post: function(){
	        $.ajax({
	        	url: "/connect/process/longpull/",
	            type: "POST", 
	            //data: JSON.stringify(jsondata),
	            //contentType : 'application/json',
	            //Send data mode
	            data:"logfile="+logfile+";stdfile="+stdfile,
	            //Expect return data type
	            dataType: 'json',	     
	            cache: false,
	            success: updater.onSuccess,
	            error: updater.onError,
	            complete: updater.onComplete
	            });
	    },

	    onSuccess: function(data){
	    	console.log("Get data is: "+data)
	    	log=data.log
	    	std=data.std
	    	is_end=data.is_end
	    	console.log("Log is: "+log)
	    	console.log("Std is: "+std)
	    	console.log("is_end is: "+is_end)
	    	if (is_end=='n'){
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
			interval = window.setTimeout(updater.poll_post, 2000);
		}
		else{
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
		    updater.onComplete();
		    return;
		}
			
	    }, 
		  
	    onError: function (XMLHttpRequest, textStatus, errorThrown){ 
	        console.log("Poll error;");
	        console.log("XMLHttpRequest:"+XMLHttpRequest);
	        console.log("textStatus:"+textStatus);
	        console.log("errorThrown:"+errorThrown);
	    },
	    
	    onComplete: function (){ 
	        alert("Task done");
	    }	    
	    
	}    
	updater.poll_post();
}


//pull down the slider
function slider_down(id){
	$(id).scrollTop($(id)[0].scrollHeight); 
	console.log("pull down the slider successfully");
}