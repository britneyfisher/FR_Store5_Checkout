describe("Checkout a Product in MY FR Store5", () => {
  beforeEach(() => {
    cy.visit("https://lillii5.sftest.store/");
  });

  it("Verify that the order is placed successsfully", () => {
    cy.Checkout_Product();
    cy.Shipping_Address_Form();
    // cy.Payment_Method_Form();
    // cy.GrabIframe("#card-number > iframe").click().type("hi");
    cy.addCardNewCustomerCybersourceCardNumber({
      cardNumber: "370000000000002",
      expiry: "0330",
    });
  });
});
