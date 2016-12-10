//Анализ формулы вещества
function parser(){
	this.parse = parse;
	//Проверка правильности формулы (правильная вложенность скобок)
	this.validate = function(formula){
		var formula = formula || "";
		formula = trimAll(formula);
		var lstFormula = formula.split("");
		var res = lstFormula.length != 0 ? true : false;
		res = res ? typeSumbol(lstFormula[0]) == "a" ? false : true : false;
		var BreketsCount = 0;
		lstFormula.forEach(function(item){
			if(item == "("){BreketsCount ++;}
			else if(item == ")"){BreketsCount --;};
			if(BreketsCount < 0){res = false;};
		});
		if(BreketsCount != 0){res = false;};
		return res;
	};
	//Функция определяет тип символа 
	//"A" ABCDEFGHIJKLMNOPQRSTUVWXYZ
	//"a" abcdefghijklmnopqrstuvwxyz
	//"n" 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
	//"L" "("
	//"R" ")"
	function typeSumbol(sumbol){
		//Исходные данные
		var strSumbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		var lstNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		//Данные для сравнения
		var first = strSumbols.split("").includes(sumbol);
		var two = strSumbols.toLowerCase().split("").includes(sumbol);
		var numbers = lstNumbers.includes(+sumbol);
		var Lbrakets = sumbol == "(";
		var Rbrakets = sumbol == ")";
		var Multiplier = sumbol == "*";
		return first ? "A" : two ? "a" : numbers ? "n" : Lbrakets ? "L" : Rbrakets ? "R" : Multiplier ? "M" : "E";
	};
	//Функция возвращает части формулы, 
	//разделенные множителем * в паре с коэффициентом
	//в виде массива массивов [[формула, коэффициент],]
	function parseMultiplier(formula){
		var lst = formula.split('*');
		var res = lst.map(function(item){
			var strIndex = "";
			var startIndex = 0;
			while(typeSumbol(item.charAt(startIndex)) == "n"){
				strIndex += item.charAt(startIndex);
				startIndex +=1;
			};
			strIndex = +strIndex == 0 ? 1 : +strIndex;
			return [item.substr(startIndex), strIndex];
		});
		return res;
	};
	//Функция выделяет из строки символов название элемента и индекс
	//Если в конце строки нет цифр, то index = 1
	//Возвращает массив [name,index]
	function selectNameIndex(group){
		var smb = group.charAt(0);
		var typeSmbFirst = typeSumbol(smb);
		if(typeSmbFirst == "A"){
			var name = "";
			var i = 1;
			while((typeSumbol(smb) == "A") || (typeSumbol(smb) == "a")){
				name += smb;
				smb = group.charAt(i++);
			};
			var index = group.slice(i-1) ? group.slice(i-1) : 1;
			return [name, index];
		}
		else if(typeSmbFirst == "R"){
			return group.slice(1) ? +group.slice(1) : 1;
		}
		else if(typeSmbFirst == "L"){
			return "(";
		};
	};
	//Функция, раскрывает скобки в формуле
	function unBrekets(arrayOfElements){
		var arrIndex = [];
		var Multiplier = 1;
		var res = [];
		while(arrayOfElements.length > 0){
			var item = arrayOfElements.pop();
			if(!isNaN(item)){
				arrIndex.push(Multiplier);
				Multiplier *= item;
			}
			else if(Array.isArray(item)){
				res.push([item[0], item[1] * Multiplier]);
			}
			else if(item == "("){
				Multiplier = arrIndex.pop();
			};
		};
		return res;
	};
	//Функция для анализа формулы 
	//Возвращает массив массивов 
	//[[<Название элемента>, <количество атомов элемента>], ]
	function parseFrm(formula){
		var arrayOfElements = [];
		var token = "";
		for(var i = 0; i < formula.length; i++){
			var smb = formula.charAt(i);
			if((typeSumbol(smb) == "L") 
				|| (typeSumbol(smb) == "A")
				|| (typeSumbol(smb) == "R")){
				(token) ? arrayOfElements.push(selectNameIndex(token)) : 1;
				token = "";
			};
			token += smb;
		};
		arrayOfElements.push(selectNameIndex(token));
		//Удаление скобок
		return unBrekets(arrayOfElements);
	};
	//Получить список веществ
	function parse(formula){
		//Исходные данные
		var formula = formula || "";
		formula = trimAll(formula);
		//Результат
		var elements = {};
		//Обработка формул списка
		if(this.validate(formula)){
			var lstFrm = parseMultiplier(formula);
			var lstElements = [];
			lstFrm.forEach(function(item){
				var frm = item[0];
				var Multiplier = item[1];
				var lstElementsItem = parseFrm(frm);
				lstElementsItem = lstElementsItem.map(function(item){
					return [item[0], item[1] * Multiplier];
				});
				lstElements = lstElements.concat(lstElementsItem);
			});
			//Объединение оригинальных элементов
			lstElements.forEach(function(item){
				var elementName = item[0];
				var elementIndex = item[1];
				if(elementName in elements){
					elements[elementName] += elementIndex;
				}
				else{
					elements[elementName] = elementIndex;
				};
			});
		};
		//
		return elements;
	};
	//Удаление пробелов
	this.trimAll = trimAll;
	//Функция удаления пробелов
	function trimAll(formula){
		var formula = formula || "";
		return formula
			.split("")
			.filter(function(item){return item != " ";})
			.join("");
	};
	//Преобразование формулы к печати
	this.printFormula = printFormula;
	//Функция преобразования к печати
	function printFormula(formula){
		var flag = true;
		return formula.split("")
		.filter(function(item){return item != " ";})
		.map(function(item){
			var res = item;
			if((typeSumbol(item) == "n") && !flag){
				res = "<sub>" + item + "</sub>";
				flag = false;
			}
			else if(item == "*"){flag = true;}
			else if(typeSumbol(item) == "A"){flag = false;};
			return res;
		})
		.join("");
	};
};