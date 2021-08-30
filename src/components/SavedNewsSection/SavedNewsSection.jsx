import NewsCardList from "../NewsCardList/NewsCardList";

import './SavedNewsSection.css';

function SavedNewsSection(props) {
  // const newsArticles = [
  //   {
  //     _id: 0,
  //     keyword: 'space',
  //     imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
  //     title: 'Suing your way to the stars - 1',
  //     description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
  //     publicationDate: '2021-08-22T17:33:03Z',
  //     sourceName: 'TechCrunch'
  //   },
  //   {
  //     _id: 1,
  //     keyword: 'space',
  //     imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
  //     title: 'Suing your way to the stars - 2',
  //     description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
  //     publicationDate: '2021-08-22T17:33:03Z',
  //     sourceName: 'TechCrunch'
  //   },
  //   {
  //     _id: 2,
  //     keyword: 'space',
  //     imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
  //     title: 'Suing your way to the stars - 3',
  //     description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
  //     publicationDate: '2021-08-22T17:33:03Z',
  //     sourceName: 'TechCrunch'
  //   },
  //   {
  //     _id: 3,
  //     keyword: 'space',
  //     imageSrc: 'https://s.yimg.com/uu/api/res/1.2/7U7exL0Bp6se.JS9aEjDyw--~B/aD02ODM7dz0xMDI0O2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/techcrunch_350/2dfdea6a6371db2245f731660cc684ae',
  //     title: 'Suing your way to the stars - 4',
  //     description: "Plenty happened this week and I struggled to zero in on a single topic to address, but I finally chose to focus on Bezos's Blue Origin suing NASA.  If you’re...",
  //     publicationDate: '2021-08-22T17:33:03Z',
  //     sourceName: 'TechCrunch'
  //   },
  // ];

  const { newsArticles } = props;
  return (
    <section className="saved-news-section">
      <NewsCardList
        newsArticles={newsArticles}
        isSearchResult={false}
        isSignedIn={true}
      />
    </section>
  )
}

export default SavedNewsSection;