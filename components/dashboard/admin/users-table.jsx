import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserDeleteAlert from "./users/user-delete-alert";

// TODO: remove default users data
export default function UsersTable({
  users = [
    {
      id: 1,
      name: "Mahfuz Hasan",
      email: "mahfuz@example.com",
      joiningDate: "2025-08-20",
    },
    {
      id: 2,
      name: "Ayesha Rahman",
      email: "ayesha@example.com",
      joiningDate: "2025-08-21",
    },
    {
      id: 3,
      name: "Rafiq Ahmed",
      email: "rafiq@example.com",
      joiningDate: "2025-08-21",
    },
    {
      id: 4,
      name: "Tania Sultana",
      email: "tania@example.com",
      joiningDate: "2025-08-22",
    },
    {
      id: 5,
      name: "Imran Hossain",
      email: "imran@example.com",
      joiningDate: "2025-08-22",
    },
    {
      id: 6,
      name: "Sadia Islam",
      email: "sadia@example.com",
      joiningDate: "2025-08-23",
    },
    {
      id: 7,
      name: "Nayeem Khan",
      email: "nayeem@example.com",
      joiningDate: "2025-08-23",
    },
    {
      id: 8,
      name: "Rumana Akter",
      email: "rumana@example.com",
      joiningDate: "2025-08-24",
    },
    {
      id: 9,
      name: "Fahim Chowdhury",
      email: "fahim@example.com",
      joiningDate: "2025-08-24",
    },
    {
      id: 10,
      name: "Leena Karim",
      email: "leena@example.com",
      joiningDate: "2025-08-25",
    },
  ],
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Joining Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.joiningDate}</TableCell>
            <TableCell>
              {/* TODO: pass user */}
              <UserDeleteAlert />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
