package prompto.codefactory;

import java.io.File;
import java.util.Optional;
import java.util.stream.Stream;

import prompto.utils.Logger;

public abstract class JvmLocator {

	static Logger logger = new Logger();

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
				.filter(s -> fixNumberOf(s) != null)
				.sorted((s1, s2)->{
					s1 = fixNumberOf(s1);
					s2 = fixNumberOf(s2);
					return Integer.compareUnsigned(Integer.parseInt(s2), Integer.parseInt(s1)); // reverse order 
				})
				.findFirst();
		if(jvm.isPresent())
			return jvms.getAbsolutePath() + "/" + jvm.get();
		else
			return null;
	}

	public static String fixNumberOf(String s) {
		logger.info(()->"Locating fix number in " + s);
		int idx = s.indexOf("jdk");
		if(idx < 0)
			return null;
		String number = s.substring(idx + 3);
		idx = number.indexOf("1.8.0");
		if(idx < 0)
			return null;
		number = number.substring(idx + 6);
		if(Character.isDigit(number.charAt(0))) {
			idx = number.indexOf(".");
			return idx < 0 ? number : number.substring(0, number.indexOf('.'));
		} else 
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
