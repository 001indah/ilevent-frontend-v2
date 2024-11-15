export interface EventProps {
    id: number;
    imageSrc: string;
    location: string;
    date: string;
    price: string;
    discountedPrice?: string;
    discountPercentage?: number;
    title: string;
    logo?: string;
    heartIcon?: React.ReactNode;
    organizer?: string;
    organizerImg?: string;
    category?: string;
    mapsSrc?: string;
}

export const events: EventProps[] = [
    {
        id: 1,
        imageSrc: "https://images.unsplash.com/photo-1515168985652-8454bcc8fcaf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Surabaya",
        date: "January 01, 2023 | 10:00 - 12:00",
        price: "Rp 50.000",
        discountedPrice: "Rp 100.000",
        discountPercentage: 50,
        title: "Casa Las Tortugas",
        logo: "Indah",
        organizer: "John Doe",
        organizerImg: "organizer1.png",
        category: "Festival",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126917.65351680737!2d112.6318500248633!3d-7.275619183325626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381ac47f%3A0x3027a76e352be40!2sSurabaya%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 2,
        imageSrc: "https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Jakarta",
        date: "Monday, January 02, 2023 | 10:00 - 12:00",
        price: "Rp 60.000",
        title: "Sunset Festival",
        organizer: "Jane Smith",
        organizerImg: "organizer2.png",
        category: "Festival",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.65638727873!2d106.66403455962983!3d-6.229386743576797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 3,
        imageSrc: "https://images.unsplash.com/photo-1561489396-888724a1543d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Bandung",
        date: "Tuesday, January 03, 2023 | 10:00 - 12:00",
        price: "Rp 70.000",
        discountedPrice: "Rp 120.000",
        discountPercentage: 41.67,
        title: "Music Concert",
        organizer: "Bob Johnson",
        organizerImg: "organizer3.png",
        category: "Music",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.57311651134903!3d-6.903273916440821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 4,
        imageSrc: "https://images.unsplash.com/photo-1561489401-fc2876ced162?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Yogyakarta",
        date: "Wednesday, January 04, 2023 | 10:00 - 12:00",
        price: "Rp 80.000",
        title: "Food Festival",
        organizer: "Alice Brown",
        organizerImg: "organizer4.png",
        category: "Food",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126328.52765375551!2d110.33371551238978!3d-7.7971274703735975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787bd5b6bc5%3A0x21723fd4d3684f71!2sYogyakarta%2C%20Yogyakarta%20City%2C%20Special%20Region%20of%20Yogyakarta!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 5,
        imageSrc: "https://images.unsplash.com/photo-1561489401-fc2876ced162?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        location: "Semarang",
        date: "Thursday, January 05, 2023 | 10:00 - 12:00",
        price: "Rp 90.000",
        discountedPrice: "Rp 150.000",
        discountPercentage: 40,
        title: "Art Exhibition",
        logo: "Amazing",
        organizer: "Charlie Davis",
        organizerImg: "organizer5.png",
        category: "Art",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127199.80847445984!2d110.33871236876348!3d-7.024722047622278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4d3f0d024d%3A0x1e0432b9da5cb9f2!2sSemarang%2C%20Semarang%20City%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 6,
        imageSrc: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        location: "Medan",
        date: "Sunday, January 01, 2023 | 10:00 - 12:00",
        price: "Rp 50.000",
        discountedPrice: "Rp 100.000",
        discountPercentage: 50,
        title: "Casa Las Tortugas",
        logo: "Indah",
        organizer: "David Wilson",
        organizerImg: "organizer6.png",
        category: "Festival",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127505.35625770037!2d98.56997890723174!3d3.6277501863565957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131cc1c3eb2fd%3A0x23d431c8a6908262!2sMedan%2C%20Medan%20City%2C%20North%20Sumatra!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 7,
        imageSrc: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        location: "Makassar",
        date: "Tuesday, January 03, 2023 | 14:00 - 16:00",
        price: "Rp 70.000",
        discountedPrice: "Rp 120.000",
        discountPercentage: 41.67,
        title: "Music Concert",
        organizer: "Emma Taylor",
        organizerImg: "organizer7.png",
        category: "Music",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127505.35625770037!2d119.38705890723174!3d-5.1477501863565957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee329d96c4671%3A0x3030bfbcaf770b0!2sMakassar%2C%20Makassar%20City%2C%20South%20Sulawesi!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 8,
        imageSrc: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        location: "Palembang",
        date: "Wednesday, January 04, 2023 | 11:00 - 15:00",
        price: "Rp 80.000",
        title: "Food Festival",
        organizer: "Frank Miller",
        organizerImg: "organizer8.png",
        category: "Food",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127505.35625770037!2d104.73705890723174!3d-2.9777501863565957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b75e8fc27a3e3%3A0x3039d80b220d0c0!2sPalembang%2C%20Palembang%20City%2C%20South%20Sumatra!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 9,
        imageSrc: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        location: "Denpasar",
        date: "Thursday, January 05, 2023 | 09:00 - 17:00",
        price: "Rp 90.000",
        discountedPrice: "Rp 150.000",
        discountPercentage: 40,
        title: "Art Exhibition",
        logo: "Amazing",
        organizer: "Grace Lee",
        organizerImg: "organizer9.png",
        category: "Art",
    },
    {
        id: 9,
        imageSrc: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        location: "Denpasar",
        date: "Thursday, January 05, 2023 | 09:00 - 17:00",
        price: "Rp 90.000",
        discountedPrice: "Rp 150.000",
        discountPercentage: 40,
        title: "Art Exhibition",
        logo: "Amazing",
        organizer: "Grace Lee",
        organizerImg: "organizer9.png",
        category: "Art",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126318.88180326453!2d115.14745364550779!3d-8.675088590634353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd2409b0e5e80db%3A0xe27334e8ccb9374f!2sDenpasar%2C%20Denpasar%20City%2C%20Bali!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 10,
        imageSrc: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        location: "Manado",
        date: "Monday, January 02, 2023 | 16:00 - 19:00",
        price: "Rp 60.000",
        title: "Sunset Festival",
        organizer: "Henry Clark",
        organizerImg: "organizer10.png",
        category: "Festival",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127505.35625770037!2d124.81705890723174!3d1.4577501863565957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32879ef9ffb30fd3%3A0x3030bfbcaf770b0!2sManado%2C%20Manado%20City%2C%20North%20Sulawesi!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 11,
        imageSrc: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        location: "Balikpapan",
        date: "Friday, January 06, 2023 | 18:00 - 22:00",
        price: "Rp 110.000",
        discountedPrice: "Rp 180.000",
        discountPercentage: 38.89,
        title: "Night Market",
        logo: "Seru",
        organizer: "Ivy Wong",
        organizerImg: "organizer11.png",
        category: "Market",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127505.35625770037!2d116.81705890723174!3d-1.2677501863565957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df14710964d9c91%3A0xcaa6ec96c2aea6d2!2sBalikpapan%2C%20Balikpapan%20City%2C%20East%20Kalimantan!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 12,
        imageSrc: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        location: "Padang",
        date: "Saturday, January 07, 2023 | 19:00 - 23:00",
        price: "Rp 150.000",
        title: "Rock Concert",
        organizer: "Jack Robinson",
        organizerImg: "organizer12.png",
        category: "Music",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127505.35625770037!2d100.31705890723174!3d-0.9477501863565957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd4b942e2b117bb%3A0xb8468cb5c3046ba5!2sPadang%2C%20Padang%20City%2C%20West%20Sumatra!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 13,
        imageSrc: "https://images.unsplash.com/photo-1560523159-4a9692d222ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        location: "Pekanbaru",
        date: "Sunday, January 08, 2023 | 08:00 - 16:00",
        price: "Rp 40.000",
        discountedPrice: "Rp 60.000",
        discountPercentage: 33.33,
        title: "Family Day",
        logo: "Fun",
        organizer: "Kelly Thompson",
        organizerImg: "organizer13.png",
        category: "Family",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127505.35625770037!2d101.41705890723174!3d0.5077501863565957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5ab80690ee7b1%3A0x94133d662f030911!2sPekanbaru%2C%20Pekanbaru%20City%2C%20Riau!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 14,
        imageSrc: "https://images.unsplash.com/photo-1605806616949-70f076aa1d24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
        location: "Banjarmasin",
        date: "Monday, January 09, 2023 | 10:00 - 20:00",
        price: "Rp 25.000",
        title: "Book Fair",
        organizer: "Liam Parker",
        organizerImg: "organizer14.png",
        category: "Education",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127505.35625770037!2d114.51705890723174!3d-3.3277501863565957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de4209aa1eec961%3A0x26030bfcc09204d2!2sBanjarmasin%2C%20Banjarmasin%20City%2C%20South%20Kalimantan!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 15,
        imageSrc: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        location: "Malang",
        date: "Tuesday, January 10, 2023 | 13:00 - 17:00",
        price: "Rp 85.000",
        discountedPrice: "Rp 130.000",
        discountPercentage: 34.62,
        title: "Tech Expo",
        logo: "Inovasi",
        organizer: "Mia Johnson",
        organizerImg: "organizer15.png",
        category: "Technology",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126438.37984945694!2d112.56154636778286!3d-7.9827956937266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd62822063dc2fb%3A0x78879446481a4da2!2sMalang%2C%20Malang%20City%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
];




export const limit: EventProps[] = [
    {
        id: 1,
        imageSrc: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        location: "Jakarta",
        date: "August 15, 2023 | 11:00 - 22:00",
        price: "Rp 75.000",
        discountedPrice: "Rp 100.000",
        discountPercentage: 25,
        title: "Jakarta Food Festival",
        logo: "Lezat",
        organizer: "Kuliner Indonesia",
        organizerImg: "organizer1.png",
        category: "Food",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.65638727873!2d106.66403455962983!3d-6.229386743576797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sJakarta!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 2,
        imageSrc: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        location: "Bandung",
        date: "September 5, 2023 | 19:00 - 23:00",
        price: "Rp 150.000",
        title: "Bandung Jazz Night",
        organizer: "West Java Music Association",
        organizerImg: "organizer2.png",
        category: "Music",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.57311651134903!3d-6.903273916440821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 3,
        imageSrc: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        location: "Bali",
        date: "October 1, 2023 | 16:00 - 22:00",
        price: "Rp 200.000",
        discountedPrice: "Rp 250.000",
        discountPercentage: 20,
        title: "Bali Sunset Festival",
        logo: "Indah",
        organizer: "Bali Tourism Board",
        organizerImg: "organizer3.png",
        category: "Festival",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1010881.7353409045!2d114.51212935349682!3d-8.45371377682399!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd22f7520fca7d3%3A0x2872b62cc456cd84!2sBali!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 4,
        imageSrc: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        location: "Yogyakarta",
        date: "November 10, 2023 | 09:00 - 17:00",
        price: "Rp 50.000",
        title: "Yogyakarta Art Exhibition",
        organizer: "Jogja Art Community",
        organizerImg: "organizer4.png",
        category: "Art",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126328.52765375551!2d110.33371551238978!3d-7.7971274703735975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5787bd5b6bc5%3A0x21723fd4d3684f71!2sYogyakarta%2C%20Yogyakarta%20City%2C%20Special%20Region%20of%20Yogyakarta!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 5,
        imageSrc: "https://images.unsplash.com/photo-1560523159-4a9692d222ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        location: "Surabaya",
        date: "December 5, 2023 | 10:00 - 18:00",
        price: "Rp 100.000",
        discountedPrice: "Rp 150.000",
        discountPercentage: 33.33,
        title: "Surabaya Family Fun Day",
        logo: "Ceria",
        organizer: "East Java Events",
        organizerImg: "organizer5.png",
        category: "Family",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126917.65351680737!2d112.6318500248633!3d-7.275619183325626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381ac47f%3A0x3027a76e352be40!2sSurabaya%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 6,
        imageSrc: "https://images.unsplash.com/photo-1605806616949-70f076aa1d24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1635&q=80",
        location: "Medan",
        date: "January 20, 2024 | 09:00 - 17:00",
        price: "Free",
        title: "Medan Book Fair",
        organizer: "North Sumatra Literacy Foundation",
        organizerImg: "organizer6.png",
        category: "Education",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127505.35625770037!2d98.56997890723174!3d3.6277501863565957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131cc1c3eb2fd%3A0x23d431c8a6908262!2sMedan%2C%20Medan%20City%2C%20North%20Sumatra!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 7,
        imageSrc: "https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        location: "Makassar",
        date: "February 14, 2024 | 18:00 - 22:00",
        price: "Rp 250.000",
        discountedPrice: "Rp 300.000",
        discountPercentage: 16.67,
        title: "Valentine's Day Gala Dinner",
        logo: "Romantis",
        organizer: "Makassar Culinary Association",
        organizerImg: "organizer7.png",
        category: "Food",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127505.35625770037!2d119.38705890723174!3d-5.1477501863565957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee329d96c4671%3A0x3030bfbcaf770b0!2sMakassar%2C%20Makassar%20City%2C%20South%20Sulawesi!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },
    {
        id: 8,
        imageSrc: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        location: "Palembang",
        date: "March 8, 2024 | 18:00 - 22:00",
        price: "Rp 75.000",
        title: "Palembang Night Market",
        organizer: "South Sumatra Tourism Board",
        organizerImg: "organizer8.png",
        category: "Market",
        mapsSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127505.35625770037!2d104.73705890723174!3d-2.9777501863565957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b75e8fc27a3e3%3A0x3039d80b220d0c0!2sPalembang%2C%20Palembang%20City%2C%20South%20Sumatra!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
    },

];


