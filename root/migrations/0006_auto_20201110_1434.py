# Generated by Django 3.0.2 on 2020-11-10 09:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('root', '0005_visitors'),
    ]

    operations = [
        migrations.AddField(
            model_name='visitors',
            name='id',
            field=models.AutoField(auto_created=True, default=0, primary_key=True, serialize=False, verbose_name='ID'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='visitors',
            name='visitor_email',
            field=models.CharField(max_length=1024),
        ),
    ]
