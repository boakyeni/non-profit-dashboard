from django.utils import timezone


class TimezoneMiddleware:
    """NOT USED"""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user:
            # Assuming the user has a profile with a timezone field
            user_timezone = request.user.timezone
            print(user_timezone)
            print(request.user.email)
            timezone.activate(user_timezone)
            print("activate timezone")
        else:
            timezone.deactivate()
            print("deactivate timezone")

        response = self.get_response(request)
        return response
