import axios from 'axios';
import { createCache  } from 'axios-cache-interceptor';

export const http = axios.create({});
const cacheHttp = () => {
    if (window?.cacheHttp === false) {
        return http;
    } else {
        return createCache({});
    }
}

export {cacheHttp};


export const fetchAll = async (url, config, maxPages = 20) => {
    let data = [];
    let included = [];
    let page = 1;

    try {
        while (page <= maxPages) {
            config.params = {...config.params, page: page};
            const response = await cacheHttp().get(url, config);
            if (!response.data.hasOwnProperty('data') || !Array.isArray(response.data.data)) {
                break;
            }
            data = data.concat(response.data.data);
            if (response.data.hasOwnProperty('included') && Array.isArray(response.data.included)) {
                included = included.concat(Array.isArray(response.data.included));
            }
            const pageCount = response.data?.meta?.['page-count'] || 0;
            if (page >= pageCount) {
                break;
            }
            page++;
        }
    } catch (e) {
        console.error(e);
    }

    return {
        data: data,
        included: included,
    }
}