exports.getParam = function(name) {
    /*eslint no-useless-escape: "off"*/
    let value = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href)[1];
    return decodeURIComponent(value);
};

exports.print = function(msg) {
    const doc = document.getElementById("output");
    doc.innerHTML += msg + "<br/>";
};
