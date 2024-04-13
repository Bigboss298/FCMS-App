import React from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import PropTypes from 'prop-types';

RHFMultiSelect.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
};

export default function RHFMultiSelect({ name, options, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Autocomplete
                    {...field}
                    multiple
                    freeSolo
                    onChange={(event, newValue) => field.onChange(newValue)}
                    options={options.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip {...getTagProps({ index })} key={option} size='small' label={option} />
                        ))
                    }
                    renderInput={(params) => <TextField {...params} {...other} />}
                />
            )}
        />
    );
}
