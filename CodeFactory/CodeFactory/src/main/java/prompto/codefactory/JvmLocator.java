package prompto.codefactory;

import java.io.File;
import java.util.Optional;
import java.util.stream.Stream;

public abstract class JvmLocator {

	public static String locateJava8() {
		String jvmDir = locateJdkDir();
		if(jvmDir==null)
			return "java";
		else
			return locateJvmExe(jvmDir);
	}

	private static String locateJdkDir() {
		File jvms = locateJvmsDir();
		Optional<String> jvm = Stream.of(jvms.list())
				.filter(s -> s.contains("jdk") && s.contains("1.8"))
				.sorted((s1,s2)->{
					s1 = s1.substring(s1.indexOf('_'));
					s1 = s1.substring(1, s1.indexOf('.'));
					s2 = s2.substring(s2.indexOf('_'));
					s2 = s2.substring(1, s2.indexOf('.'));
					return Integer.compareUnsigned(Integer.parseInt(s2), Integer.parseInt(s1)); // reverse order 
				})
				.findFirst();
		if(jvm.isPresent())
			return jvms.getAbsolutePath() + "/" + jvm.get();
		else
			return null;
	}

	private static File locateJvmsDir() {
		File file = new File("/usr/lib/jvm/");
		if(file.exists())
			return file;
		file = new File("/Library/java/JavaVirtualMachines/");
		if(file.exists())
			return file;
		else
			throw new RuntimeException("Unable to locate JVM");
	}

	private static String locateJvmExe(String jvmDir) {
		File dirFile = new File(jvmDir);
		// special case for MacOS X
		File embedded = new File(dirFile, "Contents/Home");
		if(embedded.exists())
			dirFile = embedded;
		embedded = new File(dirFile, "jre");	
		if(embedded.exists())
			dirFile = embedded;
		return new File(dirFile, "bin/java").getAbsolutePath();
	}


}
