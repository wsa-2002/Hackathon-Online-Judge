import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  makeStyles,
} from '@material-ui/core';
import theme from '../../theme';

const useStyles = makeStyles(() => ({
  tableHeadCell: {
    height: '45px',
    minWidth: '20px',
  },
  column: {
    display: 'flex',
    justifyContent: 'center',
  },
  row: {
    height: '60px',
  },
}));

export default function ScoreTable({ data, columns }) {
  const classes = useStyles();
  return (
    <>
      <Paper style={{ width: '100%' }}>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead className={classes.tableHeadCell}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.label}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      width: column.width,
                      maxWidth: column.width,
                      paddingTop: 10,
                      paddingBottom: 10,
                    }}
                  >
                    <div className={classes.column}>{column.label}</div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.description} className={classes.row}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.label}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        width: column.width,
                        maxWidth: column.width,
                        overflowX: 'scroll',
                        whiteSpace: 'nowrap',
                        justifyContent: 'center',
                        color:
                          column.id === 'status'
                          && ((row[column.id] === 'PASS' && theme.palette.secondary.main)
                            || (row[column.id] === 'FAIL' && theme.palette.error.main)),
                      }}
                    >
                      {row[column.id]}
                      {column.id === 'description' && row.errorMsg !== null && (
                        <>
                          <br />
                          <div style={{ color: theme.palette.error.main, marginTop: '5px' }}>{row.errorMsg}</div>
                        </>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
