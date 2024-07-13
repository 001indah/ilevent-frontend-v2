import React from 'react';
import Marquee from "react-fast-marquee";
import Image from 'next/image';

const LabelLogo = () => {
    const logo1 = [
        "aia",
        "ajaib",
        "allianz",
        "alodokter",
        "amartha",
        "astra",
        "blibli",
        "ey",
        "gojek",
        "grab",
        "halodoc",
        "jago",
    ];
    const logo2 = [
        "jenius",
        "tokopedia",
        "ocbc",
        "ruangguru",
        "shopee",
        "stockbit-bibit",
        "taco",
        "tbs",
        "tiktok",
        "traveloka",
        "unilever"
    ];

    return (
        <div>
            <div className='w-full relative bg-abuSedang items-center justify-center lg:pt-[100px] lg:p-16 p-6'>
                <p className='text-black text-2xl font-semibold text-center pb-3 lg:text-[40px] my-8 lg:leading-[55px]'>Purwadhika alumni <br /> have been
                    <span className='highlight'> employed</span> by these companies
                </p>
                {/* <p className='lg:text-base text-[13px] text-slate-600 flex text-center decoration-solid lg:px-[150px] lg:py-6'>
                Purwadhika has been an experienced and trusted digital technology education institution for more than 36 years since 1987.
            </p> */}
                <div className="w-full h-20 overflow-hidden">
                    <Marquee pauseOnHover={true} gradient={false} direction="right" speed={20}>
                        {logo1.map((logo, index) => (
                            <div key={index} className="mx-4 flex items-center justify-center h-16">
                                <Image
                                    alt={logo}
                                    src={`/logo2/${logo}.png`}
                                    height={70}
                                    width={120}
                                    className="object-contain h-full"
                                />
                            </div>
                        ))}
                    </Marquee>
                </div>
                <div className="w-full h-20 overflow-hidden mt-4">
                    <Marquee pauseOnHover={true} gradient={false} direction="left" speed={10}>
                        {logo2.map((logo, index) => (
                            <div key={index} className="mx-4 flex items-center justify-center h-16">
                                <Image
                                    alt={logo}
                                    src={`/logo2/${logo}.png`}
                                    height={70}
                                    width={120}
                                    className="object-contain h-full"
                                />
                            </div>
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    );
};

export default LabelLogo;
