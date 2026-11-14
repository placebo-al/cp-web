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

let AbsandPushups = [
  { exercise: "Press ups", sets: 1, reps: 5 },
  { exercise: "Crunches", sets: 1, reps: 5 },
  { exercise: "Finger-tip Press ups", sets: 1, reps: 5 },
  { exercise: "Bent Knee Sit-ups", sets: 1, reps: 5 },
  { exercise: "Wide Arm Press ups", sets: 1, reps: 5 },
  { exercise: "Hand Slides", sets: 1, reps: 5 },
  { exercise: "Press ups", sets: 1, reps: 5 },
  { exercise: "Leg Raises", sets: 1, reps: 5 },
  { exercise: "Finger-tip Press ups", sets: 1, reps: 5 },
  { exercise: "Bent Knee Sit-ups", sets: 1, reps: 5 },
  { exercise: "Wide Arm Press ups", sets: 1, reps: 5 }
];

let table = document.querySelector("table.AbsPushups");
// let data = Object.keys(AbsandPushups[0]);  // Used for generating the THead
generateTable(table, AbsandPushups);
// generateTableHead(table, data);  // Used for generating the THead

let NovWeights = [
  { exercises: "DB Laterals", sets: 3, reps: 10 },
  { exercises: "Flyes", sets: 3, reps: 10 },
  { exercises: "Bent Over Rows", sets: 3, reps: 10 },
  { exercises: "Standing Calf Raises", sets: 3, reps: 10 },
  { exercises: "BB Bicep Curls", sets: 3, reps: 10 },
  { exercises: "Squats", sets: 3, reps: 10 },
];

let table2 = document.querySelector("table.NoviceWeights");
generateTable(table2, NovWeights);

let situps = [
  { exercises: "Bent Knee Sit Ups", reps: 5 },
  { exercises: "Leg Raises", reps: 5 },
  { exercises: "Sit-ups", reps: 5 },
  { exercises: "Crunches", reps: 5 },
  { exercises: "Thigh Hand Slides", reps: 5 },
  { exercises: "V Crunch", reps: 5 },
  { exercises: "Twisting Crunches", reps: 5 }
];

let table3 = document.querySelector("table.Abs");
generateTable(table3, situps);


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


