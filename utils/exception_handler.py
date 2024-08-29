from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    # Call DRF's default exception handler first,
    # to get the standard error response if any.
    response = exception_handler(exc, context)

    # Now you can add your custom error formatting to the response
    if response is not None:
        # Custom response format
        custom_data = {
            "error": str(exc),
            "status": response.status_code,
            "message": response.data.get("detail", str(exc)),
        }
        response.data = custom_data
    else:
        # If the response is None, it means DRF didn't handle this exception
        # So, you need to handle it here and set a generic response
        response = Response(
            {
                "error": "InternalServerError",
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "An unexpected error occurred.",
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    return response
