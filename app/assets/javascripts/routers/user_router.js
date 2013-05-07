Teikei.module("User", function(User, App, Backbone, Marionette, $, _) {

  User.Router = Backbone.Marionette.AppRouter.extend({

    appRoutes: {
      'signin': 'signInPopup',
      'signup': 'signUpPopup',
      'logout': 'logout'
    },

  });

});