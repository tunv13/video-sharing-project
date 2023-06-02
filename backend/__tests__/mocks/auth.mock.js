const tempEmail = "abc@gmail.com";
const tempPassword = "123123";
const tempFirstName = 'First Name'
const tempLastName = 'Last Name'
const userData = {
  id: 2,
  email: tempEmail,
  password: "$2b$10$a4Uj1Eu7eaTu77iis7k/j.dDAasR1Pbhxhr5VijCgMpNV8LqXxJ86",
};

const userDataWrong = null;

const requestLogin = {
  email: tempEmail,
  password: tempPassword,
};

const bodyMissingField = {
  email: tempEmail,
};

const requestRegister = {
  email: tempEmail,
  password: tempPassword,
  firstName: tempFirstName,
  lastName: tempLastName,
};
module.exports = { bodyMissingField,requestRegister, requestLogin, userDataWrong, userData };
