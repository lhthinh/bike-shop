import { EBookingStatus, EBookingStatusName } from './booking.enum'

export const BOOKINGSTATUS = [
  {
    label: EBookingStatusName.CONFIRMED,
    value: EBookingStatus.CONFIRMED,
  },
  {
    label: EBookingStatusName.COMPLETED,
    value: EBookingStatus.COMPLETED,
  },
  {
    label: EBookingStatusName.PENDING,
    value: EBookingStatus.PENDING,
  },
  {
    label: EBookingStatusName.CANCELED,
    value: EBookingStatus.CANCELED,
  },
]
