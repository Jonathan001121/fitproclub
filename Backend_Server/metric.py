def calculate_calories_burned_weight(weight, duration, gender):
    if gender.lower() == "male":
        calories_per_minute = weight * 0.0713
    elif gender.lower() == "female":
        calories_per_minute = weight * 0.0637
    else:
        return "Invalid gender specified. Please reenter correct information."

    calories_burned = calories_per_minute * duration
    calories_burned = round(calories_burned,2)
    return calories_burned

level_index = {"beginner": 1.2, "amateur": 1.375, "professional": 1.55}

def calories_goal_recommendation(weight, height, age, gender, activity_level):
    if gender.lower() == "male":
        bmr = (13.7516* weight) + ( 5.0033  * height) - (6.755* age) + 66.473
    elif gender.lower() == "female":
        bmr = (9.5634 * weight) + (1.8496  * height) - ( 4.6756 * age) + 655.0955
    else:
        raise ValueError("Invalid gender provided")
    activity_multiplier = level_index.get(activity_level.lower(), 1.2) 
    calories_goal = bmr * activity_multiplier 
    calories_goal = round(calories_goal, 2)  -  bmr
    return calories_goal