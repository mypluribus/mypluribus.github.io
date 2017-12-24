if(!m6800){
	m6800 = {};
}
if(!m6800.instr){
	m6800.instr = {};
}
m6800.instr.jmp = {};
/*
 * BCC - Branch if C = 0
 */
m6800.instr.jmp['BCC'] = {
	name : 'BCC',
	logic : 'Branch if C = 0',
	modes : {
		'REL' : '24',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		if(!m6800.flags['C']){
			m6800.instr.scoot();
		}
	}
};
/*
 * BCS - Branch if C = 1
 */
m6800.instr.jmp['BCS'] = {
	name : 'BCS',
	logic : 'Branch if C = 1',
	modes : {
		'REL' : '25',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		if(m6800.flags['C']){
			m6800.instr.scoot();
		}
	}
};
/*
 * BEQ - Branch if Z = 1
 */
m6800.instr.jmp['BEQ'] = {
	name : 'BEQ',
	logic : 'Branch if Z = 1 ( == 0 )',
	modes : {
		'REL' : '27',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		if(m6800.flags['Z']){
			m6800.instr.scoot();
		}
	}
};
/*
 * BGE - Branch if N xor V = 0
 */
m6800.instr.jmp['BGE'] = {
	name : 'BGE',
	logic : 'Branch if N xor V = 0 ( >= 0 )',
	modes : {
		'REL' : '2C',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		// test high bit for 0 after xor
//		var d = m6800.xor(m6800.flags['N'], m6800.flags['V'], false);
//		if(!d[0]){
		if(m6800.flags['N'] == m6800.flags['V']){
			m6800.instr.scoot();
		}
	}
};
/*
 * BGT - Branch if Z or (N xor V) = 0
 */
m6800.instr.jmp['BGT'] = {
	name : 'BGT',
	logic : 'Branch if Z or (N xor V) = 0 ( > 0 )',
	modes : {
		'REL' : '2E',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		// if zero or high bit of xor(V, N) is zero
		if(m6800.flags['Z'] || (m6800.flags['N'] == m6800.flags['V'])){
			m6800.instr.scoot();
		}
	}
};
/*
 * BHI - Branch if C or Z = 0
 */
m6800.instr.jmp['BHI'] = {
	name : 'BHI',
	logic : 'Branch if Z or C = 0 (higher)',
	modes : {
		'REL' : '22',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		if(!(m6800.flags['C'] || m6800.flags['Z'])){
			m6800.instr.scoot();
		}
	}
};
/*
 * BLE - Branch if Z or (N xor V) = 1
 */
m6800.instr.jmp['BLE'] = {
	name : 'BLE',
	logic : 'Branch if Z or (N xor V) = 1 ( <= 0 )',
	modes : {
		'REL' : '2F',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		if(m6800.flags['Z'] || (m6800.flags['N'] != m6800.flags['V'])){
			m6800.instr.scoot();
		}
	}
};
/*
 * BLS - Branch if C or Z = 1
 */
m6800.instr.jmp['BLS'] = {
	name : 'BLS',
	logic : 'Branch if Z or C = 1 (less than or same)',
	modes : {
		'REL' : '23',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		if(m6800.flags['C'] || m6800.flags['Z']){
			m6800.instr.scoot();
		}
	}
};
/*
 * BLT - Branch if N xor V = 1
 */
m6800.instr.jmp['BLT'] = {
	name : 'BLT',
	logic : 'Branch if N xor V = 1 ( < 0 )',
	modes : {
		'REL' : '2D',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
//		var d = m6800.xor(m6800.flags['N'], m6800.flags['V'], false);
//		if(d[0]){
		if(m6800.flags['N'] != m6800.flags['V']){
			m6800.instr.scoot();
		}
	}
};
/*
 * BMI - Branch if N = 1
 */
m6800.instr.jmp['BMI'] = {
	name : 'BMI',
	logic : 'Branch if N = 1',
	modes : {
		'REL' : '2B',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		if(m6800.flags['N']){
			m6800.instr.scoot();
		}
	}
};
/*
 * BNE - Branch if Z = 0
 */
m6800.instr.jmp['BNE'] = {
	name : 'BNE',
	logic : 'Branch if Z = 0 ( != 0 )',
	modes : {
		'REL' : '26',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		if(!m6800.flags['Z']){
			m6800.instr.scoot();
		}
	}
};
/*
 * BPL - Branch if N = 0
 */
m6800.instr.jmp['BPL'] = {
	name : 'BPL',
	logic : 'Branch if N = 0',
	modes : {
		'REL' : '2A',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		if(m6800.flags['N']){
			m6800.instr.scoot();
		}
	}
};
/*
 * BRA - Branch Always
 */
m6800.instr.jmp['BRA'] = {
	name : 'BRA',
	logic : 'Branch Always',
	modes : {
		'REL' : '20',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		m6800.instr.scoot();
	}
};
/*
 * BSR - Branch to Subroutine
 */
m6800.instr.jmp['BSR'] = {
	name : 'BSR',
	logic : 'Branch to Subroutine',
	modes : {
		'REL' : '8D',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		m6800.instr.scoot();
	}
};
/*
 * BVC - Branch if V = 0
 */
m6800.instr.jmp['BVC'] = {
	name : 'BVC',
	logic : 'Branch if V = 0',
	modes : {
		'REL' : '28',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		if(!m6800.flags['N']){			
			m6800.instr.scoot();
		}
	}
};
/*
 * BVS - Branch if V = 1
 */
m6800.instr.jmp['BVS'] = {
	name : 'BVS',
	logic : 'Branch if V = 1',
	modes : {
		'REL' : '29',
		'INX' : '',
		'EXT' : '',
		'INH' : ''
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
		if(m6800.flags['V']){
			m6800.instr.scoot();
		}
	}
};
/*
 * JMP - Jump Always
 */
m6800.instr.jmp['JMP'] = {
	name : 'JMP',
	logic : 'Jump Always',
	modes : {
		'REL' : '',
		'INX' : '6E',
		'EXT' : '7E',
		'INH' : ''
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
		// do nothing here, as it was taken care of in the mode handler
	}
};
/*
 * JSR - Jump to Subroutine
 */
m6800.instr.jmp['JSR'] = {
	name : 'JSR',
	logic : 'Jump to Subroutine',
	modes : {
		'REL' : '',
		'INX' : 'AD',
		'EXT' : 'BD',
		'INH' : ''
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
		// do nothing here, as it was taken care of in the mode handler
	}
};
/*
 * NOP - PC + 1 -> PC
 */
m6800.instr.jmp['NOP'] = {
	name : 'NOP',
	logic : 'PC + 1 -> PC',
	modes : {
		'REL' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '01'
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
			// do nothing here, as putting the instruction in memory increments the PC
			//m6800.incPC();
	}
};
/*
 * SWI - Software Interrupt
 */
m6800.instr.jmp['SWI'] = {
	name : 'SWI',
	logic : 'Software Interrupt',
	modes : {
		'REL' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '3F'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'S',
		'N' : 'N',
		'Z' : 'N',
		'V' : 'N',
		'C' : 'N'
	},
	f : function(){
		var pc_l = {
			0 : m6800.program_counter[0],
			1 : m6800.program_counter[1],
			2 : m6800.program_counter[2],
			3 : m6800.program_counter[3],
			4 : m6800.program_counter[4],
			5 : m6800.program_counter[5],
			6 : m6800.program_counter[6],
			7 : m6800.program_counter[7],
		};
		var pc_h = {
				0 : m6800.program_counter[8],
				1 : m6800.program_counter[9],
				2 : m6800.program_counter[10],
				3 : m6800.program_counter[11],
				4 : m6800.program_counter[12],
				5 : m6800.program_counter[13],
				6 : m6800.program_counter[14],
				7 : m6800.program_counter[15],
		};
// set the low SP byte first
		m6800.setByte(pc_l, memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]);
		memory.set(m6800.stringify(m6800.reverse(pc_l)), m6800.stringify(m6800.reverse(m6800.stack_pointer)));
		m6800.decrement('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
// set the high SP byte second
		m6800.setByte(pc_h, memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]);
		memory.set(m6800.stringify(m6800.reverse(pc_h)), m6800.stringify(m6800.reverse(m6800.stack_pointer)));
		m6800.decrement('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
		var ir_l = {
				0 : m6800.index_register[0],
				1 : m6800.index_register[1],
				2 : m6800.index_register[2],
				3 : m6800.index_register[3],
				4 : m6800.index_register[4],
				5 : m6800.index_register[5],
				6 : m6800.index_register[6],
				7 : m6800.index_register[7],
			};
			var ir_h = {
				0 : m6800.index_register[8],
				1 : m6800.index_register[9],
				2 : m6800.index_register[10],
				3 : m6800.index_register[11],
				4 : m6800.index_register[12],
				5 : m6800.index_register[13],
				6 : m6800.index_register[14],
				7 : m6800.index_register[15],
			};
	// set the low IR byte third
			m6800.setByte(ir_l, memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]);
			memory.set(m6800.stringify(m6800.reverse(ir_l)), m6800.stringify(m6800.reverse(m6800.stack_pointer)));
			m6800.decrement('stack_pointer');
			m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
	// set the high IR byte fourth
			m6800.setByte(ir_h, memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]);
			memory.set(m6800.stringify(m6800.reverse(ir_h)), m6800.stringify(m6800.reverse(m6800.stack_pointer)));
			m6800.decrement('stack_pointer');
			m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
	// set the low accume_a byte fifth
			m6800.setByte(m6800.accume_a, memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]);
			memory.set(m6800.stringify(m6800.reverse(m6800.accume_a)), m6800.stringify(m6800.reverse(m6800.stack_pointer)));
			m6800.decrement('stack_pointer');
			m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
	// set the high accume_b byte fourth
			m6800.setByte(m6800.accume_b, memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]);
			memory.set(m6800.stringify(m6800.reverse(m6800.accume_b)), m6800.stringify(m6800.reverse(m6800.stack_pointer)));
			m6800.decrement('stack_pointer');
			m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
			memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))][0] = m6800.flags['C'];
			memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))][1] = m6800.flags['V'];
			memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))][2] = m6800.flags['Z'];
			memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))][3] = m6800.flags['N'];
			memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))][4] = m6800.flags['I'];
			memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))][5] = m6800.flags['H'];
			memory.set(m6800.stringify(m6800.reverse(memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))])), m6800.stringify(m6800.reverse(m6800.stack_pointer)));
			m6800.decrement('stack_pointer');
			m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
			m6800.flags['I'] = 1;
			m6800.ui.setFlag(m6800.flags, 'I');	
	}
};
/*
 * RTI - Return From Interrupt
 */
m6800.instr.jmp['RTI'] = {
	name : 'RTI',
	logic : 'Return from Interrupt',
	modes : {
		'REL' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '3B'
	},
	ccr : {	
		'H' : '12',
		'I' : '12',
		'N' : '12',
		'Z' : '12',
		'V' : '12',
		'C' : '12'
	},
	f : function(){
		m6800.increment('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))];
// return ccr
		m6800.flags['C'] = m[0];
		m6800.flags['V'] = m[1];
		m6800.flags['Z'] = m[2];
		m6800.flags['N'] = m[3];
		m6800.flags['I'] = m[4];
		m6800.flags['H'] = m[5];
		m6800.ui.setFlag(m6800.flags, 'C');	
		m6800.ui.setFlag(m6800.flags, 'V');	
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'N');	
		m6800.ui.setFlag(m6800.flags, 'I');	
		m6800.ui.setFlag(m6800.flags, 'H');
		m6800.increment('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
// return acccume_b
		m6800.setByte(memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))], m6800.accume_b);
		m6800.increment('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
// return acccume_a
		m6800.setByte(memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))], m6800.accume_a);
		m6800.increment('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
// return index register
		var str = m6800.stringify(m6800.reverse(memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]));
		m6800.increment('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
		str = str + m6800.stringify(m6800.reverse(memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]));
		m6800.increment('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
		m6800.setByte(m6800.objectify(str), m6800.index_register);
		m6800.ui.setByte(m6800.index_register, 'ul#index_register_list');
// return program counter
		str = m6800.stringify(m6800.reverse(memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]));
		m6800.increment('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
		str = str + m6800.stringify(m6800.reverse(memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]));
		m6800.setByte(m6800.objectify(str), m6800.program_counter);
		m6800.ui.setByte(m6800.program_counter, 'ul#program_counter_list');
	}
};
/*
 * RTS - Return from Subroutine
 */
m6800.instr.jmp['RTS'] = {
	name : 'RTS',
	logic : 'Return from Subroutine',
	modes : {
		'REL' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '39'
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
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))];
		var str = m6800.stringify(m6800.reverse(m));
		m6800.increment('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
		m = memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))];
		str = str + m6800.stringify(m6800.reverse(m));
		m6800.setByte(m6800.objectify(str), m6800.program_counter);
		m6800.ui.setByte(m6800.program_counter, "ul#program_counter_list");
	}
};
/*
 * scoot - as each of these instructions needs to compute differently based upon positive and negative values,
 * an attempt has been made to centralize and minimize the necessary placement of these lines.
 */
m6800.instr.scoot = function(){
	var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
	if(m[7]){
		// negative
		var d = m6800.subtract(m, m6800.program_counter);
		delete d[15];
		m6800.setByte(d, m6800.program_counter);
	}else{
		// positive
		m6800.add(m6800.program_counter, m, true);
	}
	m6800.ui.setByte(m6800.program_counter, "ul#program_counter_list");
};
/*
 * BLANK - LOGIC COMMENT HERE
 */
/*
m6800.instr.jmp['B'] = {
	name : 'B',
	logic : 'logic',
	modes : {
		'REL' : '',
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