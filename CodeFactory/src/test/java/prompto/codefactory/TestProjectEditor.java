package prompto.codefactory;

import static org.junit.Assert.*;

import java.net.URL;

import org.junit.Test;
import org.junit.experimental.categories.Category;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

@Category(HeadlessTests.class)
public class TestProjectEditor extends BaseUITest {

	static final String editorURL(String dbId, String name) {
		return "http://localhost:" + HTTP_PORT + "/ide/index.html?"
				+ "dbId=" + dbId
				+ "&name=" + name;
	}

	@Test
	public void newResourceCanBeCreated() throws Exception {
		URL salesSample = Thread.currentThread().getContextClassLoader().getResource("samples/Sales/");
		Application.importSample(salesSample);
		String dbId = getDbIdForModule("Sales");
		String url = editorURL(dbId, "Sales");
		webDriver.get(url);
		WebElement btnNew = waitElement(By.id("btnNew"), 2);
		click(btnNew, 100);
		WebElement menuHtml = waitElement(By.id("html"), 2);
		click(menuHtml, 100);
		WebElement btnCreate = waitElement(By.id("btnCreate"), 2);
		assertFalse(btnCreate.isEnabled());
		WebElement nameInput = waitElement(By.id("name"), 2);
		sendKeys(nameInput, "resourceName", 100);
		assertTrue(btnCreate.isEnabled());
	}
	
	@Test
	public void duplicateResourceCannotBeCreated() throws Exception {
		URL salesSample = Thread.currentThread().getContextClassLoader().getResource("samples/Sales/");
		Application.importSample(salesSample);
		String dbId = getDbIdForModule("Sales");
		String url = editorURL(dbId, "Sales");
		webDriver.get(url);
		WebElement btnNew = waitElement(By.id("btnNew"), 2);
		click(btnNew, 100);
		WebElement menuHtml = waitElement(By.id("html"), 2);
		click(menuHtml, 100);
		WebElement nameInput = waitElement(By.id("name"), 2);
		sendKeys(nameInput, "resourceName", 100);
		WebElement btnCreate = waitElement(By.id("btnCreate"), 2);
		click(btnCreate, 100);
		click(btnNew, 100);
		menuHtml = waitElement(By.id("html"), 2);
		click(menuHtml, 100);
		nameInput = waitElement(By.id("name"), 2);
		sendKeys(nameInput, "resourceName", 100);
		btnCreate = waitElement(By.id("btnCreate"), 2);
		assertFalse(btnCreate.isEnabled());
		sendKeys(nameInput, "2", 100);
		assertTrue(btnCreate.isEnabled());
	}
	
}
