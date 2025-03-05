import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {Button} from "@/components/ui/button";

interface InvoiceItem {
    productName: string;
    retailPrice: number;
    quantity: number;
}

interface InvoiceProps {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    items: InvoiceItem[];
}

export default function InvoiceComponent({
                                             customerName,
                                             customerEmail,
                                             customerPhone,
                                             items = [],
                                         }: InvoiceProps) {
    const totalInvoice = items.reduce((sum, item) => sum + item.retailPrice * item.quantity, 0);
    const handleClose = () => {
        alert("close");
    };
    return (
        <Card className="w-2/3 mx-auto shadow-lg border rounded-2xl overflow-hidden bg-white">
            <CardTitle>
                <div className="bg-blue-800 text-white p-4 rounded-t-lg">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold">INVOICE</h1>
                    </div>
                </div>
            </CardTitle>
            <CardHeader className="">
                <div className="flex justify-between">
                    <div className=" text-left mb-6">
                        <p className="font-bold">Bill To:</p>
                        <Label className="block text-gray-700">Customer: <span
                            className="font-medium">{customerName}</span></Label>
                        <Label className="block text-gray-700">Phone: <span
                            className="font-medium">{customerPhone}</span></Label>
                        <Label className="block text-gray-700">Email: <span
                            className="font-medium">{customerEmail}</span></Label>
                    </div>
                    <div className="text-right">
                        <p className="font-bold">From:</p>
                        <p>Samira Hadid</p>
                        <p>+123-456-7890</p>
                        <p>123 Anywhere St., Any City</p>
                    </div>
                </div>

            </CardHeader>
            <CardContent className="p-6">
                <Table className="w-full border rounded-lg overflow-hidden">
                    <TableHeader>
                        <TableRow className="bg-gray-200">
                            <TableHead className="w-[80px] text-left p-4">No</TableHead>
                            <TableHead className="text-left p-4">Product Name</TableHead>
                            <TableHead className="text-center p-4">Quantity</TableHead>
                            <TableHead className="text-center p-4">Retail Price</TableHead>
                            <TableHead className="text-right p-4">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {items.map((item, index) => (
                            <TableRow key={index} className="border-b hover:bg-gray-100">
                                <TableCell className="p-4 font-medium">{index + 1}</TableCell>
                                <TableCell className="p-4">{item.productName}</TableCell>
                                <TableCell className="p-4 text-center">{item.quantity}</TableCell>
                                <TableCell className="p-4 text-center">${item.retailPrice}</TableCell>
                                <TableCell
                                    className="p-4 text-right font-semibold">${(item.retailPrice * item.quantity).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className="bg-gray-200">
                            <TableCell colSpan={4} className="p-4 font-bold text-right">Grand Total</TableCell>
                            <TableCell
                                className="p-4 text-right font-bold text-lg">${totalInvoice.toFixed(2)}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
                <div className="flex justify-end mt-4">
                    <Button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleClose}>Close</Button>
                </div>
            </CardContent>
        </Card>
    );
}

