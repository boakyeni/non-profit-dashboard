## Things to know before getting started (ignore next/babel vscode warning)

If you open this project in vscode, all the next.js files will have a red squiggly line at the top saying something about next/babel. Just ignore this, getting rid of the squiggly has caused many problems in the past

## Djoser

Though this project uses djoser, it does NOT use the DEFAULT_AUTHENTICATION_CLASSES settings in rest_framework. Authentication classes must be set manually for each view. This includes djoser views, so they should be overridden. The code will probably work if you just add the defult_authentication_classes setting, but it's fine without it so why fix?