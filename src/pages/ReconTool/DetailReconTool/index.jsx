import { Box } from '@mui/material';
import DetailReconToolTable from './DetailReconToolTable';
import PortfolioTable from './PortfolioTable';
import PortfolioTableGroup from './PortfolioTableGroup';

export default function DetailReconTool() {
  return (
    <Box>
      <DetailReconToolTable />
      <PortfolioTable />
      <PortfolioTableGroup />
    </Box>
  );
}
