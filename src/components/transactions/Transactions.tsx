import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  TablePagination,
} from "@mui/material";

import { useTransactionsData, TransactionItem } from "../../api/UsersService";
import "./Transactions.scss";
import React from "react";
import { useNavigate } from "react-router-dom";

const headerRowItems = ["Sender", "Receiver", "Date", "Amount"];

export default function Transactions() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { isLoading, isError, error, data } = useTransactionsData(
    page,
    rowsPerPage
  );

  const navigate = useNavigate();

  const [selectedTransaction, setSelectedTransaction] =
    React.useState<TransactionItem | null>(null);

  const handleProfileClick = (transaction: TransactionItem) => {
    setSelectedTransaction(transaction);
  };

  if (isError && (error as Error).message === "Unauthorized") {
    navigate("/login");
  }

  return (
    <Container className="users">
      <TableContainer component={Paper} className="table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="table-header">
            <TableRow hover>
              {headerRowItems.map((item) => (
                <TableCell className="table-row-cell" key={item}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="table-body">
            {data &&
              data.items &&
              data.items.map((transaction) => (
                <TableRow
                  className="table-row"
                  hover
                  key={transaction.date}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell className="table-row-cell">
                    {transaction.sender}
                  </TableCell>
                  <TableCell className="table-row-cell">
                    {transaction.receiver}
                  </TableCell>
                  <TableCell className="table-row-cell">
                    {transaction.date}
                  </TableCell>
                  <TableCell className="table-row-cell">
                    {transaction.amount}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={data?.total || 0}
          page={page}
          onPageChange={(event, newPage) => {
            setPage(newPage);
          }}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Resultados por página:"
        />
        {isError && (
          <div>
            <Typography color="error" variant="body1">
              {(error as Error).message}
            </Typography>
          </div>
        )}
        {isLoading && <div>Loading...</div>}
      </TableContainer>
    </Container>
  );
}
