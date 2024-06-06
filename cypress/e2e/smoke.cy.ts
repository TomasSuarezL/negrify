import { faker } from "@faker-js/faker";
import { signup } from "support/commons";



describe("smoke tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it("should allow you to register and create a cliente perfil", () => {
    signup();

    cy.findByRole("link", { name: /Crear perfil/i }).click();

    const clienteForm = {
      nombre: faker.person.fullName(),
      apellido: faker.person.lastName(),
      direccion: faker.location.streetAddress(),
      pais: faker.location.country(),
      ciudad: faker.location.city(),
      avatar: faker.image.url(),
    };

    cy.findByRole("textbox", { name: /nombre/i }).type(clienteForm.nombre);
    cy.findByRole("textbox", { name: /apellido/i }).type(clienteForm.apellido);
    cy.findByRole("textbox", { name: /direccion/i }).type(
      clienteForm.direccion,
    );
    cy.findByRole("textbox", { name: /pais/i }).type(clienteForm.pais);
    cy.findByRole("textbox", { name: /ciudad/i }).type(clienteForm.ciudad);
    cy.findByRole("textbox", { name: /avatar/i }).type(clienteForm.avatar);

    cy.findByRole("button", { name: /guardar/i }).click();

    cy.findByText(clienteForm.nombre);
    cy.findByText(new RegExp(clienteForm.ciudad, "i"));

    cy.findByAltText("User avatar").parent().click();
    cy.findByRole("button", { name: /Log out/i }).click();

    cy.findByText("Negrify");

  });

});
