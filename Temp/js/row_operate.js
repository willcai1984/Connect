$(document).ready(function(){
	var i=2;
	var cli_tr1_in_html=$("#cli_tr_1").html();
	var cli_tr1_html='<tr id="cli_tr_1">'+cli_tr1_in_html+'</tr>';
	$("#add").click(function(){
		if (i >= 0 && i <=5) {
			//replace id and input_name, not other num, such as height or width
			//sub _1 to _i
			var cli_tri_html=cli_tr1_html.replace(/_1/g,"_"+i);
			//sub >1< to >i<
			var cli_tri_html=cli_tri_html.replace(/>1</g,">"+i+"<")
			$("#cli_table").append(cli_tri_html);
			//cannot use var here
			i+=1;
		}
		else if (i > 5) {
			alert("Only support 5 CLIs, cannot add any more");
		}
		else {
			alert("ID error, the ID is "+i);
		}
	});
		
	$("#del").click(function(){
		if (i > 2) {
			//cannot use var here
			i-=1;
			$("#cli_tr_"+i).remove();
		}
		else {
			alert("Only one CLI exists, can not be deleted");
		}	
	});	
});