import {print} from "../utils/Utils";
import Activity from '../utils/Activity';
import { fetchModuleURL } from './Utils';

export default class Launcher {

    constructor(root, content, runMode) {
        this.root = root;
        this.content = content;
        this.runMode = runMode;
        this.checkLaunchable = this.checkLaunchable.bind(this);
        this.doLaunch = this.doLaunch.bind(this);
        this.runMethod = this.runMethod.bind(this);
        this.openPage = this.openPage.bind(this);
    }

    tryRun() {
        this.getLaunchableContent(runnable => this.checkLaunchable(runnable, this.doLaunch));
    }

    getLaunchableContent(callback) {
        // check runnable code
        if(this.content.subType==="test" || (this.content.subType==="method" && this.content.main))
            return callback({ valid: true, content: this.content });
        // check runnable page
        if(this.root.getProject().type !== "WebSite")
            return callback({ valid: false, content: null });
        if(this.content.type==="html" || this.content.type==="page")
            return callback({ valid: true, content: this.content });
        if(this.content.subType!=="widget")
            return callback({ valid: false, content: null });
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
        fetchModuleURL(this.root.projectId, url => {
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

        });
    }



}