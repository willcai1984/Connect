function long_pull_vm(ip){
	console.log("Start long pull, and the Host is "+ip);
	var jsondata={"ip":ip};
	var html1='<tr><td style="width:10%;text-align:left;" border="1"><input type="checkbox" id="__id__" /></td>';
	var	html2='<td style="width:30%;text-align:left;" border="1">__dis__</td>';
	var	html3='<td style="width:20%;text-align:left;" border="1">__power__</td>';
	var	html4='<td style="width:10%;text-align:left;" border="1">__vmid__</td>';
	var	html5='<td style="width:30%;text-align:left;" border="1">__reg__</td></tr>';
	var updater = {
	    poll_post: function(){
	        $.ajax({
	        	url: "/vmware/longpull/",
	            type: "POST", 
	            //data: JSON.stringify(jsondata),
	            //contentType : 'application/json',
	            //Send data mode
	            data:"ip="+ip,
	            //Expect return data type
	            dataType: "json",	     
	            cache: false,
	            success: updater.onSuccess,
	            error: updater.onError
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
				for (i=0;i<length;i++)
				{
				var id=i;
				var vmid=vmid_list[i];
				var dis=dis_list[i];
				var reg=reg_list[i];
				var power=power_list[i];
				var h1=html1.replace(/__id__/g,'check'+i);
				var h2=html2.replace(/__dis__/g,dis);
				var h3=html3.replace(/__power__/g,power);
				var h4=html4.replace(/__vmid__/g,vmid);
				var h5=html5.replace(/__reg__/g,reg);
				var h=h1+h2+h3+h4+h5;
				console.log("Append html is:"+h);
				$("#vm_table").append(h);
				}
			}
			catch(e){
				console.log(e);
				updater.onError();
				return;
			}
			var interval = window.setTimeout(updater.poll_post, 10000);

			
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