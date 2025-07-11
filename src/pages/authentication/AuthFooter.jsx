// material-ui
import { Icon } from '@iconify/react';
import { Box, Container, IconButton, Link, Stack, Typography, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

export default function AuthFooter() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const isDark = theme.palette.mode === 'dark';

  // Social media icons
  const socialIcons = [
    { icon: 'mdi:linkedin', link: 'https://www.linkedin.com/company/gib-capital/', color: 'blue' },
    { icon: 'mdi:twitter', link: 'https://twitter.com/', color: 'blue' },
    { icon: 'mdi:facebook', link: 'https://www.facebook.com/', color: 'blue' },
    { icon: 'mdi:instagram', link: 'https://www.instagram.com/', color: 'blue' }
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        width: '100vw',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backdropFilter: 'blur(10px)',
        background: isDark
          ? alpha(theme.palette.background.default, 0.85)
          : alpha(theme.palette.background.default, 0.8),
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: `0 -4px 20px ${alpha(theme.palette.common.black, 0.05)}`
      }}
    >
      <Container maxWidth={false}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 2, sm: 0 }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                bgcolor: alpha(theme.palette.secondary.main, 0.12),
                borderRadius: '50%',
                width: 22,
                height: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon icon="solar:shield-check-bold" width={14} height={14} color={theme.palette.secondary.main} />
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: isDark ? theme.palette.grey[400] : theme.palette.text.secondary,
                fontWeight: 500,
                fontSize: '0.75rem'
              }}
            >
              {currentYear} © GIB Capital • All Rights Reserved
            </Typography>
          </Stack>

          {/* Social Media Icons */}
          <Stack direction="row" spacing={1}>
            {socialIcons.map((item, index) => (
              <IconButton
                key={index}
                component={Link}
                href={item.link}
                target="_blank"
                rel="noopener"
                size="small"
                sx={{
                  color: theme.palette.secondary.main,
                  bgcolor: alpha(theme.palette.secondary.main, 0.12),
                  width: 32,
                  height: 32,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.secondary.main, 0.2)
                  }
                }}
              >
                <Icon icon={item.icon} width={16} height={16} color={item.color} style={{ color: item.color }} />
              </IconButton>
            ))}
          </Stack>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2 }}
            divider={
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  display: { xs: 'none', sm: 'inline' },
                  fontSize: '0.7rem'
                }}
              >
                •
              </Typography>
            }
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box
                sx={{
                  bgcolor: alpha(theme.palette.secondary.main, 0.12),
                  borderRadius: '50%',
                  width: 18,
                  height: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon
                  icon="solar:lock-keyhole-minimalistic-bold"
                  width={10}
                  height={10}
                  color={theme.palette.secondary.main}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: isDark ? theme.palette.grey[500] : theme.palette.text.secondary,
                  fontSize: '0.7rem',
                  lineHeight: '1'
                }}
              >
                SSL Encrypted
              </Typography>
            </Box>

            <Link
              variant="caption"
              underline="hover"
              sx={{
                color: isDark ? theme.palette.secondary.light : theme.palette.secondary.dark,
                fontSize: '0.7rem',
                transition: 'color 0.2s',
                '&:hover': { color: theme.palette.secondary.main }
              }}
            >
              Terms
            </Link>
            <Link
              variant="caption"
              underline="hover"
              sx={{
                color: isDark ? theme.palette.secondary.light : theme.palette.secondary.dark,
                fontSize: '0.7rem',
                transition: 'color 0.2s',
                '&:hover': { color: theme.palette.secondary.main }
              }}
            >
              Privacy
            </Link>
            <Link
              variant="caption"
              underline="hover"
              sx={{
                color: isDark ? theme.palette.secondary.light : theme.palette.secondary.dark,
                fontSize: '0.7rem',
                transition: 'color 0.2s',
                '&:hover': { color: theme.palette.secondary.main }
              }}
            >
              Support
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
