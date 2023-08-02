/* eslint-disable no-loop-func */
describe('React Testing Project ', () => {
  it('Job Application form', () => {
    cy.visit('http://localhost:3000');
    cy.findByRole('heading', { name: /job application form/i });
    cy.findByRole('textbox', { name: /name:/i }).type('Mohammad Iqbal');
    cy.get('input[name="gender"]').check('male');
    cy.get('select[name="country"]').select('usa');
    cy.findByText(/i accept the terms and conditions/i);
    cy.get('input[name="terms"]').check();
    cy.findByRole('button', { name: /submit application/i }).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Form Submitted');
    });
  });
  it('Counter Application ', () => {
    cy.visit('http://localhost:3000/counter');
    let initialCount: number = 0;
    cy.findByRole('heading').then(($str) => {
      let res = $str.text().replace(/[^0-9.-]/g, '');
      initialCount = +res;
    });

    // Hit increment button 5 times and test value is updated
    for (let i = 0; i < 5; i++) {
      cy.findByRole('button', { name: /increment/i }).click();
      cy.wait(500); // Wait for 500ms
      cy.findByRole('heading').then(($str) => {
        let res = $str.text().replace(/[^0-9.-]/g, '');
        expect(+res).to.be.greaterThan(initialCount);
        initialCount = +res;
      });
    }

    // Hit decrement button 5 times and test value is updated
    for (let i = 0; i < 5; i++) {
      cy.findByRole('button', { name: /decrement/i }).click();
      cy.wait(500); // Wait for 500ms
      cy.findByRole('heading').then(($str) => {
        let res = $str.text().replace(/[^0-9.-]/g, '');
        expect(+res).to.be.lessThan(initialCount);
        initialCount = +res;
      });
    }
  });
  it('Login Application ', () => {
    cy.intercept('POST', '/login').as('login'); // Intercept the login request

    cy.visit('http://localhost:3000/login'); // Visit the login page

    // Fill out and submit the login form
    cy.get('input[name="username"]').type('admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    // // Wait for the login request to complete
    // cy.wait('@login').then((interception) => {
    //   const { response } = interception;
    //   // Now TypeScript knows that 'response' is not undefined here
    //   expect(response?.statusCode).to.equal(200);
    //   expect(response?.body).to.include({
    //     status: 'success',
    //     user: {
    //       username: 'admin',
    //       fullName: 'dummy test admin',
    //       id: 121212,
    //     },
    //   });
    // });

    // Add assertions to check the behavior of your application after successful login
    // For example, you might check that the user is redirected to a different page
    // cy.url().should('include', '/dashboard');
  });
});
