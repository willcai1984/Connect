var vm_updater = {
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
            success: vm_updater.onSuccess,
            error: vm_updater.onError
            });
    },

    onSuccess: function(data){
    	console.log("Get data is: "+data);
    	var length=Number(data.length);
    	var vmid_list=data.vmid_list.split(',');
    	var dis_list=data.dis_list.split(',');
    	var reg_list=data.reg_list.split(',');
    	var power_list=data.power_list.split(',');

		try{
			var h="";
			for (i=0;i<length;i++)
			{
				var id=i;
				var vmid=vmid_list[i];
				var dis=dis_list[i];
				var reg=reg_list[i];
				var power=power_list[i];
				var h1=html1.replace(/__id__/g,'check'+i);
				var h2=html2.replace(/__id__/g,'dis'+i);
				var h2=h2.replace(/__dis__/g,dis);
				var h3=html3.replace(/__id__/g,'power'+i);
				var h3=h3.replace(/__power__/g,power);
				var h4=html4.replace(/__id__/g,'vmid'+i);
				var h4=h4.replace(/__vmid__/g,vmid);
				var h5=html5.replace(/__id__/g,'reg'+i);
				var h5=h5.replace(/__reg__/g,reg);
				var h=h+h1+h2+h3+h4+h5;
			}
			console.log("Append html is:"+h);
			$("#vm_list").html(h);
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