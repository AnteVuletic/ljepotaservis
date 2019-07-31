class UserDto {
  constructor(
    firstName,
    lastName,
    email,
    username,
    password,
    role = null,
    token = null
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.password = password;
    this.role = role;
    this.token = token;
  }
}

export default UserDto;
