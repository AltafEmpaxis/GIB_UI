import { Icon } from '@iconify/react';
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

import MainCard from 'components/MainCard';

const iconSX = {
  fontSize: '0.875rem',
  marginLeft: 0.25,
  marginRight: 0.25,
  verticalAlign: 'sub'
};

export default function Analytics({ color = 'primary', title, count, percentage, isLoss, extra, showChip = true }) {
  return (
    <MainCard>
      <Stack spacing={1}>
        <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
        <Grid container alignItems="center" spacing={1}>
          <Grid item sx={{ px: '0 !important' }}>
            <Typography variant="h4" color="inherit" sx={{ fontWeight: 600 }}>
              {count}
            </Typography>
          </Grid>
          {percentage !== undefined && showChip && (
            <Grid item>
              <Chip
                variant="combined"
                color={color}
                icon={
                  isLoss ? (
                    <Icon icon="solar:arrow-down-bold-duotone" style={iconSX} />
                  ) : (
                    <Icon icon="solar:arrow-up-bold-duotone" style={iconSX} />
                  )
                }
                label={`${percentage}%`}
                size="small"
              />
            </Grid>
          )}
        </Grid>
      </Stack>
      {extra && (
        <Box sx={{ pt: 1.5 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '0.75rem',
              fontWeight: 500
            }}
          >
            {extra}
          </Typography>
        </Box>
      )}
    </MainCard>
  );
}

Analytics.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  extra: PropTypes.string,
  showChip: PropTypes.bool
};
