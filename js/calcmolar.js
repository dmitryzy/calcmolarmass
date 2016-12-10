//Рассчет молярной массы вещества
function calcMolarMass(table){
	//Получить таблицу исходных данных
	var table = table || {};
	//Молярная масса
	var massa = false;
	//Проверка возможности расчета
	this.validate = validate;
	//Получение таблицы данных и результатов расчета
	this.getTableData = getTable;
	//Рассчет молярной массы
	//nameIndex ассоциативный массив {<Название элемента>, <Индекс>}
	this.calculate = function(nameIndex){
		var nameIndex = nameIndex || {};
		getTable(nameIndex);
		return massa;
	};
	//Проверка наличия исходных данных для вычислений
	function validate(nameIndex){
		var res = true;
		for(var name in nameIndex){
			var ar = getAr(name);
			if(!ar){res = false;};
		};
		return res;
	};
	//Получить таблицу молярных масс элементов
	function getTable(nameIndex){
		var substMolar = {};
		//Расчет молярной массы
		massa = 0;
		for(var name in nameIndex){
			var ar = getAr(name);
			ar = ar ? ar : "Нет данных";
			var index = nameIndex[name];
			var el = {massa: ar, index: index, percent: 0};
			substMolar[name] = el;
			massa += ar * index;
		};
		//
		massa = validate(nameIndex) ? +(massa).toFixed(3) : false;
		//Рассчитать процентное содержание элементов в формуле
		for(var name in substMolar){
			var el = substMolar[name];
			el.percent = !isNaN(+el.massa) && massa ? el.index * +(el.massa * 100 / massa).toFixed(3) : "-";
		};
		return substMolar;
	};
	//Получить молярную массу элемента таблицы
	function getAr(subst){
		return table.getProperty(subst, "massa");
	};
};
//
//Выполнение расчетов
function calculatorMolarMass(parrentElementId){
	//
	var parrentElenent = $(parrentElementId);
	//Разбор формулы
	var prs = new parser();
	//Исходные данные
	var tbl = new MendTable(dataMendTable);
	//Рассчет молярной массы
	var calc = new calcMolarMass(tbl);
	//Форма ввода
	var header = $("<h1>Калькулятор молярной массы</h1>");
	var label = $("<label>Введите формулу вещества</label>");
	var inputText = $('<input type="text" id="inp">');
	var inputBtn = $('<input type="submit" value="Выполнить расчет">');
	var result = $('<div></div>');
	label.append(inputText);
	parrentElenent.append(header, label, inputBtn, result);
	parrentElenent.append();
	//Привязка функции рассчета к событию клика по кнопке
	inputBtn.on("click", function(){
		//
		var formula = inputText.val(); 
		if(prs.validate(formula)){
			//
			var nameIndex = prs.parse(formula);
			var percentTable = calc.getTableData(nameIndex);
			var molarMass = calc.calculate(nameIndex);
			createTableResult(formula, molarMass, percentTable);
		}
		else{
			createTableResult();
		};
		console.log(inputText.val());
	});
	//
	function createTableResult(strFormula, molarMass, percentTable){
		var strFormula = strFormula || false;
		var molarMass = molarMass || false;
		var percentTable = percentTable || false;
		//Молярная масса
		var strMolarMass = "";
		if(molarMass){
			strMolarMass = "<p>Молярная масса вещества " + prs.printFormula(strFormula) + " равна: " + molarMass + " г/моль</p>";
		}
		else{
			strMolarMass = "<p>Отсутствуют исходные данные для расчета</p>";
		};
		var res = "<h2>Результаты расчета</h2>";
		res += strMolarMass;
		//Формула
		if(strFormula){
			res += "<table>";
			res += "<tr><td>Элемент</td><td>Молярная масса, г/моль</td><td>Индекс</td><td>Содержание, %</td></tr>";
			for(var name in percentTable){
				res += "<tr>";
				res += "<td>"+name+"</td>";
				res += "<td>" + percentTable[name]["massa"] + "</td>";
				res += "<td>" + percentTable[name]["index"] + "</td>";
				res += "<td>" + percentTable[name]["percent"] + "</td>";
				res += "</tr>";
			};
			res +="</table>";
		}
		else{
			res += "<p>Некорректно составлена формула. Возможно, количество открывающих и закрывающих скобок не совпадает</p>"
		};
		result.html(res);
	};
};
//