import { faker } from "@faker-js/faker";

const signup = () => {
  const loginForm = {
    email: `${faker.internet.userName()}@example.com`,
    password: faker.internet.password(),
  };

  cy.then(() => ({ email: loginForm.email })).as("user");

  cy.visitAndCheck("/");

  cy.findByRole("link", { name: /Ingresar/i }).click();

  cy.findByRole("link", { name: /sign up/i }).click();

  cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
  cy.findByLabelText(/password/i).type(loginForm.password);
  cy.findByRole("button", { name: /create account/i }).click();
};

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

    cy.findByRole("button", { name: /save/i }).click();

    cy.findByText(clienteForm.nombre);
    cy.findByText(new RegExp(clienteForm.ciudad, "i"));
  });

  it("should allow you to register and create a dj perfil", () => {
    signup();

    cy.findByRole("link", { name: /Crear perfil/i }).click();

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

    cy.findByRole("button", { name: /save/i }).click();

    cy.findByText(clienteForm.nombre);
    cy.findByText(new RegExp(clienteForm.ciudad, "i"));
  });

  it("should list a newly created dj", () => {
    signup();

    cy.findByRole("link", { name: /Crear perfil/i }).click();

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

    cy.findByRole("button", { name: /save/i }).click();

    cy.findByText(clienteForm.nombre);

    cy.visitAndCheck("/djs");

    cy.findByText(clienteForm.nombre).siblings("div").children("a").click();

    cy.findByText(clienteForm.descripcion);
  });
});
