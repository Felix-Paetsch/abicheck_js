function formatSolutionArray(array){
	array = spliceNotRealSol(array);
	array = SolToLatex(array);
	array = DotsToComma(array);
	return array;
}

function DotsToComma(array){
	for (i = 0; i < array.length; i++){
		array[i] = array[i].replace(/\./g, ",");
	}
	return array;
}

function SolToLatex(array){
	for (i = 0; i < array.length; i++){
		array[i] = nerdamer.convertToLaTeX(array[i]);
	}
	return array;
}

function spliceNotRealSol(array) {
	return array.filter(is_real);
}

function getResultsInArray(string){
	return string.split(",");
}

function is_real(string){
	for (i = 0; i < string.length; i++){
		if (string[i] === "i"){
			if(!isSinAtPosition(string, i)){return false;}
		}
	}

	if(string.length == ""){
		return false;
	}

	return true;
}

function isSinAtPosition(string, i){
	return (string[i-1] == "s" && string[i+1] == "n")
}


//sehr Nerdamer spezifisch

function getNerdamerCodeFromLatex(input_text){
	var MathExpression = nerdamer.convertFromLaTeX(input_text);
	return nerdamer(MathExpression, undefined, 'expand').text();
}

function resultsAsLatexArray(solution){
	var results = getResultsInArray(solution.toString());
	return formatSolutionArray(results);
}

function createEqnSolutionArray(latex_lhs, latex_rhs){
	var lhs = getNerdamerCodeFromLatex(latex_lhs);
	var rhs = getNerdamerCodeFromLatex(latex_rhs);
	var solution = nerdamer.solveEquations(lhs + "-(" + rhs + ")=0",'x');
	if(EverySolIsValid(lhs, rhs)){return ["x \\in \\mathbb{R}"];}
	return resultsAsLatexArray(solution);
}

function EverySolIsValid(lhs, rhs){
	return (nerdamer.simplify(lhs + "-" + rhs) == "0");
}

function NullstellenArrayToHtml(nullstellenArray){
	var array = "$$\\begin{eqnarray}";
	if(nullstellenArray[0] === "x \\in \\mathbb{R}"){return array + nullstellenArray[0] + "\\end{eqnarray}$$";}
	for (i = 0; i < nullstellenArray.length; i++){
		array += "x&=&" + nullstellenArray[i] + "\\\\" 
	}
	return array + "\\end{eqnarray}$$";
}