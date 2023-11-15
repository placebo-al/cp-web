
class Header extends HTMLElement {
    constructor() {
      super();
    }
  
  connectedCallback() {
this.innerHTML = `
<header>
<h1>CP Workouts.</h1>
</header>
<nav id="main">
<ul>
  <li><a href="Coreperformance-Essentials.html">Essentials</a></li>
  <li><a href="Coreperformance-Phase1.html">Phase One</a></li>
  <li><a href="Coreperformance-Phase2.html">Phase Two</a></li>
  <li><a href="Coreperformance-Phase3.html">Phase Three</a></li>
  <li><a href="Coreperformance-Phase4.html">Phase Four</a></li>
</ul>
</nav>

<script>
const nav = document.querySelector('#main');
let topOfNav = nav.offsetTop;

function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
  }
}
    
window.addEventListener('scroll', fixNav);    
</script>
`;
  }
}

customElements.define('header-component', Header);