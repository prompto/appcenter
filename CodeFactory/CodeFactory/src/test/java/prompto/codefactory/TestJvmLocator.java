package prompto.codefactory;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;

public class TestJvmLocator {

	@Test
	public void locatesJava8() {
		assertNotNull(JvmLocator.locateJava8());
	}
}
