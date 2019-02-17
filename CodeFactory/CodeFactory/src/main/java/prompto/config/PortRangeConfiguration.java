package prompto.config;

import java.util.function.Supplier;

public class PortRangeConfiguration implements IPortRangeConfiguration  {

	IConfigurationReader reader;
	Supplier<Integer> minPort;
	Supplier<Integer> maxPort;

	public PortRangeConfiguration(IConfigurationReader reader) {
		this.reader = reader;
		this.minPort = ()->reader.getIntegerOrDefault("minPort", 1024);
		this.maxPort = ()->reader.getIntegerOrDefault("maxPort", 65535);
	}
	
	@Override
	public int getMinPort() {
		return minPort.get();
	}
	
	@Override
	public int getMaxPort() {
		return maxPort.get();
	}
}
