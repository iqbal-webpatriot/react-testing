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
    // cy.findByRole('heading')
  });
});
