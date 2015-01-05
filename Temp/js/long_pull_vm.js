function long_pull_vm(ip){
	console.log("Start long pull, and the Host is "+ip)
	var jsondata={"ip":ip}
	var updater = {
	    poll_post: function(){
	        $.ajax({
	        	url: "/vmware/longpull/",
	            type: "POST", 
	            //data: JSON.stringify(jsondata),
	            //contentType : 'application/json',
	            //Send data mode
	            data:"ip="+ip+",
	            //Expect return data type
	            dataType: 'json',	     
	            cache: false,
	            success: updater.onSuccess,
	            error: updater.onError
	            });
	    },

	    onSuccess: function(data){
	    	console.log("Get data is: "+data)
	    	log=data.log
	    	std=data.std
	    	is_end=data.is_end
	    	//console.log("Log is: "+log)
	    	//console.log("Std is: "+std)
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
			interval = window.setTimeout(updater.poll_post, 1000);
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
		    alert("Task done");
		    return;
		}
			
	    }, 
		  
	    onError: function (XMLHttpRequest, textStatus, errorThrown){ 
	        console.log("Poll error;");
	        console.log("XMLHttpRequest:"+XMLHttpRequest);
	        console.log("textStatus:"+textStatus);
	        console.log("errorThrown:"+errorThrown);
	    }  
	    
	}    
	updater.poll_post();
}


}