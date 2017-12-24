if(!m6800){
	m6800 = {};
}
m6800.instr = {};
m6800.instr.init = function(){
	//Instructions by Op Code
	for(var v in m6800.instr){
		for(var w in m6800.instr[v]){
			if(m6800.instr[v][w].modes){
				for(var x in m6800.instr[v][w].modes){
					if(m6800.instr[v][w].modes[x] != ''){
						m6800.instr[m6800.instr[v][w].modes[x]] = {};
						m6800.instr[m6800.instr[v][w].modes[x]].mode = x;
						m6800.instr[m6800.instr[v][w].modes[x]].name = w;
						m6800.instr[m6800.instr[v][w].modes[x]].type = v;
					}
				}
			}
		}
 	}
};