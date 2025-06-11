// material-ui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

export default function AuthFooter() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer">
      <Container maxWidth={false}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent={{ xs: 'center', sm: 'space-between' }}
          alignItems={{ xs: 'center', sm: 'flex-start' }}
          spacing={2}
          textAlign={{ xs: 'center', sm: 'inherit' }}
        >
          <Typography variant="subtitle2">
            &copy; {currentYear} All Rights Reserved by{' '}
            <Link
              // href="https://www.empaxis.com"
              target="_blank"
              underline="hover"
              rel="noopener noreferrer"
              sx={{
                color: theme.palette.primary.main
              }}
            >
              Empaxis
            </Link>
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 0.5, sm: 1 }}
            alignItems="center"
            divider={
              <Typography
                color="text.secondary"
                sx={{
                  display: 'block',
                  opacity: 0.8
                }}
              >
                •
              </Typography>
            }
          >
            <Link
              variant="subtitle2"
              // href="https://www.empaxis.com/faq"
              target="_blank"
              underline="hover"
              rel="noopener noreferrer"
            >
              FAQ
            </Link>
            <Link
              variant="subtitle2"
              // href="https://www.empaxis.com/privacy-policy"
              target="_blank"
              underline="hover"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
            <Link
              variant="subtitle2"
              // href="https://www.empaxis.com/who-we-are"
              target="_blank"
              underline="hover"
              rel="noopener noreferrer"
            >
              About us
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
