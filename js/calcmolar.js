//Рассчет молярной массы вещества
function calcMolarMass(){
	var table = {};
	//Добавление данных
	this.AddSubst = function(subst, properties){
		table[subst] = properties;
		NameSubstList.push(subst);
	};
	//Рассчет
	this.calculate = function(formula){
		errorcalc = false;
		var result = 0;
		var tokens = tokenize(formula);
		var substMolar = getSubstMolar(tokens);
		if(isError()){
			for(var item in substMolar){
				result += item[0] * item[1];
			};
		};
		return result;
	};
	//Получить таблицу исходных данных
	this.getTableData = function(formula){
		var tokens = tokenize(formula);
		var substMolar = getSubstMolar(tokens);
		for(var item in substMolar){
			var res = substMolar[item][0];
			if(res){
				substMolar[item] = res;
			}
			else{
				substMolar[item] = "Нет данных"
			};
		};
		return substMolar;
	};
	//Получить имена элементов
	this.getNameSubst = function(){
		return NameSubstList;
	};
	//Получить свойства элемента
	this.getProperties = function(subst){
		return includeSubst(subst) ? table[subst] : false;
	};
	//Переменные для вычислений
	var stak = [];
	var NameSubstList = [];
	var molars = {};
	var errorcalc = false;
	//Рассчет молярной массы
	function calc(){
		return stak.pop();
	};
	//Проверка на вхождение
	function includeSubst(subst){
		return NameSubstList.includes(subst);
	};
	//Проверка на наличие свойства
	function includeMass(subst){
		res = false;
		if(includeSubst(subst)){
			res = "mass" in table[subst];
		};
			return res;
	};
	//
	function isError(){
		return errorcalc;
	};
	//
	function getSubstMolar(tokens){
		res = {};
		for(var subst in tokens){
			var koeff = tokens[subst];
			if(includeMass(subst)){
				res[subst] = [getAr(subst), koeff];
			}
			else{
				res[subst] = [false, koeff];
				errorcalc = true;
			};
		};
		return res;
	};
	//
	function getAr(subst){
		var properties = table[subst];
		return properties.mass;
	};
	//Получить список веществ
	function tokenize(formula){
		var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		var brakets = ["(", ")"];
		var strSumbols = "ABCDEFGHIJKLMNOPRSTUQWXYZV";
		var lst = formula.split();
		//
		var tokens = {};
		//
		var token = "";
		var ind = 
		//
		var first = strSumbols.split("");
		var two = strSumbols.toLowerCase().split("");
		//
		var fs = false;
		var fn = false;
		var fb = false;
		//
		//
		//
		for(var i = 0; i < formula.length; i++){
			var smb = formula[i]
			if(smb == "("){
				stak.push("lb");
				fb = true;
			}
			else if(smb == ")"){
				stak.push("rb");
				fb = false;
			}
			else if(numbers.includes(smb) && fn){
				token += smb;
			}
			else if(numbers.includes(smb) && !fn){
				fn = true;
				stak.push(token);
				token = smb;
			}
			else if(fn && isNaN(+token)){
				stak.push(1);
				token += smb;
			};
		};
		/*while(smbArray.length > 0){
			var smb = smbArray.pop();
			if(first.includes(smb) && subst == ""){
				subst += smb;
				stack.push(subst);
				subst = "";
			}
			else if(two.includes(smb)){
				subst += smb;
			}
			else if(numbers.includes(smb)){

			};
		
		};
		*/
		return tokens;
	}
};
//
/*function calculator(element){
	//
	var monitor = $("<div>").addClass("result");
	var infoLabel = $("<div>").addClass("info");
	var memoryLabel = $("<div>").addClass("memory");
	var historyLabel = $("<div>").addClass("history");
	var keys = $("<div>").addClass("keys");
	var mainCalc = $("<div>").addClass("maincalc");
	var infoCalc = $("<div>").addClass("infocalc");
	var numberKeys = $("<div>").addClass("numberkeys");
	var fnKeys = $("<div>").addClass("fnkeys");
	//Добавляем экран и клавиатуру
	$(element)
	.append(mainCalc);
	//.append(infoCalc);
	//
	$(".maincalc")
	.append(monitor)
	.append(memoryLabel)
	.append(keys);
	$(".keys")
	.append(fnKeys)
	.append(numberKeys);
	//
	//Цифровые и функциональные кнопки
	var Keys = [
		{parrent: ".numberkeys", id: "0", label: 0, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "1", label: 1, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "2", label: 2, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "3", label: 3, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "4", label: 4, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "5", label: 5, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "6", label: 6, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "7", label: 7, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "8", label: 8, cls: "key-n", fn: press},
		{parrent: ".numberkeys", id: "9", label: 9, cls: "key-n", fn: press},
		{parrent: ".fnkeys", id: "add", label: "+", cls: "key-f", fn: pressFN2},
		{parrent: ".fnkeys", id: "sub", label: "-", cls: "key-f", fn: pressFN2},
		{parrent: ".fnkeys", id: "div", label: "/", cls: "key-f", fn: pressFN2},
		{parrent: ".fnkeys", id: "mul", label: "*", cls: "key-f", fn: pressFN2},
		{parrent: ".fnkeys", id: "minus", label: "+/-", cls: "key-f", fn: pressFN1},
		{parrent: ".fnkeys", id: "eqv", label: "=", cls: "key-f", fn: pressEQV},
		{parrent: ".numberkeys", id: "comma", label: ",", cls: "key-n", fn: pressComma},
		{parrent: ".fnkeys", id: "pi", label: "PI", cls: "key-f", fn: pressConst},
		{parrent: ".fnkeys", id: "clear", label: "C", cls: "key-f", fn: pressClear},
		{parrent: ".fnkeys", id: "rightParenthesis", label: ")", cls: "key-f", fn: pressRB},
		{parrent: ".fnkeys", id: "leftParenthesis", label: "(", cls: "key-f", fn: pressLB},
		{parrent: ".fnkeys", id: "memoryadd", label: "M+", cls: "key-m", fn: pressMemoryAdd},
		{parrent: ".fnkeys", id: "memorydel", label: "MR", cls: "key-m", fn: pressMemoryDel},
		{parrent: ".fnkeys", id: "memorycls", label: "MC", cls: "key-m", fn: pressMemoryCls},
	];
	//Добавляем кнопки
	Keys.forEach(function(item){button(item.parrent, item.id,item.label,item.cls, item.fn);});
	//Функция для добавления кнопки
	function button(parrent, id, label, cls, fn){
		var newbtn = $("<button>")
		.addClass(cls)
		.attr("id", id)
		.text(label)
		.on("click",{id: id}, fn)
		.on("click",{id: id}, logger);
		//.on("click",{id: id}, logHistory);
		$(parrent).append(newbtn);
	};
	//Вывод состояния переменных в консоль
	function logger(event){
		var id = event.data.id;
		console.log(operands, operators, registr,id);
	};
	//Переменные для вычислений
	var memory = [];
	var operands = [];
	var operators = [];
	var registr = "0";
	var flags = {
		comma: false,
		fn: false,
		lb: false,
		rb: false,
	};
	//Начальные установки
	setResult(registr);
	//Операции
	var operations2 = {
		add: function(x, y){return x + y;},
		mul: function(x, y){return x * y;},
		div: function(x, y){return x / y;},
		sub: function(x, y){return x - y;},
	};
	//Функции
	var operations1 = {
		minus: function(x){return -x;},
		plus: function(x){return +x;},
	};
	//Константы
	var Constants = {
		pi: Math.PI,
	};
	//Приоритеты операций
	var priority = {
		add: 2,
		mul: 3,
		div: 3,
		sub: 2,
		minus: 1,
		plus: 1,
		leftParenthesis: 0,
		rightParenthesis: 0,
	};
	//Обработка ввода запятой
	function pressComma(event){
		var id = event.data.id;
		if(!flags.comma){
			registr += ".";
			flags.comma = true;
			setResult(registr);
		};
	};
	//Обработка ввода скобок
	//Левая скобка
	function pressLB(event){
		var id = event.data.id;
		flags.fn = true;
		operators.push(id);
	};
	//Правая скобка
	function pressRB(event){
		var id = event.data.id;
		flags.fn = true;
		flags.rb = true;
		operands.push(+registr);
		while(operators[operators.length - 1] != "leftParenthesis"){
			calculate();
		};
		if(operators[operators.length - 1] == "leftParenthesis"){
			operators.pop();
		};
		setResult();
	};
	//Обработка ввода цифр
	function press(event){
		var id = event.data.id;
		//
		registr = registr == "0" ? "" : registr;
		//
		if(!flags.fn){
			registr += id;
		}
		else{
			registr = id;
			flags.fn = false;
		};
		setResult(registr);
	};
	//операторы с двумя операндами
	function pressFN2(event){
		var id = event.data.id;
		if(!flags.rb){operands.push(+registr);};
		flags.comma = false;
		flags.fn = true;
		flags.rb = false;
		//
		if(operators.length == 0){
			operators.push(id);
		}
		else{
			if(priority[id] > priority[operators[operators.length - 1]]){
				operators.push(id);
			}
			else{
				while(operators.length > 0){
					calculate();
				};
				operators.push(id);
				setResult();
			};
		};
	};
	//Операторы с одним операндом
	function pressFN1(event){
		flags.comma = true;
		flags.rb = false;
		//
		var id = event.data.id;
		if((id in operations1) && (registr != "0")){
			op = operations1[id];
			registr = op(+registr);
			setResult(registr);
		};
	};
	//Константы
	function pressConst(event){
		var id = event.data.id;
		if(id in Constants){
			registr = Constants[id];
			setResult(registr);
		};
	};
	//
	//Вычисление
	function calculate(){
		var opId = operators.pop();
		if(opId in operations2){
			var op = operations2[opId];
			var y = operands.pop();
			var x = operands.pop();
			operands.push(op(x, y));
		};
	};
	//Обработка нажатия "="
	function pressEQV(){
		flags.comma = false;
		flags.fn = true;
		if(!flags.rb){operands.push(+registr);};
		flags.rb = false;
		while(operators.length > 0){
			calculate();
		};
		setResult();
		operands.length = 0;
	};
	//Очистка регистров
	function pressClear(){
		flags.comma = false;
		$(".info").text("");
		operands.length = 0;
		operators.length = 0;
		setResult("0");
	};
	//Вывод результата на экран
	function setResult(res){
		registr = res || operands[operands.length - 1];
		$(".result").text(registr);
	};
	//Работа с памятью
	//M+
	function pressMemoryAdd(){
		var rdata = 0;
		if(memory.length > 0){
			rdata += memory.pop();
		};
		if( +registr != 0){
			rdata += +registr;
			memory.push(rdata);
			$(".memory").text("M" + "  [" + +rdata + "]");
		};
	};
	//MR
	function pressMemoryDel(){
		if(memory.length>0){
			registr = memory.pop();
			setResult(registr);
		};
	};
	//MC
	function pressMemoryCls(){
		memory.length = 0;
		$(".memory").text("");
	};
};
*/