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
  describe('Login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login'); // Visit the login page before each test
    });

    it('handles login errors and success', () => {
      // Click submit with empty fields and check error message
      cy.get('button[type="submit"]').click();
      cy.wait(1000);
      cy.findAllByRole('alert').should('contain', 'This field is required');

      // Check error for empty username
      cy.get('input[name="password"]').type('password');
      cy.get('button[type="submit"]').click();
      cy.findByRole('alert').should('contain', 'This field is required');
      cy.wait(1000);
      // Check error for empty password
      cy.get('input[name="password"]').clear(); // Clear the password field
      cy.get('input[name="username"]').type('username');
      cy.get('button[type="submit"]').click();
      cy.findByRole('alert').should('contain', 'This field is required');
      cy.wait(1000);
      // Check error for invalid login
      cy.get('input[name="username"]').clear().type('wrong_username');
      cy.get('input[name="password"]').type('wrong_password');
      cy.get('button[type="submit"]').click();
      cy.findByRole('alert').should(
        'contain',
        'Please check your username or password',
      );
      cy.wait(1000);
      // Check successful login
      cy.get('input[name="username"]').clear().type('admin');
      cy.get('input[name="password"]').clear().type('admin123');
      cy.get('button[type="submit"]').click();
      cy.findByRole('alert').should('contain', 'Logged Successfully');
      // cy.url().should('include', '/dashboard'); // Assuming the user is redirected to /dashboard on successful login
    });
  });
});
