Cypress.Commands.add("Checkout_Product", () => {
  cy.WaitforelementtoVisible();
  cy.get("webruntime-app")
    .find(".slds-p-around_small.tile-header")
    .first()
    .click({ force: true });
  cy.Select_Product("[title='GoBrew Connected Coffee Machine']");
  cy.Increase_Quanity();
  cy.Checkout_Button();
  cy.WaitforelementtoVisible();
  cy.go("back");
  cy.Select_Product(
    "[title='BigfootBar Blueberry/Pistacio Paleo, 2oz bar - 6 pack']"
  );
  cy.Increase_Quanity();
  cy.Checkout_Button();
  cy.WaitforelementtoVisible();
  cy.get("webruntime-app").find("[title='Close']").click();
  cy.Select_Product(".slds-global-actions__item-action");
  cy.WaitforelementtoVisible();
  cy.get("webruntime-app")
    .find(".slds-button.slds-button_brand")
    .last()
    .click({ force: true });
});

Cypress.Commands.add("Shipping_Address_Form", () => {
  cy.fixture("shipping").then((formdata) => {
    cy.WaitforelementtoVisible();
    const randomIndex = Math.floor(Math.random() * formdata.data.length);
    const randomData = formdata.data[randomIndex];
    cy.TypeDatawithSelector("[inputmode='email']", randomData.email);
    cy.TypeDatawithSelector("[name='firstname']", randomData.firstname);
    cy.TypeDatawithSelector("[name='lastname']", randomData.lastname);
    cy.TypeDatawithSelector("[name='street']", randomData.street);
    cy.TypeDatawithSelector("[name='city']", randomData.city);
    cy.get("webruntime-app").find("[name='province']").first().click();
    cy.get("webruntime-app").find('[data-value="GA"]').click();
    cy.TypeDatawithSelector("[name='postalCode']", randomData.postalCode);
    cy.TypeDatawithSelector("[name='phonenumber']", randomData.phoneNumber);
  });
});

Cypress.Commands.add("Payment_Method_Form", (iframe) => {
  cy.WaitforelementtoVisible();
  cy.get("webruntime-app")
    .get("iframe")
    .its("0.contentDocument.body")
    .should("be.visible")
    .then(cy.wrap)
    .find("[name='card-number']")
    .click()
    .type("4242424242424242");
});

// cy.get("webruntime-app").find("[name='card-number']").type("424242424242");
// cy.get("webruntime-app").find("[name='cardholder-name']").type("Britney");
// cy.get("webruntime-app").find("[name='expiry-date']").type("09/23");
// cy.get("webruntime-app").find("[name='cvv']").type("325");
// cy.WaitforelementtoVisible();
// cy.get("webruntime-app").find("slds-button slds-button_brand").click();

Cypress.Commands.add("Select_Product", (Selector) => {
  cy.WaitforelementtoVisible();
  cy.get("webruntime-app").find(Selector).click({ force: true });
});

Cypress.Commands.add("Checkout_Button", () => {
  cy.get("webruntime-app")
    .find(".slds-button.slds-button_brand")
    .contains("ADD TO CART")
    .click({ force: true });
});

Cypress.Commands.add("Increase_Quanity", () => {
  cy.WaitforelementtoVisible();
  cy.Select_Product("[aria-label='Increase number of items']").click({
    force: true,
  });
});
