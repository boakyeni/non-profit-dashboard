// Merchant credentials
const widgetOrigin = new String(window.location);
const widgetParams = widgetOrigin.split("?")[1];
const merchantKeyPair = widgetParams.split("&")[0];
const merchantIdPair = widgetParams.split("&")[1];
// Widget page 1 variables
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const phone = document.querySelector("#phoneInput");
const email = document.querySelector("#email");
// Widget page 2 variables
const toggleDedicatedInputWrapper = document.querySelector("#ToggleDedicatedInputWrapper");
const dedicatedInput = document.querySelector("#DedicatedInput");
const toggleCompanyInputWrapper = document.querySelector("#ToggleCompanyInputWrapper");
const companyInput = document.querySelector("#CompanyInput");
// Widget error arrays
var pageOneErrors = [true, true, true, true];
var pageTwoErrors = [false, false];
var pageThreeErrors = [true];
// Widget page 3 variables
const customAmount = document.querySelector("#customAmount");
const amountField = document.querySelector("#donationAmount");
const customAmountWrapper = document.querySelector("#customAmountWrapper");
// Capturing the rest of form values
const country = document.querySelector("#countryPicker");
console.log(`Country: ${country.value}`);
const anonymousDonation = document.querySelector("#anonymousDonation");
console.log(`Anonymous donation: ${anonymousDonation.checked}`);
function navigateToFormStep(stepNumber) {
    const formStepCircle = document.querySelector('div[step="' + stepNumber + '"]');
    document.querySelectorAll(".form-step").forEach((formStepElement) => {
        formStepElement.classList.add("d-none");
    });
    document.querySelectorAll(".form-stepper-list").forEach((formStepHeader) => {
        formStepHeader.classList.add("form-stepper-unfinished");
        formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
    });
    document.querySelector("#step-" + stepNumber).classList.remove("d-none");
    formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
    formStepCircle.classList.add("form-stepper-active");
    for (let index = 0; index < stepNumber; index++) {
        const formStepCircle = document.querySelector('div[step="' + index + '"]');
        if (formStepCircle) {
            formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
            formStepCircle.classList.add("form-stepper-completed");
        }
    }
}
;
document.querySelectorAll(".btn-navigate-form-step").forEach((formNavigationBtn) => {
    formNavigationBtn.addEventListener("click", () => {
        const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));
        navigateToFormStep(stepNumber);
    });
});
function handleVisibility(trigger) {
    const targetId = trigger.id.slice(6);
    const target = document.getElementById(targetId);
    if (trigger.checked) {
        target.style.display = 'grid';
        target.style.gridColumnEnd = "span 2";
        target.setAttribute("required", "true");
    }
    else {
        target.style.display = 'none';
    }
}
function checkPage(errors, page) {
    let btn = document.querySelector("#" + page + "Btn");
    errors.every((error) => {
        if (error) {
            btn.setAttribute("disabled", "true");
            btn.style.opacity = "0.7";
            return !error;
        }
        console.log(`error is ${error}`);
        btn.removeAttribute("disabled");
        btn.style.opacity = "1";
        return true;
    });
}
function dedicatedInputHandler() {
    if (dedicatedInput.value.length < 2) {
        pageTwoErrors[0] = true;
        this.nextElementSibling.textContent = "Must be at least 2 letters";
        checkPage(pageTwoErrors, "second");
    }
    else if (dedicatedInput.value.match(/[^A-Za-z\s]/g)) {
        pageTwoErrors[0] = true;
        this.nextElementSibling.textContent = "Must only contain letters";
        checkPage(pageTwoErrors, "second");
    }
    else {
        pageTwoErrors[0] = false;
        this.nextElementSibling.textContent = "";
        checkPage(pageTwoErrors, "second");
    }
}
function companyInputHandler() {
    if (companyInput.value.length < 1) {
        pageTwoErrors[1] = true;
        companyInput.nextElementSibling.textContent = "Must be at least 1 character";
        checkPage(pageTwoErrors, "second");
    }
    else if (companyInput.value.match(/[^A-Za-z0-9\s]/g)) {
        pageTwoErrors[1] = true;
        companyInput.nextElementSibling.textContent = "Must contain either letters or numbers";
        checkPage(pageTwoErrors, "second");
    }
    else {
        pageTwoErrors[1] = false;
        companyInput.nextElementSibling.textContent = "";
        checkPage(pageTwoErrors, "second");
    }
}
function customAmountHandler() {
    if (customAmount.value.length < 1) {
        pageThreeErrors[0] = true;
        checkPage(pageThreeErrors, "third");
        customAmount.nextElementSibling.textContent = "Please enter a value";
    }
    else if (customAmount.value.match(/[^0-9]+/gm)) {
        pageThreeErrors[0] = true;
        checkPage(pageThreeErrors, "third");
        customAmount.nextElementSibling.textContent = "Must only contain numbers";
    }
    else {
        pageThreeErrors[0] = false;
        checkPage(pageThreeErrors, "third");
        customAmount.nextElementSibling.textContent = "";
        customAmount.removeEventListener("change", this);
    }
}
firstname.addEventListener("change", function () {
    if (firstname.value.length < 2) {
        pageOneErrors[0] = true;
        firstname.nextElementSibling.textContent = "Must be at least 2 letters";
        checkPage(pageOneErrors, "first");
    }
    else if (firstname.value.match(/[^A-Za-z\s]/g)) {
        pageOneErrors[0] = true;
        firstname.nextElementSibling.textContent = "Must only contain letters";
        checkPage(pageOneErrors, "first");
    }
    else {
        pageOneErrors[0] = false;
        firstname.nextElementSibling.textContent = "";
        checkPage(pageOneErrors, "first");
    }
});
lastname.addEventListener("change", function () {
    if (lastname.value.length < 2) {
        pageOneErrors[1] = true;
        lastname.nextElementSibling.textContent = "Must be at least 2 letters";
        checkPage(pageOneErrors, "first");
    }
    else if (lastname.value.match(/[^A-Za-z\s]/g)) {
        pageOneErrors[1] = true;
        lastname.nextElementSibling.textContent = "Must only contain letters";
        checkPage(pageOneErrors, "first");
    }
    else {
        pageOneErrors[1] = false;
        lastname.nextElementSibling.textContent = "";
        checkPage(pageOneErrors, "first");
    }
});
phone.addEventListener("change", function () {
    if (phone.value.length < 10) {
        pageOneErrors[3] = true;
        phone.nextElementSibling.textContent = "Must have 10 digits";
        checkPage(pageOneErrors, "first");
    }
    else if (phone.value.match(/[^0-9]/g)) {
        pageOneErrors[3] = true;
        phone.nextElementSibling.textContent = "Must contain only numbers";
        checkPage(pageOneErrors, "first");
    }
    else {
        pageOneErrors[3] = false;
        phone.nextElementSibling.textContent = "";
        checkPage(pageOneErrors, "first");
    }
});
email.addEventListener("change", function () {
    if (!email.value.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g)) {
        pageOneErrors[2] = true;
        email.nextElementSibling.textContent = "Must be a valid email address";
        checkPage(pageOneErrors, "first");
    }
    else {
        pageOneErrors[2] = false;
        email.nextElementSibling.textContent = "";
        checkPage(pageOneErrors, "first");
    }
});
toggleDedicatedInputWrapper.addEventListener("change", () => {
    if (toggleDedicatedInputWrapper.checked) {
        checkPage([true], "second");
        dedicatedInput.addEventListener("change", dedicatedInputHandler);
    }
    else if (!toggleDedicatedInputWrapper.checked) {
        if (!companyInput.checked) {
            checkPage([false], "second");
            dedicatedInput.removeEventListener("change", dedicatedInputHandler);
        }
    }
});
toggleCompanyInputWrapper.addEventListener("change", () => {
    if (toggleCompanyInputWrapper.checked) {
        checkPage([true], "second");
        companyInput.addEventListener("change", companyInputHandler);
    }
    else if (!companyInput.checked) {
        if (!dedicatedInput.checked) {
            checkPage([false], "second");
            companyInput.removeEventListener("change", companyInputHandler);
        }
    }
});
amountField.addEventListener("change", (event) => {
    if (amountField.value == "custom") {
        customAmountWrapper.style.display = "block";
        customAmount.addEventListener("change", customAmountHandler);
    }
    else if (amountField.value != "undefined") {
        pageThreeErrors[0] = false;
        checkPage(pageThreeErrors, "third");
    }
});
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    var formValues = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        phone: phone.value,
        country: country.value,
        anonymousDonation: anonymousDonation.checked,
        dedicatedToPerson: dedicatedInput.value,
        representedOrganisation: companyInput.value,
        amount: parseInt(amountField.value),
    };
    if (amountField.value == "custom") {
        formValues.amount = parseInt(customAmount.value);
    }
    var destination = JSON.stringify({
        key: merchantKeyPair.split("=")[1],
        id: merchantIdPair.split("=")[1]
    });
    console.log(`Sending ${JSON.stringify(formValues)} with credentials ${destination}`);
    // fetch("localhost", {
    //   method: "POST",
    //   mode: "no-cors"
    // })
});
//# sourceMappingURL=widgetHandler.js.map