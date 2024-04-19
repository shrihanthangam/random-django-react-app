import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form'


export default function MyDatePickerField(props) {
  const { name, label, control, width } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name = {name}

        control = {control}

        render = {({
          field:{onChange, value},
          fieldState: { error },
          formState
        }) => (
          <DatePicker
            onChange={onChange}
            value={value}
            label={label}
            sx={{width:{width}}}
            slotProps={{
              textField:{
                error: !!error, 
                helperText: error?.message,
              }
            }}
          />
          )
        }
        
      />
    </LocalizationProvider>
  );
}