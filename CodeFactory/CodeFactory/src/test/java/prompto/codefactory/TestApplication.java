package prompto.codefactory;

import prompto.server.AppServer;

public class TestApplication {

	public static void main(String[] args) throws Throwable {
		AppServer.setHttpUser("eric.vergnaud@wanadoo.fr");
		Application.main(args);
	}

}
