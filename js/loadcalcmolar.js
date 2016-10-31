//
$(document).ready(function(){
	//
	var calc = new calcMolarMass();
	calc.AddSubst("H", {name: "H", dd: 2, mass: 1});
	calc.AddSubst("O", {name: "O", mass: 16});
	calc.AddSubst("S", {name: "S", mass: 32});
	calc.AddSubst("Fe", {name: "Fe", mass: 56});
	//
	console.log(calc.getNameSubst());
	console.log(calc.getProperties("H"));
	console.log(calc.getProperties("H1"));
	console.log(calc.getTableData("H2O"));
	
});