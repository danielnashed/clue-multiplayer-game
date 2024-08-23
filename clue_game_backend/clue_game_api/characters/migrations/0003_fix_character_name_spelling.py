from django.db import migrations


class Migration(migrations.Migration):
    initial = False

    dependencies = [
        ("characters", "0002_characters_init"),
    ]

    operations = [
        migrations.RunSQL("UPDATE characters SET name = 'Mrs. Peacock' WHERE name = 'Mrs. Peakcock'"),
    ]
