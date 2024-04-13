import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useFieldArray, useFormContext } from 'react-hook-form';
import RHFTextField from './RHFTextField';

RHFDynamicField.propTypes = {
    initialState: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    actionText: PropTypes.string,
};

function RHFDynamicField({ initialState, name, label, actionText }) {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name });

    const addField = () => append('');

    const removeField = (index) => remove(index);

    useEffect(() => {
        if (!initialState.length) {
            append('');
        }

        // eslint-disable-next-line
    }, []);

    return (
        <Box>
            {fields.map((field, index) => (
                <div key={index + 1} style={{ display: 'flex', alignItems: 'center' }}>
                    <RHFTextField name={`${name}[${index}]`} label={`${label} ${index + 1}`} />
                    {index ? <Button onClick={() => removeField(index)}>Remove Field</Button> : null}
                </div>
            ))}
            <Button onClick={addField}>{actionText || ''}</Button>
        </Box>
    );
}

export default RHFDynamicField;
