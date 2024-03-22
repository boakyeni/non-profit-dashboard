## Things to know before getting started (ignore next/babel vscode warning)

If you open this project in vscode, all the next.js files will have a red squiggly line at the top saying something about next/babel. Just ignore this, getting rid of the squiggly has caused many problems in the past

## Djoser

Though this project uses djoser, it does NOT use the DEFAULT_AUTHENTICATION_CLASSES settings in rest_framework. Authentication classes must be set manually for each view. This includes djoser views, so they should be overridden. This is because the was original written to work with JWTSTATELESSAUTHENTICATION and using DEFAULT_AUTHENTICATION_CLASSES with permissions decorators, does not work with the default permissions. The default permissions require a user object linked to the authentication, which JWTSTATELESSAUTHENTICATION does not provide. I'm sure a custom permission handler could be made but we have deadlines to meet, plus the code is more explicit this way.