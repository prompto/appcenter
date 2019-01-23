package prompto.config;

import java.util.Map;
import java.util.function.Supplier;

public class CodeFactoryConfiguration extends ServerConfiguration implements ICodeFactoryConfiguration {

	Supplier<ITargetConfiguration> targetConfiguration;

	public CodeFactoryConfiguration(IConfigurationReader reader, Map<String, String> argsMap) {
		super(reader, argsMap);
		this.targetConfiguration = ()->readTargetConfiguration();
	}

	private ITargetConfiguration readTargetConfiguration() {
		IConfigurationReader child = reader.getObject("target");
		return child==null ? null : new TargetConfiguration(child);
	}

	@Override
	public ITargetConfiguration getTargetConfiguration() {
		return targetConfiguration==null ? null : targetConfiguration.get();
	}
	
	
	
}
