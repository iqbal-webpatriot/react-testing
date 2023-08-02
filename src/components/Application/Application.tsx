import React from 'react';

export default function Application() {
  return (
    <>
      <h1>Job Application Form</h1>
      <h2>Section 1</h2>
      <p>All fields are required</p>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <br />

        <label>Gender:</label>
        <br />
        <input type="radio" id="male" name="gender" value="male" />
        <label htmlFor="male">Male</label>
        <br />
        <input type="radio" id="female" name="gender" value="female" />
        <label htmlFor="female">Female</label>
        <br />

        <label htmlFor="country">Country:</label>
        <select id="country" name="country">
          <option value="usa">USA</option>
          <option value="canada">Canada</option>
          <option value="australia">Australia</option>
          {/* Add more countries as needed */}
        </select>
        <br />

        <input type="checkbox" id="terms" name="terms" />
        <label htmlFor="terms">I accept the terms and conditions</label>
        <br />

        <input
          type="submit"
          value="Submit Application"
          onClick={(e) => {
            e.preventDefault();
            alert('Form Submitted');
          }}
        />
        {/* <button>Submit</button> */}
      </form>
    </>
  );
}
