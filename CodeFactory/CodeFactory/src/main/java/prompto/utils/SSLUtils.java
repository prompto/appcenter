package prompto.utils;

import java.io.IOException;
import java.net.URL;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.KeyManager;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;


public abstract class SSLUtils {
	
	@FunctionalInterface
	public interface ResultSupplier<T> {
		T apply(HttpsURLConnection cnx) throws IOException;
	}
	
	public static <T> T acceptingAllCertificates(URL url, ResultSupplier<T> supplier) throws Exception {
		SSLContext ssl = SSLContext.getDefault();
		SSLContext tls = SSLContext.getInstance("TLS");
		tls.init(new KeyManager[0], new TrustManager[] {new TrustAllCertificatesManager()}, new SecureRandom());
		SSLContext.setDefault(tls);
		try {
			HttpsURLConnection cnx = (HttpsURLConnection) url.openConnection();
			try {
				cnx.setHostnameVerifier(new HostnameVerifier() { @Override public boolean verify(String hostName, SSLSession session) { return true; } });
				return supplier.apply(cnx);
			} finally {
				cnx.disconnect();
			}
		} finally {
			SSLContext.setDefault(ssl);
		}
	}

	private static class TrustAllCertificatesManager implements X509TrustManager {
        @Override public void checkClientTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {}
        @Override public void checkServerTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {}
        @Override public X509Certificate[] getAcceptedIssuers() { return null; }
    }
}
