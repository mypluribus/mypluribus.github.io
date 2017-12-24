if(!m6800){
	m6800 = {};
}
if(!m6800.instr){
	m6800.instr = {};
}
m6800.instr.sp = {};
/*
 * CPX - (IR_h/IR_l) - (M/M + 1)
 */
m6800.instr.sp['CPX'] = {
	name : 'CPX',
	logic : '( IR_h / IR_l ) - ( M / M + 1 )',
	modes : {
		'IMM' : '8C',
		'DIR' : '9C',
		'INX' : 'AC',
		'EXT' : 'BC',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : '7',
		'Z' : 'T',
		'V' : '8',
		'C' : 'N'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var str = m6800.stringify(m6800.reverse(m));
		m6800.increment('address_bus');
		m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
		m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		str = str + m6800.stringify(m6800.reverse(m));
//		var d = m6800.subtract(m6800.reverse(m6800.objectify(str)), m6800.index_register);
		var d = m6800.subtract(m6800.objectify(str), m6800.index_register);
		if(d[16]['V']){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;				
		}
		delete d[16];
		if(m6800.eq(m6800.cero, d)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;				
		}
		if(d[15]){
			m6800.flags['N'] = 1;				
		}else{
			m6800.flags['N'] = 0;				
		}
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'V');
	}
};
/*
 * DES - SP - 1 -> SP
 */
m6800.instr.sp['DES'] = {
	name : 'DES',
	logic : 'SP - 1 -> SP',	
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '34'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'N',
		'Z' : 'N',
		'V' : 'N',
		'C' : 'N'
	},
	f :	function(){
			m6800.decrement('stack_pointer');
			m6800.ui.setByte(m6800.stack_pointer, 'ul#stack_pointer_list');
	}
};
/*
 * DEX - IR - 1 -> IR
 */
m6800.instr.sp['DEX'] = {
	name : 'DEX',
	logic : 'IR - 1 -> IR',	
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '09'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'N',
		'Z' : 'T',
		'V' : 'N',
		'C' : 'N'
	},
	f :	function(){
			m6800.decrement('index_register');
			if(m6800.eq(m6800.cero, m6800.index_register)){
				m6800.flags['Z'] = 1;
			}else{
				m6800.flags['Z'] = 0;				
			}
			m6800.ui.setFlag(m6800.flags, 'Z');
			m6800.ui.setByte(m6800.index_register, 'ul#index_register_list');
	}
};
/*
 * LDS - M -> SP_h ... (M + 1) -> SP_l
 */
m6800.instr.sp['LDS'] = {
	name : 'LDS',
	logic : 'M -> SP_h ... (M + 1) -> SP_l',
	modes : {
		'IMM' : '8E',
		'DIR' : '9E',
		'INX' : 'AE',
		'EXT' : 'BE',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : '9',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'N'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var str = m6800.stringify(m6800.reverse(m));
		m6800.increment('address_bus');
		m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
		m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		str = str + m6800.stringify(m6800.reverse(m));
		m6800.setByte(m6800.objectify(str), m6800.stack_pointer);
		m6800.flags['V'] = 1;
		if(m6800.eq(m6800.cero, m6800.stack_pointer)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;			
		}
		if(m6800.stack_pointer[15]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setByte(m6800.stack_pointer, 'ul#stack_pointer_list');
	}
};
/*
 * LDX - M -> IR_h ... (M + 1) -> IR_l
 */
m6800.instr.sp['LDX'] = {
	name : 'LDX',
	logic : 'M -> IR_h ... (M + 1) -> IR_l',
	modes : {
		'IMM' : 'CE',
		'DIR' : 'DE',
		'INX' : 'EE',
		'EXT' : 'FE',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : '9',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'N'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var str = m6800.stringify(m6800.reverse(m));
		m6800.increment('address_bus');
		m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
		m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		str = str + m6800.stringify(m6800.reverse(m));
		m6800.setByte(m6800.objectify(str), m6800.index_register);
		m6800.flags['V'] = 1;
		if(m6800.eq(m6800.cero, m6800.index_register)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;			
		}
		if(m6800.index_register[15]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setByte(m6800.index_register, 'ul#index_register_list');
	}
};
/*
 * INS - SP + 1 -> SP
 */
m6800.instr.sp['INS'] = {
	name : 'INS',
	logic : 'SP + 1 -> SP',	
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '31'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'N',
		'Z' : 'N',
		'V' : 'N',
		'C' : 'N'
	},
	f : function(){ 
			m6800.increment('stack_pointer');
			m6800.ui.setByte(m6800.stack_pointer, 'ul#stack_pointer_list');
	}
};
/*
 * INX - IR + 1 -> IR
 */
m6800.instr.sp['INX'] = {
	name : 'INX',
	logic : 'IR + 1 -> IR',	
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '08'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'N',
		'Z' : 'T',
		'V' : 'N',
		'C' : 'N'
	},
	f :	function(){
			m6800.increment('index_register');
			if(m6800.eq(m6800.cero, m6800.index_register)){
				m6800.flags['Z'] = 1;
			}else{
				m6800.flags['Z'] = 0;				
			}
			m6800.ui.setFlag(m6800.flags, 'Z');
			m6800.ui.setByte(m6800.index_register, 'ul#index_register_list');
	}
};
/*
 * STS - IR_h -> M ... IR_l -> (M + 1)
 */
m6800.instr.sp['STS'] = {
	name : 'STS',
	logic : 'SP_h -> M ... SP_l -> (M + 1)',
	modes : {
		'IMM' : '',
		'DIR' : '9F',
		'INX' : 'AF',
		'EXT' : 'BF',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : '9',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'N'
	},
	f : function(){
		var SP_l = {
			0 : m6800.stack_pointer[0],
			1 : m6800.stack_pointer[1],
			2 : m6800.stack_pointer[2],
			3 : m6800.stack_pointer[3],
			4 : m6800.stack_pointer[4],
			5 : m6800.stack_pointer[5],
			6 : m6800.stack_pointer[6],
			7 : m6800.stack_pointer[7],
		};
		var SP_h = {
			0 : m6800.stack_pointer[8],
			1 : m6800.stack_pointer[9],
			2 : m6800.stack_pointer[10],
			3 : m6800.stack_pointer[11],
			4 : m6800.stack_pointer[12],
			5 : m6800.stack_pointer[13],
			6 : m6800.stack_pointer[14],
			7 : m6800.stack_pointer[15],
		};
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		m6800.setByte(SP_h, m);
		memory.set(m6800.stringify(m6800.reverse(SP_h)), m6800.stringify(m6800.reverse(m6800.address_bus)));
		m6800.increment('address_bus');
		m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
		m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		m6800.setByte(SP_l, m);
		memory.set(m6800.stringify(m6800.reverse(SP_l)), m6800.stringify(m6800.reverse(m6800.address_bus)));
		m6800.flags['V'] = 1;
		if(m6800.eq(m6800.cero, m6800.stack_pointer)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;			
		}
		if(m6800.stack_pointer[15]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setByte(m6800.stack_pointer, 'ul#stack_pointer_list');
	}
};
/*
 * STX - IR_h -> M ... IR_l -> (M + 1)
 */
m6800.instr.sp['STX'] = {
	name : 'STX',
	logic : 'IR_h -> M ... IR_l -> (M + 1)',
	modes : {
		'IMM' : '',
		'DIR' : 'DF',
		'INX' : 'EF',
		'EXT' : 'FF',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : '9',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'N'
	},
	f : function(){
		var IR_l = {
			0 : m6800.index_register[0],
			1 : m6800.index_register[1],
			2 : m6800.index_register[2],
			3 : m6800.index_register[3],
			4 : m6800.index_register[4],
			5 : m6800.index_register[5],
			6 : m6800.index_register[6],
			7 : m6800.index_register[7],
		};
		var IR_h = {
			0 : m6800.index_register[8],
			1 : m6800.index_register[9],
			2 : m6800.index_register[10],
			3 : m6800.index_register[11],
			4 : m6800.index_register[12],
			5 : m6800.index_register[13],
			6 : m6800.index_register[14],
			7 : m6800.index_register[15],
		};
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		m6800.setByte(IR_h, m);
		memory.set(m6800.stringify(m6800.reverse(IR_h)), m6800.stringify(m6800.reverse(m6800.address_bus)));
		m6800.increment('address_bus');
		m6800.ui.setByte(m6800.address_bus, 'ul#address_bus_list');
		m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		m6800.setByte(IR_l, m);
		memory.set(m6800.stringify(m6800.reverse(IR_l)), m6800.stringify(m6800.reverse(m6800.address_bus)));
		m6800.flags['V'] = 1;
		if(m6800.eq(m6800.cero, m6800.index_register)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;			
		}
		if(m6800.index_register[15]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setByte(m6800.index_register, 'ul#index_register_list');
	}
};
/*
 * TSX - SP + 1 -> IR
 */
m6800.instr.sp['TSX'] = {
	name : 'TSX',
	logic : 'SP + 1 -> IR',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '30'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'N',
		'Z' : 'N',
		'V' : 'N',
		'C' : 'N'
	},
	f : function(){
		m6800.setByte(m6800.stack_pointer, m6800.index_register);
		m6800.increment('index_register');
		m6800.ui.setByte(m6800.index_register, 'ul#index_register_list');
	}
};
/*
 * TXS - IR - 1 -> SP
 */
m6800.instr.sp['TXS'] = {
	name : 'TXS',
	logic : 'IR - 1 -> SP',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '35'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'N',
		'Z' : 'N',
		'V' : 'N',
		'C' : 'N'
	},
	f : function(){
		m6800.setByte(m6800.index_register, m6800.stack_pointer);
		m6800.decrement('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, 'ul#stack_pointer_list');
	}
};
/*
 * BLANK - LOGIC COMMENT HERE
 */
/*
m6800.instr.sp['B'] = {
	name : 'B',
	logic : 'logic',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
	},
	ccr : {	
		'H' : 'T',
		'I' : 'T',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : 'T'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		alert('place instruction logic here');
	}
};
*/