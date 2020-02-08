package prompto.codefactory;

import static org.junit.Assert.*;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.experimental.categories.Category;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import prompto.declaration.DeclarationList;
import prompto.parser.OCleverParser;
import prompto.runtime.ApplicationContext;
import prompto.server.HeadlessTests;

@Ignore("Resources moved to DB, need to change strategy")
@Category(HeadlessTests.class)
public class TestProjectsBrowser extends BaseUITest {

	@Test
	public void canOnlyCreateNamedProject() throws Exception {
		registerServerCode();
		String url = "http://localhost:" + HTTP_PORT;
		webDriver.get(url);
		WebElement btnNewProject = waitElement(By.id("btnNewProject"), 5);
		click(btnNewProject, 100);
		WebElement btnNext = waitElement(By.id("btnNext"), 5);
		click(btnNext,100);
		WebElement btnCreate = waitElement(By.id("btnCreate"), 5);
		assertFalse(btnCreate.isEnabled());
		WebElement nameInput = waitElement(By.id("name"), 5);
		sendKeys(nameInput, "Project", 100);
		assertTrue(btnCreate.isEnabled());
	}

	static String SERVER_CODE = 
		"method fetchParkedModules () {\n\treturn fetch all ( Module ) where ( parked == true) order by ( name );\n}"
		+ "method fetchActiveModules () {\n\treturn fetch all ( Module ) where ( parked == false || parked == null) order by ( name );\n}"
		+ "method fetchRecentModules (Integer count) {\n\tlogin = getHttpUser();\n\tif (login is null) \n\t\tthrow NULL_REFERENCE;\n\tsessions = fetch ( RecentSession ) rows ( 1 to count) where ( login == login) order by ( lastOpened descending );\n\tallRecent = session.module for each ( session in sessions );\n\treturn filtered (allRecent) where (module => module.parked == false || module.parked == null);\n}"
		+ "storable attribute parked: Boolean;"
		+ "enumerated ModuleStatus(Text) {\n\tPROVIDED = \"Provided\";\n\tACTIVE = \"Active\";\n\tTAGGED = \"Tagged\";\n}"
		+ "storable attribute moduleStatus : ModuleStatus with index (key);"
		+ "storable category Module(name, version, description, image, dependencies, moduleStatus, parked);"
		;
	
	private void registerServerCode() throws Exception {
		OCleverParser parser = new OCleverParser(SERVER_CODE);
		DeclarationList decls = parser.parse_declaration_list();
		decls.register(ApplicationContext.get());
	}
}
