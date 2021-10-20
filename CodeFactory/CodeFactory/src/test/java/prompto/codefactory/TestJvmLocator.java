package prompto.codefactory;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;

public class TestJvmLocator {

	@Test
	public void locatesJava8() {
		assertNotNull(JvmLocator.locateJava8());
	}
	
	@Test
	public void extractsLinuxFixVersion() {
		String fullName = "java-1.8.0-openjdk-1.8.0.302.b08-0.el7_9.x86_64";
		assertEquals("302", JvmLocator.fixNumberOf(fullName));
	}
	
	@Test
	public void extractsMacOSFixVersion() {
		String fullName = "jdk1.8.0_281.jdk";
		assertEquals("281", JvmLocator.fixNumberOf(fullName));
	}

}
