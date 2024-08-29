// Parsing the URL
var merchantKey = "";
var merchantId = "";
if (document && typeof document === "object") {
    const currentOrigin = document.querySelector("#uniqueDonationScript").getAttribute("src").split("?")[1];
    const credentialParams = new URLSearchParams(currentOrigin);
    console.log(credentialParams);
    if (credentialParams.get("key") && credentialParams.get("id")) {
        merchantKey = credentialParams.get("key");
        merchantId = credentialParams.get("id");
    }
    else {
        alert("Please ensure you include credential parameters for the PeoplesPay donation widget.");
    }
}
// Declaring main constants
const desktopIframe = document.createElement("iframe");
const mobileIframe = document.createElement("iframe");
const desktopToggler = document.createElement("div");
const mobileToggler = document.createElement("div");
const icon = document.createElement("img");
const iconMobile = document.createElement("img");
const closeIcon = document.createElement("img");
const closeIconMobile = document.createElement("img");
icon.setAttribute("src", "/static/assets/peoplespay-icon-monochrome.svg");
closeIcon.setAttribute("src", "/static/assets/close-icon.svg");
iconMobile.setAttribute("src", "/static/assets/peoplespay-icon-monochrome.svg");
closeIconMobile.setAttribute("src", "/static/assets/close-icon.svg");
mobileIframe.setAttribute("src", `./static/index-mobile.html?key=${merchantKey}&id=${merchantId}`);
mobileIframe.style.width = "calc(100vw - 16px)";
mobileIframe.style.height = "calc(88vh - 60px)";
mobileIframe.style.border = "1px";
mobileIframe.style.display = "none";
mobileIframe.style.position = "fixed";
mobileIframe.style.marginRight = "auto";
mobileIframe.style.marginLeft = "auto";
mobileIframe.style.bottom = "60px";
desktopIframe.setAttribute("src", `./static/index.html?key=${merchantKey}&id=${merchantId}`);
desktopIframe.setAttribute("id", "ifrm");
desktopIframe.style.width = "450px";
desktopIframe.style.height = "520px";
desktopIframe.style.border = "1px";
desktopIframe.style.display = "none";
desktopIframe.style.position = "fixed";
desktopIframe.style.bottom = "80px";
desktopIframe.style.right = "16px";
desktopToggler.setAttribute("class", "desktopToggler");
desktopToggler.style.width = "48px";
desktopToggler.style.height = "48px";
desktopToggler.style.backgroundColor = "lightblue";
desktopToggler.style.borderRadius = "50%";
desktopToggler.style.position = "fixed";
desktopToggler.style.bottom = "16px";
desktopToggler.style.right = "16px";
desktopToggler.style.display = "flex";
desktopToggler.style.alignItems = "center";
desktopToggler.style.justifyContent = "center";
mobileToggler.setAttribute("class", "mobileToggler");
mobileToggler.style.width = "36px";
mobileToggler.style.height = "36px";
mobileToggler.style.backgroundColor = "lightblue";
mobileToggler.style.borderRadius = "50%";
mobileToggler.style.position = "fixed";
mobileToggler.style.bottom = "16px";
mobileToggler.style.right = "16px";
mobileToggler.style.display = "flex";
mobileToggler.style.alignItems = "center";
mobileToggler.style.justifyContent = "center";
icon.style.scale = "0.5";
iconMobile.style.scale = "0.5";
closeIcon.style.scale = "0";
closeIcon.style.display = "none";
closeIconMobile.style.scale = "0";
closeIconMobile.style.display = "none";
if (window.innerWidth > 450) {
    desktopToggler.style.display = "flex";
    mobileToggler.style.display = "none";
}
else {
    desktopToggler.style.display = "none";
    mobileToggler.style.display = "flex";
}
desktopToggler.appendChild(icon);
desktopToggler.appendChild(closeIcon);
document.body.appendChild(desktopToggler);
mobileToggler.appendChild(iconMobile);
mobileToggler.appendChild(closeIconMobile);
document.body.appendChild(mobileToggler);
document.body.appendChild(desktopIframe);
document.body.appendChild(mobileIframe);
function visibleFunction(display) {
    if (display == "block") {
        desktopToggler.style.backgroundColor = "lightblue";
        mobileToggler.style.backgroundColor = "lightblue";
        return "none";
    }
    else {
        desktopToggler.style.backgroundColor = "pink";
        mobileToggler.style.backgroundColor = "pink";
        return "block";
    }
}
desktopToggler.addEventListener("click", () => {
    if (window.innerWidth > 450) {
        desktopIframe.style.display = visibleFunction(desktopIframe.style.display);
    }
    else {
        mobileIframe.style.display = visibleFunction(mobileIframe.style.display);
    }
    if (icon.style.scale == "0.5") {
        icon.style.scale = "0";
        icon.style.display = "none";
        closeIcon.style.display = "block";
        closeIcon.style.scale = "0.5";
    }
    else {
        icon.style.scale = "0.5";
        icon.style.display = "block";
        closeIcon.style.display = "none";
        closeIcon.style.scale = "0";
    }
});
mobileToggler.addEventListener("click", () => {
    if (window.innerWidth > 450) {
        desktopIframe.style.display = visibleFunction(desktopIframe.style.display);
    }
    else {
        mobileIframe.style.display = visibleFunction(mobileIframe.style.display);
    }
    if (iconMobile.style.scale == "0.5") {
        iconMobile.style.scale = "0";
        iconMobile.style.display = "none";
        closeIconMobile.style.display = "block";
        closeIconMobile.style.scale = "0.5";
    }
    else {
        iconMobile.style.scale = "0.5";
        iconMobile.style.display = "block";
        closeIconMobile.style.display = "none";
        closeIconMobile.style.scale = "0";
    }
});
//# sourceMappingURL=vendorScript.js.map