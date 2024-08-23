from rest_framework import serializers
from .models import Hallways


class HallwaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Hallways
        fields = "__all__"
