/**
 * Appends an element with the specified tag, id, and text to the element with the specified parent id.
 * @param {string} parentId - The id of the parent element.
 * @param {string} tag - The tag of the element to be created.
 * @param {string} [elementId=""] - The id of the element to be created.
 * @param {string} [text=""] - The text content of the element to be created.
 */
function appendElementToElementById(parentId, tag, elementId="", text="") {
    let element = document.getElementById(parentId);
    let newElement = document.createElement(tag);
    newElement.textContent = text;
    newElement.id = elementId;
    element.appendChild(newElement);
}

/**
 * Updates the table based on the headers and the array of poets.
 * First clears the table, then appends thead and tbody elements.
 * Then appends the table headers, setting the colspan of the "Szerelme" header to 2.
 * Then appends the table rows, each row having two cells, the first one containing the poet's name,
 * the second one containing the poet's era, and the third one containing the poet's love.
 * If the poet has a second love, appends two cells, one for each love.
 * If the poet does not have a second love, appends one cell with a colspan of 2.
 * Finally, calls the `handleCheckbox` function.
 */
function updateTable() {
    document.getElementById("table").innerHTML = "";
    appendElementToElementById("table", "thead", "thead");
    appendElementToElementById("table", "tbody", "tbody");
    appendElementToElementById("thead", "tr", "thead-tr");

    for (const [i, header] of headers.entries()) {
        appendElementToElementById("thead-tr", "th", `thead-th-${i}`, header);
        if (header === "Szerelme") {
            document.getElementById(`thead-th-${i}`).colSpan = 2;
        }

    }

    for (const [i, kolto] of arr.entries()) {
        appendElementToElementById("tbody", "tr", `thead-tr-${i}`, "");
        appendElementToElementById(`thead-tr-${i}`, "td", "", kolto.nev);
        appendElementToElementById(`thead-tr-${i}`, "td", "", kolto.korszak);
        if (kolto.szerelem2) {
            appendElementToElementById(`thead-tr-${i}`, "td", "", kolto.szerelem1);
            appendElementToElementById(`thead-tr-${i}`, "td", "", kolto.szerelem2);
        } else {
            appendElementToElementById(`thead-tr-${i}`, "td", `${i}-szerelem1`, kolto.szerelem1);
            document.getElementById(`${i}-szerelem1`).colSpan = 2;
        }
    }
    handleCheckbox();
}

/**
 * Handles whether szerelem2 is disabled or not. The checkbox is checked it is enabled
 * and if the checkbox is unchecked it is disabled.
 */
function handleCheckbox() {
    const checkbox = document.getElementById("masodik");
    if (!checkbox) {return;}
    const szerelem2 = document.getElementById("szerelem2");
    if (checkbox.checked) {
        szerelem2.disabled = false;
    } else {
        szerelem2.disabled = true;
        szerelem2.value = "";
    }
}

/**
 * Handles the submission of the form. It checks for any errors. If there are none
 * it appends the data to the array. If there are errors it does not and it puts the
 * error messages in the corresponding elements.
 */
document.getElementById("form").addEventListener("submit", (event) => {
    event.preventDefault();
    let error = false;
    const nev = document.getElementById("kolto_nev").value;
    const korszak = document.getElementById("korszak").value;
    const szerelem1 = document.getElementById("szerelem1").value;
    const szerelem2 = document.getElementById("szerelem2").value;
    const masodik = document.getElementById("masodik").checked;

    const nevError = document.getElementById("nev-error");
    const korszakError = document.getElementById("korszak-error");
    const szerelem1Error = document.getElementById("szerelem1-error");
    const szerelem2Error = document.getElementById("szerelem2-error");

    nevError.textContent = "";
    nevError.classList.remove("error");
    korszakError.textContent = "";
    korszakError.classList.remove("error");
    szerelem1Error.textContent = "";
    szerelem1Error.classList.remove("error");
    szerelem2Error.textContent = "";
    szerelem2Error.classList.remove("error");

    if (!nev) {
        nevError.textContent = "Kérem adja meg a költő nevét!";
        nevError.classList.add("error");
        error = true;
    }

    if (!korszak) {
        korszakError.textContent = "Kérem adja meg a korszakot!";
        korszakError.classList.add("error");
        error = true;
    }

    if (!szerelem1) {
        szerelem1Error.textContent = "Kérem adja meg az első szerelmet!";
        szerelem1Error.classList.add("error");
        error = true;
    }

    if (masodik && !szerelem2) {
        szerelem2Error.textContent = "Kérem adja meg a másik szerelmet!";
        szerelem2Error.classList.add("error");
        error = true;
    }

    if (!error) {
        if (masodik) {
            arr.push({nev: nev, korszak: korszak, szerelem1: szerelem1, szerelem2: szerelem2});
        } else {
            arr.push({nev, korszak, szerelem1});
        }

        updateTable();
        document.getElementById("form").reset();
        handleCheckbox();
    }
});

/**
 * Sets the type and for attributes of an input or label element.
 * @param {string} inputId - The id of the input element.
 * @param {string} type - The type of the input element.
 * @param {string} [labelFor=""] - If this is not empty the for attribute for a label will be set.
 */
function setInputProperties(inputId, type, labelFor="") {
    const element = document.getElementById(inputId);
    element.type = type;
    if (labelFor) {
        element.setAttribute("for", labelFor);
    }
}


/**
 * Creates the form with the specified elements.
 */
function createForm() {
    appendElementToElementById("form", "label", "kolto_nev-label", "Költő neve");
    appendElementToElementById("form", "br")
    appendElementToElementById("form", "input", "kolto_nev");
    setInputProperties("kolto_nev", "text", "kolto_nev");
    appendElementToElementById("form", "div", "kolto-div-wrapper");
    appendElementToElementById("kolto-div-wrapper", "div", "nev-error", "");

    appendElementToElementById("form", "label", "korszak-label", "Korszak");
    appendElementToElementById("form", "br")
    appendElementToElementById("form", "input", "korszak");
    setInputProperties("korszak", "text", "korszak");
    appendElementToElementById("form", "div", "korszak-div-wrapper");
    appendElementToElementById("korszak-div-wrapper", "div", "korszak-error", "");

    appendElementToElementById("form", "label", "szerelem1-label", "Szerelme");
    appendElementToElementById("form", "br")
    appendElementToElementById("form", "input", "szerelem1");
    setInputProperties("szerelem1", "text", "szerelem1");
    appendElementToElementById("form", "div", "szerelem-div-wrapper");
    appendElementToElementById("szerelem-div-wrapper", "div", "szerelem1-error", "");

    appendElementToElementById("form", "label", "masodik-label", "Volt-e másik szerelme?");
    appendElementToElementById("form", "input", "masodik");
    setInputProperties("masodik", "checkbox", "masodik");
    document.getElementById("masodik").onchange = handleCheckbox;

    appendElementToElementById("form", "br")

    appendElementToElementById("form", "label", "szerelem2-label", "Másik szerelme");
    appendElementToElementById("form", "br")
    appendElementToElementById("form", "input", "szerelem2");
    setInputProperties("szerelem2", "text", "szerelem2");
    appendElementToElementById("form", "div", "szerelem2-div-wrapper");
    appendElementToElementById("szerelem2-div-wrapper", "div", "szerelem2-error", "");

    appendElementToElementById("form", "button", "button", "Hozzáadás");
    document.getElementById("button").type = "submit"

}