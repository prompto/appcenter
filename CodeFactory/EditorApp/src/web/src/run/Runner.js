import {print} from "../utils/Utils";

export default class Runner {

    constructor(root, content, runMode) {
        this.root = root;
        this.content = content;
        this.runMode = runMode;
        this.checkRunnable = this.checkRunnable.bind(this);
        this.doRun = this.doRun.bind(this);
        this.runMethod = this.runMethod.bind(this);
    }

    tryRun() {
        this.getRunnableContent(runnable => this.checkRunnable(runnable, this.doRun));
    }

    getRunnableContent(andThen) {
        // check runnable code
        if(this.content.subType==="test" || (this.content.subType==="method" && this.content.main))
            return andThen({ valid: true, content: this.content });
        // check runnable page
        if(this.root.getProject().type !== "WebSite")
            return andThen({ valid: false, content: null });
        if(this.content.type==="html" || this.content.type==="page")
            return andThen({ valid: true, content: this.content });
        if(this.content.subType!=="widget")
            return andThen({ valid: false, content: null });
        this.root.promptoEditor.fetchRunnablePage(this.content, andThen);
    }

    checkRunnable(runnable, andThen) {
        if (runnable == null) {
            alert("Nothing to run!");
        } else if (!runnable.valid) {
            alert("Can only run tests methods, main methods or web pages!");
            return;
        } else
            andThen(runnable);
    }

    doRun(runnable) {
        if (runnable.content.type === "html" || runnable.content.type === "page")
            this.openPage(runnable.content);
        else
            this.runMethod(runnable.content);
    }

    runMethod(content) {
        this.root.setState({editMode: "RUNNING"});
        print("Running " + content.name + "...");
        this.root.promptoEditor.runMethod(content, this.runMode);
    }



}