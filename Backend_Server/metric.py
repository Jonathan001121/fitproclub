
# https://www.strengthlog.com/calories-burned-lifting-weights/#Understanding_Calories_and_Energy_Expenditure



def calculate_calories_burned_weight(weight, duration, gender):
    # Men: [Minutes working out] × [Bodyweight in kg] × 0.0713
    #  total energy expenditure during the workout = basal metabolic rate plus the extra energy expenditure from the weight training.
    # output = kcal
    if gender.lower() == "male":
        calories_per_minute = weight * 0.0713
    elif gender.lower() == "female":
        calories_per_minute = weight * 0.0637
    else:
        return "Invalid gender specified. Please reenter correct information."

    calories_burned = calories_per_minute * duration
    return calories_burned


print(calculate_calories_burned_weight(80,1,"female"))