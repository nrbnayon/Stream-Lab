import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { subscribersList } from "@/constants";
import SubscriberDeleteAlert from "./subscriber-delete-alert";
export default function RenderSubscribersTable() {
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
        {subscribersList.map((subscriber, i) => (
          <TableRow key={i}>
            <TableCell>{subscriber.subscriber_name}</TableCell>
            <TableCell>{subscriber.subscription_type}</TableCell>
            <TableCell>{subscriber.activation_date}</TableCell>
            <TableCell>
              {/* TODO: pass subscriber */}
              <SubscriberDeleteAlert />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
