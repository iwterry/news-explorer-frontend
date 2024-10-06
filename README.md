This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Project overview
* The mobile header and the popups can be closed by clicking on the overlay or close button and by pressing ESC key.
* A user can register, login, and sign out.
  * For registering, a popup form opens at path /sign-up. When the form is closed, the URL changes to /.
  * For signing in, a popup form opens at path /sign-in. When the form is closed, the URL changes to /.
* A user can search for, save, and delete articles (along with getting information on current user).
* To search for news articles, the API from [NewsAPI](https://newsapi.org) is used.
* To save and delete articles as well as login and register, the backend API for this frontend is located at https://github.com/iwterry/news-explorer-api.
