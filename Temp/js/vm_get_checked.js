function vm_get_checked(){
	var id_list=new Array()
	//add name vmlist to list part,to remove title part checkbox from the id list
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