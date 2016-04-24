let promesas = function(fn, success, error, ref) {
	let array = this;
	let crearPromesa = (item, index) => {
		return new Promise(
			(resolve, reject) => {
				fn.call(ref, item, index, () => {
					index++;
					if (index < array.length) {
						resolve(index);
					} else {
						success.call(ref);
					}
				}, reject);
			})
			.then(
				index => {
				crearPromesa(array[index], index);
			},
				err => {
				error.call(ref,err);
			});
	};

	if (array.length) {
		crearPromesa(array[0], 0);
	}  else {
		success.call(ref);
	}
};
Array.prototype.promesas = promesas;
let buscar = function() {
	let valor;
	let campo;
	if (arguments.length == 1) {
		valor = arguments[0];
	} else if (arguments.length > 1) {
		campo = arguments[0];
		valor = arguments[1];
	}

	for (let i = 0 ; i < this.length ; i++) {
		let item = this[i];

		if 	((campo && item[campo] == valor) ||
			(!campo && ((typeof(valor) === 'function' && valor(item, i)) ||
			(typeof(valor) !== 'function' && valor == item)))) {
			return item;
		}
	}

	return undefined;
};
Array.prototype.buscar = buscar;
let indice = function() {
	let valor, campo;

	if (arguments.length == 1) {
		valor = arguments[0];
	} else if (arguments.length > 1) {
		campo = arguments[0];
		valor = arguments[1];
	}

	for (let i = 0 ; i < this.length ; i++) {
		let item = this[i];

		if 	((campo && item[campo] == valor) ||
			(!campo && ((typeof(valor) === 'function' && valor(item, i)) ||
			(typeof(valor) !== 'function' && valor == item)))) {
			return i;
		}
	}

	return -1;
};
Array.prototype.indice = indice;
let crearMapa = function(id) {
	let ret = {};

	for (let i = 0 ; i < this.length ; i++) {
		let item = this[i];

		ret[item[id]] = item;
	}

	return ret;
};
Array.prototype.crearMapa = crearMapa;
let calcular = function(a, b) {
	let ret = 0;

	for (let i = 0 ; i < this.length ; i++) {
		let item = this[i];

		let val = typeof(a) === 'undefined' ? item : typeof(a) === 'function' ? fn.call(item, item, ret) : item[a];

		if (b) {
			ret = val;
		} else {
			ret += val;
		}
	}

	return ret;
};
Array.prototype.calcular = calcular;
window.ajax = function(par, tabla) {

	let params = '';
	let arr = [];
	for (let key in par.params) {
		if (typeof(par.params[key]) !== 'function') {
			arr.push(key + '=' + par.params[key]);
		}
	}
	params = arr.join('&');

	let url = par.url;
	if (params && (par.metodo.toLowerCase() == 'get')) {
		url += '?' + params;
	}
	let xhttp = new XMLHttpRequest();
	xhttp.open(par.metodo, url, true);

	if (par.metodo.toLowerCase() == 'post' || par.metodo.toLowerCase() == 'put') {
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}

	xhttp.onreadystatechange = () => {
		if (xhttp.readyState==4){
			let fn = () => {
				if ((xhttp.status == 200) ||
					(xhttp.status == 304) ||
					(par.metodo.toLowerCase() == 'post' && xhttp.status == 201)) {
					if (typeof(par.success) === 'function') {
						let obj = JSON.parse(xhttp.responseText);
						par.success(obj);
					}
				} else {
					if (typeof(par.error) === 'function') {
						par.error(xhttp);
					}
				}
			};
			if (tabla) {
				tabla.setState({velo: false}, fn);
			} else {
				fn();
			}
		}
	};

	if (tabla) {
		tabla.setState({velo: true}, () => {
			xhttp.send(params);
		});
	} else {
		xhttp.send(params);
	}
};
window.parseTipo = tipo => {
	if (typeof(tipo) === 'string') {
		return {
			tipo: tipo
		};
	}

	return tipo;
};
window.parseFiltro = (filtro, tipo) => {
	var ret = typeof(filtro) === 'undefined' ? true : filtro;

	if (ret) {
		if (ret === true) {
			ret = tipo;
		}
		else if (typeof(ret) === 'string') {
			let tipo_filtro = ret;
			ret = tipo;
			ret.tipo = tipo_filtro;
		}
	}

	return ret;
};
window.parseCols = cols => {
	for (let i = 0 ; i < cols.length ; i++) {
		cols[i].tipo = parseTipo(cols[i].tipo ? cols[i].tipo : 'string');
		cols[i].filtro = parseTipo(cols[i].filtro, cols[i].tipo);
	}

	return cols;
};
