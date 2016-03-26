(function(){
	var promesas = function (fn, success, error, ref) {
		var array = this;
		var crearPromesa = function (item, index) {
			return new Promise(
				function promesaArray(resolve, reject) {
					fn.call(ref, item, index, function promesaArray2() {
						index++;
						if (index < array.length) {
							resolve(index);
						} else {
							success();
						}
					}, reject);
				})
				.then(
				function resolve(index) {
					crearPromesa(array[index], index);
				},
				function reject(err) {
					error(err);
				});
		};

		if (array.length) {
			crearPromesa(array[0], 0);
		}  else {
			success();
		}
	};
	Array.prototype.promesas = promesas;
	var buscar = function () {
		var valor;
		var campo;
		if (arguments.length == 1) {
			valor = arguments[0];
		} else if (arguments.length > 1) {
			campo = arguments[0];
			valor = arguments[1];
		}

		for (var i = 0 ; i < this.length ; i++) {
			var item = this[i];

			if 	((campo && item[campo] == valor) ||
				(!campo && ((typeof(valor) === 'function' && valor(item, i)) ||
							(typeof(valor) !== 'function' && valor == item)))) {
				return item;
			}
		}

		return undefined;
	};
	Array.prototype.buscar = buscar;
	var indice = function () {
		var valor;
		var campo;
		if (arguments.length == 1) {
			valor = arguments[0];
		} else if (arguments.length > 1) {
			campo = arguments[0];
			valor = arguments[1];
		}

		for (var i = 0 ; i < this.length ; i++) {
			var item = this[i];

			if 	((campo && item[campo] == valor) ||
				(!campo && ((typeof(valor) === 'function' && valor(item, i)) ||
							(typeof(valor) !== 'function' && valor == item)))) {
				return i;
			}
		}

		return -1;
	};
	Array.prototype.indice = indice;
	var crearMapa = function (id) {
		var ret = {};

		for (var i = 0 ; i < this.length ; i++) {
			var item = this[i];

			ret[item[id]] = item;
		}

		return ret;
	};
	Array.prototype.crearMapa = crearMapa;
	window.ajax = function (par, tabla) {

		var params = '';
		var arr = [];
		for (var key in par.params) {
			if (typeof(par.params[key]) !== 'function') {
				arr.push(key + '=' + par.params[key]);
			}
		}
		params = arr.join('&');

		var url = par.url;
		if (params && (par.metodo.toLowerCase() == 'get')) {
			url += '?' + params;
		}
		var xhttp = new XMLHttpRequest();
		xhttp.open(par.metodo, url, true);

		if (par.metodo.toLowerCase() == 'post' || par.metodo.toLowerCase() == 'put') {
			xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}

		xhttp.onreadystatechange = function() {
			if (xhttp.readyState==4){
				var fn = function () {
					if ((xhttp.status == 200) ||
						(xhttp.status == 304) ||
						(par.metodo.toLowerCase() == 'post' && xhttp.status == 201)) {
						if (typeof(par.success) === 'function') {
							var obj = JSON.parse(xhttp.responseText);
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
			tabla.setState({velo: true}, function () {
				xhttp.send(params);
			});
		} else {
			xhttp.send(params);
		}
	};
	window.parseTipo = function (tipo) {
		if (typeof(tipo) === 'string') {
			return {
				tipo: tipo
			};
		}

		return tipo;
	};
	window.parseCols = function (cols) {
		for (var i = 0 ; i < cols.length ; i++) {
			cols[i].tipo = parseTipo(cols[i].tipo ? cols[i].tipo : 'string');
		}

		return cols;
	};
})();
