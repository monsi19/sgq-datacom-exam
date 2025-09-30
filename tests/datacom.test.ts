import { test, expect } from '@playwright/test';

test('Contains title', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/bugs-form');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/QA Practice | Learn with RV/);
});

test('First Name is present and contains asterisk', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/bugs-form');

  // Expect First Name to be present and have asterisk
  const firstNameLabel = page.getByText("First Name");
  await expect(firstNameLabel).toContainText('First Name*');  

  //Populate the First Name text box
  const firstNameTextBox = page.locator('input[id="firstName"]');
  await firstNameTextBox.fill('Sebastian');
});

test('Last Name is present and contains asterisk', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/bugs-form');

  // Expect Last Name to be present and have asterisk
  const lastNameLabel = page.getByText("Last Name");
  await expect(lastNameLabel).toContainText('Last Name*');  

  //Populate the Last Name text box
  const firstNameTextBox = page.locator('input[id="lastName"]');
  await firstNameTextBox.fill('Quintana');
});

test('Phone number is present,contains asterisk, and textbox length does not exceed 10 characterd', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/bugs-form');

  // Expect Phone number to be present and have asterisk
  const phoneNumberLabel = page.getByText("Phone number");
  await expect(phoneNumberLabel).toContainText('Phone number*');

  //Populate the Phone number text box
  const phoneNumberTextBox = page.locator('input[id="phone"]');
  await phoneNumberTextBox.fill('123456789011');
  //Check if the length of the text box does not exceed 10 characters
  await expect(phoneNumberTextBox).toHaveCount(10);
});

test('Country is present and contains asterisk', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/bugs-form');

  // Expect Country to be present and have asterisk
  const countryLabel = page.getByText("Country");
  await expect(countryLabel).toContainText('Country*');

  //Populate the Country dropdown
  const countryDropdown = page.locator('select[id="countries_dropdown"]');
  await countryDropdown.selectOption('Philippines');
});

test('Email address is present and contains asterisk', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/bugs-form');

  // Expect Email address to be present and have asterisk
  const emailAddressLabel = page.getByText("Email address");
  await expect(emailAddressLabel).toContainText('Email address*');

  //Populate the Email address text box
  const emailAddressTextBox = page.locator('input[id="emailAddress"]');
  await emailAddressTextBox.fill('test@testing.com');
});

test('Password is present, contains asterisk, and field length is between 6-20 characters', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/bugs-form');

  // Expect Password to be present and have asterisk
  const passwordLabel = page.getByText("Password");
  await expect(passwordLabel).toContainText('Password*');

  //Populate the Password text box
  const passwordTextBox = page.locator('input[id="password"]');
  await passwordTextBox.fill('P@ssw0rd123456789012');

  //Check if the password field is of type password
  await expect(passwordTextBox).toHaveAttribute('type', 'password');

  //Check if the length of the text box is between 6-20 characters
  await expect(passwordTextBox).toHaveCount(20);
});

test('Password help text', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/bugs-form');

  //Check if the Password helper text is correct
  const passwordHelpText = page.locator('small[id="pwHelp"]');
  await expect(passwordHelpText).toContainText('Password length validation: 6-20 characters');
});

test("Terms and conditions checkbox is present", async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/bugs-form');

  // Expect Terms and conditions checkbox to be present
  const termsAndConditionsCheckbox = page.locator('input[id="exampleCheck1"]');
  await expect(termsAndConditionsCheckbox).toBeVisible();

  //Click the checkbox
  await termsAndConditionsCheckbox.check();
  await expect(termsAndConditionsCheckbox).toBeChecked();
});

test('Register button is present', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/bugs-form');

  // Expect Register button to be present
  const registerButton = page.locator('button[id="registerBtn"]');
  await expect(registerButton).toBeVisible();

  //Click the Register button
  await registerButton.click();
});

test('Success message is displayed upon form submission', async ({ page }) => {
  await page.goto('https://qa-practice.netlify.app/bugs-form');

  //Populate the form fields
  await page.locator('input[id="firstName"]').fill('Sebastian');
  await page.locator('input[id="lastName"]').fill('Quintana');
  await page.locator('input[id="phone"]').fill('1234567890');
  await page.locator('select[id="countries_dropdown"]').selectOption('Philippines');
  await page.locator('input[id="emailAddress"]').fill('testing@test.com)');
  await page.locator('input[id="password"]').fill('P@ssw0rd123');
  await page.locator('input[id="exampleCheck1"]').check();
  await page.locator('button[id="registerBtn"]').click();

  //Check if the success message is displayed
  const successMessage = page.locator('div[id="message"]');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toContainText('Successfully registered the following information');

  //Verify that the success message contains the correct information
  const firstNameInfo = page.locator('div[id="resultFn"]');
  const lastNameInfo = page.locator('div[id="resultLn"]');
  const phoneInfo = page.locator('div[id="resultPhone"]');
  const countryInfo = page.locator('div[id="country"]');
  const emailInfo = page.locator('div[id="resultEmail"]');
  await expect(firstNameInfo).toContainText('Sebastian');
  await expect(lastNameInfo).toContainText('Quintana');
  await expect(phoneInfo).toContainText('1234567890');
  await expect(countryInfo).toContainText('Philippines');
  await expect(emailInfo).toContainText('testing@test.com');
});
