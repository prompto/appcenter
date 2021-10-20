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
	public void extractsFixVersions() {
		String[] namesAndVersions = { 
				"java-1.8.0-openjdk-1.8.0.302.b08-0.el7_9.x86_64" , "302",
				"jdk1.8.0_281.jdk", "281",
				".java-1.8.0-openjdk-amd64.jinfo", null,
				"java-1.8.0-openjdk-amd64", null
		};
		for(int i = 0; i < namesAndVersions.length; i += 2)
			assertEquals(namesAndVersions[i+1], JvmLocator.fixNumberOf(namesAndVersions[i]));
	}
	

}
