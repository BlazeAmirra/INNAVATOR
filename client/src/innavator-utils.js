const collect_optionals = (...pairs) => {
    let retVal = {};
    pairs.forEach(pair => {
        if (pair[1] = pair[1].trim()) {
            retVal[pair[0]] = pair[1];
        }
    });
    return retVal;
};

// if has_optionals, input_elements is list of pairs of [string, element]
const test_button = async (has_optionals, result_element, api_function, ...input_elements) => {
    let retVal = "";
    if (has_optionals) {
        retVal = JSON.stringify(await api_function(collect_optionals(...input_elements.map(element => {element[1] = element[1].value; return element;}))));
    }
    else {
        retVal = JSON.stringify(await api_function(...input_elements.map(element => element.value)));
    }
    result_element.innerHTML = retVal;
}
