
# https://www.strengthlog.com/calories-burned-lifting-weights/#Understanding_Calories_and_Energy_Expenditure







def calculate_calories_burned_weight(weight, duration, gender):
    # Men: [Bodyweight in kg] x [Minutes working out]  × 0.0713
    #  total energy expenditure during the workout = basal metabolic rate plus the extra energy expenditure from the weight training.
    # output = kcal
    if gender.lower() == "male":
        calories_per_minute = weight * 0.0713
    elif gender.lower() == "female":
        calories_per_minute = weight * 0.0637
    else:
        return "Invalid gender specified. Please reenter correct information."

    calories_burned = calories_per_minute * duration
    calories_burned = round(calories_burned,2)
    return calories_burned


print(calculate_calories_burned_weight(80,1,"female"))


# https://www.cleaneatzkitchen.com/a/blog/how-many-calories-should-i-burn-a-day-exercising
# Counting Target Number of Calories Burned in A Day
# When it comes to burning calories, there are certain factors that you need to consider if you want to make your weight loss plan effective.
# On average, women should aim to burn around 2,000 calories per day, while men should shoot for around 2,500. But to figure out exactly how many you need to burn each day, you'll need to do a little math.
# Start by calculating your basal metabolic rate (BMR). This is the number of calories your body burns just to stay alive. To calculate it, use this equation: BMR = (10 x weight) + (6.25 x height) – (5 x age).
# From there, you can determine how many calories you need to burn based on your activity level. If you're sedentary, multiply your BMR by 1.2. If you're moderately active, multiply your BMR by 1.375. And if you're very active, multiply your BMR by 1.55.
# Add all those numbers up and that's how many calories you should aim to burn each day!

# BMR = (10 x weight) + (6.25 x height) – (5 x age).
# moderately active, multiply your BMR by 1.375. And if you're very active, multiply your BMR by 1.55.

level_index = {"beginner": 1.2, "amateur": 1.375, "professional": 1.55}

def calories_goal_recommendation(weight, height, age, gender, activity_level):
    if gender.lower() == "male":
        bmr = (13.7516* weight) + ( 5.0033  * height) - (6.755* age) + 66.473
    elif gender.lower() == "female":
        bmr = (9.5634 * weight) + (1.8496  * height) - ( 4.6756 * age) + 655.0955
    else:
        raise ValueError("Invalid gender provided")

    # default get 1.2
    activity_multiplier = level_index.get(activity_level.lower(), 1.2) 
    calories_goal = bmr * activity_multiplier 
    calories_goal = round(calories_goal, 2)  -  bmr
    return calories_goal


weight = 85
height = 180
age = 37
gender = "male"
activity_level = "amateur"

result = calories_goal_recommendation(weight, height, age, gender, activity_level)
print(f"The recommended daily calories goal is: {result}")
