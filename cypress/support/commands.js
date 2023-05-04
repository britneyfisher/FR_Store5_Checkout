Cypress.Commands.add("WaitforelementtoVisible", () => {
  cy.wait(3000);
});

Cypress.Commands.add("TypeDatawithSelector", (Selector, valueoffield) => {
  cy.get("webruntime-app").find(Selector).first().type(valueoffield);
});

Cypress.Commands.add("GrabIframe", (iframe) => {
  return cy
    .get(iframe)
    .its("0.contentDocument.body")
    .should("be.visible")
    .then(cy.wrap);
});

// Make the iframe command return the body contents once it’s loaded
Cypress.Commands.add("iframe1", { prevSubject: "element" }, ($iframe) => {
  return new Cypress.Promise((resolve) => {
    $iframe.on("load", () => {
      resolve($iframe.contents().find("body"));
    });
  });
});

Cypress.Commands.add(
  "addCardNewCustomerCybersourceCardNumber",
  ({ cardNumber, expiry }) => {
    // Card number iFrame
    cy.get("#cardpayment.data-card-payment-method > iframe")
      // .shadow()
      .iframe1()
      .find('input[name="card-number"]')
      .should("be.visible")
      // .should("have.attr", "placeholder", "Enter card number")
      .type(cardNumber);
    // Expiry date is not an iframe
    cy.get("#cardholder-name").type(expiry);
    cy.get("#expiry-date").type(expiry);
  }
);

Cypress.Commands.add("iframe", { prevSubject: "element" }, ($iframe) => {
  Cypress.log({
    name: "iframe",
    consoleProps() {
      return {
        iframe: $iframe,
      };
    },
  });

  return new Cypress.Promise((resolve) => {
    onIframeReady(
      $iframe,
      () => {
        resolve($iframe.contents().find("body"));
      },
      () => {
        $iframe.on("load", () => {
          resolve($iframe.contents().find("body"));
        });
      }
    );
  });
});

function onIframeReady($iframe, successFn, errorFn) {
  try {
    const iCon = $iframe.first()[0].contentWindow,
      bl = "about:blank",
      compl = "complete";
    const callCallback = () => {
      try {
        const $con = $iframe.contents();
        if ($con.length === 0) {
          // https://git.io/vV8yU
          throw new Error("iframe inaccessible");
        }
        successFn($con);
      } catch (e) {
        // accessing contents failed
        errorFn();
      }
    };

    const observeOnload = () => {
      $iframe.on("load.jqueryMark", () => {
        try {
          const src = $iframe.attr("src").trim(),
            href = iCon.location.href;
          if (href !== bl || src === bl || src === "") {
            $iframe.off("load.jqueryMark");
            callCallback();
          }
        } catch (e) {
          errorFn();
        }
      });
    };
    if (iCon.document.readyState === compl) {
      const src = $iframe.attr("src").trim(),
        href = iCon.location.href;
      if (href === bl && src !== bl && src !== "") {
        observeOnload();
      } else {
        callCallback();
      }
    } else {
      observeOnload();
    }
  } catch (e) {
    // accessing contentWindow failed
    errorFn();
  }
}
