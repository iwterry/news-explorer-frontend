const savedArticles = [
  {
    "_id": "1",
    "keyword": "blockchain",
    "source": "TechCrunch",
    "title": "Blockchain startup XREX gets $17M to make cross-border trade faster",
    "text": "A substantial portion of the world’s trade is done in United States dollars, creating problems for businesses in countries with a dollar shortage. Blockchain startup XREX was launched to help cross-border businesses in emerging markets perform faster transact…",
    "link": "http://techcrunch.com/2021/08/22/blockchain-startup-xrex-gets-17m-to-make-cross-border-trade-faster/",
    "image": "https://techcrunch.com/wp-content/uploads/2021/08/XREX-co-founders.jpg?w=600",
    "date": "2021-08-23T01:00:32Z",
  },
  {
    "_id": "2",
    "keyword": "emissions",
    "source": "TechCrunch",
    "title": "The tough calculus of emissions and the future of EVs",
    "text": "Mark Mills Contributor Share on Twitter Mark Mills is the author of the forthcoming book, \"The Cloud Revolution: How the Convergence of New Technologies Will Unleash the Next Economic Boom and a Roaring 2020s.\" He is a senior fellow at the Manhattan Institute…",
    "link": "http://techcrunch.com/2021/08/22/the-tough-calculus-of-emissions-and-the-future-of-evs/",
    "image": "https://techcrunch.com/wp-content/uploads/2021/08/GettyImages-1307690818.jpg?w=647",
    "date": "2021-08-22T15:00:02Z",
  },
];

const users = [
  {
    "_id": "1",
    "name": "Jane",
    "email": "jane.doe@email.com",
    "password": "123",
  },
];

let currentUser = users[0];

const TIME_TO_TAKE = 500;

export function getSavedArticles() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(savedArticles);
    }, TIME_TO_TAKE);
  });
}

export function createSavedArticle(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newArticle = { ...data, _id: String(savedArticles.length + 1) }
      savedArticles.push(newArticle);
      resolve({ ...newArticle });
    }, TIME_TO_TAKE);
  });
}

export function deleteSavedArticle(savedArticleId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = savedArticles.findIndex(({ _id }) => _id === savedArticleId);

      if (index < 0) return reject(new Error('not found'));

      savedArticles.splice(index, 1);
      resolve();
    }, TIME_TO_TAKE);
  });
}

export function getCurrentUser(token) {
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(!token) return reject(new Error('token required for to get current user data'));

      resolve({
        name: currentUser.name,
        email: currentUser.email,
      });
    }, TIME_TO_TAKE);
  });
}

export function login(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((someUser) => someUser.email === email && someUser.password === password);
      
      if (!user) return reject(new Error('invalid password or email'));
      
      currentUser = user;

      resolve({
        token: 'fake token',
      });
      
    }, TIME_TO_TAKE);
  });
}

export function register(username, email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
     const user = users.find((someUser) => someUser.email === email);
      if (user) return reject(new Error('Must use a different address'));
      
      const newUser = {
        _id: String(users.length + 1),
        name: username,
        email,
        password
      };

      users.push({ ...newUser });

      delete newUser.password;
      resolve(newUser);
    }, TIME_TO_TAKE);
  });
}