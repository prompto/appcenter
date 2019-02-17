export default class Activity {

}

// initial state
class Loading extends Activity {

}

class Editing extends Activity {

}

class Running extends Activity {

}

// one run is done
class Idling extends Activity {

}

class Debugging extends Activity {

}

Activity.Loading = new Loading();
Activity.Editing = new Editing();
Activity.Running = new Running();
Activity.Idling = new Idling();
Activity.Debugging = new Debugging();



