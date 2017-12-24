memory = {};
memory.init = function(count){
	var i = 0;
	for(i; i < count; i++){ // make 128 memory addresses
//		memory.put(m6800.accume_a);
//		m6800.increment('accume_a');
		memory.put(m6800.cero);
		if(i > 0){
			m6800.increment('stack_pointer');			
		}
	}
	i = 0;
	for(i; i < count; i++){
//		m6800.decrement('address_bus');
		m6800.decrement('program_counter');
	}
	m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
//	m6800.ui.setByte(m6800.address_bus, "ul#address_bus_list");
	m6800.ui.setByte(m6800.address_bus, "ul#program_counter_list");
	m6800.ui.setByte(m6800.address_bus, "ul#stack_pointer_list");
};
/*
 * putMemory - add a byte to memory located at the address in the address bus
 */
memory.put = function(byte){
	var append = 0;
/*
	if(!memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))]){
		memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))] = {};		
		append = 1;
	}
	m6800.setByte(byte, memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))]);
	html = '<tr id="' + m6800.stringify(m6800.reverse(m6800.address_bus)) + '">';
	html = html + '<td class="name">' + m6800.stringify(m6800.reverse(m6800.address_bus)) + '</td>';
	html = html + '<td class="value">' + m6800.stringify(m6800.reverse(memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))])) + '</td></tr>';
*/
	if(!memory.q[m6800.stringify(m6800.reverse(m6800.program_counter))]){
		memory.q[m6800.stringify(m6800.reverse(m6800.program_counter))] = {};		
		append = 1;
	}
	m6800.setByte(byte, memory.q[m6800.stringify(m6800.reverse(m6800.program_counter))]);
	html = '<tr id="' + m6800.stringify(m6800.reverse(m6800.program_counter)) + '">';
	html = html + '<td class="name">' + m6800.stringify(m6800.reverse(m6800.program_counter)) + '</td>';
	html = html + '<td class="value">' + m6800.stringify(m6800.reverse(memory.q[m6800.stringify(m6800.reverse(m6800.program_counter))])) + '</td></tr>';

	if(append){
		memory.append(html);
	}else{
		//find memory in table list
//		jQuery('table#memory_list > tbody > tr#' + m6800.stringify(m6800.reverse(m6800.address_bus)) + ' > td.value').text(m6800.stringify(m6800.reverse(byte)));
		jQuery('table#memory_list > tbody > tr#' + m6800.stringify(m6800.reverse(m6800.program_counter)) + ' > td.value').text(m6800.stringify(m6800.reverse(byte)));
	}
//	m6800.increment('address_bus');
//	m6800.ui.setByte(m6800.address_bus, "ul#address_bus_list");
	m6800.increment('program_counter');
	m6800.ui.setByte(m6800.program_counter, "ul#program_counter_list");

//	m6800.incPC();
};
/*
 * stack for keeping all the memory values
 */
memory.q = {};
memory.append = function(html){
//	var table = document.getElementById('#memory_list');
	var table = jQuery('table#memory_list');
	var tbody = table.find('tbody');
//	alert(tbody);
	if(tbody.children().length < 1){
		h = '<div class="title">Memory</div>';
		h = h + '<table id="memory_list">';
		h = h + '<colgroup class="addr">';
		h = h + '<colgroup class="contents">';
		h = h + '<thead><tr><th>Address</th><th>Contents</th></tr></thead>';
		h = h + '<tbody>';
		h = h + html;
		h = h + '</tbody></table>';
		jQuery("#memory").html(h);
	}else{
		tbody.append(html);
	}
};
/*
 * set .. place given value (as string) in given spot
 */
memory.set = function(value, spot){
	jQuery('table#memory_list > tbody > tr#' + spot + ' > td.value').text(value);
};
/*
 * show all memory as a table
 */
memory.showAll = function(){
	html = '<div class="title">Memory</div>';
	html = html + '<table id="memory_list">';
	html = html + '<colgroup class="addr">';
	html = html + '<colgroup class="contents">';
	html = html + '<thead><tr><th>Address</th><th>Contents</th></tr></thead>';
	for(var v in memory.q){
		html = html + '<tr id="' + v + '"><td class="name">' + v + '</td><td class="value">' + m6800.stringify(m6800.reverse(memory.q[v])) + '</td></tr>';
	}
	html = html + '</tbody></table>';
	jQuery("#memory").html(html);
};