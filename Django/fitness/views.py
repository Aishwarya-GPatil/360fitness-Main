from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .forms import FitnessRecommendationForm
from .models import FitnessInput, FitnessRecommendation   # Add this import
import google.generativeai as genai
import os
import json
from .serializers import FitnessInputSerializer, FitnessRecommendationSerializer
from dotenv import load_dotenv
load_dotenv()



class FitnessRecommendationAPI(APIView):
    def calculate_bmi(self, weight, height):
        height_m = height / 100.0
        bmi = weight / (height_m ** 2)
        
        if bmi < 18.5:
            bmi_category = 'Underweight'
        elif 18.5 <= bmi < 24.9:
            bmi_category = 'Normal weight'
        elif 25 <= bmi < 29.9:
            bmi_category = 'Overweight'
        else:
            bmi_category = 'Obesity'
        
        return bmi, bmi_category
    
    def post(self, request):
        try:
            profile_serializer = FitnessInputSerializer(data=request.data)
            if profile_serializer.is_valid():
                profile = profile_serializer.save()
                
                # Calculate BMI
                bmi, bmi_category = self.calculate_bmi(
                    float(profile.weight), 
                    float(profile.height)
                )
                
                # Configure Gemini
                genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
                model = genai.GenerativeModel('gemini-2.0-flash-exp')
                
                # Modify the prompt to explicitly request raw JSON without markdown
                prompt = f"""
                You are an experienced and certified personal trainer tasked with creating a personalized fitness plan for a client. 

                **Client Profile:**

                * **Age:** {profile.age} years old
                * **Gender:** {profile.gender}
                * **Current Weight:** {profile.weight} kg
                * **Height:** {profile.height} cm
                * **Fitness Level:** {profile.fitness_level} (e.g., Beginner, Intermediate, Advanced)
                * **Activity Level:** {profile.activity_level} (e.g., Sedentary, Lightly Active, Moderately Active, Very Active)
                * **Health Goal:** {profile.goal} (e.g., Weight Loss, Muscle Gain, Improve Overall Fitness)
                * **Medical Conditions:** {profile.medical_conditions}
                * **Injuries or Physical Limitations:** {profile.injuries_or_physical_limitation}
                * **Target Timeline:** {profile.target_timeline} (e.g., 4 weeks, 8 weeks, 12 weeks)
                * **Available Equipment:** {profile.available_equipment} (e.g., Home Gym, Gym, Bodyweight Only)
                * **Exercise Setting:** {profile.exercise_setting} (e.g., Home, Gym, Outdoor)
                * **Sleep Pattern:** {profile.sleep_pattern} (e.g., 6-8 hours, Less than 6 hours, More than 8 hours)
                * **Stress Level:** {profile.stress_level} (e.g., Low, Moderate, High)
                * **Focus Areas:** {profile.specific_area} (e.g., Upper Body, Lower Body, Core, Overall)

                **Create a detailed fitness plan in JSON format following this structure:**

                {{
                "user_profile": {{
                    "personal_info": {{
                    "age": {profile.age},
                    "gender": "{profile.gender}",
                    "current_weight": {profile.weight},
                    "height": {profile.height},
                    "health_goal": "{profile.goal}",
                    "medical_conditions": "{profile.medical_conditions}",
                    "physical_limitations": "{profile.injuries_or_physical_limitation}",
                    "fitness_level": "{profile.fitness_level}",
                    "activity_level": "{profile.activity_level}",
                    "target_timeline": "{profile.target_timeline}",
                    "available_equipment": "{profile.available_equipment}",
                    "stress_level": "{profile.stress_level}",
                    "exercise_setting": "{profile.exercise_setting}",
                    "sleep_pattern": "{profile.sleep_pattern}",
                    "focus_areas": "{profile.specific_area}"
                    }},
                    "fitness_assessment": {{
                    "bmi": "calculated_value", 
                    "bmi_category": "category", 
                    "recommended_heart_rate_zones": {{
                        "low_intensity": "range",
                        "moderate_intensity": "range",
                        "high_intensity": "range"
                    }},
                    "current_limitations": [] 
                    }}
                }},
                "workout_plan": {{
                    "weekly_schedule": [
                    {{
                        "day": "1", 
                        "focus": "area_of_focus", 
                        "workout_type": "type", 
                        "duration": "minutes", 
                        "intensity": "level", 
                        "exercises": [
                        {{
                            "name": "exercise_name", 
                            "sets": "number", 
                            "reps": "number", 
                            "rest": "seconds", 
                            "notes": "special_instructions", 
                            "alternatives": ["option1", "option2"], 
                            "video_reference": "url" 
                        }}
                        ],
                        "warmup": [], 
                        "cooldown": []
                    }}
                    ],
                    "progression_plan": {{
                    "week1_to_2": {{
                        "volume_increase": "percentage", 
                        "intensity_increase": "percentage", 
                        "new_exercises": []
                    }},
                    "week3_to_4": {{
                        "volume_increase": "percentage", 
                        "intensity_increase": "percentage", 
                        "new_exercises": []
                    }}
                    }}
                }},
                "recovery_plan": {{
                    "rest_days": {{
                    "frequency": "number_per_week", 
                    "recommended_activities": []
                    }},
                    "sleep_recommendations": {{
                    "recommended_hours": "number", 
                    "sleep_schedule": {{
                        "bedtime": "time", 
                        "wake_time": "time"
                    }},
                    "sleep_optimization_tips": []
                    }},
                    "mobility_work": {{
                    "frequency": "times_per_week", 
                    "duration": "minutes", 
                    "recommended_exercises": []
                    }}
                }},
                "safety_guidelines": {{
                    "medical_considerations": [], 
                    "form_tips": [], 
                    "warning_signs": [], 
                    "modification_guidelines": []
                }},
                "progress_tracking": {{
                    "metrics_to_track": [], 
                    "measurement_frequency": {{
                    "weight": "frequency", 
                    "measurements": "frequency", 
                    "progress_photos": "frequency", 
                    "strength_tests": "frequency"
                    }},
                    "milestones": [
                    {{
                        "timeline": "week_number", 
                        "expected_progress": "description", 
                        "metrics": {{}}
                    }}
                    ]
                }},
                "equipment_needed": {{
                    "essential": [], 
                    "optional": [], 
                    "alternatives": {{}}
                }}
                }}

                **Key Considerations:**

                * **Prioritize safety and injury prevention.** 
                * **Provide clear and concise instructions.**
                * **Offer modifications for different fitness levels.**
                * **Incorporate progressive overload principles.**
                * **Ensure the plan is realistic and achievable for the client.**
                * **Consider the client's lifestyle and preferences.**

                **Remember to return the JSON response without any additional text or formatting.** 

                """
                
                # Generate response
                response = model.generate_content(prompt)
                
                try:
                    # Clean the response text - remove any potential markdown formatting
                    cleaned_response = response.text.strip()
                    if cleaned_response.startswith('```json'):
                        cleaned_response = cleaned_response.replace('```json', '', 1)
                    if cleaned_response.startswith('```'):
                        cleaned_response = cleaned_response.replace('```', '', 1)
                    if cleaned_response.endswith('```'):
                        cleaned_response = cleaned_response[:-3]
                    cleaned_response = cleaned_response.strip()
                    
                    # Parse the cleaned response as JSON
                    recommendation_json = json.loads(cleaned_response)
                    
                    # Save recommendation
                    recommendation = FitnessRecommendation.objects.create(
                        profile=profile,
                        recommendation_text=json.dumps(recommendation_json),
                        bmi=bmi,
                        bmi_category=bmi_category
                    )
                    
                    return Response({
                        'status': 'success',
                        'data': {
                            'profile': profile_serializer.data,
                            'bmi': bmi,
                            'bmi_category': bmi_category,
                            'recommendation': recommendation_json
                        }
                    }, status=status.HTTP_201_CREATED)
                    
                except json.JSONDecodeError as e:
                    return Response({
                        'status': 'error',
                        'message': 'Failed to parse AI response as JSON',
                        'error': str(e),
                        'raw_response': cleaned_response
                    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# {
#   "age": 25,
#   "gender": "male",
#   "weight": 70.5,
#   "height": 175.0,
#   "fitness_level": "beginner",
#   "activity_level": "moderately_active",
#   "goal": "maintenance",
#   "specific_area": "Upper body, core",
#   "target_timeline": "6 months",
#   "medical_conditions": "None",
#   "injuries_or_physical_limitation": "Previous ankle sprain",
#   "exercise_setting": "gym",
#   "available_equipment": "Dumbbells, resistance bands, treadmill",
#   "sleep_pattern": "6_to_8",
#   "stress_level": 6
# }

