# Generated by Django 3.0.2 on 2020-11-08 13:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('root', '0002_crctanswers'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='crctanswers',
            name='id',
        ),
        migrations.AlterField(
            model_name='crctanswers',
            name='email',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='root.userqa'),
        ),
    ]
