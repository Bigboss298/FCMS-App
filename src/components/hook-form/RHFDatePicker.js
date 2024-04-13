import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';

RHFDatePicker.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
};

export default function RHFDatePicker({ name, label, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <DatePicker
                    format='yyyy-MM-dd'
                    label={label}
                    slotProps={{
                        textField: {
                            variant: 'outlined',
                            error: !!error,
                            helperText: error?.message,
                        },
                    }}
                    {...field}
                    {...other}
                />
            )}
        />
    );
}
