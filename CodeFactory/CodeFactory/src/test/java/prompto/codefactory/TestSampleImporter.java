package prompto.codefactory;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import prompto.code.Batch;
import prompto.code.ICodeStore;
import prompto.code.Module;
import prompto.code.ModuleType;
import prompto.code.Thesaurus;
import prompto.code.WebLibrary;
import prompto.codefactory.SampleImporter;
import prompto.config.IRuntimeConfiguration;
import prompto.config.TempDirectories;
import prompto.intrinsic.PromptoVersion;
import prompto.libraries.Libraries;
import prompto.runtime.Mode;
import prompto.runtime.Standalone;
import prompto.store.memory.MemStore;

public class TestSampleImporter {

	@Before
	public void before() throws Exception {
		TempDirectories.create();
		Mode.set(Mode.UNITTEST);
		Standalone.bootstrapCodeStore(new MemStore(), newRuntimeConfig());
	}
	
	private IRuntimeConfiguration newRuntimeConfig() {
		return new IRuntimeConfiguration.Inline()
			.withApplicationName("test")
			.withApplicationVersion(PromptoVersion.parse("1.0.0"))
			.withRuntimeLibs(()->Libraries.getPromptoLibraries(Libraries.class))
			.withRuntimeMode(Mode.UNITTEST);
	}

	@Test
	public void salesAppIsImported() throws Exception {
		SampleImporter importer = new SampleImporter("samples/Sales/");
		importer.importModule(ICodeStore.getInstance());
		assertTrue(importer.module instanceof Batch);
		assertNotNull(importer.module.getDbId());
		assertNotNull(((Batch)importer.module).getStartMethod());
	}

	@Test
	public void inventoryAppIsImported() throws Exception {
		SampleImporter importer = new SampleImporter("samples/Inventory/");
		importer.importModule(ICodeStore.getInstance());
		assertTrue(importer.module instanceof Batch);
		assertNotNull(importer.module.getDbId());
		assertNotNull(((Batch)importer.module).getStartMethod());
	}

	@Test
	public void soupAppIsImported() throws Exception {
		SampleImporter importer = new SampleImporter("samples/Soup/");
		importer.importModule(ICodeStore.getInstance());
		assertTrue(importer.module instanceof Batch);
		assertNotNull(importer.module.getDbId());
		assertNotNull(((Batch)importer.module).getStartMethod());
	}

	@Test
	public void myAppIsImported() throws Exception {
		SampleImporter importer = new SampleImporter("samples/MyApp/");
		importer.importModule(ICodeStore.getInstance());
		assertTrue(importer.module instanceof Batch);
		assertNotNull(importer.module.getDbId());
		assertNotNull(((Batch)importer.module).getStartMethod());
	}
	
	@Test
	public void thesaurusIsImported() throws Exception {
		SampleImporter importer = new SampleImporter("libraries/thesaurus/");
		importer.importModule(ICodeStore.getInstance());
		assertTrue(importer.module instanceof Thesaurus);
		assertNotNull(importer.module.getDbId());
	}
	
	@Test
	public void reactBootstrapIsImported() throws Exception {
		SampleImporter importer = new SampleImporter("libraries/react-bootstrap-3/");
		importer.importModule(ICodeStore.getInstance());
		assertTrue(importer.module instanceof WebLibrary);
		assertNotNull(importer.module.getDbId());
		assertNotNull(((WebLibrary)importer.module).getWidgetLibrary());
		assertNull(((WebLibrary)importer.module).getHtmlEngine());
		assertNull(((WebLibrary)importer.module).getUIFramework());
	}
	
	@Test
	public void reactBootstrapNewVersionIsImported() throws Exception {
		SampleImporter importer = new SampleImporter("samples/react-bootstrap-3-1.0.0/");
		importer.importModule(ICodeStore.getInstance());
		Module module = ICodeStore.getInstance().fetchModule(ModuleType.WEBLIBRARY, "React-Bootstrap-3", PromptoVersion.LATEST);
		assertEquals(PromptoVersion.parse("1.0.0"), module.getVersion());
		importer = new SampleImporter("samples/react-bootstrap-3-1.0.1/");
		importer.importModule(ICodeStore.getInstance());
		module = ICodeStore.getInstance().fetchModule(ModuleType.WEBLIBRARY, "React-Bootstrap-3", PromptoVersion.LATEST);
		assertEquals(PromptoVersion.parse("1.0.1"), module.getVersion());
		module = ICodeStore.getInstance().fetchModule(ModuleType.WEBLIBRARY, "React-Bootstrap-3", PromptoVersion.parse("1.0.0"));
		assertNotNull(module);
		}
	
	@Test
	public void reactBootstrapIsUpdated() throws Exception {
		SampleImporter importer = new SampleImporter("samples/react-bootstrap-3-1.0.0/");
		importer.importModule(ICodeStore.getInstance());
		Module module = ICodeStore.getInstance().fetchModule(ModuleType.WEBLIBRARY, "React-Bootstrap-3", PromptoVersion.LATEST);
		assertEquals(PromptoVersion.parse("1.0.0"), module.getVersion());
		importer = new SampleImporter("samples/react-bootstrap-3-1.0.2/");
		importer.importModule(ICodeStore.getInstance());
		module = ICodeStore.getInstance().fetchModule(ModuleType.WEBLIBRARY, "React-Bootstrap-3", PromptoVersion.LATEST);
		assertEquals(PromptoVersion.parse("1.0.2"), module.getVersion());
		module = ICodeStore.getInstance().fetchModule(ModuleType.WEBLIBRARY, "React-Bootstrap-3", PromptoVersion.parse("1.0.0"));
		assertNull(module);
		
	}

}
