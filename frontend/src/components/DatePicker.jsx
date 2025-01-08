import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { currentDate } from '../utils/currentDate';

export default function DatePickerComponent({setDate}) {
  const [value, setValue] = useState(dayjs());
  const [currentDateValue, setCurrentDateValue] = useState('')

  useEffect(() => {
    const date = currentDate()
    setValue(dayjs(date))
    setCurrentDateValue(date)
  }, [])
  const onChangeHandler = (newValue) => {
      setValue(newValue);
      setDate(newValue)
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Select service date"
          value={value}
          onChange={onChangeHandler}
          minDate={dayjs(currentDateValue)}
          maxDate={dayjs(currentDateValue).add(7, 'day')}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

