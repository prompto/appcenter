package prompto.imports;

import java.net.URL;

public class URLWithMimeType {
	
	URL url;
	String mimeType;
	
	public URLWithMimeType(URL url, String mimeType) {
		this.url = url;
		this.mimeType = mimeType;
	}

	public URL getUrl() {
		return url;
	}

	public String getMimeType() {
		return mimeType;
	}

	
	
}
