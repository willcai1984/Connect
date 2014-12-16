function set_log(log_id,log_name){
	var c=new Date();
	var c_y=String(c.getFullYear());
	var c_m=String(c.getMonth()+1);
	var c_d=String(c.getDate());
	var c_h=String(c.getHours());
	var c_m=String(c.getMinutes());
	var c_s=String(c.getSeconds());
	if (log_name)
		{
		var logfile=log_name;
		}
	else {
		var logfile="/var/log/will/logs/"+c_y+c_m+c_d+"/"+c_h+c_m+c_s+".log";
		}
	console.log("Logfile is "+logfile);
		$("#"+log_id).attr({
			"value" : logfile,
		});
	console.log("set logfile successfully");
	return logfile
}	  	