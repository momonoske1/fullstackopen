describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const userOne = {
      name: "momo",
      username: "momo",
      password: "momo",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, userOne);
    const userTwo = {
      name: "moad",
      username: "moad",
      password: "moad",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, userTwo);
    cy.visit("");
  });

  it("Login form shown", function () {
    cy.contains("Login");
  });

  it("succeeds with correct credentials", function () {
    cy.get("#username").type("moad");
    cy.get("#password").type("moad");
    cy.get("#login-btn").click();
    cy.contains("valid credentials");
  });

  it("fails with wrong credentials", function () {
    cy.get("#username").type("ciccio");
    cy.get("#password").type("momo");
    cy.get("#login-btn").click();
    cy.contains("wrong username or password");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "momo", password: "momo" });
    });

    it("a blog can be created", function () {
      cy.contains("create new Blog").click();
      cy.get("#title").type("story of life");
      cy.get("#author").type("momo");
      cy.get("#url").type("storyOfLife.com");
      cy.get("#create-btn").click();
    });
  });

  describe("likes block", function () {
    beforeEach(function () {
      cy.login({ username: "momo", password: "momo" });
      cy.createBlog({
        title: "ultimate test",
        author: "momonoske",
        url: "ultimate.com",
      });
    });

    it("likes test", function () {
      cy.contains("ultimate test by momonoske").contains("view").click();
      cy.contains("likes 0");
      cy.contains("like").click();
      cy.contains("likes 1");
    });
  });

  describe("remove test", function () {
    beforeEach(function () {
      cy.login({ username: "momo", password: "momo" });
    });

    it("can be removed by creator user", function () {
      cy.createBlog({
        title: "second test",
        author: "momo",
        url: "second.com",
      });
      cy.get(".blog")
        .contains("second test by momo")
        .parent()
        .contains("remove")
        .click();
    });

    it("can not be removed by non-creator user", function () {
      cy.createBlog({
        title: "can be deleted",
        author: "momo",
        url: "delete.com",
      });
      cy.contains("logout").click();
      cy.login({ username: "moad", password: "moad" });
      cy.get(".blog")
        .contains("can be deleted by momo")
        .parent()
        .contains("remove")
        .should("not.exist");
    });

    describe("most liked blog", function () {
      beforeEach(function () {
        cy.login({ username: "momo", password: "momo" })
        cy.createBlog({
          title: "mitico lele",
          author: "lele",
          url: "miticoLele.com",
        });
        cy.createBlog({
          title: "mitico momo",
          author: "momo",
          url: "miticoMomo.com",
        });

        cy.get(".blog")
          .contains("mitico lele by lele")
          .contains("view")
          .click();
        cy.get(".blog")
          .contains("mitico lele by lele")
          .parent()
          .contains("like")
          .click();
      });

      it("blogs order", function () {
        cy.get(".blog").eq(0).should("contain", "mitico lele by lele");
        cy.get(".blog").eq(1).should("contain", "mitico momo by momo");
      });

      it("final blogs order", function () {
        cy.get(".blog")
          .contains("mitico momo by momo")
          .contains("view")
          .click();
        cy.get(".blog")
          .contains("mitico momo by momo")
          .parent()
          .contains("like")
          .click();

        cy.contains("mitico momo by momo").parent().contains("likes 1");
        cy.get(".blog")
          .contains("mitico momo by momo")
          .parent()
          .contains("like")
          .click();

        cy.get(".blog").eq(0).should("contain", "mitico momo by momo");
        cy.get(".blog").eq(1).should("contain", "mitico lele by lele");
      });
    });
  });
});
