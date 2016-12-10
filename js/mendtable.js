//Таблица и операции с таблицей
function MendTable(data){
	//Данные
	var table = {};
	var NameSubstList = [];
	//Параметры
	var periodMax = 0;
	var zMax = 0;
	//Заполненение таблицы
	data.forEach(function(item){
		var smb = item[0];
		var z = item[1];
		var massa = item[3];
		var name = item[5];
		var spdf = item[6];
		var period = item[7];
		var group = item[8];
		AddSubst(smb,{smb: smb, massa: massa, name: name, Z: z, spdf: spdf, period: period, group: group});
		periodMax = period > periodMax ? period : periodMax;
		zMax = z > zMax ? z : zMax;
	});
	//Добавление данных
	function AddSubst(subst, properties){
		table[subst] = properties;
		NameSubstList.push(subst);
	};
	//Получить имена элементов
	this.getNameSubst = function(){
		return NameSubstList;
	};
	//Получить свойства элемента
	this.getProperties = getProperties;
	function getProperties(subst){
		return includeSubst(subst) ? table[subst] : false;
	};
	//
	//Список элементов, отсортированный по порядковым номерам
	//Формат списка [{<свойство>: <значение>, {}, ...}, ]
	this.getElements = function(){
		return NameSubstList
		.map(function(item){return getProperties(item);})
		.sort(compareElementsByZ);
	};
	//Получить элемент по номеру
	this.getElementNumber = function(Z){
		return NameSubstList
		.map(function(item){return getProperties(item);})
		.filter(function(item){return item.Z == Z});
	};
	//Получить элемент по периоду и группе
	this.getElementPeriodGroup = function(period, group){
		return NameSubstList
		.map(function(item){return getProperties(item);})
		.filter(function(item){return (item.period == period) && (item.group == group)});
	};
	//
	//Список элементов периода
	this.getElementsPeriod = getElementsPeriod;
	function getElementsPeriod(period){
		return NameSubstList
			.map(function(item){return getProperties(item);})
			.filter(function(item){return item.period == period})
			.sort(compareElementsByZ);
	};
	//Возвращает элементы группы
	this.getElementsGroup = getElementsGroup;
	function getElementsGroup(group){
		return NameSubstList
			.map(function(item){return getProperties(item);})
			.filter(function(item){return item.group == group})
			.sort(compareElementsByZ);
	};
	//Возвращает все элементы блока (s, p, d, f)
	this.getElementBlock = getElementBlock;
	function getElementBlock(spdf){
		return NameSubstList
			.map(function(item){return getProperties(item);})
			.filter(function(item){return item.spdf == spdf;})
			.sort(compareElementsByZ);
	};
	//Функция сравнения элементов по порядковому номеру для сортировки
	function compareElementsByZ(el1, el2) {return el1.Z > el2.Z ? 1 : -1;};
	//Проверка на вхождение
	this.includeSubst = includeSubst;
	function includeSubst(subst){
		return NameSubstList.includes(subst);
	};
	//Получение значения свойства. Проверка на существование свойства.
	this.getProperty = function(subst, prop){
		res = false;
		if(NameSubstList.includes(subst)){
			var properties = table[subst];
			if(typeof(properties) == "object"){
				if(prop in properties){
					res = properties[prop];
				};
			};
		};
		return res;
	};
};
//