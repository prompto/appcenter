export default class Activity {

}

// initial state
class Loading extends Activity {

    isModuleRunning() { 
        return false; 
    }
    
}

class Editing extends Activity {

    isModuleRunning() {
        return false;
    }
}

class Running extends Activity {

    isModuleRunning() {
        return true;
    }
}

// one run is done
class Idling extends Activity {

    isModuleRunning() {
        return true;
    }
}

class Debugging extends Activity {

    isModuleRunning() {
        return true;
    }
}

Activity.Loading = new Loading();
Activity.Editing = new Editing();
Activity.Running = new Running();
Activity.Idling = new Idling();
Activity.Debugging = new Debugging();



