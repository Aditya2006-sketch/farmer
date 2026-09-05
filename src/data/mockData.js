// All mock/demo data for the KisanQueue frontend MVP.
// No backend, no network calls — this is the single source of truth for demo content.

export const farmer = {
  name: 'Aditya Nagpure',
  firstName: 'Aditya',
  role: 'Farmer',
  location: 'Ramtek, Nagpur',
  village: 'Ramtek',
  district: 'Nagpur',
  phone: '+91 98230 xxxxx',
}

export const centres = [
  {
    id: 'ramtek',
    name: 'Ramtek Procurement Centre',
    village: 'Ramtek',
    district: 'Nagpur',
    farmersInQueue: 87,
    load: 'high',
    distanceKm: 3.2,
    waitEstimate: '2 hr 10 min',
    crops: ['Paddy', 'Wheat'],
    position: { top: '32%', left: '19%' },
  },
  {
    id: 'mouda',
    name: 'Mouda Centre',
    village: 'Mouda',
    district: 'Nagpur',
    farmersInQueue: 32,
    load: 'medium',
    distanceKm: 11.8,
    waitEstimate: '55 min',
    crops: ['Paddy', 'Soybean'],
    position: { top: '58%', left: '68%' },
  },
  {
    id: 'bachul',
    name: 'Bachul Centre',
    village: 'Bachul',
    district: 'Nagpur',
    farmersInQueue: 12,
    load: 'low',
    distanceKm: 16.4,
    waitEstimate: '20 min',
    crops: ['Wheat', 'Gram'],
    position: { top: '20%', left: '78%' },
  },
  {
    id: 'katol',
    name: 'Katol Centre',
    village: 'Katol',
    district: 'Nagpur',
    farmersInQueue: 9,
    load: 'low',
    distanceKm: 22.1,
    waitEstimate: '15 min',
    crops: ['Paddy', 'Cotton'],
    position: { top: '74%', left: '40%' },
  },
]

export const crops = ['Paddy', 'Wheat', 'Soybean', 'Cotton', 'Gram', 'Tur (Arhar)']

export const timeSlots = [
  '06:00 AM – 08:00 AM',
  '08:00 AM – 10:00 AM',
  '10:00 AM – 12:00 PM',
  '12:00 PM – 02:00 PM',
  '02:00 PM – 04:00 PM',
]

export const procurementSteps = [
  { key: 'booked', label: 'Token Booked' },
  { key: 'arrived', label: 'Arrived at Centre' },
  { key: 'verification', label: 'Document Verification' },
  { key: 'quality', label: 'Quality Check' },
  { key: 'weighing', label: 'Weighing' },
  { key: 'procurement', label: 'Procurement' },
  { key: 'payment', label: 'Payment' },
]

export const initialTransactions = [
  { id: 'txn1', crop: 'Paddy', amount: 24360, date: '03 Sep 2026', label: 'Paddy Sale Payment' },
  { id: 'txn2', crop: 'Wheat', amount: 18720, date: '28 Aug 2026', label: 'Wheat Sale Payment' },
  { id: 'txn3', crop: 'Soybean', amount: 31200, date: '12 Aug 2026', label: 'Soybean Sale Payment' },
]

export const initialNotifications = [
  {
    id: 'n1',
    title: 'Your token is approaching',
    detail: '30 minutes remaining',
    time: '10:30 AM',
    type: 'token',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Payment has been processed',
    detail: '₹24,360 credited to your account',
    time: 'Yesterday',
    type: 'payment',
    unread: true,
  },
  {
    id: 'n3',
    title: 'New procurement centre added in your district',
    detail: 'Katol Centre - Nagpur',
    time: '03 Sep 2026',
    type: 'info',
    unread: true,
  },
  {
    id: 'n4',
    title: 'Quality check completed',
    detail: 'Grade A — Paddy accepted',
    time: '01 Sep 2026',
    type: 'token',
    unread: false,
  },
]

export const tips = [
  {
    id: 'tip1',
    title: 'Get Better Prices for Your Produce',
    date: '5 Sep 2026',
    category: 'Selling tips',
  },
  {
    id: 'tip2',
    title: 'Government MSP Update 2026-27',
    date: '3 Aug 2026',
    category: 'Policy',
  },
  {
    id: 'tip3',
    title: 'Soil Health: Why It Matters',
    date: '28 Jul 2026',
    category: 'Farming',
  },
]

export const stats = [
  { id: 's1', label: 'Centres Near You', value: '18' },
  { id: 's2', label: 'Farmers Served', value: '12,430' },
  { id: 's3', label: 'Crops Supported', value: '5' },
  { id: 's4', label: 'Avg. Waiting Time', value: '52 min' },
]

export function generateTokenId() {
  const n = 200 + Math.floor(Math.random() * 90)
  return `RK${n}`
}

// ----- Auth demo credentials (frontend-only mock, no real SMS/OTP backend) -----
export const DEMO_MOBILE = '9876543210'
export const DEMO_OTP = '123456'
