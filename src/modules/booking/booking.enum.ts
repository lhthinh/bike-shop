export enum EBookingAt {
  BOOKINGATSTORE = 0,
  BOOKINGATHOME = 1,
}

export enum EBookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum EBookingStatusName {
  PENDING = 'Chờ xác nhận',
  CONFIRMED = 'Chờ xử lý',
  COMPLETED = 'Đã xử lý',
  CANCELED = 'Đã hủy',
}
