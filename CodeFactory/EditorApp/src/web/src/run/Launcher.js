import {print} from "../utils/Utils";
import fetcher from '../utils/Fetcher';
import Activity from '../utils/Activity';
import Runners from './RemoteRunners';

export default class Launcher {

    constructor(root, content, runMode, debug) {
        this.root = root;
        this.content = content;
        this.runMode = runMode;
        this.debug = debug
        this.checkLaunchable = this.checkLaunchable.bind(this);
        this.doLaunch = this.doLaunch.bind(this);
        this.runLocalTestOrMethod = this.runLocalTestOrMethod.bind(this);
        this.debugLocalTestOrMethod = this.debugLocalTestOrMethod.bind(this);
        this.runRemoteTestOrMethod = this.runRemoteTestOrMethod.bind(this);
        this.debugRemoteTestOrMethod = this.debugRemoteTestOrMethod.bind(this);
        this.openWebPage = this.openWebPage.bind(this);
    }

    launch() {
        this.getLaunchableContent(this.checkLaunchable, this.doLaunch);
    }

    getLaunchableContent(checker, runner) {
        if(this.content==null)
            return checker(null, runner);
        // check runnable code
        if(this.content.subType==="test" || (this.content.subType==="method" && this.content.main))
            return checker({ valid: true, content: this.content }, runner);
        // check runnable page
        if(this.root.getProject().type !== "WebSite")
            return checker({ valid: false, content: null }, runner);
        if(this.content.type==="html" || this.content.type==="page")
            return checker({ valid: true, content: this.content }, runner);
        else {
            if(this.content.subType!=="widget")
                return checker({ valid: false, content: null }, runner);
            else
                this.root.promptoEditor.fetchRunnablePage(this.content, runnable => checker(runnable, runner));
        }
    }

    checkLaunchable(runnable, runner) {
        if (runnable == null) {
            alert("Nothing to run!");
        } else if (!runnable.valid) {
            alert("Can only run tests methods, main methods or web pages!");
            return;
        } else
            runner(runnable);
    }

    doLaunch(runnable) {
        // content is deemed runnable
        const content = runnable.content;
        if (content.type === "html" || content.type === "page")
            this.openWebPage(runnable.content);
        else if(this.runMode.startsWith("L")) {
            if(this.debug)
                this.debugLocalTestOrMethod(content);
            else
                this.runLocalTestOrMethod(content);
        } else {
            if(this.debug)
                this.debugRemoteTestOrMethod(content);
            else
                this.runRemoteTestOrMethod(content);
        }
    }

    runLocalTestOrMethod(content) {
        this.root.setState({activity: Activity.Running});
        print("Running " + content.name + "...");
        this.root.promptoEditor.runMethod(content, this.runMode);
    }

    debugLocalTestOrMethod(content) {
        alert("Not supported yet!");
    }

    runRemoteTestOrMethod(content) {
        const runner = Runners.forMode(this.runMode);
        if (runner) {
            this.root.setState({activity: Activity.Running});
            print("Running " + content.name + "...");
            runner.runContent(this.root.projectId, null, content, ()=>this.root.setState({activity: Activity.Idling}));
        } else {
            alert("Unsupported mode: " + this.runMode);
        }
    }

    debugRemoteTestOrMethod(content) {
        const runner = Runners.forMode(this.runMode);
        if (runner) {
            this.root.setState({activity: Activity.Debugging});
            // runner.debugContent(this.root.projectId, null, content));
        } else {
            alert("Unsupported mode: " + this.runMode);
        }
    }

    openWebPage(content) {
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