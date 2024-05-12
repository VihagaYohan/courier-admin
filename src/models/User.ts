class User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdOn: string;
  constructor(
    id: string,
    name: string,
    email: string,
    phoneNumber: string,
    role: string,
    createdOn: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.createdOn = createdOn;
  }
}

export default User;
