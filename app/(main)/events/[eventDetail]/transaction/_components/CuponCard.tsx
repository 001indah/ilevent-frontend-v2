import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const CouponCard = ({ discount, code, quantity, endDate }) => {
    const [useCoupon, setUseCoupon] = useState(false);

    return (
        <div className="bg-purple-100 p-4 rounded-lg shadow-md max-w-xs border-2 border-purple-300">
            <div className="mb-3">
                <h2 className="text-lg font-semibold mb-1 text-purple-800">Coupon Redemption</h2>
                <p className="text-3xl font-bold text-purple-600">{discount}% OFF</p>
            </div>

            <div className="mb-3">
                <p className="text-sm text-purple-700"><span className="font-semibold">Code:</span> {code}</p>
                <p className="text-sm text-purple-700"><span className="font-semibold">Quantity:</span> {quantity} left</p>
                <p className="text-sm text-purple-700"><span className="font-semibold">Expires:</span> {endDate}</p>
            </div>

            <div className="flex items-center space-x-2 mb-3">
                <Switch
                    id="use-coupon"
                    checked={useCoupon}
                    onCheckedChange={setUseCoupon}
                    className="data-[state=checked]:bg-purple-600"
                />
                <Label htmlFor="use-coupon" className="text-sm text-purple-800">Use this coupon</Label>
            </div>

            {useCoupon && (
                <div className="mb-3 text-sm text-purple-700">
                    <p>Coupon applied successfully!</p>
                    <p>Your discount: {discount}% off your purchase</p>
                </div>
            )}
        </div>
    );
};

export default CouponCard;