import { faker } from "@faker-js/faker";
import { signup } from "support/commons";

describe("perfil tests", () => {
  afterEach(() => {
    cy.cleanupUser();
  });

  it('should allow you to register, create and edit your dj profile', () => {
    signup();
    
    cy.findByRole('link', { name: /Crear perfil/i }).click();


    const clienteForm = {
      nombre: faker.person.fullName(),
      apellido: faker.person.lastName(),
      direccion: faker.location.streetAddress(),
      pais: faker.location.country(),
      ciudad: faker.location.city(),
      avatar: faker.image.url(),
      descripcion: faker.lorem.paragraph(),
      rate: faker.number.float(),
      genero: faker.lorem.word(),
      artista: faker.lorem.word(),
    };

    cy.findByRole("switch", { name: /Sos DJ/i }).click();
    cy.findByRole("textbox", { name: /nombre/i }).type(clienteForm.nombre);
    cy.findByRole("textbox", { name: /apellido/i }).type(clienteForm.apellido);
    cy.findByRole("textbox", { name: /direccion/i }).type(
      clienteForm.direccion,
    );
    cy.findByRole("textbox", { name: /pais/i }).type(clienteForm.pais);
    cy.findByRole("textbox", { name: /ciudad/i }).type(clienteForm.ciudad);
    cy.findByRole("textbox", { name: /avatar/i }).type(clienteForm.avatar);

    cy.findByRole("textbox", { name: /descripcion/i }).type(
      clienteForm.descripcion,
    );
    cy.findByRole("spinbutton", { name: /Precio/i }).type(
      clienteForm.rate.toString(),
    );

    cy.get("#generos").type(clienteForm.genero).siblings("button").click();

    cy.findByRole("textbox", { name: /referencias/i })
      .type(clienteForm.artista)
      .siblings("button")
      .click();

    cy.findByRole("button", { name: /guardar/i }).click();

    cy.findByText(clienteForm.nombre);
    cy.findByText(new RegExp(clienteForm.ciudad, "i"));

    cy.findByRole('button', {name: /Editar/i}).click();

    const clienteEditForm = {
      nombre: faker.person.fullName(),
      apellido: faker.person.lastName(),
      direccion: faker.location.streetAddress(),
      pais: faker.location.country(),
      ciudad: faker.location.city(),
      avatar: faker.image.url(),
      descripcion: faker.lorem.paragraph(),
      rate: faker.number.float(),
      genero: faker.lorem.word(),
      artista: faker.lorem.word(),
    };

    cy.findByRole("textbox", { name: /nombre/i }).clear().type(clienteEditForm.nombre);
    cy.findByRole("textbox", { name: /apellido/i }).clear().type(clienteEditForm.apellido);
    cy.findByRole("textbox", { name: /direccion/i }).clear().type(
      clienteEditForm.direccion,
    );
    cy.findByRole("textbox", { name: /pais/i }).clear().type(clienteEditForm.pais);
    cy.findByRole("textbox", { name: /ciudad/i }).clear().type(clienteEditForm.ciudad);
    cy.findByRole("textbox", { name: /avatar/i }).clear().type(clienteEditForm.avatar);

    cy.findByRole("textbox", { name: /descripcion/i }).clear().type(
      clienteEditForm.descripcion,
    );
    cy.findByRole("spinbutton", { name: /Precio/i }).clear().type(
      clienteEditForm.rate.toString(),
    );

    cy.get("#generos").type(clienteEditForm.genero).siblings("button").click();

    cy.findByRole("textbox", { name: /referencias/i })
      .type(clienteEditForm.artista)
      .siblings("button")
      .click();

    cy.findByRole("button", { name: /guardar/i }).click();

    cy.findByText(clienteEditForm.nombre);
    cy.findByText(new RegExp(clienteEditForm.ciudad, "i"));
    
    cy.visitAndCheck("/djs");
    
    cy.findByText(clienteEditForm.nombre).siblings("div").children("a").click();
    
    cy.findByText(clienteEditForm.nombre);
    cy.findByText(new RegExp(clienteEditForm.ciudad, "i"));
    cy.findByText(new RegExp(clienteEditForm.pais, "i"));
    cy.findByText(new RegExp(clienteEditForm.direccion, "i"));
    
    cy.findByText(new RegExp(clienteForm.genero, "i"));
    cy.findByText(new RegExp(clienteEditForm.genero, "i"));
    cy.findByText(new RegExp(clienteForm.artista, "i"));
    cy.findByText(new RegExp(clienteEditForm.artista, "i"));
    
    cy.findByText(clienteEditForm.descripcion);
    cy.findByAltText(/DJ avatar/i).should("have.attr", "src", clienteEditForm.avatar).should('be.visible');

  })
})
