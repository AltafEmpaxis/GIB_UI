// material-ui
import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const Search = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', ml: { xs: 1, md: 2 } }}>
      <FormControl sx={{ width: { xs: '100%', md: 260 } }}>
        <OutlinedInput
          size="medium"
          id="header-search"
          startAdornment={
            <InputAdornment position="start" sx={{ color: theme.palette.grey[500] }}>
              <Icon icon="solar:magnifer-bold-duotone" width={22} height={22} />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            'aria-label': 'search'
          }}
          placeholder="Ctrl + K"
        />
      </FormControl>
    </Box>
  );
};

export default Search;
