if(!m6800){
	m6800 = {};
}
/*
if(!m6800.instr){
	m6800.instr = {};
}
*/
m6800.instr.al = {};
/*
 * ABA - A + B -> A
 */
m6800.instr.al['ABA'] = {
	name : 'ABA',
	logic : 'A + B -> A',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '1B'
	},
	ccr : {	
		'H' : 'T',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : 'T'
	},
	f : function(){
			m6800.add(m6800.accume_a, m6800.accume_b, true);
			m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
			m6800.ui.setFlag(m6800.flags, 'H');
			m6800.ui.setFlag(m6800.flags, 'N');	
			m6800.ui.setFlag(m6800.flags, 'Z');	
			m6800.ui.setFlag(m6800.flags, 'V');	
			m6800.ui.setFlag(m6800.flags, 'C');
	}
};
/*
 * ADCA - A + M + C -> A
 */
m6800.instr.al['ADCA'] = {
	name : 'ADCA',
	logic : 'A + M + C -> A',
	modes : {
		'IMM' : '89',
		'DIR' : '99',
		'INX' : 'A9',
		'EXT' : 'B9',
		'INH' : ''
	},
	ccr : {	
		'H' : 'T',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : 'T'
	},
	f: function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		if(m6800.flags['C']){
			m6800.add(m6800.accume_a, m6800.add(m6800.uno, m, false), true);
		}else{
			m6800.add(m6800.accume_a, m, true);
		}
		m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
		m6800.ui.setFlag(m6800.flags, 'C');
		m6800.ui.setFlag(m6800.flags, 'H');
		m6800.ui.setFlag(m6800.flags, 'N');	
		m6800.ui.setFlag(m6800.flags, 'Z');	
		m6800.ui.setFlag(m6800.flags, 'V');
	}
};
/*
 * ADCB - B + M + C -> B
 */
m6800.instr.al['ADCB'] = {
	name : 'ADCB',
	logic : 'B + M + C -> B',
	modes : {
		'IMM' : 'C9',
		'DIR' : 'D9',
		'INX' : 'E9',
		'EXT' : 'F9',
		'INH' : ''
	},
	ccr : {	
		'H' : 'T',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : 'T'
	},
	f: function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		if(m6800.flags['C']){
			m6800.add(m6800.accume_b, m6800.add(m6800.uno, m, false), true);
		}else{
			m6800.add(m6800.accume_b, m, true);
		}
		m6800.ui.setByte(m6800.accume_b, "ul#accume_b_list");
		m6800.ui.setFlag(m6800.flags, 'C');
		m6800.ui.setFlag(m6800.flags, 'H');
		m6800.ui.setFlag(m6800.flags, 'N');	
		m6800.ui.setFlag(m6800.flags, 'Z');	
		m6800.ui.setFlag(m6800.flags, 'V');
	}
};
/*
 * ADDA - A + M -> M
 */
m6800.instr.al['ADDA'] = {
	name : 'ADDA',
	logic : 'A + M -> A',
	modes : {
		'IMM' : '8B',
		'DIR' : '9B',
		'INX' : 'AB',
		'EXT' : 'BB',
		'INH' : ''
	},
	ccr : {	
		'H' : 'T',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : 'T'
	},
	f : function(addr){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		m6800.add(m6800.accume_a, m, true);
		m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
		m6800.ui.setFlag(m6800.flags, 'C');
		m6800.ui.setFlag(m6800.flags, 'H');
		m6800.ui.setFlag(m6800.flags, 'N');	
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');	
	}
};
/*
 * ADDB - B + M -> M
 */
m6800.instr.al['ADDB'] = {
	name : 'ADDB',
	logic : 'B + M -> B',
	modes : {
		'IMM' : 'CB',
		'DIR' : 'DB',
		'INX' : 'EB',
		'EXT' : 'FB',
		'INH' : ''
	},
	ccr : {	
		'H' : 'T',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : 'T'
	},
	f: function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		m6800.add(m6800.accume_b, m, true);
		m6800.ui.setByte(m6800.accume_b, "ul#accume_b_list");
		m6800.ui.setFlag(m6800.flags, 'C');
		m6800.ui.setFlag(m6800.flags, 'H');
		m6800.ui.setFlag(m6800.flags, 'N');	
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');	
	}
};
/*
 * ANDA - A & M -> A
 */
m6800.instr.al['ANDA'] = {
	name : 'ANDA',
	logic : 'A & M -> A',
	modes : {
		'IMM' : '84',
		'DIR' : '94',
		'INX' : 'A4',
		'EXT' : 'B4',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'T'
	},
	f: function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		m6800.and(m6800.accume_a, m, true);
		m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
		m6800.ui.setFlag(m6800.flags, 'N');	
		m6800.ui.setFlag(m6800.flags, 'Z');
	}
};
/*
 * ANDB - B & M -> B
 */
m6800.instr.al['ANDB'] = {
	name : 'ANDB',
	logic : 'B & M -> B',
	modes : {
		'IMM' : 'C4',
		'DIR' : 'D4',
		'INX' : 'E4',
		'EXT' : 'F4',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'T'
	},
	f: function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		m6800.and(m6800.accume_b, m, true);
		m6800.ui.setByte(m6800.accume_b, "ul#accume_b_list");
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
	}
};
/*
 * ASL - Arithmetic Shift Left : M
 */
m6800.instr.al['ASL'] = {
	name : 'ASL',
	logic : 'Arithmetic Shift Left : M',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '68',
		'EXT' : '78',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '6',
		'C' : 'T'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var b = {};
		b[0] = 0;
		b[1] = m[0];
		b[2] = m[1];
		b[3] = m[2];
		b[4] = m[3];
		b[5] = m[4];
		b[6] = m[5];
		b[7] = m[6];
		m6800.flags['C'] = m[7];
		m6800.ui.setFlag(m6800.flags, 'C');	
		var v = m6800.xor(m6800.flags['N'], m6800.flags['C'], false);
		if(v[0]){
			m6800.flags['V'] = 1;			
		}else{
			m6800.flags['V'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'V');
		if(m6800.eq(m6800.cero, b)){
			m6800.flags['Z'] = 1;			
		}else{
			m6800.flags['Z'] = 0;						
		}
		if(b[7]){
			m6800.flags['N'] = 1;			
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.setByte(b, m);
		memory.set(m6800.stringify(m6800.reverse(m)), m6800.stringify(m6800.reverse(m6800.address_bus)));
	}
};
/*
 * ASLA - Arithmetic Shift Left : A
 */
m6800.instr.al['ASLA'] = {
	name : 'ASLA',
	logic : 'Arithmetic Shift Left : A',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '48'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '6',
		'C' : 'T'
	},
	f : function(){
		var b = {};
		b[0] = 0;
		b[1] = m6800.accume_a[0];
		b[2] = m6800.accume_a[1];
		b[3] = m6800.accume_a[2];
		b[4] = m6800.accume_a[3];
		b[5] = m6800.accume_a[4];
		b[6] = m6800.accume_a[5];
		b[7] = m6800.accume_a[6];
		m6800.flags['C'] = m6800.accume_a[7];
		m6800.ui.setFlag(m6800.flags, 'C');	
		var v = m6800.xor(m6800.flags['N'], m6800.flags['C'], false);
		if(v[0]){
			m6800.flags['V'] = 1;			
		}else{
			m6800.flags['V'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'V');
		if(m6800.eq(m6800.cero, b)){
			m6800.flags['Z'] = 1;			
		}else{
			m6800.flags['Z'] = 0;						
		}
		if(b[7]){
			m6800.flags['N'] = 1;			
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.setByte(b, m6800.accume_a);
		m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
	}
};
/*
 * ASLB - Arithmetic Shift Left : B
 */
m6800.instr.al['ASLB'] = {
	name : 'ASLB',
	logic : 'Arithmetic Shift Left : B',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '58'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '6',
		'C' : 'T'
	},
	f : function(){
		var b = {};
		b[0] = 0;
		b[1] = m6800.accume_b[0];
		b[2] = m6800.accume_b[1];
		b[3] = m6800.accume_b[2];
		b[4] = m6800.accume_b[3];
		b[5] = m6800.accume_b[4];
		b[6] = m6800.accume_b[5];
		b[7] = m6800.accume_b[6];
		m6800.flags['C'] = m6800.accume_b[7];
		m6800.ui.setFlag(m6800.flags, 'C');	
		var v = m6800.xor(m6800.flags['N'], m6800.flags['C'], false);
		if(v[0]){
			m6800.flags['V'] = 1;			
		}else{
			m6800.flags['V'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'V');
		if(m6800.eq(m6800.cero, b)){
			m6800.flags['Z'] = 1;			
		}else{
			m6800.flags['Z'] = 0;						
		}
		if(b[7]){
			m6800.flags['N'] = 1;			
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.setByte(b, m6800.accume_b);
		m6800.ui.setByte(m6800.accume_b, "ul#accume_b_list");
	}
};
/*
 * BITA - A & M
 */
m6800.instr.al['BITA'] = {
	name : 'BITA',
	logic : 'A & M',
	modes : {
		'IMM' : '85',
		'DIR' : '95',
		'INX' : 'A5',
		'EXT' : 'B5',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'T'
	},
	f: function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var a = m6800.and(m6800.accume_a, m, false);
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
	}
};
/*
 * BITB - B & M
 */
m6800.instr.al['BITB'] = {
	name : 'BITB',
	logic : 'B & M',
	modes : {
		'IMM' : 'C5',
		'DIR' : 'D5',
		'INX' : 'E5',
		'EXT' : 'F5',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'T'
	},
	f: function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var b = m6800.and(m6800.accume_b, m, false);
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
	}
};
/*
 * CBA - A - B
 */
m6800.instr.al['CBA'] = {
	name : 'CBA',
	logic : 'A - B',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '11'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : 'T'
	},
	f: function(){
		var d = m6800.subtract(m6800.accume_b, m6800.accume_a);
		if(d[8]['Z']){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(d[7]){
			m6800.flags['N'] = 1;
		}else{		
			m6800.flags['N'] = 0;
		}
		if((m6800.accume_a[7] != m6800.accume_b[7]) && d[7] != m6800.accume_a[7]){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;		
		}
		if(d[8]['C']){
			m6800.flags['C'] = 1;		
		}else{
			m6800.flags['C'] = 0;		
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setFlag(m6800.flags, 'C');
	}
};
/*
 * CLR - 00 -> M
 */
m6800.instr.al['CLR'] = {
	name : 'CLR',
	logic : '00 -> M',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '6F',
		'EXT' : '7F',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'R',
		'Z' : 'S',
		'V' : 'R',
		'C' : 'R'
	},
	f: function(){
		m6800.setByte(m6800.cero, memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))]);
		memory.set(m6800.stringify(m6800.cero), m6800.stringify(m6800.reverse(m6800.address_bus)));
		m6800.flags['N'] = 0;
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.flags['V'] = 0;
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.flags['C'] = 0;
		m6800.ui.setFlag(m6800.flags, 'C');
		m6800.flags['Z'] = 1;
		m6800.ui.setFlag(m6800.flags, 'Z');
	}
};
/*
 * CLRA - 00 -> A
 */
m6800.instr.al['CLRA'] = {
	name : 'CLRA',
	logic : '00 -> A',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '4F'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'R',
		'Z' : 'S',
		'V' : 'R',
		'C' : 'R'
	},
	f : function(){
			m6800.setByte(m6800.cero, m6800.accume_a);
			m6800.flags['N'] = 0;
			m6800.ui.setFlag(m6800.flags, 'N');
			m6800.flags['V'] = 0;
			m6800.ui.setFlag(m6800.flags, 'V');
			m6800.flags['C'] = 0;
			m6800.ui.setFlag(m6800.flags, 'C');
			m6800.flags['Z'] = 1;
			m6800.ui.setFlag(m6800.flags, 'Z');
			m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
	}
};
/*
 * CLRB - 00 -> B
 */
m6800.instr.al['CLRB'] = {
	name : 'CLRB',
	logic : '00 -> B',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '5F'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'R',
		'Z' : 'S',
		'V' : 'R',
		'C' : 'R'
	},
	f : function(){			
			m6800.setByte(m6800.cero, m6800.accume_b);
			m6800.flags['N'] = 0;
			m6800.ui.setFlag(m6800.flags, 'N');
			m6800.flags['V'] = 0;
			m6800.ui.setFlag(m6800.flags, 'V');
			m6800.flags['C'] = 0;
			m6800.ui.setFlag(m6800.flags, 'C');
			m6800.flags['Z'] = 1;
			m6800.ui.setFlag(m6800.flags, 'Z');
			m6800.ui.setByte(m6800.accume_b, "ul#accume_b_list");
	}
};
/*
 * CMPA - A - M
 */
m6800.instr.al['CMPA'] = {
	name : 'CMPA',
	logic : 'A - M',
	modes : {
		'IMM' : '81',
		'DIR' : '91',
		'INX' : 'A1',
		'EXT' : 'B1',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : 'T'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var d = m6800.subtract(m, m6800.accume_a);
		if(d[8]['Z']){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(d[7]){
			m6800.flags['N'] = 1;
		}else{		
			m6800.flags['N'] = 0;
		}
		if((m6800.accume_a[7] != m[7]) && d[7] != m6800.accume_a[7]){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;		
		}
		if(d[8]['C']){
			m6800.flags['C'] = 1;		
		}else{
			m6800.flags['C'] = 0;		
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setFlag(m6800.flags, 'C');
	}
};
/*
 * CMPB - B - M
 */
m6800.instr.al['CMPB'] = {
	name : 'CMPB',
	logic : 'B - M',
	modes : {
		'IMM' : 'C1',
		'DIR' : 'D1',
		'INX' : 'E1',
		'EXT' : 'F1',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : 'T'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var d = m6800.subtract(m, m6800.accume_b);
		if(d[8]['Z']){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(d[7]){
			m6800.flags['N'] = 1;
		}else{		
			m6800.flags['N'] = 0;
		}
		if((m6800.accume_b[7] != m[7]) && d[7] != m6800.accume_b[7]){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;		
		}
		if(d[8]['C']){
			m6800.flags['C'] = 1;		
		}else{
			m6800.flags['C'] = 0;		
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setFlag(m6800.flags, 'C');
	}
};
/*
 * COM - compliment(M) -> M
 */
m6800.instr.al['COM'] = {
	name : 'COM',
	logic : 'compliment(M) -> M',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '63',
		'EXT' : '73',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'S'
	},
	f: function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var cm = m6800.compliment(m);
		m6800.setByte(cm, m);
		memory.set(m6800.stringify(m6800.reverse(cm)), m6800.stringify(m6800.reverse(m6800.address_bus)));
		if(m6800.eq(cm, m6800.cero)){
			m6800.flags['Z'] = 1;		
		}else{
			m6800.flags['Z'] = 0;		
		}
		if(cm[7]){
			m6800.flags['N'] = 1;
		}else{		
			m6800.flags['N'] = 0;
		}
		m6800.flags['C'] = 1;
		m6800.flags['V'] = 0;
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'C');
		m6800.ui.setFlag(m6800.flags, 'V');
	}
};
/*
 * COMA - compliment(A) -> B
 */
m6800.instr.al['COMA'] = {
	name : 'COMA',
	logic : 'compliment(A) -> A',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '43'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'S'
	},
	f: function(){
		var ca = m6800.compliment(m6800.accume_a);
		m6800.setByte(ca, m6800.accume_a);
		if(m6800.eq(ca, m6800.cero)){
			m6800.flags['Z'] = 1;		
		}else{
			m6800.flags['Z'] = 0;		
		}
		if(ca[7]){
			m6800.flags['N'] = 1;
		}else{		
			m6800.flags['N'] = 0;
		}
		m6800.flags['C'] = 1;
		m6800.flags['V'] = 0;
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'C');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
	}
};
/*
 * COMB - compliment(B) -> B
 */
m6800.instr.al['COMB'] = {
	name : 'COMB',
	logic : 'compliment(B) -> B',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '53'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'S'
	},
	f: function(){
		var cb = m6800.compliment(m6800.accume_b);
		m6800.setByte(cb, m6800.accume_b);
		if(m6800.eq(cb, m6800.cero)){
			m6800.flags['Z'] = 1;		
		}else{
			m6800.flags['Z'] = 0;		
		}
		if(cb[7]){
			m6800.flags['N'] = 1;
		}else{		
			m6800.flags['N'] = 0;
		}
		m6800.flags['C'] = 1;
		m6800.flags['V'] = 0;
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'C');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setByte(m6800.accume_b, "ul#accume_b_list");
	}
};
/*
 * DAA - Converts binary add of BCD characters into BCD format
 */
m6800.instr.al['DAA'] = {
	name : 'DAA',
	logic : 'Converts binary add of BCD characters into BCD format',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '19'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : '3'
	},
	f : function(){
		alert('just fired DAA');
	}
};
/*
 * DEC - M - 1 -> M
 */
m6800.instr.al['DEC'] = {
	name : 'DEC',
	logic : 'M - 1 -> M',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '6A',
		'EXT' : '7A',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '4',
		'C' : 'N'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		if(m6800.eq(m, m6800.ciento_veintiocho)){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;
		}
		if(m[0]){
			m[0] = 0;
		}else{
			var d = m6800.subtract(m6800.uno, m, false);
			delete d[m6800.count(m)];
			m6800.setByte(d, m);		
		}
		if(m6800.eq(m6800.cero, m)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(m[7]){
			m6800.flags['N'] = 1;
		}else{		
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		memory.set(m6800.stringify(m6800.reverse(m)), m6800.stringify(m6800.reverse(m6800.address_bus)));
	}
};
/*
 * DECA - A - 1 -> A
 */
m6800.instr.al['DECA'] = {
	name : 'DECA',
	logic : 'A - 1 -> A',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '4A'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '4',
		'C' : 'N'
	},
	f : function(){
		if(m6800.eq(m6800.accume_a, m6800.ciento_veintiocho)){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;
		}
		m6800.decrement('accume_a');
		m6800.ui.setByte(m6800.accume_a, 'ul#accume_a_list');
		if(m6800.eq(m6800.cero, m6800.accume_a)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(m6800.accume_a[7]){
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
 * DECB - B - 1 -> B
 */
m6800.instr.al['DECB'] = {
	name : 'DECB',
	logic : 'B - 1 -> B',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '5A'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '4',
		'C' : 'N'
	},
	f : function(){
		if(m6800.eq(m6800.accume_a, m6800.ciento_veintiocho)){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;
		}
		m6800.decrement('accume_a');
		m6800.ui.setByte(m6800.accume_a, 'ul#accume_a_list');
		if(m6800.eq(m6800.cero, m6800.accume_a)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(m6800.accume_a[7]){
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
 * EORA - A xor M -> A
 */
m6800.instr.al['EORA'] = {
	name : 'EORA',
	logic : 'A xor M -> A',
	modes : {
		'IMM' : '88',
		'DIR' : '98',
		'INX' : 'A8',
		'EXT' : 'B8',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'N'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		m6800.xor(m6800.accume_a, m, true);
		m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
		m6800.ui.setFlag(m6800.flags, 'V');	
		m6800.ui.setFlag(m6800.flags, 'N');	
		m6800.ui.setFlag(m6800.flags, 'Z');
	}
};
/*
 * EORB - B xor M -> B
 */
m6800.instr.al['EORB'] = {
	name : 'EORB',
	logic : 'B xor M -> B',
	modes : {
		'IMM' : 'C8',
		'DIR' : 'D8',
		'INX' : 'E8',
		'EXT' : 'F8',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'N'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		m6800.xor(m6800.accume_b, m, true);
		m6800.ui.setByte(m6800.accume_b, "ul#accume_a_list");
		m6800.ui.setFlag(m6800.flags, 'V');	
		m6800.ui.setFlag(m6800.flags, 'N');	
		m6800.ui.setFlag(m6800.flags, 'Z');
	}
};
/*
 * INC - M + 1 -> M
 */
m6800.instr.al['INC'] = {
	name : 'INC',
	logic : 'M + 1 -> M',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '6C',
		'EXT' : '7C',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '5',
		'C' : 'N'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		if(m6800.eq(m, m6800.ciento_veintisiete)){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;
		}
		var d = m6800.add(m6800.uno, m, false);
		delete d[m6800.count(m)];
		m6800.setByte(d, m);
		if(m6800.eq(m6800.cero, m)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(m[7]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		memory.set(m6800.stringify(m6800.reverse(m)), m6800.stringify(m6800.reverse(m6800.address_bus)));
	}
};
/*
 * INCA - A + 1 -> A
 */
m6800.instr.al['INCA'] = {
	name : 'INCA',
	logic : 'A + 1 -> A',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '4C'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '5',
		'C' : 'N'
	},
	f : function(){
		if(m6800.eq(m6800.accume_a, m6800.ciento_veintisiete)){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;
		}
		m6800.increment('accume_a');
		m6800.ui.setByte(m6800.accume_a, 'ul#accume_a_list');
		if(m6800.eq(m6800.cero, m6800.accume_a)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(m6800.accume_a[7]){
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
 * INCB - B + 1 -> B
 */
m6800.instr.al['INCB'] = {
	name : 'INCB',
	logic : 'B + 1 -> B',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '5C'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '5',
		'C' : 'N'
	},
	f : function(){
		if(m6800.eq(m6800.accume_b, m6800.ciento_veintisiete)){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;
		}
		m6800.increment('accume_b');
		m6800.ui.setByte(m6800.accume_b, 'ul#accume_b_list');
		if(m6800.eq(m6800.cero, m6800.accume_b)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(m6800.accume_b[7]){
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
 * LDAA - M  -> A
 */
m6800.instr.al['LDAA'] = {
	name : 'LDAA',
	logic : 'M -> A',
	modes : {
		'IMM' : '86',
		'DIR' : '96',
		'INX' : 'A6',
		'EXT' : 'B6',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'N'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		if(m6800.eq(m6800.cero, m)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(m[7]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.setByte(m, m6800.accume_a);
		m6800.ui.setByte(m6800.accume_a, 'ul#accume_a_list');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'N');
	}
};
/*
 * LDAB - M  -> B
 */
m6800.instr.al['LDAB'] = {
	name : 'LDAB',
	logic : 'M -> B',
	modes : {
		'IMM' : 'C6',
		'DIR' : 'D6',
		'INX' : 'E6',
		'EXT' : 'F6',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'N'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		if(m6800.eq(m6800.cero, m)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(m[7]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.setByte(m, m6800.accume_b);
		m6800.ui.setByte(m6800.accume_b, 'ul#accume_b_list');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'N');
	}
};
/*
 * LSR - Logic Shift Left : M
 */
m6800.instr.al['LSR'] = {
	name : 'LSR',
	logic : 'Logic Shift Left : M',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '64',
		'EXT' : '74',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '6',
		'C' : 'T'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var b = {};
		b[7] = 0;
		b[6] = m[7];
		b[5] = m[6];
		b[4] = m[5];
		b[3] = m[4];
		b[2] = m[3];
		b[1] = m[2];
		b[0] = m[1];
		m6800.flags['C'] = m[0];
		m6800.ui.setFlag(m6800.flags, 'C');
		var v = m6800.xor(m6800.flags['N'], m6800.flags['C'], false);
		if(v[0]){
			m6800.flags['V'] = 1;			
		}else{
			m6800.flags['V'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'V');
		if(m6800.eq(m6800.cero, b)){
			m6800.flags['Z'] = 1;			
		}else{
			m6800.flags['Z'] = 0;						
		}
		if(b[7]){
			m6800.flags['N'] = 1;			
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.setByte(b, m);
		memory.set(m6800.stringify(m6800.reverse(m)), m6800.stringify(m6800.reverse(m6800.address_bus)));
	}
};
/*
 * LSRA - Logic Shift Left : A
 */
m6800.instr.al['LSRA'] = {
	name : 'LSRA',
	logic : 'Logic Shift Left : A',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '44'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '6',
		'C' : 'T'
	},
	f : function(){
		var b = {};
		b[7] = 0;
		b[6] = m6800.accume_a[7];
		b[5] = m6800.accume_a[6];
		b[4] = m6800.accume_a[5];
		b[3] = m6800.accume_a[4];
		b[2] = m6800.accume_a[3];
		b[1] = m6800.accume_a[2];
		b[0] = m6800.accume_a[1];
		m6800.flags['C'] = m6800.accume_a[0];
		m6800.ui.setFlag(m6800.flags, 'C');	
		var v = m6800.xor(m6800.flags['N'], m6800.flags['C'], false);
		if(v[0]){
			m6800.flags['V'] = 1;			
		}else{
			m6800.flags['V'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'V');
		if(m6800.eq(m6800.cero, b)){
			m6800.flags['Z'] = 1;			
		}else{
			m6800.flags['Z'] = 0;						
		}
		if(b[7]){
			m6800.flags['N'] = 1;			
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.setByte(b, m6800.accume_a);
		m6800.ui.setByte(m6800.accume_a, 'ul#accume_a_list');
	}
};
/*
 * LSRB - Logic Shift Left : B
 */
m6800.instr.al['LSRB'] = {
	name : 'LSRB',
	logic : 'Logic Shift Left : B',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '54'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '6',
		'C' : 'T'
	},
	f : function(){
		var b = {};
		b[7] = 0;
		b[6] = m6800.accume_b[7];
		b[5] = m6800.accume_b[6];
		b[4] = m6800.accume_b[5];
		b[3] = m6800.accume_b[4];
		b[2] = m6800.accume_b[3];
		b[1] = m6800.accume_b[2];
		b[0] = m6800.accume_b[1];
		m6800.flags['C'] = m6800.accume_b[0];
		m6800.ui.setFlag(m6800.flags, 'C');	
		var v = m6800.xor(m6800.flags['N'], m6800.flags['C'], false);
		if(v[0]){
			m6800.flags['V'] = 1;			
		}else{
			m6800.flags['V'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'V');
		if(m6800.eq(m6800.cero, b)){
			m6800.flags['Z'] = 1;			
		}else{
			m6800.flags['Z'] = 0;						
		}
		if(b[7]){
			m6800.flags['N'] = 1;			
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.setByte(b, m6800.accume_b);
		m6800.ui.setByte(m6800.accume_b, 'ul#accume_b_list');
	}
};
/*
 * NEG - 00 - M -> M
 */
m6800.instr.al['NEG'] = {
	name : 'NEG',
	logic : '00 - M -> M',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '60',
		'EXT' : '70',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '1',
		'C' : '2'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var d = m6800.subtract(m, m6800.cero, false);
		delete d[m6800.count(m)];
		m6800.setByte(d, m);
		if(m6800.eq(m6800.cero, m)){
			m6800.flags['Z'] = 1;
			m6800.flags['C'] = 1;
		}else{
			m6800.flags['Z'] = 0;
			m6800.flags['C'] = 0;
		}
		if(m[7]){
			m6800.flags['N'] = 1;
		}else{		
			m6800.flags['N'] = 0;
		}
		if(m6800.eq(m6800.ciento_veintiocho, m)){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setFlag(m6800.flags, 'C');
	}
};
/*
 * NEGA - 00 - A -> A
 */
m6800.instr.al['NEGA'] = {
	name : 'NEGA',
	logic : '00 - A -> A',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '40'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '1',
		'C' : '2'
	},
	f : function(){
		var d = m6800.subtract(m6800.accume_a, m6800.cero, false);
		delete d[m6800.count(m6800.accume_a)];
		m6800.setByte(d, m6800.accume_a);
		if(m6800.eq(m6800.cero, m6800.accume_a)){
			m6800.flags['Z'] = 1;
			m6800.flags['C'] = 1;
		}else{
			m6800.flags['Z'] = 0;
			m6800.flags['C'] = 0;
		}
		if(m6800.accume_a[7]){
			m6800.flags['N'] = 1;
		}else{		
			m6800.flags['N'] = 0;
		}
		if(m6800.eq(m6800.accume_a, m6800.ciento_veintiocho)){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setFlag(m6800.flags, 'C');
		m6800.ui.setByte(m6800.accume_a, 'ul#accume_a_list');
	}
};
/*
 * NEGB - 00 - B -> B
 */
m6800.instr.al['NEGB'] = {
	name : 'NEGB',
	logic : '00 - B -> B',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '50'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '1',
		'C' : '2'
	},
	f : function(){
		var d = m6800.subtract(m6800.accume_b, m6800.cero, false);
		delete d[m6800.count(m6800.accume_b)];
		m6800.setByte(d, m6800.accume_b);
		if(m6800.eq(m6800.cero, m6800.accume_b)){
			m6800.flags['Z'] = 1;
			m6800.flags['C'] = 1;
		}else{
			m6800.flags['Z'] = 0;
			m6800.flags['C'] = 0;
		}
		if(m6800.accume_b[7]){
			m6800.flags['N'] = 1;
		}else{		
			m6800.flags['N'] = 0;
		}
		if(m6800.eq(m6800.accume_b, m6800.ciento_veintiocho)){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setFlag(m6800.flags, 'C');
		m6800.ui.setByte(m6800.accume_b, 'ul#accume_b_list');
	}
};
/*
 * ORAA - A or M -> M
 */
m6800.instr.al['ORAA'] = {
	name : 'ORAA',
	logic : 'A or M -> A',
	modes : {
		'IMM' : '8A',
		'DIR' : '9A',
		'INX' : 'AA',
		'EXT' : 'BA',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'T'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		m6800.or(m6800.accume_a, m, true);
		m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
		m6800.ui.setFlag(m6800.flags, 'V');	
		m6800.ui.setFlag(m6800.flags, 'N');	
		m6800.ui.setFlag(m6800.flags, 'Z');
	}
};
/*
 * ORAB - B or M -> B
 */
m6800.instr.al['ORAB'] = {
	name : 'ORAB',
	logic : 'B or M -> B',
	modes : {
		'IMM' : 'CA',
		'DIR' : 'DA',
		'INX' : 'EA',
		'EXT' : 'FA',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'T'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		m6800.or(m6800.accume_b, m, true);
		m6800.ui.setByte(m6800.accume_b, "ul#accume_b_list");
		m6800.ui.setFlag(m6800.flags, 'V');	
		m6800.ui.setFlag(m6800.flags, 'N');	
		m6800.ui.setFlag(m6800.flags, 'Z');
	}
};
/*
 * PSHA - A -> M_sp ; SP - 1 -> SP
 */
m6800.instr.al['PSHA'] = {
	name : 'PSHA',
	logic : 'A -> M_sp ... SP - 1 -> SP',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '36'
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
		m6800.setByte(m6800.accume_a, memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]);
		memory.set(m6800.stringify(m6800.reverse(m6800.accume_a)), m6800.stringify(m6800.reverse(m6800.stack_pointer)));
		m6800.decrement('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
	}
};
/*
 * PSHB - B -> M_sp ; SP - 1 -> SP
 */
m6800.instr.al['PSHB'] = {
	name : 'PSHB',
	logic : 'B -> M_sp ... SP - 1 -> SP',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '37'
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
		m6800.setByte(m6800.accume_b, memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))]);
		memory.set(m6800.stringify(m6800.reverse(m6800.accume_b)), m6800.stringify(m6800.reverse(m6800.stack_pointer)));
		m6800.decrement('stack_pointer');
		m6800.ui.setByte(m6800.stack_pointer, "ul#stack_pointer_list");
	}
};
/*
 * PULA - SP + 1 -> SP ; M_sp -> A
 */
m6800.instr.al['PULA'] = {
	name : 'PULA',
	logic : 'SP + 1 -> SP ... M_sp -> A',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '32'
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
		m6800.setByte(memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))], m6800.accume_a);
		m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
	}
};
/*
 * PULB - SP + 1 -> SP ; M_sp -> B
 */
m6800.instr.al['PULB'] = {
	name : 'PULB',
	logic : 'SP + 1 -> SP ... M_sp -> B',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '33'
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
		m6800.setByte(memory.q[m6800.stringify(m6800.reverse(m6800.stack_pointer))], m6800.accume_b);
		m6800.ui.setByte(m6800.accume_b, "ul#accume_b_list");
	}
};
/*
 * ROL - Bitwise Rotate Left : M
 */
m6800.instr.al['ROL'] = {
	name : 'ROL',
	logic : 'Bitwise Rotate Left : M',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '69',
		'EXT' : '79',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '6',
		'C' : 'T'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var b = {};
		b[0] = m6800.flags['C'];
		b[1] = m[0];
		b[2] = m[1];
		b[3] = m[2];
		b[4] = m[3];
		b[5] = m[4];
		b[6] = m[5];
		b[7] = m[6];
		m6800.flags['C'] = m[7];
		m6800.ui.setFlag(m6800.flags, 'C');	
		var v = m6800.xor(m6800.flags['N'], m6800.flags['C'], false);
		if(v[0]){
			m6800.flags['V'] = 1;			
		}else{
			m6800.flags['V'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'V');
		if(m6800.eq(m6800.cero, b)){
			m6800.flags['Z'] = 1;			
		}else{
			m6800.flags['Z'] = 0;						
		}
		if(b[7]){
			m6800.flags['N'] = 1;			
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.setByte(b, m);
		memory.set(m6800.stringify(m6800.reverse(m)), m6800.stringify(m6800.reverse(m6800.address_bus)));
	}
};
/*
 * ROLA - Bitwise Rotate Left : A
 */
m6800.instr.al['ROLA'] = {
	name : 'ROLA',
	logic : 'Bitwise Rotate Left : A',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '49'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '6',
		'C' : 'T'
	},
	f : function(){
		var b = {};
		b[0] = m6800.flags['C'];
		b[1] = m6800.accume_a[0];
		b[2] = m6800.accume_a[1];
		b[3] = m6800.accume_a[2];
		b[4] = m6800.accume_a[3];
		b[5] = m6800.accume_a[4];
		b[6] = m6800.accume_a[5];
		b[7] = m6800.accume_a[6];
		m6800.flags['C'] = m6800.accume_a[7];
		m6800.ui.setFlag(m6800.flags, 'C');
		var v = m6800.xor(m6800.flags['N'], m6800.flags['C'], false);
		if(v[0]){
			m6800.flags['V'] = 1;			
		}else{
			m6800.flags['V'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'V');
		if(m6800.eq(m6800.cero, b)){
			m6800.flags['Z'] = 1;			
		}else{
			m6800.flags['Z'] = 0;						
		}
		if(b[7]){
			m6800.flags['N'] = 1;			
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.setByte(b, m6800.accume_a);
		m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
	}
};
/*
 * ROLB - Bitwise Rotate Left : B
 */
m6800.instr.al['ROLB'] = {
	name : 'ROLB',
	logic : 'Bitwise Rotate Left : B',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '59'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '6',
		'C' : 'T'
	},
	f : function(){
		var b = {};
		b[0] = m6800.flags['C'];
		b[1] = m6800.accume_b[0];
		b[2] = m6800.accume_b[1];
		b[3] = m6800.accume_b[2];
		b[4] = m6800.accume_b[3];
		b[5] = m6800.accume_b[4];
		b[6] = m6800.accume_b[5];
		b[7] = m6800.accume_b[6];
		m6800.flags['C'] = m6800.accume_b[7];
		m6800.ui.setFlag(m6800.flags, 'C');
		var v = m6800.xor(m6800.flags['N'], m6800.flags['C'], false);
		if(v[0]){
			m6800.flags['V'] = 1;			
		}else{
			m6800.flags['V'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'V');
		if(m6800.eq(m6800.cero, b)){
			m6800.flags['Z'] = 1;			
		}else{
			m6800.flags['Z'] = 0;						
		}
		if(b[7]){
			m6800.flags['N'] = 1;			
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.setByte(b, m6800.accume_b);
		m6800.ui.setByte(m6800.accume_b, "ul#accume_b_list");
	}
};
/*
 * ROR - Bitwise Rotate Right : M
 */
m6800.instr.al['ROR'] = {
	name : 'ROR',
	logic : 'Bitwise Rotate Right : M',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '66',
		'EXT' : '76',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '6',
		'C' : 'T'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var b = {};
		b[7] = m6800.flags['C'];
		b[6] = m[7];
		b[5] = m[6];
		b[4] = m[5];
		b[3] = m[4];
		b[2] = m[3];
		b[1] = m[2];
		b[0] = m[1];
		m6800.flags['C'] = m[0];
		m6800.ui.setFlag(m6800.flags, 'C');	
		var v = m6800.xor(m6800.flags['N'], m6800.flags['C'], false);
		if(v[0]){
			m6800.flags['V'] = 1;			
		}else{
			m6800.flags['V'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'V');
		if(m6800.eq(m6800.cero, b)){
			m6800.flags['Z'] = 1;			
		}else{
			m6800.flags['Z'] = 0;						
		}
		if(b[7]){
			m6800.flags['N'] = 1;			
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.setByte(b, m);
		memory.set(m6800.stringify(m6800.reverse(m)), m6800.stringify(m6800.reverse(m6800.address_bus)));
	}
};
/*
 * RORA - Bitwise Rotate Right : A
 */
m6800.instr.al['RORA'] = {
	name : 'RORA',
	logic : 'Bitwise Rotate Right : A',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '46'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '6',
		'C' : 'T'
	},
	f : function(){
		var b = {};
		b[7] = m6800.flags['C'];
		b[6] = m6800.accume_a[7];
		b[5] = m6800.accume_a[6];
		b[4] = m6800.accume_a[5];
		b[3] = m6800.accume_a[4];
		b[2] = m6800.accume_a[3];
		b[1] = m6800.accume_a[2];
		b[0] = m6800.accume_a[1];
		m6800.flags['C'] = m6800.accume_a[0];
		m6800.ui.setFlag(m6800.flags, 'C');	
		var v = m6800.xor(m6800.flags['N'], m6800.flags['C'], false);
		if(v[0]){
			m6800.flags['V'] = 1;			
		}else{
			m6800.flags['V'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'V');
		if(m6800.eq(m6800.cero, b)){
			m6800.flags['Z'] = 1;			
		}else{
			m6800.flags['Z'] = 0;						
		}
		if(b[7]){
			m6800.flags['N'] = 1;			
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.setByte(b, m6800.accume_a);
		m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
	}
};
/*
 * RORB - Bitwise Rotate Right : B
 */
m6800.instr.al['RORB'] = {
	name : 'RORB',
	logic : 'Bitwise Rotate Right : B',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '56'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : '6',
		'C' : 'T'
	},
	f : function(){
		var b = {};
		b[7] = m6800.flags['C'];
		b[6] = m6800.accume_b[7];
		b[5] = m6800.accume_b[6];
		b[4] = m6800.accume_b[5];
		b[3] = m6800.accume_b[4];
		b[2] = m6800.accume_b[3];
		b[1] = m6800.accume_b[2];
		b[0] = m6800.accume_b[1];
		m6800.flags['C'] = m6800.accume_b[0];
		m6800.ui.setFlag(m6800.flags, 'C');	
		var v = m6800.xor(m6800.flags['N'], m6800.flags['C'], false);
		if(v[0]){
			m6800.flags['V'] = 1;			
		}else{
			m6800.flags['V'] = 0;			
		}
		m6800.ui.setFlag(m6800.flags, 'V');
		if(m6800.eq(m6800.cero, b)){
			m6800.flags['Z'] = 1;			
		}else{
			m6800.flags['Z'] = 0;						
		}
		if(b[7]){
			m6800.flags['N'] = 1;			
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.setByte(b, m6800.accume_b);
		m6800.ui.setByte(m6800.accume_b, "ul#accume_b_list");
	}
};
/*
 * SBA - A - B -> A
 */
m6800.instr.al['SBA'] = {
	name : 'SBA',
	logic : 'A - B -> A',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '10'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : 'T'
	},
	f : function(){
		var d = m6800.subtract(m6800.accume_b, m6800.accume_a);
		if(d[8]['Z']){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(d[7]){
			m6800.flags['N'] = 1;
		}else{		
			m6800.flags['N'] = 0;
		}
		if((m6800.accume_a[7] != m6800.accume_b[7]) && d[7] != m6800.accume_a[7]){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;		
		}
		if(d[8]['C']){
			m6800.flags['C'] = 1;		
		}else{
			m6800.flags['C'] = 0;		
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setFlag(m6800.flags, 'C');
		delete d[8];
		m6800.setByte(d, m6800.accume_a);
		m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
	}
};
/*
 * SBCA - A - M - C -> A
 */
m6800.instr.al['SBCA'] = {
	name : 'SBCA',
	logic : 'A - M - C -> M',
	modes : {
		'IMM' : '82',
		'DIR' : '92',
		'INX' : 'A2',
		'EXT' : 'B2',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : 'T'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var d = m6800.subtract(m, m6800.accume_a);
		if(m6800.flags['C']){
			delete d[8];
			d = m6800.subtract(m6800.uno, m6800.accume_a);			
		}
		if(d[8]['Z']){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(d[7]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;
		}
		if((m6800.accume_a[7] != m[7]) && d[7] != m6800.accume_a[7]){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;
		}
		if(d[8]['C']){
			m6800.flags['C'] = 1;
		}else{
			m6800.flags['C'] = 0;		
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setFlag(m6800.flags, 'C');
		delete d[8];
		m6800.setByte(d, m);
		memory.set(m6800.stringify(m6800.reverse(d)), m6800.stringify(m6800.reverse(m6800.address_bus)));
	}
};
/*
 * SBCB - B - M - C -> B
 */
m6800.instr.al['SBCB'] = {
	name : 'SBCB',
	logic : 'B - M - C -> M',
	modes : {
		'IMM' : 'C2',
		'DIR' : 'D2',
		'INX' : 'E2',
		'EXT' : 'F2',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : 'T'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var d = m6800.subtract(m, m6800.accume_b);
		if(m6800.flags['C']){
			delete d[8];
			d = m6800.subtract(m6800.uno, m6800.accume_b);			
		}
		if(d[8]['Z']){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(d[7]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;
		}
		if((m6800.accume_b[7] != m[7]) && d[7] != m6800.accume_b[7]){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;
		}
		if(d[8]['C']){
			m6800.flags['C'] = 1;
		}else{
			m6800.flags['C'] = 0;		
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setFlag(m6800.flags, 'C');
		delete d[8];
		m6800.setByte(d, m);
		memory.set(m6800.stringify(m6800.reverse(d)), m6800.stringify(m6800.reverse(m6800.address_bus)));
	}
};
/*
 * STAA - A -> M
 */
m6800.instr.al['STAA'] = {
	name : 'STAA',
	logic : 'A -> M',
	modes : {
		'IMM' : '',
		'DIR' : '97',
		'INX' : 'A7',
		'EXT' : 'B7',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'N'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		m6800.flags['V'] = 1;
		m6800.ui.setFlag(m6800.flags, 'V');
		if(m6800.eq(m6800.cero, m6800.accume_a)){
			m6800.flags['Z'] = 1;			
		}else{
			m6800.flags['Z'] = 0;						
		}
		if(m6800.accume_a[7]){
			m6800.flags['N'] = 1;			
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.setByte(m6800.accume_a, m);
		memory.set(m6800.stringify(m6800.reverse(m6800.accume_a)), m6800.stringify(m6800.reverse(m6800.address_bus)));
	}
};
/*
 * STAB - B -> M
 */
m6800.instr.al['STAB'] = {
	name : 'STAB',
	logic : 'B -> M',
	modes : {
		'IMM' : '',
		'DIR' : 'D7',
		'INX' : 'E7',
		'EXT' : 'F7',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'N'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		m6800.flags['V'] = 1;
		m6800.ui.setFlag(m6800.flags, 'V');
		if(m6800.eq(m6800.cero, m6800.accume_b)){
			m6800.flags['Z'] = 1;			
		}else{
			m6800.flags['Z'] = 0;						
		}
		if(m6800.accume_b[7]){
			m6800.flags['N'] = 1;			
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.setByte(m6800.accume_b, m);
		memory.set(m6800.stringify(m6800.reverse(m6800.accume_b)), m6800.stringify(m6800.reverse(m6800.address_bus)));
	}
};
/*
 * SUBA - A - M -> A
 */
m6800.instr.al['SUBA'] = {
	name : 'SUBA',
	logic : 'A - M -> M',
	modes : {
		'IMM' : '80',
		'DIR' : '90',
		'INX' : 'A0',
		'EXT' : 'B0',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : 'T'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var d = m6800.subtract(m, m6800.accume_a);
		if(d[8]['Z']){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(d[7]){
			m6800.flags['N'] = 1;
		}else{		
			m6800.flags['N'] = 0;
		}
		if((m6800.accume_a[7] != m[7]) && d[7] != m6800.accume_a[7]){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;		
		}
		if(d[8]['C']){
			m6800.flags['C'] = 1;		
		}else{
			m6800.flags['C'] = 0;		
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setFlag(m6800.flags, 'C');
		delete d[8];
		m6800.setByte(d, m);
		memory.set(m6800.stringify(m6800.reverse(d)), m6800.stringify(m6800.reverse(m6800.address_bus)));
	}
};
/*
 * SUBB - B - M -> B
 */
m6800.instr.al['SUBB'] = {
	name : 'SUBB',
	logic : 'B - M -> M',
	modes : {
		'IMM' : 'C0',
		'DIR' : 'D0',
		'INX' : 'E0',
		'EXT' : 'F0',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'T',
		'C' : 'T'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		var d = m6800.subtract(m, m6800.accume_b);
		if(d[8]['Z']){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(d[7]){
			m6800.flags['N'] = 1;
		}else{		
			m6800.flags['N'] = 0;
		}
		if((m6800.accume_b[7] != m[7]) && d[7] != m6800.accume_b[7]){
			m6800.flags['V'] = 1;
		}else{
			m6800.flags['V'] = 0;		
		}
		if(d[8]['C']){
			m6800.flags['C'] = 1;		
		}else{
			m6800.flags['C'] = 0;		
		}
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setFlag(m6800.flags, 'C');
		delete d[8];
		m6800.setByte(d, m);
		memory.set(m6800.stringify(m6800.reverse(d)), m6800.stringify(m6800.reverse(m6800.address_bus)));
	}
};
/*
 * TAB - A -> B
 */
m6800.instr.al['TAB'] = {
	name : 'TAB',
	logic : 'A -> B',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '16'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'N'
	},
	f : function(){
		m6800.setByte(m6800.accume_a, m6800.accume_b);
		m6800.ui.setByte(m6800.accume_b, "ul#accume_b_list");
		if(m6800.eq(m6800.cero, m6800.accume_a[7])){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(m6800.accume_a[7]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.flags['V'] = 1;
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
	}
};
/*
 * TBA - B -> A
 */
m6800.instr.al['TBA'] = {
	name : 'TAB',
	logic : 'B -> A',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '17'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'N'
	},
	f : function(){
		m6800.setByte(m6800.accume_b, m6800.accume_a);
		m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
		if(m6800.eq(m6800.cero, m6800.accume_b[7])){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(m6800.accume_b[7]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.flags['V'] = 1;
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
	}
};
/*
 * TST - M - 00
 */
m6800.instr.al['TST'] = {
	name : 'TST',
	logic : 'M - 00',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '6D',
		'EXT' : '7D',
		'INH' : ''
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'R'
	},
	f : function(){
		var m = memory.q[m6800.stringify(m6800.reverse(m6800.address_bus))];
		if(m6800.eq(m6800.cero, m)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(m[7]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.flags['C'] = 0;
		m6800.flags['V'] = 0;
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setFlag(m6800.flags, 'C');
	}
};
/*
 * TSTA - A - 00
 */
m6800.instr.al['TSTA'] = {
	name : 'TSTA',
	logic : 'A - 00',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '4D'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'R'
	},
	f : function(){
		if(m6800.eq(m6800.cero, m6800.accume_a)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(m6800.accume_a[7]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.flags['C'] = 0;
		m6800.flags['V'] = 0;
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setFlag(m6800.flags, 'C');
	}
};
/*
 * TSTB - B - 00
 */
m6800.instr.al['TSTB'] = {
	name : 'TSTB',
	logic : 'B - 00',
	modes : {
		'IMM' : '',
		'DIR' : '',
		'INX' : '',
		'EXT' : '',
		'INH' : '5D'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'T',
		'Z' : 'T',
		'V' : 'R',
		'C' : 'R'
	},
	f : function(){
		if(m6800.eq(m6800.cero, m6800.accume_b)){
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(m6800.accume_b[7]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.flags['C'] = 0;
		m6800.flags['V'] = 0;
		m6800.ui.setFlag(m6800.flags, 'N');
		m6800.ui.setFlag(m6800.flags, 'Z');
		m6800.ui.setFlag(m6800.flags, 'V');
		m6800.ui.setFlag(m6800.flags, 'C');
	}
};
/*
 * BLANK - LOGIC COMMENT HERE
 */
/*
m6800.instr.al['B'] = {
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