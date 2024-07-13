// // ...
// export default async function InvoicesTable({
//     query,
//     currentPage,
// }: {
//     query: string;
//     currentPage: number;
// }) {
//     const invoices = await fetchFilteredInvoices(query, currentPage);
//     // ...
// }

// import React from 'react';
// import { fetchFilteredInvoices } from '@/app/lib/data'; // Sesuaikan dengan path yang benar
// import { formatCurrency, formatDateToLocal } from '@/app/lib/utils'; // Sesuaikan dengan path yang benar
// import { Invoice } from '@/app/lib/definitions'; // Sesuaikan dengan path yang benar

// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Pencil, Trash } from 'lucide-react';

// export default async function InvoicesTable({
//     query,
//     currentPage,
// }: {
//     query: string;
//     currentPage: number;
// }) {
//     const invoices = await fetchFilteredInvoices(query, currentPage);

//     return (
//         <Table>
//             <TableHeader>
//                 <TableRow>
//                     <TableHead>Invoice</TableHead>
//                     <TableHead>Customer</TableHead>
//                     <TableHead>Amount</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Actions</TableHead>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {invoices.map((invoice: Invoice) => (
//                     <TableRow key={invoice.id}>
//                         <TableCell>{invoice.invoice_number}</TableCell>
//                         <TableCell>{invoice.customer_name}</TableCell>
//                         <TableCell>{formatCurrency(invoice.amount)}</TableCell>
//                         <TableCell>{formatDateToLocal(invoice.date)}</TableCell>
//                         <TableCell>
//                             <Badge
//                                 variant={invoice.status === 'paid' ? 'success' : 'destructive'}
//                             >
//                                 {invoice.status}
//                             </Badge>
//                         </TableCell>
//                         <TableCell>
//                             <div className="flex space-x-2">
//                                 <Button variant="outline" size="icon">
//                                     <Pencil className="h-4 w-4" />
//                                 </Button>
//                                 <Button variant="destructive" size="icon">
//                                     <Trash className="h-4 w-4" />
//                                 </Button>
//                             </div>
//                         </TableCell>
//                     </TableRow>
//                 ))}
//             </TableBody>
//         </Table>
//     );
// }
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from 'lucide-react';

// Dummy utility functions
const formatCurrency = (amount: number): string => {
    return `$${amount.toFixed(2)}`;
};

const formatDateToLocal = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
};

// Dummy data type definition
interface Invoice {
    id: number;
    invoice_number: string;
    customer_name: string;
    amount: number;
    date: string;
    status: 'paid' | 'unpaid';
}

// Dummy data
const dummyInvoices: Invoice[] = [
    {
        id: 1,
        invoice_number: 'INV-001',
        customer_name: 'John Doe',
        amount: 250.0,
        date: '2023-06-15',
        status: 'paid',
    },
    {
        id: 2,
        invoice_number: 'INV-002',
        customer_name: 'Jane Smith',
        amount: 150.0,
        date: '2023-06-16',
        status: 'unpaid',
    },
    {
        id: 3,
        invoice_number: 'INV-003',
        customer_name: 'Alice Johnson',
        amount: 300.0,
        date: '2023-06-17',
        status: 'paid',
    },
    // Add more dummy data as needed
];

export default function InvoicesTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    // Filter dummy invoices based on query and currentPage
    const filteredInvoices = dummyInvoices.filter(invoice =>
        invoice.customer_name.toLowerCase().includes(query.toLowerCase())
    ).slice((currentPage - 1) * 10, currentPage * 10); // Assuming 10 invoices per page

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {filteredInvoices.map((invoice: Invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell>{invoice.invoice_number}</TableCell>
                        <TableCell>{invoice.customer_name}</TableCell>
                        <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                        <TableCell>{formatDateToLocal(invoice.date)}</TableCell>
                        <TableCell>
                            <Badge
                                variant={invoice.status === 'paid' ? 'success' : 'destructive'}
                            >
                                {invoice.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                <Button variant="outline" size="icon">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="destructive" size="icon">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
