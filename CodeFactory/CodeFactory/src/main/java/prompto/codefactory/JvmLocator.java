package prompto.codefactory;

import java.io.File;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

import prompto.utils.Logger;

public abstract class JvmLocator {

	static Logger logger = new Logger();

	public static String locateJava17() {
		String jvmDir = locateJdkDir();
		if(jvmDir==null)
			return "java";
		else
			return locateJvmExe(jvmDir);
	}

	private static String locateJdkDir() {
		File jvms = locateJvmsDir();
		Optional<String> jvm = Stream.of(jvms.list())
				.filter(s -> s.contains("jre-17."))
				.filter(s -> minorNumberOf(s) != null)
				.filter(s -> fixNumberOf(s) != null)
				.sorted((s1, s2)->{
					var n1 = minorNumberOf(s1);
					var n2 = minorNumberOf(s2);
					if(Objects.equals(n1, n2)) {
						n1 = fixNumberOf(s1);
						n2 = fixNumberOf(s2);
					}
					return Integer.compareUnsigned(Integer.parseInt(n2), Integer.parseInt(n1)); // reverse order 
				})
				.findFirst();
		if(jvm.isPresent())
			return jvms.getAbsolutePath() + "/" + jvm.get();
		else
			return null;
	}

	public static String minorNumberOf(String s) {
		logger.info(()->"Locating minor number in " + s);
		int idx = s.indexOf("jdk");
		if(idx < 0)
			return null;
		String number = s.substring(idx + 3);
		idx = number.indexOf("17.");
		if(idx < 0)
			return null;
		number = number.substring(idx + 3);
		if(Character.isDigit(number.charAt(0))) {
			idx = number.indexOf(".");
			return idx < 0 ? number : number.substring(0, number.indexOf('.'));
		} else 
			return null;
	}

	public static String fixNumberOf(String s) {
		logger.info(()->"Locating fix number in " + s);
		int idx = s.indexOf("jdk");
		if(idx < 0)
			return null;
		String number = s.substring(idx + 3);
		idx = number.indexOf("17.");
		if(idx < 0)
			return null;
		number = number.substring(idx + 3);
		idx = number.indexOf(".");
		if(idx < 0)
			return null;
		number = number.substring(idx + 1);
		idx = number.indexOf(".");
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
