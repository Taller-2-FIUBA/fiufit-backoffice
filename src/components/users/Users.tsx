import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getUsers, User } from "../../api/UsersService";
import "./Users.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";

export default function Users() {
  const [rows, setRows] = useState<User[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedAdmin } = location.state;

  useEffect(() => {
    const fetchData = async () => {
      const data: User[] = await getUsers(loggedAdmin.token);
      setRows(data);
      toast.success("Table loaded successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    };

    fetchData().catch((error) => {
      //        raise HTTPException(status_code=403, detail="Invalid credentials")

      throw new Error(error);
    });
  }, []);

  const handleRowClick = (user: User) => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <div className="users">
      <TableContainer component={Paper} className="user-table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="user-table-header">
            <TableRow hover>
              <TableCell>Username</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Registration date</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                hover
                selected
                key={row.username}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => handleRowClick(row)}
              >
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.surname}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.registration_date}</TableCell>
                <TableCell>{row?.is_athlete ? "Athlete" : "Trainer"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
