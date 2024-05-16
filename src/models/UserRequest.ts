class UserRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;

  constructor(
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    role: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.role = role;
  }
}

export default UserRequest;
