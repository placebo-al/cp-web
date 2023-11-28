
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


