// material-ui
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

export default function AuthFooter() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Hover state for interactive elements
  const [hoveredLink, setHoveredLink] = useState(null);

  // Social media icons with enhanced data
  const socialIcons = [
    {
      icon: 'mdi:linkedin',
      link: 'https://www.linkedin.com/company/gibcapitalksa/',
      color: '#0A66C2',
      label: 'LinkedIn'
    },
    {
      icon: 'mdi:twitter',
      link: 'https://twitter.com/gibcapitalksa',
      color: '#1DA1F2',
      label: 'Twitter'
    }
    // {
    //   icon: 'mdi:instagram',
    //   link: 'https://www.instagram.com/gibcapital/',
    //   color: '#E4405F',
    //   label: 'Instagram'
    // }
  ];

  // Footer links with enhanced data
  const footerLinks = [
    { title: 'Terms', link: '/terms' },
    { title: 'Privacy', link: '/privacy' },
    { title: 'Support', link: '/support' },
    { title: 'Contact', link: '/contact' }
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 0.5, sm: 0.75, md: 0.75 },
        px: { xs: 0.5, sm: 0.75, md: 0.75 },
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backdropFilter: 'blur(10px)',
        background: isDark ? alpha(theme.palette.background.default, 0.1) : alpha(theme.palette.background.paper, 0.08),
        borderTop: `1px solid ${alpha(theme.palette.divider, isDark ? 0.1 : 0.05)}`,
        boxShadow: `0 -4px 20px ${alpha(theme.palette.common.black, 0.02)}`,
        display: 'flex',
        alignItems: 'center',
        height: 'auto',
        transition: 'all 0.3s ease',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth={false}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 1.5, sm: 0, md: 0 }}
          sx={{ py: { xs: 0.5, sm: 0, md: 0 }, px: { xs: 0.5, sm: 0, md: 0 } }}
        >
          {/* Copyright Section with Security Badge */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              order: { xs: 2, sm: 1, md: 1 },
              mt: { xs: 1, sm: 0, md: 0 },
              mb: { xs: 1, sm: 0, md: 0 }
            }}
          >
            <Tooltip title="Secure Connection" arrow placement="top">
              <Box
                sx={{
                  bgcolor: alpha(theme.palette.success.main, 0.12),
                  borderRadius: '50%',
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.success.main, 0.2),
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Icon icon="solar:shield-check-bold" width={14} height={14} color={theme.palette.success.main} />
              </Box>
            </Tooltip>
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

          {/* Social Media Section */}
          <Box
            sx={{
              width: { xs: '100%', sm: 'auto' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              order: { xs: 1, sm: 2, md: 2 },
              my: { xs: 1, sm: 0, md: 0 }
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              sx={{
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'flex-start' }
              }}
            >
              {socialIcons.map((item, index) => (
                <Tooltip key={index} title={item.label} arrow placement="top">
                  <IconButton
                    component={Link}
                    href={item.link}
                    target="_blank"
                    rel="noopener"
                    size="small"
                    sx={{
                      p: 0.5,
                      color: item.color,
                      bgcolor: alpha(item.color, 0.5),
                      borderRadius: '50%',
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: alpha(item.color, 0.2),
                        transform: 'translateY(-3px)'
                      }
                    }}
                  >
                    <Icon icon={item.icon} width={18} height={18} />
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Box>

          {/* Links Section */}
          <Stack
            direction={{ xs: 'row', sm: 'row' }}
            spacing={{ xs: 2, sm: 2.5 }}
            sx={{
              order: { xs: 3, sm: 3, md: 3 },
              justifyContent: { xs: 'center', sm: 'flex-end', md: 'flex-end' },
              mt: { xs: 0, sm: 0, md: 0 },
              mb: { xs: 1, sm: 1, md: 0 },
              width: { xs: '100%', sm: 'auto' }
            }}
            divider={
              <Typography
                variant="caption"
                sx={{
                  color: alpha(theme.palette.text.secondary, 0.5),
                  fontSize: '0.75rem',
                  alignSelf: 'center'
                }}
              >
                •
              </Typography>
            }
          >
            {!isTablet && (
              <Tooltip title="SSL Encrypted Connection" arrow placement="top">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    bgcolor: alpha(theme.palette.success.main, 0.05),
                    px: 1,
                    py: 0.5,
                    borderRadius: '12px',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.success.main, 0.1)
                    }
                  }}
                >
                  <Icon
                    icon="solar:lock-keyhole-minimalistic-bold"
                    width={10}
                    height={10}
                    color={theme.palette.success.main}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: theme.palette.success.main,
                      fontSize: '0.7rem',
                      fontWeight: 500
                    }}
                  >
                    Secure
                  </Typography>
                </Box>
              </Tooltip>
            )}

            {footerLinks.map((link, index) => (
              <Link
                key={index}
                href={link.link}
                variant="caption"
                underline="none"
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
                sx={{
                  color:
                    hoveredLink === index
                      ? theme.palette.secondary.main
                      : isDark
                        ? theme.palette.grey[400]
                        : theme.palette.text.secondary,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                    transform: 'translateY(-2px)'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -2,
                    left: 0,
                    width: hoveredLink === index ? '100%' : '0%',
                    height: '2px',
                    backgroundColor: theme.palette.secondary.main,
                    transition: 'width 0.2s ease'
                  }
                }}
              >
                {link.title}
              </Link>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
