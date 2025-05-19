import { ParkingLot, Booking, Vehicle, Card, UserProfile } from '@/types';

// Mock parking lots data
export const parkingLots: ParkingLot[] = [
  {
    id: '1',
    name: 'Parking Lot of Capital University',
    address: '1514 Robin St, Auburndale',
    image: 'https://images.pexels.com/photos/257424/pexels-photo-257424.jpeg',
    pricePerHour: 1.00,
    distance: 10,
    slots: {
      total: 50,
      available: 39,
    },
    hours: {
      open: '8 AM',
      close: '9 PM',
    },
    hasValet: true,
    rules: 'These rules and regulations for the use of Capital University Parking Area. In these Rules, unless the context otherwise requires, the following expressions shall have the meaning hereby respectively assigned to them.',
    floors: [
      {
        id: 'f1',
        name: '1st Floor',
        slots: Array(20).fill(null).map((_, index) => ({
          id: `f1-${index + 1}`,
          name: `A${(index + 1).toString().padStart(2, '0')}`,
          status: Math.random() > 0.7 ? 'occupied' : 'available',
        })),
      },
      {
        id: 'f2',
        name: '2nd Floor',
        slots: Array(15).fill(null).map((_, index) => ({
          id: `f2-${index + 1}`,
          name: `B${(index + 1).toString().padStart(2, '0')}`,
          status: Math.random() > 0.6 ? 'occupied' : 'available',
        })),
      },
      {
        id: 'f3',
        name: '3rd Floor',
        slots: Array(15).fill(null).map((_, index) => ({
          id: `f3-${index + 1}`,
          name: `C${(index + 1).toString().padStart(2, '0')}`,
          status: Math.random() > 0.5 ? 'occupied' : 'available',
        })),
      },
    ],
  },
  {
    id: '2',
    name: 'Freeway Park Garage',
    address: '1301 Hubbell Pl, Seattle',
    image: 'https://images.pexels.com/photos/590856/pexels-photo-590856.jpeg',
    pricePerHour: 10.00,
    distance: 5.2,
    slots: {
      total: 120,
      available: 43,
    },
    hours: {
      open: '6 AM',
      close: '11 PM',
    },
    hasValet: false,
    rules: 'Standard parking rules apply. No overnight parking allowed. Park at your own risk.',
    floors: [
      {
        id: 'f1',
        name: '1st Floor',
        slots: Array(40).fill(null).map((_, index) => ({
          id: `f1-${index + 1}`,
          name: `A${(index + 1).toString().padStart(2, '0')}`,
          status: Math.random() > 0.7 ? 'occupied' : 'available',
        })),
      },
      {
        id: 'f2',
        name: '2nd Floor',
        slots: Array(40).fill(null).map((_, index) => ({
          id: `f2-${index + 1}`,
          name: `B${(index + 1).toString().padStart(2, '0')}`,
          status: Math.random() > 0.6 ? 'occupied' : 'available',
        })),
      },
      {
        id: 'f3',
        name: '3rd Floor',
        slots: Array(40).fill(null).map((_, index) => ({
          id: `f3-${index + 1}`,
          name: `C${(index + 1).toString().padStart(2, '0')}`,
          status: Math.random() > 0.5 ? 'occupied' : 'available',
        })),
      },
    ],
  },
  {
    id: '3',
    name: 'Downtown Center Parking',
    address: '512 Pike St, Seattle',
    image: 'https://images.pexels.com/photos/229014/pexels-photo-229014.jpeg',
    pricePerHour: 8.50,
    distance: 2.7,
    slots: {
      total: 85,
      available: 12,
    },
    hours: {
      open: '7 AM',
      close: '10 PM',
    },
    hasValet: true,
    rules: 'Maximum stay of 12 hours. Security cameras in operation. No responsibility for theft or damage.',
    floors: [
      {
        id: 'f1',
        name: '1st Floor',
        slots: Array(30).fill(null).map((_, index) => ({
          id: `f1-${index + 1}`,
          name: `A${(index + 1).toString().padStart(2, '0')}`,
          status: Math.random() > 0.8 ? 'occupied' : 'available',
        })),
      },
      {
        id: 'f2',
        name: '2nd Floor',
        slots: Array(30).fill(null).map((_, index) => ({
          id: `f2-${index + 1}`,
          name: `B${(index + 1).toString().padStart(2, '0')}`,
          status: Math.random() > 0.8 ? 'occupied' : 'available',
        })),
      },
      {
        id: 'f3',
        name: '3rd Floor',
        slots: Array(25).fill(null).map((_, index) => ({
          id: `f3-${index + 1}`,
          name: `C${(index + 1).toString().padStart(2, '0')}`,
          status: Math.random() > 0.9 ? 'occupied' : 'available',
        })),
      },
    ],
  },
];

// Mock vehicles data
export const vehicles: Vehicle[] = [
  {
    id: '1',
    type: 'car',
    make: 'Audi',
    model: 'Q3',
    year: 2021,
    licensePlate: 'B 1234 CD',
  },
  {
    id: '2',
    type: 'bike',
    make: 'Honda',
    model: 'CBR',
    year: 2020,
    licensePlate: 'B 5678 EF',
  },
];

// Mock credit cards data
export const cards: Card[] = [
  {
    id: '1',
    cardNumber: '4111 1111 1111 6478',
    cardHolder: 'Houssem Abda',
    expiryDate: '12/28',
    cvv: '532',
    cardType: 'visa',
  },
];

// Mock user profile
export const userProfile: UserProfile = {
  id: '1',
  name: 'Houssem',
  email: 'houssem@example.com',
  phone: '+1 (123) 456-7890',
  vehicles: vehicles,
  cards: cards,
};

// Mock bookings data
export const bookings: Booking[] = [
  {
    id: '1',
    parkingLotId: '1',
    parkingLotName: 'Parking Lot of Capital University',
    parkingLotAddress: '1514 Robin St, Auburndale',
    slotId: 'f1-1',
    slotName: 'A01',
    vehicleId: '1',
    vehicleInfo: '2021 Audi Q3',
    licensePlate: 'B 1234 CD',
    date: '24 Sep. 2020',
    duration: 4,
    startTime: '10:00 AM',
    endTime: '2:00 PM',
    amount: 4.00,
    status: 'active',
  },
];