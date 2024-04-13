import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, CircularProgress } from '@mui/material';

//----------------------------------------------------------------
const SelectIcon = () => <CircularProgress size={20} sx={{ mr: 2 }} />;
//----------------------------------------------------------------

RHFSelect.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    loading: PropTypes.bool,
};

export default function RHFSelect({ name, loading, children, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    select
                    fullWidth
                    SelectProps={{
                        native: true,
                        IconComponent: loading ? () => <SelectIcon /> : undefined,
                    }}
                    error={!!error}
                    helperText={error?.message}
                    {...other}
                >
                    {children}
                </TextField>
            )}
        />
    );
}
