describe("Scenario: Marking a child as dropout - E2E test", function () {
  before("GIVEN I am on the details page of a specific child", function () {
    // go to the url with the Child
    cy.visit("child/1");
    // save the name of this Child to the variable
    cy.get(".header-row > .header-title").invoke("text").as("childName");
  });

  it("WHEN I select a dropout date for this child", () => {
    // click on "Dropout" menu
    cy.contains("Dropout").click();
    cy.get("#mat-tab-label-0-7").click();
    // click on button with the content "Edit" in Dropout menu.
    cy.contains("span", "Edit").should("be.visible").click();
    // select today as the dropout date (which is initially marked as active)
    cy.get(".mat-datepicker-toggle-default-icon").click();
    cy.get(".mat-calendar-body-active").click();
    // click on button with the content "Save"
    cy.contains("span", "Save").should("be.visible").click();
  });

  it("THEN I should not see this child in the list of all children at first", function () {
    // click on "Children" menu in navigation
    cy.get('[ng-reflect-angulartics-label="Children"]').click();
    // type to the input "Filter" the name of child
    cy.get('[data-placeholder="e.g. name, age"]').type(this.childName);
    // find at this table the name of child and it should not exist
    cy.get("table").contains(this.childName.trim()).should("not.exist");
  });

  it("AND I should see the child when I activate the 'inactive' filter", function () {
    // click on the button with the content "Inactive"
    cy.get('[ng-reflect-placeholder="isActive"]').click();
    cy.contains("span", "Inactive").should("be.visible").click();
    // find at this table the name of child and it should exist
    cy.get("table").contains(this.childName.trim()).should("exist");
  });
});