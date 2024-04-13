import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

RHFTextarea.propTypes = {
    name: PropTypes.string,
};

export default function RHFTextarea({ name, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    fullWidth
                    multiline
                    minRows={4}
                    error={!!error}
                    helperText={error?.message}
                    {...other}
                />
            )}
        />
    );
}
