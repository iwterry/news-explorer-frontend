export function getKeywordsByPopularity(newsArticles) {
  const keywordsToCountsObj = newsArticles.reduce((obj, newsArticle) => {
    const { keyword } = newsArticle
    if(!obj.hasOwnProperty(keyword)) {
      obj[keyword] = 0;
    }
    obj[keyword] += 1;
    return obj;
  }, {});

  return Object.entries(keywordsToCountsObj)
    .sort((keyword1, keyword2) => keyword2[1] - keyword1[1])
    .map((keyword) => keyword[0])
}

export function formatKeywords(keywords) {
  if(keywords.length <= 3) {
    return keywords.join(', ');
  }

  return `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} more`;
}

export function getFormattedDate(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  date = new Date(date);
  const monthSpelledOut = months[date.getMonth()];

  return `${monthSpelledOut} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatSearchResultsForCard(searchResult, keyword) {
  return {
    _id: '',
    url: searchResult.url,
    keyword: keyword,
    imageSrc: searchResult.urlToImage,
    title: searchResult.title,
    description: searchResult.description,
    publicationDate: searchResult.publishedAt,
    sourceName: searchResult.source.name,
    isBookmarked: false,
  };
}

export function formatSavedArticlesForCard(savedArticle) {
  return {
    _id: savedArticle._id,
    url: savedArticle.link,
    keyword: savedArticle.keyword,
    imageSrc: savedArticle.image,
    title: savedArticle.title,
    description: savedArticle.text,
    publicationDate: savedArticle.date,
    sourceName: savedArticle.source,
    isBookmarked: true
  };
}


export function formatCardDataForMainApi(cardData) {
  return {
    keyword: cardData.keyword,
    title: cardData.title,
    text: cardData.description,
    date: cardData.publicationDate,
    source: cardData.sourceName,
    link: cardData.url,
    image: cardData.imageSrc,
  };
}
