package prompto.config;

import java.util.function.Supplier;

public class TargetConfiguration implements ITargetConfiguration  {

	IConfigurationReader reader;
	Supplier<IStoreConfiguration> dataStoreConfiguration;
	Supplier<IPortRangeConfiguration> portRangeConfiguration;

	public TargetConfiguration(IConfigurationReader reader) {
		this.reader = reader;
		this.dataStoreConfiguration = ()->reader.readStoreConfiguration("dataStore");
		this.portRangeConfiguration = ()->readPortRangeConfiguration();
	}
	
	private IPortRangeConfiguration readPortRangeConfiguration() {
		IConfigurationReader child = reader.getObject("portRange");
		return child==null ? IPortRangeConfiguration.ANY_PORT : new PortRangeConfiguration(child);
	}

	@Override
	public IStoreConfiguration getDataStoreConfiguration() {
		return dataStoreConfiguration==null ? null : dataStoreConfiguration.get();
	}
	
	
	@Override
	public IPortRangeConfiguration getPortRangeConfiguration() {
		return portRangeConfiguration==null ? null : portRangeConfiguration.get();
	}

}
