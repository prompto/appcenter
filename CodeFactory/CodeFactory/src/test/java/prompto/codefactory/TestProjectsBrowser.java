package prompto.codefactory;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.experimental.categories.Category;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import prompto.server.HeadlessTests;

@Category(HeadlessTests.class)
public class TestProjectsBrowser extends BaseUITest {

	@Test
	public void canOnlyCreateNamedProject() throws Exception {
		String url = "http://localhost:" + HTTP_PORT;
		webDriver.get(url);
		WebElement btnNewProject = waitElement(By.id("btnNewProject"), 2);
		click(btnNewProject, 100);
		WebElement btnNext = waitElement(By.id("btnNext"), 2);
		click(btnNext,100);
		WebElement btnCreate = waitElement(By.id("btnCreate"), 2);
		assertFalse(btnCreate.isEnabled());
		WebElement nameInput = waitElement(By.id("name"), 2);
		sendKeys(nameInput, "Project", 100);
		assertTrue(btnCreate.isEnabled());
	}
}
