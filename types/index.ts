export type ParkingLot = {
  id: string;
  name: string;
  address: string;
  image: string;
  pricePerHour: number;
  distance: number;
  slots: {
    total: number;
    available: number;
  };
  hours: {
    open: string;
    close: string;
  };
  hasValet: boolean;
  rules: string;
  floors: Floor[];
};

export type Floor = {
  id: string;
  name: string;
  slots: Slot[];
};

export type Slot = {
  id: string;
  name: string;
  status: 'available' | 'occupied' | 'selected';
};

export type Vehicle = {
  id: string;
  type: 'car' | 'bike' | 'van' | 'scooter';
  make: string;
  model: string;
  year: number;
  licensePlate: string;
};

export type Booking = {
  id: string;
  parkingLotId: string;
  parkingLotName: string;
  parkingLotAddress: string;
  slotId: string;
  slotName: string;
  vehicleId: string;
  vehicleInfo: string;
  licensePlate: string;
  date: string;
  duration: number;
  startTime: string;
  endTime: string;
  amount: number;
  status: 'active' | 'completed' | 'cancelled';
};

export type Card = {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  cardType: 'visa' | 'mastercard' | 'amex';
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicles: Vehicle[];
  cards: Card[];
};

export type FilterParams = {
  distance: number;
  valetParking: boolean;
  vehicleType: string | null;
};