def calculate_calories_burned_weight(weight, duration, gender):
    if gender.lower() == "male":
        calories_per_minute = weight * 0.0713
    elif gender.lower() == "female":
        calories_per_minute = weight * 0.0637
    else:
        return "Invalid gender specified. Please reenter correct information."

    calories_burned = calories_per_minute * duration
    return calories_burned