import { NEWS_API_KEY } from "./config";

class NewsAPI {
  static getSearchResults(query) {
    const sevenDayInMilliSeconds = 7*24*60*60*1000;
    const sevenDaysAgo = new Date(new Date() - sevenDayInMilliSeconds).toISOString();
    const now = new Date().toISOString();

    const baseEndPoint =  process.env.NODE_ENV === 'production' ? 'https://nomoreparties.co/news' : 'https://newsapi.org';

    return fetch(`${baseEndPoint}/v2/everything?q=${query}&pageSize=100&from=${sevenDaysAgo}&to=${now}&apiKey=${NEWS_API_KEY}`)
      .then((response) => response.ok ? response.json() : Promise.reject(response.status));
  }
}

export default NewsAPI;