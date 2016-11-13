//
$(document).ready(function(){
	//
	var tbl = new MendTable();
	tbl.AddSubst("H", {name: "H", dd: 2, mass: 1});
	tbl.AddSubst("O", {name: "O", mass: 16});
	tbl.AddSubst("S", {name: "S", mass: 32});
	tbl.AddSubst("Fe", {name: "Fe", mass: 56});
	//
	console.log(tbl.getNameSubst());
	console.log(tbl.getProperties("H"));
	console.log(tbl.getProperties("H1"));
	console.log(tbl.getProperty("H", "mass"));
	//
	prs = new parser();
	testfrm = "32Fe23(S235O56)45*56H2O*15FeO23";
	testfrm2 = "Fe2(SO4)3";
	testfrm3 = "Na23(Al2(SO45)12)16";
	testfrm4 = "NH4NO3*5H2O";
	testfrm5 = "Na2(Al23(OH5)4)3";
	console.log(prs.parse(testfrm5));
	console.log(testfrm5);
	//
	calc = new calcMolarMass(tbl);
	console.log(calc.getTableData(testfrm5));
	console.log(calc.calculate("Fe2(SO4)3"));
	console.log(calc.percentContent("Fe2(SO4)3"));
	console.log(prs.validate("Fe2(SO4)3"));
	//
	//console.log("Na(Al(OH)4)5");
	//console.log(calc.getTableData("Na(Al(OH)4)5"));
	
});