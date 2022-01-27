describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/")
    cy.get("li").contains("li","Monday")

  })

  xit ("Should book an interview", () => {
    cy.get("[alt=Add]").first().click()
    cy.get(".appointment__create-input").type("Lydia Miller-Jones")
    cy.get("[alt='Sylvia Palmer']").click()
    cy.get("button").contains("Save").click()
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Sylvia Palmer")
  })

  xit("Should edit an interview", () => {
    cy.get(':nth-child(1) > .appointment__card [alt=Edit]').click({force: true})
    cy.get("[alt='Tori Malcolm']").click()
    cy.get("[data-testid=student-name-input").clear().type("Lydia Miller-Jones")
    cy.get("button").contains("Save").click()
    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Tori Malcolm")
  })

  it("Should cancel an interview", () => {
    cy.get(':nth-child(1) > .appointment__card [alt=Delete]').click({force: true})
    cy.get("button").contains("Confirm").click()
    cy.contains("Deleting")
    cy.get("Deleting").should("not.exist")
    cy.contains(".appointment__card--show","Archie Cohen").should("not.exist")
  })

})