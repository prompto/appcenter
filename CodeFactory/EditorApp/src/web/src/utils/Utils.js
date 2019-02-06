exports.getParam = function(name) {
    /*eslint no-useless-escape: "off"*/
    const values = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(values && values.length>0)
        return decodeURIComponent(values[1]);
    else
        return null;
};

exports.print = function(msg) {
    const doc = document.getElementById("output");
    doc.innerHTML += msg + "<br/>";
};
