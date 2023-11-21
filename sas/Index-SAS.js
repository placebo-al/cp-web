
class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="../style.css">
    <script src="./Index-SAS.js" type="text/javascript" defer></script>
</head>

<header>
    <h1><a href="../index.html">SAS Workouts.</a></h1>
</header>

<nav id="main">
    <ul>
        <li><a href="Beginner.html">Beginner</a></li>
        <li><a href="Intermediate.html">Intermediate</a></li>
        <li><a href="Advanced.html">Advanced</a></li>
        <li><a href="Professional.html">Professional</a></li>
    </ul>
</nav>

`;
  }
}
customElements.define('header-component', Header);


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
  for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
          let cell = row.insertCell();
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
      }
  }
}

let AbsandPushups = [
  { exercise: "Press ups", sets: 3, reps: 5 }, 
  { exercise: "Crunches", sets: 3, reps: 5 },
  { exercise: "Finger-tip Press ups", sets: 3, reps: 5 },
  { exercise: "Bent Knee Sit-ups", sets: 3, reps: 5 },
  { exercise: "Wide Arm Press ups", sets: 3, reps: 5 },
  { exercise: "Hand Slides", sets: 3, reps: 5 },
  { exercise: "Press ups", sets: 3, reps: 5 },
  { exercise: "Leg Raises", sets: 3, reps: 5 },
  { exercise: "Finger-tip Press ups", sets: 3, reps: 5 },
  { exercise: "Bent Knee Sit-ups", sets: 3, reps: 5 },
  { exercise: "Wide Arm Press ups", sets: 3, reps: 5}
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
  ]
  
  
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
  ]


  let Everday = [
    { exercises: "Breathing Exercises", sets: 0, reps: 0 },
    { exercises: "Press ups", sets: 3, reps: 5 },
    { exercises: "Crunches", sets: 3, reps: 5 },
    { exercises: "Finger-tip Press ups", sets: 3, reps: 5 },
    { exercises: "Bent Knee Sit-ups", sets: 3, reps: 5 },
    { exercises: "Wide Arm Press ups", sets: 3, reps: 5 },
    { exercises: "Hand Slides", sets: 3, reps: 5 },
    { exercises: "Press ups", sets: 3, reps: 5 },
    { exercises: "Leg Raises", sets: 3, reps: 5 },
    { exercises: "Finger-tip Press ups", sets: 3, reps: 5 },
    { exercises: "Bent Knee Sit-ups", sets: 3, reps: 5 },
    { exercises: "Wide Arm Press ups", sets: 3, reps: 5 }
    ]
    
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
    ]
    
    let Extras = [
    { exercises: "Head Rolls", sets: 3, reps: 10 },
    { exercises: "Twisting Crunches", sets: 3, reps: 10 },
    { exercises: "Parallel Dips", sets: 3, reps: 10 },
    { exercises: "V Crunches", sets: 3, reps: 10 },
    { exercises: "Reverse Neck Rolls", sets: 3, reps: 10 },
    { exercises: "Rope Climb", sets: 3, reps: 10 },
    { exercises: "Chins", sets: 3, reps: "10 Overhand" },
    { exercises: "Chins", sets: 3, reps: "10 Underhand" }
    ]
    
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
    ]


    
/* 
<h3>Cycle</h3>", sets: 3
{ exercises: "Stage 1", 16km },
{ exercises: "Stage 2", 32km },
{ exercises: "Stage 3", 80km }

<h3>Timed Swim</h3>
{ exercises: "4 Laps 3mins", Rest 3, mins },
{ exercises: "8 Laps 6mins", Rest 6 mins },
{ exercises: "16 Laps 12 mins", Rest 6 mins },
{ exercises: "8 Laps 6mins", Rest 3, mins },
{ exercises: "4 Laps 3mins }

<h3>Runs</h3>
{ exercises: "Short Run<td>5 km 30 minutes },
{ exercises: "Fun Run<td>8.5 km },
{ exercises: "Fast Run<td>5 km fast as possible },
{ exercises: "Long Run<td>16 km },
{ exercises: "Fun Swim<td> 30 mins vary strokes }, */