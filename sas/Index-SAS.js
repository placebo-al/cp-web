
class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
<!DOCTYPE html>
<html lang="en">

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
