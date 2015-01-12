var vm_del_updater = {
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
            success: vm_del_updater.onSuccess,
            error: vm_del_updater.onError
            });
    },

    onSuccess: function(data){
    	//console.log("Get data is: "+data);
		var dis_name=data.dis_name;
		var dis_id=data.dis_id;
		var is_last=data.is_last;
		try{
			var tr_id=dis_id.replace(/dis/g,'tr')
			$("#"+tr_id).remove();
			console.log("Delete "+dis_name+" successfully");
			if (is_last=='1')
				{
				alert("Delete action done");
				}
		}
		catch(e){
			console.log(e);
			vm_del_updater.onError();
			return;
		}
		//Login part only need show items all, no need renew per 10s
		//var interval = window.setTimeout(vm_del_updater.poll_post, 10000);
    }, 
	  
    onError: function (XMLHttpRequest, textStatus, errorThrown){ 
        console.log("Poll error;");
        console.log("XMLHttpRequest:"+XMLHttpRequest);
        console.log("textStatus:"+textStatus);
        console.log("errorThrown:"+errorThrown);
    }  
    
}