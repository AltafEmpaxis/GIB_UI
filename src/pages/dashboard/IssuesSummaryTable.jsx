import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import { issuesSummaryData } from './mockData';

const columns = [
  {
    accessorKey: 'issueType',
    header: 'Issue Type',
    align: 'left'
  },
  {
    accessorKey: 'count',
    header: 'Count',
    align: 'right'
  }
];

export default function IssuesSummaryTable({ showHistorical }) {
  const data = showHistorical ? issuesSummaryData.historical : issuesSummaryData.current;

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.accessorKey} align={column.align}>
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow hover key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.accessorKey} align={column.align}>
                    {column.accessorKey === 'count'
                      ? row[column.accessorKey].toLocaleString()
                      : row[column.accessorKey]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

IssuesSummaryTable.propTypes = {
  showHistorical: PropTypes.bool
};

IssuesSummaryTable.defaultProps = {
  showHistorical: false
};
