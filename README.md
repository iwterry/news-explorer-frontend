This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Project overview
* The mobile header and the popups can be closed by clicking on the overlay or close button and by pressing ESC key.
* Using a fake API, a user can register, login, and sign out.
  * For registering, a popup form opens at path /sign-up. When the form is closed, the URL changes to /.
  * For signing in, a popup form opens at path /sign-in. When the form is closed, the URL changes to /.
* Using a fake API, a user can search for, save, and delete article (along with getting information on current user).
* For the fake API, the default user is Jane Doe with { "email": "jane.doe@email.com", "password": "123" }