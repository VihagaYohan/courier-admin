export interface Root {
  _id: string;
  status: Status;
  rider: Rider;
  courierType: CourierType;
  packageType: PackageType;
  trackingId: string;
  packageSize: string;
  senderDetails: SenderDetails;
  receiverDetails: ReceiverDetails;
  orderTotal: number;
  paymentType: PaymentType;
  createdOn: string;
  __v: number;
}

export interface Status {
  _id: string;
  name: string;
  createdAt: string;
}

export interface Rider {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdOn: string;
}

export interface CourierType {
  _id: string;
  name: string;
}

export interface PackageType {
  _id: string;
  name: string;
}

export interface SenderDetails {
  location: Location;
  senderId: string;
  name: string;
  mobileNumber: string;
  email: string;
  pickUpDate: string;
  pickUpTime: string;
  address: string;
  senderNotes: string;
  _id: string;
}

export interface Location {
  type: string;
  coordinates: number[];
  formatedAddress: string;
  street: string;
  city: string;
  zipcode: string;
  country: string;
}

export interface ReceiverDetails {
  location: Location2;
  name: string;
  mobileNumber: string;
  address: string;
  receiverNotes: string;
  _id: string;
}

export interface Location2 {
  type: string;
  coordinates: number[];
  formatedAddress: string;
  street: string;
  city: string;
  country: string;
}

export interface PaymentType {
  _id: string;
  name: string;
}

export default Root;
