import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#b7b7b7',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#b7b7b7',
            borderWidth: '2px',
        },
        '& input:focus': {
            outline: 'none',
        },
    },
    '& .MuiInputLabel-shrink': {
        textDecoration: 'none',
    },
    '& .MuiInputLabel-root': {
        marginTop: '-4px',
    },
}));