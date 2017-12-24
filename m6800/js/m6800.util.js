m6800.util = {};
m6800.util.REL = function(op){
	if(jQuery('input#h_byte').val()){
		var b = jQuery('input#h_byte').val().toUpperCase(); 
		m6800.setByte(m6800.program_counter, m6800.address_bus);
		memory.put(m6800.util.hexToBin(b));
		m6800.setByte(memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))], m6800.data_bus);
		m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
		m6800.ui.setByte(m6800.data_bus, 'ul#data_bus_list');
	}else{
		alert('OK ... use the operand at ' + m6800.stringify(m6800.reverse(m6800.program_counter)));
		m6800.setByte(memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))], m6800.data_bus);
		m6800.increment('address_bus');
		m6800.setByte(m6800.address_bus, m6800.program_counter);
		m6800.decrement('address_bus');
		m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
		m6800.ui.setByte(m6800.data_bus, 'ul#data_bus_list');
	}
	m6800.instr[m6800.instr[op].type][m6800.instr[op].name].f();
	m6800.ui.cancelModal();
};
m6800.util.DIR = function(op){
	if(jQuery('input#h_byte').val()){
		var b = jQuery('input#h_byte').val().toUpperCase();
		m6800.setByte(m6800.program_counter, m6800.address_bus);
		m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
		memory.put(m6800.util.hexToBin(b));
	}else{
		alert('OK ... use the operand at ' + m6800.stringify(m6800.reverse(m6800.program_counter)));
		m6800.increment('address_bus');
		m6800.increment('program_counter');
		m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
		m6800.ui.setByte(m6800.program_counter, 'ul#program_counter_list');
	}
	var str = m6800.stringify(m6800.cero) + m6800.stringify(m6800.reverse(memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))]));
	m6800.setByte(m6800.objectify(str), m6800.address_bus);
	m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
	m6800.instr[m6800.instr[op].type][m6800.instr[op].name].f();
	m6800.ui.cancelModal();
};
m6800.util.EXT = function(op){
	var b = '';
	var str = '';
	if(jQuery('input#h_byte').val()){
		b = jQuery('input#h_byte').val().toUpperCase();
		str = m6800.stringify(m6800.reverse(m6800.util.hexToBin(b)));
		memory.put(m6800.util.hexToBin(b));
	}else{
		alert('OK ... use the operand at ' + m6800.stringify(m6800.reverse(m6800.program_counter)) + ' as the low order byte.');
		str = m6800.stringify(memory.q[m6800.stringify(m6800.reverse(m6800.program_counter))]);
		m6800.increment('program_counter');
	}
	
	if(jQuery('input#h_byte_2').val()){
		b = jQuery('input#h_byte_2').val().toUpperCase();
		str = str + m6800.stringify(m6800.reverse(m6800.util.hexToBin(b)));
		memory.put(m6800.util.hexToBin(b));
	}else{
		alert(' ... use the operand at ' + m6800.stringify(m6800.reverse(m6800.program_counter)) + ' as the high order byte.');
		str = str + m6800.stringify(memory.q[m6800.stringify(m6800.reverse(m6800.program_counter))]);
		m6800.increment('program_counter');
	}
	m6800.setByte(m6800.objectify(str), m6800.address_bus);
	m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
	switch(m6800.instr[op].name){
	case 'JSR':
		// need to stack the program counter
		var m_l = {
			0 : m6800.program_counter[0],
			1 : m6800.program_counter[1],
			2 : m6800.program_counter[2],
			3 : m6800.program_counter[3],
			4 : m6800.program_counter[4],
			5 : m6800.program_counter[5],
			6 : m6800.program_counter[6],
			7 : m6800.program_counter[7],
		};
		var m_h = {
			0 : m6800.program_counter[8],
			1 : m6800.program_counter[9],
			2 : m6800.program_counter[10],
			3 : m6800.program_counter[11],
			4 : m6800.program_counter[12],
			5 : m6800.program_counter[13],
			6 : m6800.program_counter[14],
			7 : m6800.program_counter[15],
		};
// set the low byte first
		m6800.setByte(m_l, memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]);
		memory.set(m6800.stringify(m6800.reverse(m_l)), m6800.stringify(m6800.reverse(m6800.stack_pointer)));
		m6800.decrement('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
// set the high byte second
		m6800.setByte(m_h, memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]);
		memory.set(m6800.stringify(m6800.reverse(m_h)), m6800.stringify(m6800.reverse(m6800.stack_pointer)));
		m6800.decrement('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
		// let it fall through and set the program counter
	case 'JMP':
		// need to position program counter now as it's harder to detect the addressing mode later
		m6800.setByte(m6800.address_bus, m6800.program_counter);
		m6800.ui.setByte(m6800.program_counter, "ul#program_counter_list");
		break;
	}
	m6800.instr[m6800.instr[op].type][m6800.instr[op].name].f();
	m6800.ui.cancelModal();
};
m6800.util.IMM = function(op){
	if(jQuery('input#h_byte').val()){
		var b = jQuery('input#h_byte').val().toUpperCase(); 
		m6800.setByte(m6800.program_counter, m6800.address_bus);
		memory.put(m6800.util.hexToBin(b));
		m6800.setByte(memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))], m6800.data_bus);
		m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
		m6800.ui.setByte(m6800.data_bus, 'ul#data_bus_list');
	}else{
		alert('OK ... use the operand at ' + m6800.stringify(m6800.reverse(m6800.program_counter)));
		m6800.setByte(memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))], m6800.data_bus);
		m6800.increment('address_bus');
		m6800.setByte(m6800.address_bus, m6800.program_counter);
		m6800.decrement('address_bus');
		m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
		m6800.ui.setByte(m6800.data_bus, 'ul#data_bus_list');
	}
	switch(m6800.instr[op].name){
	case 'LDX' :
	case 'LDS' :
	case 'CPX' :
		if(jQuery('input#h_byte_2').val()){
			var b2 = jQuery('input#h_byte_2').val().toUpperCase(); 
			memory.put(m6800.util.hexToBin(b2));
			m6800.setByte(memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))], m6800.data_bus);
			m6800.ui.setByte(m6800.data_bus, 'ul#data_bus_list');
		}else{
			alert('OK ... use the operand at ' + m6800.stringify(m6800.reverse(m6800.program_counter)));
			m6800.setByte(memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))], m6800.data_bus);
			m6800.increment('address_bus');
			m6800.setByte(m6800.address_bus, m6800.program_counter);
			m6800.decrement('address_bus');
			m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
			m6800.ui.setByte(m6800.data_bus, 'ul#data_bus_list');
		}		
		break;
	}
	m6800.instr[m6800.instr[op].type][m6800.instr[op].name].f();
	m6800.ui.cancelModal();
};
m6800.util.INX = function(op){
	var addr;
	if(jQuery('input#h_byte').val()){
		var b = jQuery('input#h_byte').val().toUpperCase();
		var c = m6800.util.hexToBin(b);
		addr = m6800.add(m6800.index_register,c, false);
		delete addr[m6800.count(m6800.index_register)];
		memory.put(c);
		m6800.setByte(addr, m6800.address_bus);
		m6800.setByte(memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))], m6800.data_bus);
		m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
		m6800.ui.setByte(m6800.data_bus, 'ul#data_bus_list');
	}else{
		alert('OK ... use the operand at ' + m6800.stringify(m6800.reverse(m6800.program_counter)));
		var c = memory.q[m6800.stringify(m6800.reverse(m6800.program_counter))];		
		addr = m6800.add(m6800.index_register,c, false);
		delete addr[m6800.count(m6800.index_register)];
		m6800.setByte(addr, m6800.address_bus);
		m6800.setByte(memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))], m6800.data_bus);
		m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
		m6800.ui.setByte(m6800.data_bus, 'ul#data_bus_list');
	}
	switch(m6800.instr[op].name){
	case 'JSR': //jump to subroutine
		// need to stack the program counter
		var m_l = {
			0 : m6800.program_counter[0],
			1 : m6800.program_counter[1],
			2 : m6800.program_counter[2],
			3 : m6800.program_counter[3],
			4 : m6800.program_counter[4],
			5 : m6800.program_counter[5],
			6 : m6800.program_counter[6],
			7 : m6800.program_counter[7],
		};
		var m_h = {
			0 : m6800.program_counter[8],
			1 : m6800.program_counter[9],
			2 : m6800.program_counter[10],
			3 : m6800.program_counter[11],
			4 : m6800.program_counter[12],
			5 : m6800.program_counter[13],
			6 : m6800.program_counter[14],
			7 : m6800.program_counter[15],
		};
// set the low byte first
		m6800.setByte(m_l, memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]);
		memory.set(m6800.stringify(m6800.reverse(m_l)), m6800.stringify(m6800.reverse(m6800.stack_pointer)));
		m6800.decrement('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
// set the high byte second
		m6800.setByte(m_h, memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]);
		memory.set(m6800.stringify(m6800.reverse(m_h)), m6800.stringify(m6800.reverse(m6800.stack_pointer)));
		m6800.decrement('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
		// let it fall through and set the program counter
	case 'JMP': // jump
		// need to position program counter now as it's harder to detect the addressing mode later
		m6800.setByte(m6800.address_bus, m6800.program_counter);
		m6800.ui.setByte(m6800.program_counter, "ul#program_counter_list");
		break;
	}
	m6800.instr[m6800.instr[op].type][m6800.instr[op].name].f();
	m6800.ui.cancelModal();
};
m6800.util.instr = function(op){
	var f = ''; // the function to be called
	var html = ''; // html used for user input
	var fire = 1;
//place instruction in memory ... increments address_bus and updates UI
//	memory.put(m6800.reverse(m6800.util.hexToBin(op)));
	memory.put(m6800.util.hexToBin(op));
	switch(m6800.instr[op].mode){
	case 'REL':
		// RELATIVE -- contents of next address == signed offset to operand
		html = '<div class="message"><div class="instruction">' + m6800.instr[op].name + '<span class="name">(' + m6800.instr[op].mode + ')</span></div>';
		html = html + 'Enter the 1 byte signed hex operand (-125 to +129) to be used as the offset from the address of the next instruction:</div>';
		html = html + '<input type="text" id="h_byte" class="hex_byte" name="byte" maxlength="2" value="">';
		html = html + '<span class="button">';
		html = html + '<input type="button" id="submit_byte" name="submit_byte" value="Fire!" onclick="';
// submit function is called here
		html = html + 'm6800.util.REL(\'' + op + '\')';
// end submit function
		html = html + '"></span>';
		m6800.ui.modal(html, function(){});
// function not fired as user input is required
		fire = 0;
		break;
	case 'DIR':
		//DIRECT -- contents of next address == low byte of address of operand
		html = '<div class="message"><div class="instruction">' + m6800.instr[op].name + '<span class="name">(' + m6800.instr[op].mode + ')</span></div>';
		html = html + 'Enter the 1 byte hex operand (equal or less than 255) to be used as the low order byte of the memory location of the operand:</div>';
		html = html + '<input type="text" id="h_byte" class="hex_byte" name="byte" maxlength="2" value="">';
		html = html + '<span class="button">';
		html = html + '<input type="button" id="submit_byte" name="submit_byte" value="Fire!" onclick="';
// submit function is called here
		html = html + 'm6800.util.DIR(\'' + op + '\')';
// end submit function	
		html = html + '"></span>';
		m6800.ui.modal(html, function(){});
// function not fired as user input is required
		fire = 0;
		break;
	case 'EXT':
		// EXTENDED -- contents of next TWO addresses == low and high bytes of  address of operand
		html = '<div class="message"><div class="instruction">' + m6800.instr[op].name + '<span class="name">(' + m6800.instr[op].mode + ')</span></div>';
		html = html + 'Enter the 2 byte hex operand to be combined as the low & high order bytes of the memory location of the operand:';
		html = html + '<span class="alert">Be careful, you only have ' + m6800.count(memory.q) + ' memory addresses NOT ' + Math.pow(2, 16) + '</span></div>';
		html = html + '<input type="text" id="h_byte" class="hex_byte" name="byte" maxlength="2" value="">';
		html = html + '<input type="text" id="h_byte_2" class="hex_byte" name="byte_2" maxlength="2" value="">';
		html = html + '<span class="button">';
		html = html + '<input type="button" id="submit_byte" name="submit_byte" value="Fire!" onclick="';
// submit function is called here
		html = html + 'm6800.util.EXT(\'' + op + '\')';
// end submit function	
		html = html + '"></span>';
		m6800.ui.modal(html, function(){});
// function not fired as user input is required
		fire = 0;
		break;
	case 'IMM':
		// IMMEDIATE -- contents of next address == operand
		var h = '';
		html = '<div class="message"><div class="instruction">' + m6800.instr[op].name + '<span class="name">(' + m6800.instr[op].mode + ')</span></div>';
		switch(m6800.instr[op].name){
		case 'LDX':
		case 'LDS':
		case 'CPX':
			html = html + 'Enter the two, 1 byte hex operands to be placed in memory:</div>';
			h = '<input type="text" id="h_byte_2" class="hex_byte" name="byte_2" maxlength="2" value="">';
			break;
		default:
			html = html + 'Enter the 1 byte hex operand to be placed in memory:</div>';
			break;
		}
		html = html + '<input type="text" id="h_byte" class="hex_byte" name="byte" maxlength="2" value="">' + h;
		html = html + '<span class="button">';
		html = html + '<input type="button" id="submit_byte" name="submit_byte" value="Fire!" onclick="';
// submit function is called here
		html = html + 'm6800.util.IMM(\'' + op + '\')';
// end submit function	
		html = html + '"></span>';
		m6800.ui.modal(html, function(){});
// function not fired as user input is required
		fire = 0;
		break;
	case 'INX':
		// INDEXED -- address of operand == contents of index register + offset <= 255
		html = '<div class="message"><div class="instruction">' + m6800.instr[op].name + '<span class="name">(' + m6800.instr[op].mode + ')</span></div>';
		html = html + 'Enter the 1 byte hex operand (equal or less than 255) to be added to the index register; used as the address of the operand:</div>';
		html = html + '<input type="text" id="h_byte" class="hex_byte" name="byte" maxlength="2" value="">';
		html = html + '<span class="button">';
		html = html + '<input type="button" id="submit_byte" name="submit_byte" value="Fire!" onclick="';
// submit function is called here
		html = html + 'm6800.util.INX(\'' + op + '\')';
// end submit function	
		html = html + '"></span>';
		m6800.ui.modal(html, function(){});
		// function not fired as user input is required
		fire = 0;
		break;
	case 'INH':
		// INHERENT -- address of operand included in instruction
		m6800.setByte(m6800.program_counter, m6800.address_bus);
		m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
		break;
	}

	if(fire){
		m6800.instr[m6800.instr[op].type][m6800.instr[op].name].f();
	}
};
/*
 * binToHex - take 8 bit binary object, spit out hex string
 */
m6800.util.binToHex = function(a){
	var h1 = '';
	var h2 = '';
	var i = 0;
	b = {
		'0000' : '0',
		'0001' : '1',
		'0010' : '2',
		'0011' : '3',
		'0100' : '4',
		'0101' : '5',
		'0110' : '6',
		'0111' : '7',
		'1000' : '8',
		'1001' : '9',
		'1010' : 'A',
		'1011' : 'B',
		'1100' : 'C',
		'1101' : 'D',
		'1110' : 'E',
		'1111' : 'F'
	};
	var ct = m6800.count(a);
	for(i; i < parseInt(ct/2); i++){
		h1 = h1 + a[i];
		h2 = h2 + a[i + parseInt(ct/2)];
	}
	var str = '' + b[h1] + b[h2]; 
	alert(str);
	return str;
};
/*
 * hexToBin - take hex string, spit out binary object
 */
m6800.util.hexToBin = function(a){
	if(a.length < 2){
		a = '0' + a;
	}
	b = {
		0 : '0000',
		1 : '0001',
		2 : '0010',
		3 : '0011',
		4 : '0100',
		5 : '0101',
		6 : '0110',
		7 : '0111',
		8 : '1000',
		9 : '1001',
		A : '1010',
		B : '1011',
		C : '1100',
		D : '1101',
		E : '1110',
		F : '1111'		
	};
	var d = '';
	for(var v in a){
		d = d + b[a[v]];
	}
	var obj = {};
	for(var w in d){
		obj[w] = parseInt(d[w]);
	}
	return m6800.reverse(obj);
};