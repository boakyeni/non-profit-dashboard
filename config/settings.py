from pathlib import Path
import environ


env = environ.Env(DEBUG=(bool, True))
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
environ.Env.read_env(BASE_DIR / ".env", overwrite=True)

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")

ALLOWED_HOSTS = env("ALLOWED_HOSTS").split(" ")
CENTRAL_AUTH_URL = env("CENTRAL_AUTH_URL")
DOMAIN = env("DOMAIN")
CSRF_TRUSTED_ORIGINS = env("CSRF_TRUSTED_ORIGINS").split(" ")
CORS_ALLOWED_ORIGINS = env("CORS_ALLOWED_ORIGINS").split(" ")
CORS_ALLOW_CREDENTIALS = True
# Application definition

DJANGO_APPS = [
    "django.contrib.contenttypes",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]


THIRD_PARTY_APPS = [
    "rest_framework",
    "phonenumber_field",
    "schedule",
    "jsonify",
    "corsheaders",
    "djoser",
    "djcelery_email",
]

LOCAL_APPS = [
    "apps.users",
    "apps.campaigns",
    "apps.contact_analytics",
    "apps.donor_management",
    "apps.scheduler",
    "apps.mosaico",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": env("MYSQL_ENGINE"),
        "NAME": env("MYSQL_NAME"),
        "USER": env("MYSQL_USER"),
        "PASSWORD": env("MYSQL_PASSWORD"),
        "HOST": env("MYSQL_HOST"),
        "PORT": env("MYSQL_PORT"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-uk"

TIME_ZONE = "Africa/Accra"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = "/static/"
STATICFILE_DIRS = []
STATIC_ROOT = BASE_DIR / "static"
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = "users.User"

from datetime import timedelta

# REST_FRAMEWORK = {
#     # "DEFAULT_AUTHENTICATION_CLASSES": (
#     #     "rest_framework_simplejwt.authentication.JWTStatelessUserAuthentication",
#     # ),
#     "EXCEPTION_HANDLER": "utils.exception_handler.custom_exception_handler",
# }

SIMPLE_JWT = {
    "AUTH_HEADER_TYPES": (
        "Bearer",
        "JWT",
    ),
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=2),
    "ROTATE_REFRESH_TOKENS": False,
    "SIGNING_KEY": env("SIGNING_KEY"),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "UPDATE_LAST_LOGIN": True,
    "AUTH_COOKIE": "refresh_token",  # Cookie name. Enables cookies if value is set.
    "AUTH_COOKIE_DOMAIN": None,  # A string like "example.com", or None for standard domain cookie.
    "AUTH_COOKIE_SECURE": False,  # Whether the auth cookies should be secure (https:// only).
    "AUTH_COOKIE_HTTP_ONLY": True,  # Http only cookie flag.It's not fetch by javascript.
    "AUTH_COOKIE_PATH": "/",  # The path of the auth cookie.
    "AUTH_COOKIE_SAMESITE": None,  # Whether to set the flag restricting cookie leaks on cross-site requests.
}

DJOSER = {
    "LOGIN_FIELD": "email",
    "USER_CREATE_PASSWORD_RETYPE": True,
    "USERNAME_CHANGED_EMAIL_CONFIRMATION": True,
    "PASSWORD_CHANGED_EMAIL_CONFIRMATION": True,
    "SEND_CONFIRMATION_EMAIL": True,
    "SEND_ACTIVATION_EMAIL": False,
    "PASSWORD_RESET_CONFIRM_URL": "auth/password/reset/confirm/{uid}/{token}",
    "LOGOUT_ON_PASSWORD_CHANGE": False,
    "SET_PASSWORD_RETYPE": True,
    "PASSWORD_RESET_CONFIRM_RETYPE": True,
    "SERIALIZERS": {
        "user_create": "apps.users.serializers.CreateUserSerializer",
        "user": "apps.users.serializers.UserSerializer",
        "current_user": "apps.users.serializers.UserSerializer",
        "user_delete": "djoser.serializers.UserDeleteSerializer",
    },
    "EMAIL": {
        "confirmation": "apps.users.email.ConfirmationEmail",
        "password_reset": "apps.users.email.PasswordResetEmail",
        "password_changed_confirmation": "apps.users.email.PasswordChangedConfirmationEmail",
    },
}


PHONENUMBER_DEFAULT_REGION = "GH"

# EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
# EMAIL_HOST = env("EMAIL_HOST")
# EMAIL_USE_TLS = env("EMAIL_USE_TLS")
# EMAIL_PORT = env("EMAIL_PORT")
# EMAIL_HOST_USER = env("EMAIL_HOST_USER")
# EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
# DEFAULT_FROM_EMAIL = "TradePayAfrica <info@tradepayafrica.com>"
# SITE_NAME = "TradePayAfrica"

# CELERY_BROKER_URL = env("CELERY_BROKER")

# CELERY_RESULT_BACKEND = env("CELERY_BACKEND")

# CELERY_TIMEZONE = "Africa/Accra"

# CELERY_WORKER_MAX_TASKS_PER_CHILD = 100
