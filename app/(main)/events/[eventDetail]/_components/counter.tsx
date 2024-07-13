'use client'
import { useState } from 'react';

const CounterInput = () => {
    const [count, setCount] = useState(0);

    const decrement = () => {
        setCount(prevCount => prevCount - 1);
    };

    const increment = () => {
        setCount(prevCount => prevCount + 1);
    };

    return (
        <div className="custom-number-input h-10 w-32">

            <div className="border border-gray-300 flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                <button onClick={decrement} className=" text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                    <span className="m-auto text-2xl font-thin">−</span>
                </button>
                <input type="number" id="custom-input-number" className="outline-none focus:outline-none text-center w-full  font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 " name="custom-input-number" value={count} readOnly />
                <button onClick={increment} className=" text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                    <span className="m-auto text-2xl font-thin">+</span>
                </button>
            </div>
        </div>
    );
};

export default CounterInput;
