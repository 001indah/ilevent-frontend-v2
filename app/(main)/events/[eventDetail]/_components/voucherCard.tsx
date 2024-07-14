import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function VoucherCard() {
    return (
        <div className="max-w-md mx-auto">
            <Card className="bg-white text-black border-2 border-black">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Summer Sale Voucher</CardTitle>
                    <CardDescription>20% off on all items</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold mb-4">SUMMER20</p>
                    <Button variant="outline" className="w-full border-2 border-black hover:bg-black hover:text-white transition-colors">
                        Claim Voucher
                    </Button>
                </CardContent>
                <CardFooter className="text-sm text-gray-500">
                    Valid until August 31, 2024
                </CardFooter>
            </Card>

            <Separator className="my-8" />

            <Card className="bg-white text-black border-2 border-black mt-8">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>$100.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount (20%)</span>
                            <span>-$20.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$5.00</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span>$85.00</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-black text-white hover:bg-gray-800">
                        Place Order
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}