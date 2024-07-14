import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PointsCard = ({ totalPoints, totalAmount }) => {
    const [usePoints, setUsePoints] = useState(false);
    const pointsValue = totalPoints * 0.01; // Assuming 1 point = $0.01
    const amountAfterPoints = Math.max(0, totalAmount - pointsValue);

    return (
        <div className="bg-teal-500 p-4 rounded-lg shadow-md max-w-xs text-white">
            <div className="mb-3">
                <h2 className="text-sm font-semibold mb-1">Your Points</h2>
                <p className="text-2xl font-bold">{totalPoints} pts</p>
                <p className="text-xs opacity-80">Value: ${pointsValue.toFixed(2)}</p>
            </div>

            <div className="flex items-center space-x-2 mb-3">
                <Switch
                    id="use-points"
                    checked={usePoints}
                    onCheckedChange={setUsePoints}
                    className="data-[state=checked]:bg-white data-[state=checked]:text-teal-500"
                />
                <Label htmlFor="use-points" className="text-sm">Use points</Label>
            </div>

            {usePoints && (
                <div className="mb-3 text-xs">
                    <p>Points applied: -{Math.min(totalPoints, totalAmount * 100)} pts</p>
                    <p>Amount after points: ${amountAfterPoints.toFixed(2)}</p>
                </div>
            )}

            <div>
                <h3 className="text-sm font-semibold">Total to Pay</h3>
                <p className="text-xl font-bold">
                    ${usePoints ? amountAfterPoints.toFixed(2) : totalAmount.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default PointsCard;