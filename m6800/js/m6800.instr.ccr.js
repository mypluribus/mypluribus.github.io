if(!m6800){
	m6800 = {};
}
if(!m6800.instr){
	m6800.instr = {};
}
m6800.instr.ccr = {};
/*
 * CLC - 0 -> C
 */
m6800.instr.ccr['CLC'] = {
	name : 'CLC',
	logic : '0 -> C',	
	modes : {
		'INH' : '0C'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'N',
		'Z' : 'N',
		'V' : 'N',
		'C' : 'R'
	},
	f :	function(){
			m6800.flags['C'] = 0;
			m6800.ui.setFlag(m6800.flags, 'C');
	}
};
/*
 * CLI - 0 -> I
 */
m6800.instr.ccr['CLI'] = {
	name : 'CLI',
	logic : '0 -> I',	
	modes : {
		'INH' : '0E'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'R',
		'N' : 'N',
		'Z' : 'N',
		'V' : 'N',
		'C' : 'N'
	},
	f :	function(){
			m6800.flags['I'] = 0;
			m6800.ui.setFlag(m6800.flags, 'I');
	}
};
/*
 * CLV - 0 -> V
 */
m6800.instr.ccr['CLV'] = {
	name : 'CLV',
	logic : '0 -> V',	
	modes : {
		'INH' : '0A'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'N',
		'Z' : 'N',
		'V' : 'R',
		'C' : 'N'
	},
	f :	function(){
			m6800.flags['V'] = 0;
			m6800.ui.setFlag(m6800.flags, 'V');
	}
};
/*
 * SEC - 1 -> C
 */
m6800.instr.ccr['SEC'] = {
	name : 'SEC',
	logic : '1 -> C',	
	modes : {
		'INH' : '0D'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'N',
		'Z' : 'N',
		'V' : 'N',
		'C' : 'S'
	},
	f :	function(){
			m6800.flags['C'] = 1;
			m6800.ui.setFlag(m6800.flags, 'C');
	}
};
/*
 * SEI - 1 -> I
 */
m6800.instr.ccr['SEI'] = {
	name : 'SEI',
	logic : '1 -> I',	
	modes : {
		'INH' : '0F'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'S',
		'N' : 'N',
		'Z' : 'N',
		'V' : 'N',
		'C' : 'N'
	},
	f :	function(){
			m6800.flags['I'] = 1;
			m6800.ui.setFlag(m6800.flags, 'I');
	}
};
/*
 * SEV - 1 -> V
 */
m6800.instr.ccr['SEV'] = {
	name : 'SEV',
	logic : '1 -> V',	
	modes : {
		'INH' : '0B'
	},
	ccr : {	
		'H' : 'N',
		'I' : 'N',
		'N' : 'N',
		'Z' : 'N',
		'V' : 'S',
		'C' : 'N'
	},
	f :	function(){
			m6800.flags['V'] = 1;
			m6800.ui.setFlag(m6800.flags, 'V');
	}
};
/*
 * TAP - A -> CCR
 */
m6800.instr.ccr['TAP'] = {
	name : 'TAP',
	logic : 'A -> CCR',	
	modes : {
		'INH' : '06'
	},
	ccr : {	
		'H' : '12',
		'I' : '12',
		'N' : '12',
		'Z' : '12',
		'V' : '12',
		'C' : '12'
	},
	f :	function(){
			m6800.flags['H'] = m6800.accume_a[0];
			m6800.flags['I'] = m6800.accume_a[1];
			m6800.flags['N'] = m6800.accume_a[2];
			m6800.flags['Z'] = m6800.accume_a[3];
			m6800.flags['V'] = m6800.accume_a[4];
			m6800.flags['C'] = m6800.accume_a[5];
			m6800.ui.setFlag(m6800.flags, 'H');
			m6800.ui.setFlag(m6800.flags, 'I');
			m6800.ui.setFlag(m6800.flags, 'N');
			m6800.ui.setFlag(m6800.flags, 'Z');
			m6800.ui.setFlag(m6800.flags, 'V');
			m6800.ui.setFlag(m6800.flags, 'C');
	}
};
/*
 * TPA - CCR -> A
 */
m6800.instr.ccr['TPA'] = {
	name : 'TPA',
	logic : 'CCR -> A',	
	modes : {
		'INH' : '07'
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
			m6800.accume_a[0] = m6800.flags['H'];
			m6800.accume_a[1] = m6800.flags['I'];
			m6800.accume_a[2] = m6800.flags['N'];
			m6800.accume_a[3] = m6800.flags['Z'];
			m6800.accume_a[4] = m6800.flags['V'];
			m6800.accume_a[5] = m6800.flags['C'];
			m6800.accume_a[6] = 0; 
			m6800.accume_a[7] = 0;
			m6800.ui.setByte(m6800.accume_a, "ul#accume_a_list");
	}
};