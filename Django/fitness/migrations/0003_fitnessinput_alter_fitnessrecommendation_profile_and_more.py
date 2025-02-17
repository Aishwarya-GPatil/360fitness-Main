# Generated by Django 5.1.4 on 2025-01-11 14:23

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("fitness", "0002_remove_fitnessrecommendation_recommendation_json_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="FitnessInput",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "age",
                    models.IntegerField(
                        help_text="Age in years (13-100)",
                        validators=[
                            django.core.validators.MinValueValidator(13),
                            django.core.validators.MaxValueValidator(100),
                        ],
                    ),
                ),
                (
                    "gender",
                    models.CharField(
                        choices=[
                            ("male", "Male"),
                            ("female", "Female"),
                            ("other", "Other"),
                        ],
                        max_length=10,
                    ),
                ),
                (
                    "weight",
                    models.FloatField(
                        help_text="Weight in kg",
                        validators=[
                            django.core.validators.MinValueValidator(30),
                            django.core.validators.MaxValueValidator(300),
                        ],
                    ),
                ),
                (
                    "height",
                    models.FloatField(
                        help_text="Height in cm",
                        validators=[
                            django.core.validators.MinValueValidator(100),
                            django.core.validators.MaxValueValidator(250),
                        ],
                    ),
                ),
                (
                    "fitness_level",
                    models.CharField(
                        choices=[
                            ("beginner", "Beginner (No prior exercise experience)"),
                            ("intermediate", "Intermediate (Exercises 2-3 times/week)"),
                            ("advanced", "Advanced (Regular high-intensity training)"),
                        ],
                        help_text="Current fitness experience level",
                        max_length=20,
                    ),
                ),
                (
                    "activity_level",
                    models.CharField(
                        choices=[
                            ("sedentary", "Sedentary (Little to no exercise)"),
                            (
                                "lightly_active",
                                "Lightly Active (Light exercise 1-3 days/week)",
                            ),
                            (
                                "moderately_active",
                                "Moderately Active (Moderate exercise 3-5 days/week)",
                            ),
                            (
                                "very_active",
                                "Very Active (Hard exercise 6-7 days/week)",
                            ),
                            (
                                "extra_active",
                                "Extra Active (Very hard exercise & physical job)",
                            ),
                        ],
                        help_text="Daily activity level",
                        max_length=20,
                    ),
                ),
                (
                    "goal",
                    models.CharField(
                        choices=[
                            ("weight_loss", "Weight Loss"),
                            ("muscle_gain", "Muscle Gain"),
                            ("strength", "Strength Training"),
                            ("endurance", "Endurance Building"),
                            ("flexibility", "Flexibility & Mobility"),
                            ("general_fitness", "General Fitness"),
                            ("maintenance", "Maintenance"),
                        ],
                        help_text="Primary fitness goal",
                        max_length=50,
                    ),
                ),
                (
                    "specific_area",
                    models.CharField(
                        help_text="Specific areas you want to focus on (e.g., 'core, upper body')",
                        max_length=200,
                    ),
                ),
                (
                    "target_timeline",
                    models.CharField(
                        help_text="Target timeline for achieving your goal",
                        max_length=50,
                    ),
                ),
                (
                    "medical_conditions",
                    models.TextField(
                        blank=True,
                        help_text="Any medical conditions that might affect your exercise",
                    ),
                ),
                (
                    "injuries_or_physical_limitation",
                    models.TextField(
                        blank=True,
                        help_text="Any injuries or physical limitations to consider",
                    ),
                ),
                (
                    "exercise_setting",
                    models.CharField(
                        choices=[
                            ("gym", "Gym"),
                            ("home", "Home"),
                            ("outdoor", "Outdoor"),
                            ("mixed", "Mixed"),
                        ],
                        help_text="Where you plan to exercise",
                        max_length=20,
                    ),
                ),
                (
                    "available_equipment",
                    models.TextField(
                        blank=True,
                        help_text="List any exercise equipment you have access to",
                    ),
                ),
                (
                    "sleep_pattern",
                    models.CharField(
                        choices=[
                            ("less_than_6", "Less than 6 hours"),
                            ("6_to_8", "6-8 hours"),
                            ("more_than_8", "More than 8 hours"),
                        ],
                        help_text="Average daily sleep",
                        max_length=20,
                    ),
                ),
                (
                    "stress_level",
                    models.IntegerField(
                        help_text="Rate your stress level (1-10)",
                        validators=[
                            django.core.validators.MinValueValidator(1),
                            django.core.validators.MaxValueValidator(10),
                        ],
                    ),
                ),
            ],
            options={
                "ordering": ["-created_at"],
            },
        ),
        migrations.AlterField(
            model_name="fitnessrecommendation",
            name="profile",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="fitness.fitnessinput"
            ),
        ),
        migrations.DeleteModel(
            name="FitnessProfile",
        ),
    ]
