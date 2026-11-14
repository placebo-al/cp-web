function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}


function generateTable(table, data) {
  if (!table) return;
    for (let element of data) {
        let row = table.insertRow();
        for (const key of Object.keys(element)) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}


let Everday = [
    { exercises: "Breathing Exercises", reps: 1 },
    { exercises: "Press ups", reps: 10 },
    { exercises: "Crunches", reps: 10 },
    { exercises: "Finger-tip Press ups", reps: 10 },
    { exercises: "Bent Knee Sit-ups", reps: 10 },
    { exercises: "Wide Arm Press ups", reps: 10 },
    { exercises: "Hand Slides", reps: 10 },
    { exercises: "Press ups", reps: 10 },
    { exercises: "Leg Raises", reps: 10 },
    { exercises: "Finger-tip Press ups", reps: 10 },
    { exercises: "Bent Knee Sit-ups", reps: 10 },
    { exercises: "Wide Arm Press ups", reps: 10 }
];

let table5 = document.querySelector("table.everyday");
generateTable(table5, Everday);

let programme1 = [
    { exercise: "Press Ups", sets: 3, reps: 5 },
    { exercise: "Crunches", sets: 3, reps: 5 },
    { exercise: "Lunges", sets: 3, reps: 5 },
    { exercise: "Leg Raises", sets: 3, reps: 5 },
    { exercise: "Dips", sets: 3, reps: 5 },
    { exercise: "Bent Knee Sit Ups", sets: 3, reps: 5 },
    { exercise: "Calf Raises", sets: 3, reps: 5 },
    { exercise: "Thigh Hand Slides", sets: 3, reps: 5 },
    { exercise: "Chins", sets: 3, reps: 5 },
    { exercise: "Leg Raises", sets: 3, reps: 5 },
    { exercise: "Rear Scissors", sets: 3, reps: 5 },
    { exercise: "Sit Ups", sets: 3, reps: 5 }
];

let table4 = document.querySelector("table.Programme1");
generateTable(table4, programme1);


let Programme2 = [
    { exercises: "Squat Thrusts", sets: 3, reps: 5 },
    { exercises: "Crunches", sets: 3, reps: 5 },
    { exercises: "Burpees", sets: 3, reps: 5 },
    { exercises: "Stride Jumps", sets: 3, reps: 5 },
    { exercises: "Bent Knee Sit Ups", sets: 3, reps: 5 },
    { exercises: "Alternate Strides", sets: 3, reps: 5 },
    { exercises: "Thigh Hand Slides", sets: 3, reps: 5 },
    { exercises: "Step Ups", sets: 3, reps: 5 },
    { exercises: "Leg Raises", sets: 3, reps: 5 },
    { exercises: "Jump Ups", sets: 3, reps: 5 },
    { exercises: "Sit Ups", sets: 3, reps: 5 }
];

let table6 = document.querySelector("table.Programme2");
generateTable(table6, Programme2);


let IntStrength = [
    { exercises: "DB Laterals", sets: 3, reps: 10 },
    { exercises: "Flyes", sets: 3, reps: 10 },
    { exercises: "Bent Over Rows", sets: 3, reps: 10 },
    { exercises: "Standing Calf Raises", sets: 3, reps: 10 },
    { exercises: "BB Bicep Curls", sets: 3, reps: 10 },
    { exercises: "Squats", sets: 3, reps: 10 },
    { exercises: "Upright Rows", sets: 3, reps: 5 },
    { exercises: "Bench Presses", sets: 3, reps: 5 },
    { exercises: "One Arm Rows", sets: 3, reps: 5 },
    { exercises: "Standing Calf Raises", sets: 3, reps: 5 },
    { exercises: "Lying Triceps Presses", sets: 3, reps: 5 },
    { exercises: "Squats", sets: 3, reps: 5 }
];

let table7 = document.querySelector("table.IntermediateWeights");
generateTable(table7, IntStrength);


let Programme3 = [
    { exercises: "Press Ups", sets: 3, reps: 10 },
    { exercises: "Crunches", sets: 3, reps: 10 },
    { exercises: "Squat Thrusts", sets: 3, reps: 10 },
    { exercises: "Straight Leg Raises", sets: 3, reps: 10 },
    { exercises: "Dips", sets: 3, reps: 10 },
    { exercises: "Bent Knee Sit Ups", sets: 3, reps: 10 },
    { exercises: "Burpees", sets: 3, reps: 10 },
    { exercises: "Thigh Hand Slides", sets: 3, reps: 10 },
    { exercises: "Chins", sets: 3, reps: 10 },
    { exercises: "Leg Raises", sets: 3, reps: 10 },
    { exercises: "Stride Jumps", sets: 3, reps: 10 },
    { exercises: "Sit Ups", sets: 3, reps: 10 },
    { exercises: "Calf Raises", sets: 3, reps: 10 },
    { exercises: "Crunches", sets: 3, reps: 10 },
    { exercises: "Step Ups", sets: 3, reps: 10 },
    { exercises: "Straight Leg Raises", sets: 3, reps: 10 },
    { exercises: "Lunges", sets: 3, reps: 10 },
    { exercises: "Bent Knee Sit Ups", sets: 3, reps: 10 },
    { exercises: "Jumps Ups", sets: 3, reps: 10 },
    { exercises: "Thigh Hand Slides", sets: 3, reps: 10 },
    { exercises: "Rear Scissors", sets: 3, reps: 10 },
    { exercises: "Leg Raises", sets: 3, reps: 10 }
];

let Extras = [
    { exercises: "Head Rolls", sets: 3, reps: 10 },
    { exercises: "Twisting Crunches", sets: 3, reps: 10 },
    { exercises: "Parallel Dips", sets: 3, reps: 10 },
    { exercises: "V Crunches", sets: 3, reps: 10 },
    { exercises: "Reverse Neck Rolls", sets: 3, reps: 10 },
    { exercises: "Rope Climb", sets: 3, reps: 10 },
    { exercises: "Chins", sets: 3, reps: "10 Overhand" },
    { exercises: "Chins", sets: 3, reps: "10 Underhand" }
];

let AdvWeights = [
    { exercises: "DB Laterals", sets: 3, reps: 10 },
    { exercises: "Upright Rows", sets: 3, reps: 10 },
    { exercises: "Bent Over Laterals", sets: 3, reps: 10 },
    { exercises: "DB Presses", sets: 3, reps: 10 },
    { exercises: "Bench Presses", sets: 3, reps: 10 },
    { exercises: "Flyes", sets: 3, reps: 10 },
    { exercises: "Pullovers", sets: 3, reps: 10 },
    { exercises: "Squats", sets: 3, reps: 10 },
    { exercises: "Standing Calf Raises", sets: 3, reps: 10 },
    { exercises: "Leg Extensions", sets: 3, reps: 10 },
    { exercises: "Leg Curls", sets: 3, reps: 10 },
    { exercises: "BB Curls", sets: 3, reps: 10 },
    { exercises: "Lying Triceps Presses", sets: 3, reps: 10 },
    { exercises: "Wrist Curls", sets: 3, reps: 10 },
    { exercises: "Bent Over Rows", sets: 3, reps: 10 },
    { exercises: "One Arm Rows", sets: 3, reps: 10 },
    { exercises: "Deadlifts", sets: 3, reps: 10 },
    { exercises: "Squats", sets: 3, reps: 10 },
    { exercises: "Standing Calf Raises", sets: 3, reps: 10 },
    { exercises: "Leg Extensions", sets: 3, reps: 10 },
    { exercises: "Leg Curls", sets: 3, reps: 10 }
];

{/* <h3>Cycle</h3>", sets: 3
{ exercises: "Stage 1", 16km },
{ exercises: "Stage 2", 32km },
{ exercises: "Stage 3", 80km } */}