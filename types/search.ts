import { useRouter } from "next/router";
import { useContext } from "react";

const PAGE_SIZE = 2;

const categories = [
    "All",
    "Art",
    "Comics",
    "Crafts",
    "Dance",
    "Design",
    "Fashion",
    "Film",
    "Food",
    "Games",
    "Journalism",
    "Music",
    "Photography",
    "Technology",
    "Theater",
];

const isFree = [
    "All", "Free", "Paid"]

const locations = [
    "All",
    "Jakarta",
    "Surabaya",
    "Bandung",
    "Yogyakarta",
];

export default function Search(props) {
    const router = useRouter();

    const {
        query = 'all',
        category = 'all',
        location = 'all',
        page = 1
    } = router.query;

    const { events, countEvents, categories, locations } = props;

    const filterSearch = ({
        page, category, location, isFree }) => {
        const { query } = router;
        if (page) query.page = page;
        if (searchQuery) query.searchQuery = searchQuery;
        if (category) query.category = category;
        if (location) query.location = location;
        if (isFree) query.isFree = isFree;
        return query;
    }

    router.push({ pathname: router.pathname, query: query });

    const categoryHandler = (event) => {
        filterSearch({ category: event.target.value });
    };

    const locationHandler = (event) => {
        filterSearch({ location: event.target.value });
    };

    const isFreeHandler = (event) => {
        filterSearch({ isFree: event.target.value });
    };

    const locationsHandler = (event) => {
        filterSearch({ location: event.target.value });
    };

    const { state, dispatch } = useContext(Store);
    const add

}