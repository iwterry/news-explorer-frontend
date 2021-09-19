class MainApi {
  static #baseEndPoint = process.env.NODE_ENV === 'production' ? 
    'https://api.iwterry-news-explorer.students.nomoreparties.site' : 
    'http://localhost:3001';

  static #authToken = '';

  static set authToken(value) {
    this.#authToken = value;
  }

  static get authToken() {
    return `Bearer ${this.#authToken}`;
  }

  static #fetch = async ({
    relPath,
    bodyObjToSend=null,
    isAuthRequired=false,
    method='GET'
  }) => {
    const init = {
      headers: {},
    };
    
    if (bodyObjToSend) {
      init.headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(bodyObjToSend);
    }

    if (isAuthRequired) {
      init.headers['Authorization'] = this.authToken;
    }

    init.method = method;

    const fullPath = `${this.#baseEndPoint}/${relPath}`;
    const response = await fetch(fullPath, init);
  
    const NO_CONTENT_STATUS_CODE = 204;
    const data = response.status === NO_CONTENT_STATUS_CODE ? null : await response.json();

    if (!response.ok) return Promise.reject({ status: response.status, message: data.message });
    return data; 
  }

  static login(email, password) {
    return this.#fetch({
      relPath: 'signin',
      bodyObjToSend: { email, password },
      method: 'POST'
    });
  }
  
  static register(username, email, password) {
    return this.#fetch({
      relPath: 'signup',
      bodyObjToSend: { name: username, email, password },
      method: 'POST'
    });
  }

  static getCurrentUser() {
    return this.#fetch({
      relPath: 'users/me',
      isAuthRequired: true,
    });
  }

  static createSavedArticle(data) {
    return this.#fetch({
      relPath: 'articles',
      isAuthRequired: true,
      method: 'POST',
      bodyObjToSend: data,
    });
  }

  static getSavedArticles() {
    return this.#fetch({
      relPath: 'articles',
      isAuthRequired: true,
    });
  }

  static deleteSavedArticle(savedArticleId) {
    return this.#fetch({
      relPath: `articles/${savedArticleId}`,
      isAuthRequired: true,
      method: 'DELETE',
    });
  }
}

export default MainApi;