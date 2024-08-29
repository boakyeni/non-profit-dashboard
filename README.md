## Things to know before getting started (ignore next/babel vscode warning)

If you open this project in vscode, all the next.js files will have a red squiggly line at the top saying something about next/babel. Just ignore this, getting rid of the squiggly has caused many problems in the past

## Djoser

Though this project uses djoser, it does NOT use the DEFAULT_AUTHENTICATION_CLASSES settings in rest_framework. Authentication classes must be set manually for each view. This includes djoser views, so they should be overridden. This is because the was original written to work with JWTSTATELESSAUTHENTICATION and using DEFAULT_AUTHENTICATION_CLASSES with permissions decorators, does not work with the default permissions. The default permissions require a user object linked to the authentication, which JWTSTATELESSAUTHENTICATION does not provide. I'm sure a custom permission handler could be made but we have deadlines to meet, plus the code is more explicit this way.

# New Update to user model.

Extending the user model wit h2 new boolean fields, which will be checked which a user
is a bsystems admin or an institution admin.

Extending serializers to include these fields.
Extending signup_view to check whether a user is a bsystems admin or institution admin.

# Current issues
1. Can't seem to figure out how to let the system diffrentiate between a bsystems admin and an institution admin.
 - Now there are 2 types of users, super user and user, super user can grant permissions to other users, and have access to all available 
   features or permissions.
- What i tried
  - Boolean fields for either bsystems admin or instituion admin
  - created a permissions decorator 

# what i have to do
1. Fields for beneficiaries
2. Integrating widget