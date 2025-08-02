import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Grid,
  Button,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/vi';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

dayjs.locale('vi');

const weekdays = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
interface SingleMonthCalendarProps{
  handleSelectedDate: (date: Dayjs | null) => void;
}

const SingleMonthCalendar: React.FC<SingleMonthCalendarProps> = ({ handleSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDayOfWeek = startOfMonth.day() === 0 ? 6 : startOfMonth.day() - 1;
  const daysInMonth = endOfMonth.date();

  const getDaysArray = () => {
    const days: (Dayjs | null)[] = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(currentMonth.date(i));
    }
    return days;
  };

  const handleDateClick = (date: Dayjs) => {
    setSelectedDate(date);
  };

  const handleClear = () => {
    setSelectedDate(null);
    handleSelectedDate(null)
  };

  const handleNext = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const handlePrev = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const days = getDaysArray();

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 2, width: 320 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <IconButton onClick={handlePrev}>
            <NavigateBeforeIcon />
          </IconButton>
          <Typography fontWeight="bold">
            Tháng {currentMonth.month() + 1}_{currentMonth.year()}
          </Typography>
          <IconButton onClick={handleNext}>
            <NavigateNextIcon />
          </IconButton>
        </Box>

        <Grid container spacing={1}>
          {weekdays.map((day) => (
            <Grid item xs={1.71} key={day}>
              <Typography variant="body2" textAlign="center" fontWeight="bold">
                {day}
              </Typography>
            </Grid>
          ))}

          {days.map((date, idx) => {
            const isSelected =
              selectedDate && date && selectedDate.isSame(date, 'day');

            return (
              <Grid item xs={1.71} key={idx}>
                <Box
                  onClick={() => date && handleDateClick(date)}
                  sx={{
                    width: '100%',
                    height: 32,
                    textAlign: 'center',
                    lineHeight: '32px',
                    borderRadius: '50%',
                    backgroundColor: isSelected ? '#000' : 'transparent',
                    color: isSelected ? '#fff' : date ? 'inherit' : 'transparent',
                    cursor: date ? 'pointer' : 'default',
                    mx: 'auto',
                    
                  }}
                >
                    <Typography mt={1} pt={0.6} variant="body2">
                        {date ? date.format('DD') : '00'}
                    </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant='outlined' sx={{ border: '1px solid #000', color: '#000'}} onClick={handleClear}>Clear dates</Button>
          <Button
            variant="contained"
            sx={{ color: 'white', bgcolor: '#000'}}
            disabled={!selectedDate}
            onClick={() => handleSelectedDate(selectedDate)
            }
          >
            See results
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SingleMonthCalendar;
