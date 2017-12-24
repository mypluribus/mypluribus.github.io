m6800.ui = {};
m6800.ui.init = function(){
	m6800.ui.setAll();
	m6800.ui.notes.ccr_legend.f();
	m6800.ui.notes.ccr.f();
	m6800.ui.instr.ccr.f();
	m6800.ui.instr.jmp.f();
	m6800.ui.instr.sp.f();
	m6800.ui.instr.al.f();
	var html = '<div class="title">m6800 Simulator</div>';
	html = html + '<div class="body">This simulation imitates the instruction set of Motorola\'s flagship m6800 microprocessor.  ';
	html = html + 'Instructions may be entered into memory by clicking the opcodes listed at right.  ';
	html = html + 'You may also be interested in the <a href="https://mypluribus.github.io/2017/12/22/m6800.html">Wiki</a>.</div>';
	jQuery('#text').html(html);
};
m6800.ui.modal = function(html, callback){
//	var maskHeight = '100%';
//	var maskWidth = '100%';

		var $mask = $('<div id="mask"/>');
		var $modal = $('<div id="modal"/>');
		
//		jQuery('#instructions').append($mask);
//		jQuery('#instructions').append($modal);
		jQuery('#m6800').append($mask);
		jQuery('#m6800').append($modal);

// create transparent background
		$mask.css({
//			'width':maskHeight,
//			'height':maskWidth,
			'opacity':0.7,
		});
//		jQuery('#instructions').css({
//			'overflow' : 'hidden'
//		});
//		$mask.fadeIn(750);		
		$modal.css({
//			'position':'absolute',
//			'top': 0,
//			'left': 0,
//			'opacity':0.9,
			'opacity':1,
			backgroundColor:"#eee"
		});
		$mask.slideToggle(450, function(){
			$modal.html(html);
			$modal.fadeIn(450, function(){
				jQuery('input:text:first').focus();
				callback();
			});
		});
};
m6800.ui.cancelModal = function(){
	jQuery('#modal').html("");
	jQuery('#modal').fadeOut(450, function(){
		jQuery('#mask').slideToggle(450, function(){
			jQuery('#mask').remove();
			jQuery('#modal').remove();
		});
		jQuery('#instructions').css({
			'overflow' : 'auto'
		});
	});
};
m6800.ui.setAll = function(){
//busses & registers
	m6800.ui.setByte(m6800.data_bus, 'ul#data_bus_list');
	m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
	m6800.ui.setByte(m6800.accume_a, 'ul#accume_a_list');
	m6800.ui.setByte(m6800.accume_b, 'ul#accume_b_list');
	m6800.ui.setByte(m6800.index_register, 'ul#index_register_list');
	m6800.ui.setByte(m6800.stack_pointer, 'ul#stack_pointer_list');
	m6800.ui.setByte(m6800.program_counter, 'ul#program_counter_list');
//Condition Code Register
	m6800.ui.setFlag(m6800.flags, 'H');
	m6800.ui.setFlag(m6800.flags, 'I');
	m6800.ui.setFlag(m6800.flags, 'N');
	m6800.ui.setFlag(m6800.flags, 'Z');
	m6800.ui.setFlag(m6800.flags, 'V');
	m6800.ui.setFlag(m6800.flags, 'C');
//Bus control	
	m6800.ui.setFlag(m6800.bus_control, 'IRQ');
	m6800.ui.setFlag(m6800.bus_control, 'R_W');
	m6800.ui.setFlag(m6800.bus_control, 'CMA');
//Processor Control
	m6800.ui.setFlag(m6800.processor_control, 'DBE');
	m6800.ui.setFlag(m6800.processor_control, 'TSC');
	m6800.ui.setFlag(m6800.processor_control, 'Halt');
	m6800.ui.setFlag(m6800.processor_control, 'NMI');
	m6800.ui.setFlag(m6800.processor_control, 'BA');
	m6800.ui.setFlag(m6800.processor_control, 'Reset');
};
m6800.ui.setByte = function(bits, target){
	jQuery(jQuery(target).children().get().reverse()).each(function(index){
		jQuery(this).text(bits[index]);
	});
};
m6800.ui.setFlag = function(bits, target){
	jQuery('#' + target + ' > #value').html('' + bits[target] + '');	
};

m6800.ui.instr = {};
/*
 * output arithmetic & logic instructions
 */
m6800.ui.instr.al = {
		id : 'artithmetic',
		title : 'Arithmetic & Logic Operations',
		colgroup : {
			1 : 'op',
			2 : 'imm',
			3 : 'dir',
			4 : 'inx',
			5 : 'ext',
			6 : 'inh',
			7 : 'logic',
			8 : 'h',
			9 : 'i',
			10 : 'n',
			11 : 'z',
			12 : 'v',
			13 : 'c'
		},
		thead : { 
			1 : {
				1 : {span : 13, text : 'Arithmetic & Logic Operations', id : 'title'},
			},
			2 : {
				1 : {span : 1, text : '', id : 'empty'},
				2 : {span : 5, text : 'Addressing Modes', id : ''},
				3 : {span : 1, text : '', id : 'empty'},
				4 : {span : 6, text : 'CCR', id : ''}
			},
			3 : {
				1 : {span : 1, text : 'Operation', id : 'op'},
				2 : {span : 1, text : 'IMM', id : 'imm'},
				3 : {span : 1, text : 'DIR', id : 'dir'},
				4 : {span : 1, text : 'INX', id : 'inx'},		
				5 : {span : 1, text : 'EXT', id : 'ext'},
				6 : {span : 1, text : 'INH', id : 'inh'},
				7 : {span : 1, text : 'Boolean/Arithmetic Operation', id : 'logic'},
				8 : {span : 1, text : 'H', id : 'h'},
				9 : {span : 1, text : 'I', id : 'i'},
				10 : {span : 1, text : 'N', id : 'n'},
				11 : {span : 1, text : 'Z', id : 'z'},
				12 : {span : 1, text : 'V', id : 'v'},
				13 : {span : 1, text : 'C', id : 'c'}
			}
		},
		f : function(){
			m6800.ui.instr_table(this, m6800.instr.al);
		}
};
/*
 * output stack pointer & index register instructions
 */
m6800.ui.instr.sp = {
		id : 'index_stack',
		title : 'Index Register & Stack Operations',
		colgroup : {
			1 : 'op',
			2 : 'imm',
			3 : 'dir',
			4 : 'inx',
			5 : 'ext',
			6 : 'inh',
			7 : 'logic',
			8 : 'h',
			9 : 'i',
			10 : 'n',
			11 : 'z',
			12 : 'v',
			13 : 'c'
		},
		thead : { 
			1 : {
				1 : {span : 13, text : 'Index Register & Stack Pointer Operations', id : 'title'},
			},
			2 : {
				1 : {span : 1, text : '', id : 'empty'},
				2 : {span : 5, text : 'Addressing Modes', id : ''},
				3 : {span : 1, text : '', id : 'empty'},
				4 : {span : 6, text : 'CCR', id : ''}
			},
			3 : {
				1 : {span : 1, text : 'Operation', id : 'op'},
				2 : {span : 1, text : 'IMM', id : 'imm'},
				3 : {span : 1, text : 'DIR', id : 'dir'},
				4 : {span : 1, text : 'INX', id : 'inx'},		
				5 : {span : 1, text : 'EXT', id : 'ext'},
				6 : {span : 1, text : 'INH', id : 'inh'},
				7 : {span : 1, text : 'Boolean/Arithmetic Operation', id : 'logic'},
				8 : {span : 1, text : 'H', id : 'h'},
				9 : {span : 1, text : 'I', id : 'i'},
				10 : {span : 1, text : 'N', id : 'n'},
				11 : {span : 1, text : 'Z', id : 'z'},
				12 : {span : 1, text : 'V', id : 'v'},
				13 : {span : 1, text : 'C', id : 'c'}
			}
		},
		f : function(){
			m6800.ui.instr_table(this, m6800.instr.sp);
		}
};
/*
 * output jump & branch instructions
 */
m6800.ui.instr.jmp = {
		id : 'jump_branch',
		title : 'Jump & Branch Operations',
		colgroup : {
			1 : 'op',
			2 : 'rel',
			3 : 'inx',
			4 : 'ext',
			5 : 'inh',
			6 : 'logic',
			7 : 'h',
			8 : 'i',
			9 : 'n',
			10 : 'z',
			11 : 'v',
			12 : 'c'
		},
		thead : { 
			1 : {
				1 : {span : 12, text : 'Jump & Branch Operations', id : 'title'},
			},
			2 : {
				1 : {span : 1, text : '', id : 'empty'},
				2 : {span : 4, text : 'Addressing Modes', id : ''},
				3 : {span : 1, text : '', id : 'empty'},
				4 : {span : 6, text : 'CCR', id : ''}
			},
			3 : {
				1 : {span : 1, text : 'Operation', id : 'op'},
				2 : {span : 1, text : 'REL', id : 'rel'},
				3 : {span : 1, text : 'INX', id : 'inx'},		
				4 : {span : 1, text : 'EXT', id : 'ext'},
				5 : {span : 1, text : 'INH', id : 'inh'},
				6 : {span : 1, text : 'Branch Test', id : 'logic'},
				7 : {span : 1, text : 'H', id : 'h'},
				8 : {span : 1, text : 'I', id : 'i'},
				9 : {span : 1, text : 'N', id : 'n'},
				10 : {span : 1, text : 'Z', id : 'z'},
				11 : {span : 1, text : 'V', id : 'v'},
				12 : {span : 1, text : 'C', id : 'c'}
			}
		},
		f : function(){
			m6800.ui.instr_table(this, m6800.instr.jmp);
		}
	};
/*
 * output condition code register instructions
 */
m6800.ui.instr.ccr = {
		id : 'ccr',
		title : 'Condition Code Register Operations',
		colgroup : {
			1 : 'op',
			2 : 'inh',
			3 : 'logic',
			4 : 'h',
			5 : 'i',
			6 : 'n',
			7 : 'z',
			8 : 'v',
			9 : 'c'
		},
		thead : { 
			1 : {
				1 : {span : 9, text : 'Condition Code Register Operations', id : 'title'},
			},
			2 : {
				1 : {span : 1, text : '', id : 'empty'},
				2 : {span : 1, text : 'Addressing Modes', id : ''},
				3 : {span : 1, text : '', id : 'empty'},
				4 : {span : 6, text : 'CCR', id : ''}
			},
			3 : {
				1 : {span : 1, text : 'Operation', id : 'op'},
				5 : {span : 1, text : 'INH', id : 'inh'},
				6 : {span : 1, text : 'Boolean Operation', id : 'logic'},
				7 : {span : 1, text : 'H', id : 'h'},
				8 : {span : 1, text : 'I', id : 'i'},
				9 : {span : 1, text : 'N', id : 'n'},
				10 : {span : 1, text : 'Z', id : 'z'},
				11 : {span : 1, text : 'V', id : 'v'},
				12 : {span : 1, text : 'C', id : 'c'}
			}
		},
		f : function(){
			m6800.ui.instr_table(this, m6800.instr.ccr);
		}
};
m6800.ui.notes = {};
/*
 * output of CCR legend
 */
m6800.ui.notes.ccr_legend = {
		id : 'ccr_legend',
		title : 'Condition Code Legend',
		colgroup : {
			1 : 'code',
			2 : 'instr'
		},
		thead : {
			1 : {
				1 : {span : 2, text : 'Condition Code Register Legend', id : 'title'},
			},
			2 : {
				1 : {span : 1, text : 'Code', id : ''},
				2 : {span : 1, text : 'Instruction', id : ''}
			}
		},
			
		tbody : {
			1 : {
				1 : {span : 1, text : 'N', id : ''},
				2 : {span : 1, text : 'Not Affected', id : ''}
			},
			2 : {
				1 : {span : 1, text : 'T', id : ''},
				2 : {span : 1, text : 'Test and set if true, cleared otherwise', id : ''}
			},
			3 : {
				1 : {span : 1, text : 'R', id : ''},
				2 : {span : 1, text : 'Reset Always (flag = 0)', id : ''}
			},
			4 : {
				1 : {span : 1, text : 'S', id : ''},
				2 : {span : 1, text : 'Set Always (flag = 1)', id : ''}
			},
		},
		f : function(){
			m6800.ui.table(this);
		}
};
/*
 * output of condition code register notes
 */
m6800.ui.notes.ccr = {
		id : 'ccr_notes',
		title : 'Condition Code Register Notes',
		colgroup : {
			1 : 'hash',
			2 : 'bit',
			3 : 'logic',
		},
		thead : {
			1 : {
				1 : {span : 3, text : 'Condition Code Register Notes', id : 'title'},
			},
			2 : {
				1 : {span : 1, text : '#', id : ''},
				2 : {span : 1, text : 'Bit', id : ''},
				3 : {span : 1, text : 'Logic', id : ''}
			}
		},
		tbody : {
			1 : {
				1 : {span : 1, text : '1', id : ''},
				2 : {span : 1, text : 'V', id : ''},
				3 : {span : 1, text : 'Test: result = 10000000?', id : ''},
			},
			2 : {
				1 : {span : 1, text : '2', id : ''},
				2 : {span : 1, text : 'C', id : ''},
				3 : {span : 1, text : 'Test: result = 00000000?', id : ''},
			},			
			3 : {
				1 : {span : 1, text : '3', id : ''},
				2 : {span : 1, text : 'C', id : ''},
				3 : {span : 1, text : 'Test: Decimal value of most significant BCD character greater than nine (not cleared if previously set)', id : ''},
			},			
			4 : {
				1 : {span : 1, text : '4', id : ''},
				2 : {span : 1, text : 'V', id : ''},
				3 : {span : 1, text : 'Test: operand = 10000000 prior to execution?', id : ''},
			},
			5 : {
				1 : {span : 1, text : '5', id : ''},
				2 : {span : 1, text : 'V', id : ''},
				3 : {span : 1, text : 'Test: operand = 01111111 prior to execution?', id : ''},
			},
			6 : {
				1 : {span : 1, text : '6', id : ''},
				2 : {span : 1, text : 'V', id : ''},
				3 : {span : 1, text : 'Test: Set equal to result of N XOR C after shift has occurred', id : ''},
			},			
			7 : {
				1 : {span : 1, text : '7', id : ''},
				2 : {span : 1, text : 'N', id : ''},
				3 : {span : 1, text : 'Test: Sign bit of most significant (MS) byte of result = 1?', id : ''},
			},
			8 : {
				1 : {span : 1, text : '8', id : ''},
				2 : {span : 1, text : 'V', id : ''},
				3 : {span : 1, text : 'Test: 2\'s compliment overflow from subtraction of LS bytes?', id : ''},
			},
			9 : {
				1 : {span : 1, text : '9', id : ''},
				2 : {span : 1, text : 'N', id : ''},
				3 : {span : 1, text : 'Test: result = less than zero? (bit 15 = 1)', id : ''},
			},
			10 : {
				1 : {span : 1, text : '10', id : ''},
				2 : {span : 1, text : 'ALL', id : ''},
				3 : {span : 1, text : 'Load condition code register from stack (special operations)', id : ''},
			},
			11 : {
				1 : {span : 1, text : '11', id : ''},
				2 : {span : 1, text : 'Bit 1', id : ''},
				3 : {span : 1, text : 'Set when interrupt occurs. If previously set, a Non-Maskable Interrupt is required to exit the wait state', id : ''},
			},
			12 : {
				1 : {span : 1, text : '12', id : ''},
				2 : {span : 1, text : 'ALL', id : ''},
				3 : {span : 1, text : 'Set according to the contents of Accumulator A', id : ''},
			},
		},
		f : function(){
			m6800.ui.table(this);
		}
};
/*
 * simple table builder FOR INSTRUCTIONS
 */
m6800.ui.instr_table = function(obj, data){
	html = '<table id="' + obj.id + '">';
//column groups
	for(var v in obj.colgroup){
		html = html + '<colgroup class="' + obj.colgroup[v] + '"></colgroup>';
	}
//<thead>
	html = html + '<thead>';

	for(var h in obj.thead){
		html = html + '<tr>';
		for(var i in obj.thead[h]){
			html = html + '<th colspan="' + obj.thead[h][i].span + '" id="' + obj.thead[h][i].id + '">' + obj.thead[h][i].text + '</th>';		
		}
		html = html + '</tr>';
	}
	html = html + '</thead>';
//<tbody>
	html = html + '<tbody>';
	for(var i in data){
		html = html + '<tr>';
		html = html + '<td class="op">' + data[i].name + '</td>';
		for(var j in data[i].modes){
			html = html + '<td>';
			if(data[i].modes[j]){
//				html = html + '<a href="#" onClick="m6800.util.instr(\'' + i + '\', \'' + data[i].modes[j] + '\')">' + data[i].modes[j] + '</a>';
				html = html + '<a href="#" onClick="m6800.util.instr(\'' + data[i].modes[j] + '\'); return false;">' + data[i].modes[j] + '</a>';
			}
			html = html + '</td>';
		}
		html = html + '<td>' + data[i].logic + '</td>';
		for(var k in data[i].ccr){
			html = html + '<td>' + data[i].ccr[k] + '</td>';			
		}
		html = html + '</tr>';		
	}
	html = html + '</tbody>';
	html = html + '</table>';
	jQuery("#instructions").prepend(html);	
};
/*
 * simple table builder FOR GENERIC TABLES
 */
m6800.ui.table = function(obj){
	html = '<table id="' + obj.id + '">';
//column groups
	for(var v in obj.colgroup){
		html = html + '<colgroup class="' + obj.colgroup[v] + '"></colgroup>';
	}
//<thead>
	html = html + '<thead>';

	for(var h in obj.thead){
		html = html + '<tr>';
		for(var i in obj.thead[h]){
			html = html + '<th colspan="' + obj.thead[h][i].span + '" id="' + obj.thead[h][i].id + '">' + obj.thead[h][i].text + '</th>';		
		}
		html = html + '</tr>';
	}
	html = html + '</thead>';
//<tbody>
	html = html + '<tbody>';
	for(var j in obj.tbody){
		html = html + '<tr>';
		for(var k in obj.tbody[j]){
			html = html + '<td colspan="' + obj.tbody[j][k].span + '" id="' + obj.tbody[j][k].id + '">' + obj.tbody[j][k].text + '</td>';		
		}
		html = html + '</tr>';		
	}
	html = html + '</tbody>';
	html = html + '</table>';
	jQuery("#instructions").prepend(html);	
};
