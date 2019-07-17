import ReactDOM from "react-dom";

function contains(elem, child) {
    while(child!=null) {
        if(child===elem)
            return true;
        child = child.parentElement;
    }
    return false;
}

function handleDocumentClick(e) {
    const wrapper = document.getElementById("context-menu-wrapper");
    const inside = contains(wrapper, e.target);
    // only bubble up useful clicks
    if(!inside || e.target.href==="#")
        e.stopPropagation();
    closeContextMenu();
}

export function closeContextMenu() {
    document.removeEventListener("contextmenu", handleDocumentClick);
    document.removeEventListener("click", handleDocumentClick);
    const container = document.getElementById("context");
    while(container.children.length) {
        container.removeChild(container.children[0]);
    }
}

export function displayContextMenu(e, menu) {
    e.preventDefault();
    document.addEventListener("click", handleDocumentClick );
    document.addEventListener("contextmenu", handleDocumentClick );
    const container = document.getElementById("context");
    const wrapper = document.createElement("div");
    wrapper.id = "context-menu-wrapper";
    wrapper.style.position = "fixed";
    wrapper.style.display = "block";
    wrapper.style.left = (e.pageX - window.scrollX) + "px";
    wrapper.style.top = (e.pageY - window.scrollY) + "px";
    wrapper.style.zIndex = 999999;
    container.appendChild(wrapper);
    ReactDOM.render(ReactDOM.createPortal(menu, wrapper), wrapper);
}

