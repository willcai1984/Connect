function get_checked_id(){
	var id_list=new Array()
	$(":checkbox[name='vmlist']:checked").each(function() {
		var id = $(this).attr("id");
		id_list.push(id);
	});
	return id_list;	
}


//var id_list=new Array()
//$("input[name='ChooseOne']:checked").each(function() {
//               var id = $(this).attr("id");
//                id_list.push(id);
//})