package prompto.codefactory;

import prompto.server.AppServer;

public abstract class FactoryApplicationForTesting {

	public static void main(String[] args) throws Throwable {
		AppServer.setHttpUser("eric.vergnaud@wanadoo.fr");
		Application.main(args);
	}

}
