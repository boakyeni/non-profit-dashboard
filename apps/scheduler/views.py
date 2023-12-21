from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.response import Response
from schedule.models import Event, Rule
from .serializers import EventSerializer, RuleSerializer

# Create your views here.


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        rule_data = request.data.get("rule")
        if rule_data:
            
            rule, created = Rule.objects.get_or_create(
                name=rule_data["name"],
                defaults={
                    "frequency": rule_data["frequency"],
                    "params": rule_data["params"],
                },
            )
            request.data["rule"] = rule.id

        return super(EventViewSet, self).create(request, *args, **kwargs)


# class RuleViewSet(views.APIView):
#     queryset = Rule.objects.all()
#     serializer_class = RuleSerializer

#     def create(self, request):
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         self.perform_create(serializer)
#         headers = self.get_success_headers(serializer.data)
#         return Response(
#             serializer.data, status=status.HTTP_201_CREATED, headers=headers
#         )
