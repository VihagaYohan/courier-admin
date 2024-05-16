interface OrderTable {
  id: string;
  date: string;
  trackingId: string;
  sender: string;
  reciever: string;
  type: string;
  amount: number;
  method: string;
}

export default OrderTable;
