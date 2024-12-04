export const parsed_json_or_null = (str) => {
    try {
        return JSON.parse(str);
    }
    catch (e) {
        return null;
    }
}

export const collect_optionals = (...pairs) => {
    let retVal = {};
    pairs.forEach(pair => {
        if (pair[1] = pair[1].trim()) {
            retVal[pair[0]] = pair[1];
        }
    });
    return retVal;
};

// if has_optionals, input_elements is list of pairs of [string, element]
export const test_button = async (has_optionals, result_element, api_function, ...input_elements) => {
    let retVal = "";
    if (has_optionals) {
        retVal = JSON.stringify(await api_function(collect_optionals(...input_elements.map(element => {element[1] = element[1].value; return element;}))));
    }
    else {
        retVal = JSON.stringify(await api_function(...input_elements.map(element => element.value)));
    }
    result_element.innerHTML = retVal;
};

export const optimal_name = innavator_user_object => {
    if (innavator_user_object.preferred_name != "") {
      return innavator_user_object.preferred_name;
    }
    if (innavator_user_object.full_name != "") {
      return innavator_user_object.full_name;
    }
    return innavator_user_object.user.username;
};
