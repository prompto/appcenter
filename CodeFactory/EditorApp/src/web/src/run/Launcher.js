import {print} from "../utils/Utils";
import fetcher from '../utils/Fetcher';
import Activity from '../utils/Activity';

export default class Launcher {

    constructor(root, content, runMode, debug) {
        this.root = root;
        this.content = content;
        this.runMode = runMode;
        this.debug = debug
        this.checkLaunchable = this.checkLaunchable.bind(this);
        this.doLaunch = this.doLaunch.bind(this);
        this.runMethod = this.runMethod.bind(this);
        this.openPage = this.openPage.bind(this);
    }

    launch() {
        this.getLaunchableContent(runnable => this.checkLaunchable(runnable, this.doLaunch));
    }

    getLaunchableContent(callback) {
        if(this.content==null)
            return callback(null);
        // check runnable code
        else if(this.content.subType==="test" || (this.content.subType==="method" && this.content.main))
            return callback({ valid: true, content: this.content });
        // check runnable page
        else if(this.root.getProject().type !== "WebSite")
            return callback({ valid: false, content: null });
        else if(this.content.type==="html" || this.content.type==="page")
            return callback({ valid: true, content: this.content });
        else if(this.content.subType!=="widget")
            return callback({ valid: false, content: null });
        else
            this.root.promptoEditor.fetchRunnablePage(this.content, callback);
    }

    checkLaunchable(runnable, andThen) {
        if (runnable == null) {
            alert("Nothing to run!");
        } else if (!runnable.valid) {
            alert("Can only run tests methods, main methods or web pages!");
            return;
        } else
            andThen(runnable);
    }

    doLaunch(runnable) {
        if (runnable.content.type === "html" || runnable.content.type === "page")
            this.openPage(runnable.content);
        else
            this.runMethod(runnable.content);
    }

    runMethod(content) {
        this.root.setState({activity: Activity.Running});
        print("Running " + content.name + "...");
        this.root.promptoEditor.runMethod(content, this.runMode);
    }

    openPage(content) {
        fetcher.fetchModuleURL(this.root.projectId, url => {
            const fullUrl = url + content.name;
            const tab = window.open(fullUrl, '_blank', '');
            if(tab)
                tab.focus();
            else {
                var msg = "It seems your browser is blocking popups.\n" +
                    "Allow popups for [*.]prompto.cloud to open your web site automatically.\n" +
                    "Alternately, open a new tab or window with the following URL:\n" +
                    fullUrl;
                alert(msg);
            }

        }, alert);
    }



}