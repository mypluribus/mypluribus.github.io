m6800 = {};
m6800.init = function(){
	m6800.instr.init();
	memory.init(512);
	m6800.ui.init();
};
/*
 * add a & b together ... spit them out as d, or write to a if w (write)
 */
m6800.add = function(a, b, w){
	var c = 0; //carry
	var h = 0; //half carry
	var i = 0; //index
	var z = 1; //zero
	var v = 0; //overflow
	var d = {}; //new value
	var ccr = {}; // new ccr
	for(i; i < m6800.count(a); i++){
		if(i == 3 && ((a[i] && c) || (b[i] && c) || (a[i] && b[i]))){ // half carry
			h = 1;
		}
		if(a[i] && b[i]){ //a & b == 1
			if(c){ // carry = 1 => 1 + 1 + 1 = 1 => c = 1
				d[i] = 1;
				z = 0;
			}else{ // carry = 0 => 1 + 1 = 0 => c =1
				d[i] = 0;
				c = 1;
			}
		}else{ //a and/or b == 0
			if(a[i] || b[i]){ // a or b == 1 (not both)
				if(c){ // carry = 1 => 1 + 0 + 1 = 0 => c = 1
					d[i] = 0;
				}else{ // carry = 0 => 1 + 0 = 1 => c = 0
					d[i] = 1;
					z = 0;
				}
			}else{ // a and b == 0
				if(c){ //carry = 1 => 0 + 0 + 1 = 1 => c = 0
					d[i] = 1;
					c = 0;
					z = 0;
				}else{ //carry = 0 => 0 + 0 = 0 => c = 0; 
					d[i] = 0;
				}
			}
		}
	};

	if(w){
		/*
		 * set condition code register & write to accume_a
		 */
		m6800.flags['Z'] = z;
		if(d[m6800.count(a) - 1]){
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.flags['H'] = h;
		m6800.flags['C'] = c;
		
		if(m6800.count(a) <= 8){
			if((a[7] == b[7]) && d[7] != a[7]){
				m6800.flags['V'] = 1;
			}else{
				m6800.flags['V'] = 0;
			}
		}else{
			m6800.flags['V'] = 0;
		}
		m6800.setByte(d, a);
		d = {};
		return a;
	}else{
		/*
		 * add condition code register as last element of d
		 * return d
		 */
		ccr['H'] = h;
		if(d[m6800.count(a) - 1]){
			ccr['N'] = 1;
		}else{
			ccr['N'] = 0;
		}
		if(m6800.count(a) <= 8){
			if((a[7] == b[7]) && d[7] != a[7]){
				ccr['V'] = 1;
			}else{
				ccr['V'] = 0;
			}
		}else{
			ccr['V'] = 0;
		}
		ccr['Z'] = z;
		ccr['V'] = v;
		ccr['C'] = c;
		d[m6800.count(a)] = ccr;
		return d;
	}
};
/*
 * and a & b ... spit them out as d, or write to a if w (write)
 */
m6800.and = function(a, b, w){
	var z = 1;
	var d = {};
	for(var v in a){
		d[v] = a[v] && b[v];
		if(d[v]){
			z = 0;
		}
	}
	if(z){ //zero bit
		m6800.flags['Z'] = 1;
	}else{
		m6800.flags['Z'] = 0;
	}
	if(d[m6800.count(a) - 1]){ // test last bit for 1
		m6800.flags['N'] = 1;
	}else{
		m6800.flags['N'] = 0;
	}
	m6800.flags['V'] = 0;
	if(w){
		m6800.setByte(d, a);
		d = {};
	}else{
		return d;
	}
};
/*
 * compliment byte (I.E. 1 = 0 ; 0 = 1)
 */
m6800.compliment = function(b){
	var d = {};
	for(var v in b){
		if(b[v]){
			d[v] = 0;
		}else{
			d[v] = 1;			
		}
	}
	return d;
};

/*
 * count elements of given byte(s)
 */
m6800.count = function(obj) {
	var i = 0;
	for (var x in obj)
		if (obj.hasOwnProperty(x))
			i++;
	return i;
};
/*
 * decrement given byte(s)
 */
m6800.decrement = function(key){
	var b = m6800[key];
	var ct = m6800.count(b);
	var subtrahend = {};
	if(b[0]){ // first bit = 1
		b[0] = 0;
	}else{
		var i = 1;
		subtrahend[0] = 1;
		while(i < ct){
			subtrahend[i] = 0;
			i++;
		}
		var d = m6800.subtract(subtrahend, b, false);
		delete d[ct];
		m6800.setByte(d, m6800[key]);
	}
};
/*
 * eq - is a equal to b ... return true, false
 */
m6800.eq = function(a, b){
	var eq = 1;
	for(v in a){
		if(a[v] != b[v]){
			eq = 0;
		}
	}
	return eq;	
};
/*
 * increment given byte(s)
 */
m6800.increment = function(key){
	var b = m6800[key];
	var ct = m6800.count(b);
	var c = 0;
	var i = 1;
	if(b[0]){
		c = 1;
		b[0] = 0;
	}else{
		b[0] = 1;
	}
	while(c && i < ct){
		if(b[i]){
			b[i] = 0;
		}else{
			b[i] = 1;
			c = 0;
		}
		i++;
	}
};
/*
 * isNeg = check byte for negative
 */
m6800.isNeg = function(b){
	return b[m6800.count(b)-1];
};
/*
 * isZero = check byte for zero
 */
/*
m6800.isZero = function(b){
	var z = 1;
	for(var v in b){
		if(b[v]){
			z = 0;
		}
	}
	return z;
};
*/
/*
 * objectify - turn any string into object
 */
m6800.objectify = function(b){
	var obj = {};
	for(var v in b){
		obj[v] = parseInt(b[v]);
	}
	return m6800.reverse(obj);
/*
	var s = {};
	for(var v in b){
		s[v] = parseInt(v);
	}
	return s;
*/
};
/*
 * or a || b ... spit them out as d, or write to a if w (write)
 */
m6800.or = function(a, b, w){
	var z = 1;
	var d = {};
	for(var v in a){
		d[v] = a[v] || b[v];
		if(d[v]){
			z = 0;
		}
	}
	if(w){
		if(z){ //zero bit
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(d[m6800.count(a) - 1]){ // test last bit for 1
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		m6800.flags['V'] = 0;
		m6800.setByte(d, a);
		d = {};
	}else{
		return d;
	}
};
/*
 * reverse any given byte(s) ... spit out as d
 */
m6800.reverse = function(b){
	var d = {};
	for(var v in b){
		d[m6800.count(b)-v-1] = b[v];
	}
	return d;
};
/*
 * setByte - set the value of given byte(s)
 */
m6800.setByte = function(bits, target){
	for(v in bits){
		target[v] = bits[v];
	}
};
/*
 * stringify - turn any byte(s) to string
 */
m6800.stringify = function(b){
	var i = 0;
	var s = '';
	for(i; i < m6800.count(b); i++){
		s = s + b[i];
	}
	return s;
};
/*
 * subtract a from b ... spit them out as d, or write to a if w (write)
 */
m6800.subtract = function(a, b, w){
	var uno = {};
	var ct = m6800.count(b);
	var i = 0;
	for(i; i < ct; i++){
		if(i < 1){
			uno[i] = 1;
		}else{
			uno[i] = 0;
		}
	}
	var d = m6800.add(m6800.compliment(a), b, false);
	delete d[ct];
	d = m6800.add(d, uno, false);
	return d;
};
/*
 * toggleByte - invert each bit of given byte(s) (specified by text key)
 */
m6800.toggleByte = function(key, w){
	var b = {};
	if(w){
		b = m6800[key];		
	}else{
		m6800.setByte(m6800[key], bits);
	}
	for(var v in b){
		if(b[v]){
			b[v] = 0;
		}else{
			b[v] = 1;
		}
	}
	return b;
};
/*
 * toggleFlag - b = bits; t = target set given flag to its opposite value
 */
m6800.toggleFlag = function(b, t){
	if(b[t]){
		b[t] = 0;
	}else{
		b[t] = 1;
	}
};
/*
 * incPC - increment program counter ... just a helper
 */
m6800.incPC = function(){
	m6800.increment('program_counter');
	m6800.ui.setByte(m6800.program_counter, 'ul#program_counter_list');
};
/*
 * xor a xor b ... spit them out as d, or write to a if w (write)
 */
m6800.xor = function(a, b, w){
	var z = 1;
	var d = {};
	for(var v in a){
//		d[v] = parseInt((!a[v] && b[v]) || (a[v] && !b[v]));
		if(a[v] == b[v]){
			d[v] = 0;
		}else{
			d[v] = 1;
		}

		if(d[v]){
			z = 0;
		}
	}
	if(w){
		if(z){ //zero bit
			m6800.flags['Z'] = 1;
		}else{
			m6800.flags['Z'] = 0;
		}
		if(d[m6800.count(a) - 1]){ // test last bit for 1
			m6800.flags['N'] = 1;
		}else{
			m6800.flags['N'] = 0;
		}
		m6800.flags['V'] = 0;
		m6800.setByte(d, a);
		d = {};
	}else{
		return d;
	}
};