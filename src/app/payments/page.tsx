import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { DataTablePagination } from "./DataTablePagination";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728e2f",
      amount: 100,
      status: "pending",
      email: "lo@example.com",
    },
    {
      id: "7282f",
      amount: 100,
      status: "pending",
      email: "sx@example.com",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
      <DataTablePagination />
    </div>
  );
}
