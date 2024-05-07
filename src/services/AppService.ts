import axios from 'axios'
import axiosJsonpAdapter from 'axios-jsonp';

import { AppItemObj, FreeAppEntry, FreeAppID, Locale } from '@/types';

export const fetchFreeAppIDsFromStorage = () => {
  const result: string | null = localStorage.getItem('freeApps');
  return JSON.parse((result !== null) ? result : 'null') as FreeAppID[]
}

export const setFreeAppIDsToStorage = (response: FreeAppID[]) => {
  localStorage.setItem('freeApps', JSON.stringify(response));
}

export const removeFreeAppIDsFromStorage = () => {
  localStorage.removeItem('freeApps');
}

export const fetchFreeAppIDs = async (locale: Locale = 'hk') => {
  const response = await axios.get(`https://itunes.apple.com/${locale}/rss/topfreeapplications/limit=100/json`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response.data.feed.entry.map((item: FreeAppEntry) => {
    return {
      id: item['id']['attributes']['im:id'],
      name: item['im:name']['label'],
      category: item['category']['attributes']['label'], 
      author: item['im:artist']['label'],
      summary: item['summary']['label']
    }
  });
}

export async function *fetchFreeApps(ids: FreeAppID[], locale: Locale = 'hk') {
  for (let index = 0; index < ids.length; index++) {
    try {
      const response = await appLookupByID(ids[index].id, locale);

      const { 
        trackId, 
        trackName, 
        genres, 
        artworkUrl60, 
        artworkUrl100,
        description, 
        artistName, 
        averageUserRating, 
        userRatingCount 
      } = response;

      const data: AppItemObj = {
        id: trackId,
        name: trackName,
        category: genres.pop(),
        image: { 
          sm: artworkUrl60, 
          lg: artworkUrl100
        },
        summary: description,
        artistName: artistName,
        averageUserRating: averageUserRating,
        userRatingCount: userRatingCount
      }
      yield { data };
    } catch (error) {
      return error;
    }
  }
}

export const fetchRecommendedApps = async (locale: Locale = 'hk') => {
  const response = await axios.get(`https://itunes.apple.com/${locale}/rss/topgrossingapplications/limit=10/json`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const list = response.data.feed.entry.map((item: FreeAppEntry) => {
    return {
      id: item['id']['attributes']['im:id'],
      name: item['im:name']['label'],
      image: item['im:image'].map(i => i.label),
      summary: item['summary']['label'],
      category: item['category']['attributes']['label']
    }
  });

  return list;
}

export const appLookupByID = async (id: string, locale: Locale = 'hk') => {
  const response = await axios.get(`https://itunes.apple.com/${locale}/lookup?id=${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    adapter: axiosJsonpAdapter
  });
  const appData = response.data.results.pop();

  return appData;
}