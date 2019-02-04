import TreeItem from './TreeItem';

export default class ResourceItem extends TreeItem {

    constructor(props) {
        super(props);
        this.state = { contextMenu: null };
        this.expandContent = this.expandContent.bind(this);
        this.handleContextMenu = this.handleContextMenu.bind(this);
        this.handleDocumentClick = this.handleDocumentClick.bind(this);
    }

    expandContent(content, simulateClick) {
        if(content.type===this.props.resource.type && content.value.name===this.props.resource.value.name){
            if(simulateClick)
                this.select();
            return true;
        } else
            return false;
    }

    handleContextMenu(e) {
        e.preventDefault();
        this.setState( { contextMenu: true, menuLeft: e.pageX,  menuTop: e.pageY } );
        document.addEventListener("click", this.handleDocumentClick );
        document.addEventListener("contextmenu", this.handleDocumentClick );
    }

    contains(elem, child) {
        while(child!=null) {
            if(child===elem)
                return true;
            child = child.parentElement;
        }
        return false;
    }

    handleDocumentClick(e) {
        const menu = document.getElementById("item-menu");
        const inside = this.contains(menu, e.target);
        // only bubble up useful clicks
        if(!inside || e.target.href==="#")
            e.stopPropagation();
        this.setState( { contextMenu: false } );
        document.removeEventListener("contextmenu", this.handleDocumentClick );
        document.removeEventListener("click", this.handleDocumentClick );
    }



}