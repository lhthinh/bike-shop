import { InjectRepository } from '@nestjs/typeorm'
import { BookingStatus } from 'src/common/entities/_booking/booking-status.entity'
import { Repository } from 'typeorm'
import { BOOKINGSTATUS } from '../booking.constant'
import _ from 'lodash'
import { GetTabDto } from '../dto/get-tab.dto'

export class BookingStatusService {
  constructor(
    @InjectRepository(BookingStatus)
    private readonly bookingStatusRepository: Repository<BookingStatus>,
  ) {}

  async initStatus() {
    const data = _.map(BOOKINGSTATUS, (item) => ({
      code: item.value,
      name: item.label,
    }))
    await this.bookingStatusRepository.save(data)
  }

  async getTab(getTabDto: GetTabDto) {
    const { type } = getTabDto

    const query = await this.bookingStatusRepository
      .createQueryBuilder('s')
      .select([
        's.code as code',
        's.name as name',
        'COUNT(b.id)::int as "bookingCount"',
      ])
      .leftJoin('s.booking', 'b')
      .groupBy('s.code, s.name')
      .getRawMany()
    return query
  }
}
