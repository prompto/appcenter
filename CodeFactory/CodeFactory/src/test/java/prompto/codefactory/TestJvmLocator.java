package prompto.codefactory;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.Test;

public class TestJvmLocator {

	@Test
	public void locatesJava17() {
		assertNotNull(JvmLocator.locateJava17());
	}
	
	@Test
	public void extractsFixVersions() {
		String[] namesAndVersions = { 
				"jdk-11.0.2.jdk", "0", "2",
				"java-11-openjdk-11.0.14.0.9-1.el7_9.x86_64", "0", "14"
		};
		for(int i = 0; i < namesAndVersions.length; i += 3) {
			assertEquals(namesAndVersions[i+1], JvmLocator.minorNumberOf("11", namesAndVersions[i]));
			assertEquals(namesAndVersions[i+2], JvmLocator.fixNumberOf("11", namesAndVersions[i]));
		}
	}
	

}
