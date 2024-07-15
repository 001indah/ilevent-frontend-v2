// api/getEvents.ts
import axios from 'axios';

const API_URL_SEARCH = 'https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1/events/search';

export const getSearchEvents = async (keyword: string) => {
    const response = await axios.get(API_URL_SEARCH, {
        params: {
            keyword: keyword
        }
    });
    return response.data.content || response.data.events;
};

