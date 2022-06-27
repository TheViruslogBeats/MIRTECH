module.exports = class UserInfoDto {
  img;
  firstName;
  middleName;
  lastName;

  constructor(model) {
    this.img = model.img
    this.firstName = model.firstName;
    this.middleName = model.middleName;
    this.lastName = model.lastName;
  }
};
