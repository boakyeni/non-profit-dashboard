class ContextMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Attach context directly to the request that can be accessed in serializers
        request.user = request.user
        response = self.get_response(request)
        return response
