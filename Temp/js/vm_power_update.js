var vm_updater = {
    poll_post: function(url,json_data,power_action){
        $.ajax({
        	url: url,
            type: "POST", 
            //data: JSON.stringify(jsondata),
            //contentType : 'application/json',
            //Send data mode
            data:json_data,
            //Expect return data type
            dataType: "json",	     
            cache: false,
            success: vm_updater.onSuccess,
            error: vm_updater.onError
            });
    },

    onSuccess: function(data){
    	console.log("Get data is: "+data);
    	var power_result=data.power_result;
		var power_id=data.power_id;
		try{
			if (power_result=='1')
					{
					if (power_action=='on')
						{
						$("#"+power_id).text()='1';
						}
					else if (power_action=='off')
						{
						$("#"+power_id).text()='0';
						}
					}
		}
		catch(e){
			console.log(e);
			vm_updater.onError();
			return;
		}
		//Login part only need show items all, no need renew per 10s
		//var interval = window.setTimeout(vm_updater.poll_post, 10000);
    }, 
	  
    onError: function (XMLHttpRequest, textStatus, errorThrown){ 
        console.log("Poll error;");
        console.log("XMLHttpRequest:"+XMLHttpRequest);
        console.log("textStatus:"+textStatus);
        console.log("errorThrown:"+errorThrown);
    }  
    
}