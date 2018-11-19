package prompto.config;

public interface IPortRangeConfiguration {

	int getMinPort();
	int getMaxPort();

	public static IPortRangeConfiguration ANY_PORT = new IPortRangeConfiguration() {

		@Override
		public int getMinPort() {
			return 1024;
		}
		
		@Override
		public int getMaxPort() {
			return 65535;
		}
	};

}
