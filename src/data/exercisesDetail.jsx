import row from "../assets/row_noBg.png"
import shoulderpress from "../assets/shoulderpress_noBg.png"
import bicepcurl from "../assets/bicepcurl_noBg.png"
import squat from "../assets/squat_noBg.png"
import standingSideLegRaise from "../assets/standinglegraise_noBg.png"
import deadlift from "../assets/deadlift_noBg.png"
import lowerbackextension from "../assets/lowerbackextension_noBg.png"
import lyinglegraise from "../assets/lyinglegraise_noBg.png"
import bentoverrow from "../assets/bentoverrow_noBg.png"
import plank from "../assets/plank_noBg.png"
import bicepCurlStart from '../assets/illustrations/bicepCurlStart.jpg';
import bicepCurlEnd from '../assets/illustrations/bicepCurlEnd.jpg';
import shoulderPressStart from '../assets/illustrations/shoulderPressStart.png';
import shoulderPressMiddle from '../assets/illustrations/shoulderPressMiddle.png';
import dumbbellDeadliftStart from "../assets/illustrations/dumbbellDeadliftStart.png";
import dumbbellDeadliftMiddle from "../assets/illustrations/dumbbellDeadliftMiddle.png";
import lyinglegraiseStart from "../assets/illustrations/lyinglegraiseStart.png";
import lyinglegraiseMiddle from "../assets/illustrations/lyinglegraiseMiddle.png";
import plankStart from "../assets/illustrations/plankStart.png";
import rowStart from "../assets/illustrations/rowStart.png";
import rowMiddle from "../assets/illustrations/rowMiddle.png";
import sidelegliftStart from "../assets/illustrations/sidelegliftStart.png";
import sidelegliftMiddle from "../assets/illustrations/sidelegliftMiddle.png";
import squatStart from "../assets/illustrations/squatStart.png";
import squatMiddle from "../assets/illustrations/squatMiddle.png";

export const exercisesDetail = [
{   
    number: "1",
    cid: 2,
    fbx: "animations/row.fbx",
    image: row,
    category:"UpperBody-Back",
    exersise: "Row with Resistance Band",
    targetmuscle: "Rhomboids, Trapezius, and Rear Deltoids",
    setandrep: "3 sets of 8-12 reps",
    Instruction: "Attach the resistance band to a stationary object at chest height. Stand facing the object with your feet shoulder-width apart. Hold the band with both hands, arms extended, and palms facing each other. Pull the band toward your chest, keeping your elbows close to your body. Slowly return to the starting position. ",
    startIllustration : rowStart,
    middleIllustration : rowMiddle,
},
{ 
    number: "2",
    cid:2,
    fbx: "animations/shoulderpress.fbx",
    image: shoulderpress,
    category:"UpperBody-Shoulder",
    exersise:"Dumbbell OverheadPress",
    targetmuscle: "Deltoids, Triceps, and Upper Trapezius",
    setandrep: "3 sets of 8-12 reps",
    Instruction: "Sit on a bench with back support and hold a dumbbell in each hand at shoulder height. Press the weights upward until your arms are fully extended. Slowly lower the weights back to the starting position.",
    startIllustration : shoulderPressStart,
    middleIllustration : shoulderPressMiddle,
},
{ 
    number: "2",
    cid:1,
    fbx: "animations/shoulderpress.fbx",
    image: shoulderpress,
    category:"UpperBody-Shoulder",
    exersise:"Dumbbell OverheadPress",
    targetmuscle: "Deltoids, Triceps, and Upper Trapezius",
    setandrep: "3 sets of 8-12 reps",
    Instruction: "Sit on a bench with back support and hold a dumbbell in each hand at shoulder height. Press the weights upward until your arms are fully extended. Slowly lower the weights back to the starting position.",
    startIllustration : shoulderPressStart,
    middleIllustration : shoulderPressMiddle,
},
{ 
    number: "3",
    cid:1,
    fbx: "animations/bicep.fbx",
    image: bicepcurl,
    category:"UpperBody-Arm",
    exersise:"Dumbbell Bicep Curl",
    targetmuscle: "Biceps",
    setandrep: "3 sets of 8-12 reps",
    Instruction: "Stand with your feet shoulder-width apart and hold a dumbbell in each hand. Keep your elbows close to your body and curl the weights toward your shoulders. Slowly lower the weights back to the starting position.",
    startIllustration : bicepCurlStart,
    middleIllustration : bicepCurlEnd,
},
{ 
    number: "3",
    cid:2,
    fbx: "animations/bicep.fbx",
    image: bicepcurl,
    category:"UpperBody-Arm",
    exersise:"Dumbbell Bicep Curl",
    targetmuscle: "Biceps",
    setandrep: "3 sets of 8-12 reps",
    Instruction: "Stand with your feet shoulder-width apart and hold a dumbbell in each hand. Keep your elbows close to your body and curl the weights toward your shoulders. Slowly lower the weights back to the starting position.",
    startIllustration : bicepCurlStart,
    middleIllustration : bicepCurlEnd,
},
{ 
    number: "4",
    cid:2,
    fbx: "animations/BackSquat.fbx",
    image: squat,
    category:"LowerBody-Leg",
    exersise:"Squat",
    targetmuscle: "Quadriceps, Hamstrings, and Glutes",
    setandrep: "3 sets of 8-12 reps",
    Instruction: "Stand with your feet shoulder-width apart and hold a dumbbell in each hand. Keep your elbows close to your body and curl the weights toward your shoulders. Slowly lower the weights back to the starting position.",
    startIllustration : squatStart,
    middleIllustration : squatMiddle,
},
{ 
    number: "4",
    cid:1,
    fbx: "animations/BackSquat.fbx",
    image: squat,
    category:"LowerBody-Leg",
    exersise:"Squat",
    targetmuscle: "Quadriceps, Hamstrings, and Glutes",
    setandrep: "3 sets of 8-12 reps",
    Instruction: "Stand with your feet shoulder-width apart and hold a dumbbell in each hand. Keep your elbows close to your body and curl the weights toward your shoulders. Slowly lower the weights back to the starting position.",
    startIllustration : squatStart,
    middleIllustration : squatMiddle,
},
{ 
    number: "5",
    cid:2,
    fbx: "animations/standingSideLegRaise.fbx",
    image: standingSideLegRaise,
    category:"LowerBody-Leg",
    exersise:"Standing Side Leg Lift",
    targetmuscle: "Hip,Abductors and Core",
    setandrep: "3 sets of 15-20 reps",
    Instruction:"Stand with your hands on a chair or wall for balance. Lift your left leg out to the side and hold for 1 or 2 seconds. Lower your leg back to the starting position. Repeat with your right leg.",
    startIllustration : sidelegliftStart,
    middleIllustration : sidelegliftMiddle,
},
{ 
    number: "6",
    cid:1,
    fbx: "animations/deadlift.fbx",
    image: deadlift,
    category:"CoreMuscle",
    exersise:"Deadlift with Dumbbell",
    targetmuscle: "Erector Spinae",
    setandrep: "3 sets of 15-20 reps",
    Instruction:"",
    startIllustration : dumbbellDeadliftStart,
    middleIllustration : dumbbellDeadliftMiddle,
},


{ 
    number: "7",
    cid:2,
    fbx: "animations/lyinglegraise.fbx",
    image: lyinglegraise,
    category:"CoreMuscle-Abdominal",
    exersise:"Lying Leg Raise",
    targetmuscle: "Rectus Abdominis and Obliques",
    setandrep: "3 sets of 15-20 reps",
    Instruction:"Lie on your back with your legs straight and your arms at your sides, palms down. Lift your legs straight up toward the ceiling until they form a 90-degree angle with your torso. Slowly lower your legs back down to the starting position.",
    startIllustration : lyinglegraiseStart,
    middleIllustration : lyinglegraiseMiddle, 
},
{ 
    number: "7",
    cid:1,
    fbx: "animations/lyinglegraise.fbx",
    image: lyinglegraise,
    category:"CoreMuscle-Abdominal",
    exersise:"Lying Leg Raise",
    targetmuscle: "Rectus Abdominis and Obliques",
    setandrep: "3 sets of 15-20 reps",
    Instruction:"Lie on your back with your legs straight and your arms at your sides, palms down. Lift your legs straight up toward the ceiling until they form a 90-degree angle with your torso. Slowly lower your legs back down to the starting position.",
    startIllustration : lyinglegraiseStart,
    middleIllustration : lyinglegraiseMiddle, 
},
{ 
    number: "8",
    cid:1,
    fbx: "animations/plank.fbx",
    image: plank,
    category:"CoreMuscle-Abdominal",
    exersise:"Plank",
    targetmuscle: "Rectus Abdominis and Obliques",
    setandrep: "3 sets of 15-20 reps",
    Instruction:"Get into a push up position, with your elbows under your shoulders and your feet hip-width apart. Bend your elbows and rest your weight on your forearms and on your toes, keeping your body in a straight line. Hold for as long as possible.",
    startIllustration : plankStart,
    middleIllustration : plankStart,
}
];
  
  
  
  // { 
//     number: "7",
//     cid:2,
//     fbx: "animations/lowerbackextension.fbx",
//     image: lowerbackextension,
//     category:"CoreMuscle-Lower Back",
//     exersise:"Lower Back Extension",
//     targetmuscle: "Erector Spinae",
//     setandrep: "3 sets of 15-20 reps",
//     Instruction:"Lie face down on the floor with your legs extended and your arms at your sides. Lift your chest and legs off the floor, keeping your neck in a neutral position. Hold for 1 or 2 seconds, then lower your chest and legs back to the starting position.",
// },

// {   
//     number: "12",
//     cid: 1,
//     fbx: "animations/bentoverrow.fbx",
//     image: bentoverrow,
//     category:"UpperBody-Back",
//     exersise: "Bent Over Row",
//     targetmuscle: "Rhomboids, Trapezius, and Rear Deltoids",
//     setandrep: "3 sets of 8-12 reps",
//     Instruction: "Attach the resistance band to a stationary object at chest height. Stand facing the object with your feet shoulder-width apart. Hold the band with both hands, arms extended, and palms facing each other. Pull the band toward your chest, keeping your elbows close to your body. Slowly return to the starting position. ",
// },