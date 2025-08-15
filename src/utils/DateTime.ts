import dayjs, { Dayjs } from 'dayjs';
// Plugins
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';

import { DateTimeFormat, ISOFormat } from '@/constants/locale';
// Dayjs locale
import 'dayjs/locale/en';
import 'dayjs/locale/vi';

class DateTime {
  constructor() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.extend(customParseFormat);
    dayjs.extend(updateLocale);
    dayjs.extend(isBetween);
  }

  public initLocale() {
    dayjs.updateLocale('vi', {
      months: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
    });
  }

  public IsValid(date: any) {
    if (!date) return false;
    return dayjs(date).isValid();
  }

  public TimeZone() {
    return dayjs.tz.guess();
  }

  public convertToISO(date: Dayjs | string | null = dayjs()) {
    return this.IsValid(date) ? dayjs(date).format(ISOFormat) : null;
  }

  public Format(value: Date | string | Dayjs | null = dayjs(), pattern: string = DateTimeFormat) {
    return this.IsValid(value) ? dayjs(value).format(pattern) : null;
  }

  public formatVietnameseData(date: Dayjs){
    const weekday = date.locale("vi").format("dddd"); //Thứ hai, thứ ba....
    const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1)
    const day = date.format("DD");
    const month = date.format("MM");
    const year = date.format("YYYY");
    return `${capitalizedWeekday}_${day} th${month}, ${year}`;
  }

  public formatSpecialDate(raw: string){
    // Tìm phần ngày/tháng/năm bên trong chuỗi
    // ví dụ match = ["15 th08, 2025", "15", "08", "2025"]
    const match = raw.match(/(\d{1,2})\s*th(\d{2}),\s*(\d{4})/);
    if (!match) return raw; // nếu không match thì trả lại nguyên chuỗi
    const day = match[1];
    const month = match[2];
    const year = match[3];
    const dateObj = dayjs(`${year}-${month}-${day}`);
    //cộng thêm 1 tháng
    const adjusted = dateObj.add(1, 'month')
    return adjusted.format("DD/MM/YYYY");
  }
}

export default new DateTime();
