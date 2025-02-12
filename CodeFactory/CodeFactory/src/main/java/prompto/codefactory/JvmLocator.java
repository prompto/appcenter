package prompto.codefactory;

import java.io.File;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

import prompto.utils.Logger;

public abstract class JvmLocator {

	static Logger logger = new Logger();

	public static String locateJava17() {
		String jvmDir = locateJdkDir("17");
		if(jvmDir==null)
			return "java"; // and pray
		else
			return locateJvmExe(jvmDir);
	}

	private static String locateJdkDir(String majorVersion) {
		File jvms = locateJvmsDir();
		Optional<String> jvm = Stream.of(jvms.list())
				.filter(s -> s.contains("jdk-" + majorVersion + "."))
				.filter(s -> minorNumberOf(majorVersion, s) != null)
				.filter(s -> fixNumberOf(majorVersion, s) != null)
				.sorted((s1, s2)->{
					var n1 = minorNumberOf(majorVersion, s1);
					var n2 = minorNumberOf(majorVersion, s2);
					if(Objects.equals(n1, n2)) {
						n1 = fixNumberOf(majorVersion, s1);
						n2 = fixNumberOf(majorVersion, s2);
					}
					return Integer.compareUnsigned(Integer.parseInt(n2), Integer.parseInt(n1)); // reverse order 
				})
				.findFirst();
		if(jvm.isPresent())
			return jvms.getAbsolutePath() + "/" + jvm.get();
		else
			return null;
	}

	private static String fullVersionOf(String s) {
		int idx = s.indexOf("openjdk");
		if(idx >= 0)
			return s.substring(idx + 7);
		idx = s.indexOf("jdk");
		if(idx < 0)
			return null;
		return s.substring(idx + 3);
	}

	public static String minorNumberOf(String majorVersion, String s) {
		logger.info(()->"Locating minor number in " + s);
		String number = fullVersionOf(s);
		int idx = number.indexOf(majorVersion + ".");
		if(idx < 0)
			return null;
		number = number.substring(idx + 3);
		if(Character.isDigit(number.charAt(0))) {
			idx = number.indexOf(".");
			return idx < 0 ? number : number.substring(0, number.indexOf('.'));
		} else 
			return null;
	}

	public static String fixNumberOf(String majorVersion, String s) {
		logger.info(()->"Locating fix number in " + s);
		String number = fullVersionOf(s);
		int idx = number.indexOf(majorVersion + ".");
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
		File file = locateJavaHomeDir();
		if(file!=null && file.exists())
			return file;
		file = locatedOracleJdksDir();
		if(file!=null && file.exists())
			return file;
		file = locateOpenJdksDir();
		if(file!=null && file.exists())
			return file;
		file = locateMacOSXJdksDir();
		if(file!=null && file.exists())
			return file;
		throw new RuntimeException("Unable to locate JVMs dir");
	}

	private static File locateMacOSXJdksDir() {
		return new File("/Library/java/JavaVirtualMachines/");
	}

	private static File locateOpenJdksDir() {
		return new File("/usr/lib/jvm/");
	}

	private static File locatedOracleJdksDir() {
		return new File("/usr/java/");
	}

	private static File locateJavaHomeDir() {
		String javaHome = System.getenv("JAVA_HOME");
		if(javaHome != null)
			return new File(javaHome).toPath().getParent().toFile();
		else
			return null;
	}

	private static String locateJvmExe(String jvmDir) {
		File dirFile = new File(jvmDir);
		// special case for MacOS X
		File embedded = new File(dirFile, "Contents/Home");
		if(embedded.exists())
			dirFile = embedded;
		// special case for old JDKs
		embedded = new File(dirFile, "jre");	
		if(embedded.exists())
			dirFile = embedded;
		return new File(dirFile, "bin/java").getAbsolutePath();
	}


}
