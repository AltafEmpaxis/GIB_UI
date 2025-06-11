import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { BrowserRouter } from 'react-router';
import { QueryProvider } from './lib/react-query/QueryProvider';

// Project imports
import ScrollTop from 'components/ScrollTop';
import { AuthProvider } from 'contexts/AuthContext';
import { ThemeProvider } from 'contexts/ThemeContext';
import Routes from 'routes/index';
import ThemeCustomization from 'themes/index';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <ThemeProvider>
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-US" locale="en">
              <ThemeCustomization>
                <ScrollTop>
                  <Routes />
                </ScrollTop>
              </ThemeCustomization>
            </LocalizationProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryProvider>
    </BrowserRouter>
  );
}
