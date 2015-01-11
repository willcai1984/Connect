var vm_power_updater = {
    poll_post: function(url,json_data){
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
            success: vm_power_updater.onSuccess,
            error: vm_power_updater.onError
            });
    },

    onSuccess: function(data){
    	//console.log("Get data is: "+data);
    	var power_result=data.power_result;
		var power_id=data.power_id;
		var power_action=data.power_action;
		try{
			if (power_result=='1')
					{
					if (power_action=='on')
						{
						//Set power id from 0 to 1
						$("#"+power_id).text('1');
						console.log("Power on "+power_id+" successfully");
						}
					else if (power_action=='off')
						{
						$("#"+power_id).text('0');
						console.log("Power off "+power_id+" successfully");
						}
					}
		}
		catch(e){
			console.log(e);
			vm_power_updater.onError();
			return;
		}
		//Login part only need show items all, no need renew per 10s
		//var interval = window.setTimeout(vm_power_updater.poll_post, 10000);
    }, 
	  
    onError: function (XMLHttpRequest, textStatus, errorThrown){ 
        console.log("Poll error;");
        console.log("XMLHttpRequest:"+XMLHttpRequest);
        console.log("textStatus:"+textStatus);
        console.log("errorThrown:"+errorThrown);
    }  
    
}