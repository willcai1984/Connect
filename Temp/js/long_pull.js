function long_pull_log_stdout(log_file){
	console.log("Start long pull, and the log file is "+log_file)
	var log_i=0
	var stdout_i=0
	var updater = {
	    poll_post: function(){
	        $.ajax({url: "/connect/", 
	                type: "Post", 
	                data: {logfile:log_file,},
	                dataType: "text",
	                success: updater.onSuccess,
	                error: updater.onError});
	    },
	    
	    onSuccess: function(data,status){
	        //sign format, is_end:is_successful
	        //not end:00
	       	//is end/is successful: 11
	        //is end/not successful:10
	    	//process data
	    	log_stdout_list=data.split('will_log_stdout_separator');
	    	log_para=log_stdout_list[0];
	    	log_data=log_stdout_list[1];
	    	stdout_para=log_stdout_list[2];
	    	stdout_data=log_stdout_list[3];
	    	console.log('log_para is:' + log_para);
	    	console.log('stdout_para is:' + stdout_para);
	    	//alert(log_para)
	    	//alert(stdout_para)
	        //process loop
	        if (log_para=='11'&&stdout_para=='11') {
		        //Continue loop when meet end sign the first time, log_i and stdout_i add 1
		        if (log_i>0&&stdout_i>0) {
		        	// alert info and no loop any more
		        	alert('Operation done and connect result is successfully');
		        }
		        else {	    
		        	log_i+=1;
		        	stdout_i+=1;
		        	interval = window.setTimeout(updater.poll_post, 500);
		        }
			}
			else if (stdout_para=='10') {
				console.log('SSH failed, please confirm you target is reachable');
		        //Continue loop when meet end sign the first time, log_i and stdout_i add 1
		        if (stdout_i>0) {
		       		// alert info and no loop any more
		        	alert('Operation done and connect result is failed, please confirm your Target is reachable');
		        }
		        else {		        
		        	stdout_i+=1;
		        	interval = window.setTimeout(updater.poll_post, 500);
		        }
			}
			else {
		        //After 500ms execute updater.poll_post
		        interval = window.setTimeout(updater.poll_post, 500);
			}
	
		    //Write log parter, due to contains html sign, cannot use text 
		    try{
				$("#log_print").html(log_data);
				log_slider_down();
			}
			catch(e){
				console.log(e);
				updater.onError();
				return;
			}
		 /* 
			//Write stdout parter 
			try{
				$("#stdout_print").html(stdout_data);
				stdout_slider_down();
			}
			catch(e){
				console.log(e);
				updater.onError();
				return;
			}
		*/	
		}, 
		  
	    onError: function(){
	        console.log("Poll error;");
	    },
	};
	
	//pull down the log slider
	function log_slider_down(){
		$("#log_print").scrollTop($("#log_print")[0].scrollHeight); 
		console.log("pull down the log slider");
	}
	//pull down the stdout slider
	function stdout_slider_down(){
		$("#stdout_print").scrollTop($("#stdout_print")[0].scrollHeight);
		console.log("pull down the stdout slider");
	}
	
updater.poll_post();
}