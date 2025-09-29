export const levels = [
  {
    task: `<div>
  <p>This is a paragraph
  <p>This is a paragraph</p>
</div>`,
    command: `<div>
  <p>This is a paragraph</p>
  <p>This is a paragraph</p>
</div>`,
    multipleChoice: false,
    success: "Great job! The code is now correct.",
    hint: "Remember to close all the tags.",
    difficulty: "BEGINNER",
  },
  {
    info: "Find the error and correctly rewrite the following code",
    task: `.container {
  width: 100%
  height: 200px;
  background-color: blue;
}`,
    command: `.container {
  width: 100%;
  height: 200px;
  background-color: blue;
}`,
    multipleChoice: false,
    success: "Great job! The semicolon was missing.",
    hint: 'Pay attention to punctuation.',
    difficulty: "BEGINNER",
  },
  {
    info: "Find the bug and write the code correctly formatted",
    task: `function welcome(name) {
    console.log("Hi " + name);`,
    command: `function welcome(name) {
    console.log("Hi " + name)
};`,
    multipleChoice: false,
    success: "Great!",
    hint: 'Pay attention to the curly brackets',
    difficulty: "BEGINNER",
  },
  {
    info: "Find the error and correctly rewrite the following code",
    task: `<div class="container" class="main">Content</div>`,
    command: [
  `<div class="container main">Content</div>`,
  `<div class="main container">Content</div>`
    ],
    multipleChoice: false,
    success: "Great job, that class was duplicated.",
    hint: "Check that class.",
    difficulty: "BEGINNER",
  },
  {
    info: "Find the error and correctly rewrite the following code",
    task: `<p>
  <div>Incorrect nesting</div>
</p>`,
    command: `<div>
  <p>Incorrect nesting</p>
</div>`,
    multipleChoice: false,
    success: "Great!",
    hint: "Check that nesting.",
    difficulty: "BEGINNER",
  },
  {
    info: "Find the error and correctly rewrite the following code",
    task: `.elemento {
    text-colour: blue;
}`,
    command: `.elemento {
    color: blue;
}`,
    multipleChoice: false,
    success: "Well done, now that text is blue.",
    hint: "Set the text to blue correctly.",
    difficulty: "BEGINNER",
  },
  {
    info: "Find the error and correctly rewrite the following code",
    task: `<button onclick="welcome">Click</button>

<script>
function welcome() {
  alert("Hi!");
}
</script>`,
    command: `<button onclick="welcome()">Click</button>

<script>
function welcome() {
  alert("Hi!");
}
</script>`,
    multipleChoice: false,
    success: "Great, the parentheses were missing",
    hint: "Incorrect function call.",
    difficulty: "BEGINNER",
  },
  {
    info: "What will the following code output?",
    task: `let first = "5";
let second = "3";
let result = first + second;
console.log(result);`,
    command: "53",
    multipleChoice: true,
    a: "first + second",
    b: "53",
    c: "undefined",
    d: "8",
    success: "Great job!",
    hint: "It is a string concatenation.",
    difficulty: "BEGINNER",

  },
  {
    info: "Find the error and correctly rewrite the following code",
    task: `.testo {
  font-size: 1.5 rem;
  margin: 2 rem;
}`,
    command: `.testo {
  font-size: 1.5rem;
  margin: 2rem;
}`,
    multipleChoice: false,
    success: "Now it is correct, no spaces should be added between the value and the CSS units.",
    hint: "Maybe there is some space where there shouldn't be.",
    difficulty: "BEGINNER",
  },
  {
    info: "What will this code log?",
    task: `console.log(userName);
var userName = "Alice";`,
    command: "undefined",
    multipleChoice: true,
    a: "null",
    b: "ReferenceError: userName is not defined",
    c: "undefined",
    d: "Alice",
    success: "Exactly, var declarations are moved to the top of their scope, but the assignment stays in place.",
    hint: "Hint not available.",
    difficulty: "BEGINNER",
  },
  {
    info: "Find the error and correctly rewrite the following code",
    task: `function test() {
  if (true) {
      var x = 1;
  }
  console.log(x);
}

function test2() {
  if (true) {
      let y = 1;
  }
  console.log(y);
}`,
    command: `function test() {
  if (true) {
      var x = 1;
  }
  console.log(x);
}

function test2() {
  if (true) {
      var y = 1;
  }
  console.log(y);
}`,
    multipleChoice: false,
    success: "Well done, y is not accessible outside the if block.",
    hint: "Scope of var and let variables.",
    difficulty: "INTERMEDIATE",
  },
  {
    info: "Find the error and correctly rewrite the following code",
    task: `<label>Nome utente</label>
<input type="text" id="username">`,
    command: [`<label for="username">Nome utente</label>
<input type="text" id="username">`, `<label for='username'>Nome utente</label>
<input type="text" id="username">`],
    multipleChoice: false,
    success: "Perfect, that works!",
    hint: "Something is missing from that label.",
    difficulty: "INTERMEDIATE",
  },
  {
    info: "What will be printed in the console?",
    task: `const numeri = [1, 2, 3, 4, 5];
const pari = numeri.filter(n => n % 2 === 0);
numeri.push(6);
console.log(pari);`,
    command: "[2, 4]",
    multipleChoice: true,
    a: "[2, 4, 6]",
    b: "[1, 3, 5]",
    c: "[2, 4]",
    d: "[1, 2, 3, 4, 5]",
    success: "Great, filter creates a new array, it does not modify the original one.",
    hint: "Hint not available.",
    difficulty: "INTERMEDIATE",
  },
  {
    info: "What will be printed in the console?",
    task: `const numeri = [1, 2, 3];
numeri.map(n => n * 2);
console.log(numeri);`,
    command: "[1, 2, 3]",
    multipleChoice: true,
    a: "[2, 4, 6]",
    b: "[1, 2, 3]",
    c: "[1, 1, 2, 2, 3, 3]",
    d: "undefined",
    success: "Correct, map does not modify the original array.",
    hint: "Hint not available.",
    difficulty: "INTERMEDIATE",
  },
  {
    info: "We want only the child handler to be triggered",
    task: `<div class="parent" onclick="handleParent()">
  <button onclick="handleChild()">Click me</button>
</div>

<script>
function handleParent() {
  console.log("Parent clicked");
}

function handleChild() {
  console.log("Child clicked");
}
</script>`,
    command: "Add event.stopPropagation() to handleChild()",
    multipleChoice: true,
    a: "Add event.stopPropagation() to handleChild()",
    b: "Add event.stopPropagation() to handleParent()",
    c: "No changes are needed",
    d: "Add event.propagationStop() to handleParent()",
    success: "Fantastic!",
    hint: "You need to stop the propagation to the parent",
    difficulty: "INTERMEDIATE",
  },
  {
    info: "What will the following code output?",
    task: `const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 29 }
];

const searchProduct = { id: 1, name: 'Laptop', price: 999 };

console.log(products.includes(searchProduct));`,
    command: "false",
    multipleChoice: true,
    a: "true",
    b: "false",
    c: "undefined",
    d: "TypeError",
    success: "Great job! False - because includes() compares object references, not content",
    hint: "Hint not available.",
    difficulty: "INTERMEDIATE",
  },
  {
    info: "What will be printed in the console?",
    task: `function startTimer() {
  let seconds = 0;
  
  setInterval(() => {
    seconds++;
    console.log(seconds);
    
    if (seconds >= 10) {
      console.log("Time's up");
      return;
    }
  }, 1000);
}

startTimer();`,
  command: "The timer continues indefinitely",
  multipleChoice: true,
  a: "The timer ends after 11 seconds",
  b: "The timer ends after 10 seconds",
  c: "Nothing is printed",
  d: "The timer continues indefinitely",
  success: "Exactly, return does not stop the interval.",
  hint: "Hint not available.",
  difficulty: "INTERMEDIATE",
  },
  {
    info: "Find the error and correctly rewrite the following code",
    task: `.button:before {
  content: "→ ";
  color: blue;
}

.button:after {
  content: " ←";
  color: red;
}`,
    command: `.button::before {
  content: "→ ";
  color: blue;
}

.button::after {
  content: " ←";
  color: red;
}`,
    multipleChoice: false,
    success: "Exactly.",
    hint: "They should be pseudo-elements, not pseudo-classes",
    difficulty: "INTERMEDIATE",
  },
  {
    info: "What will be printed in the console?",
    task: `function combineArrays(arr1, arr2, arr3) {
  return [...arr1, ...arr2, ...arr3];
}

const result = combineArrays([1, 2], null, [3, 4]);
console.log(result);`,
    command: "TypeError: null is not iterable",
    multipleChoice: true,
    a: "[1, 2, 3, 4]",
    b: "TypeError: null is not iterable",
    c: "[1, 2, null, 3, 4]",
    d: "Undefined",
    success: "Great job",
    hint: "The spread operator does not work with null or undefined",
    difficulty: "INTERMEDIATE",
  },
  {
    info: "Set 'cover' correctly on the background image",
    task: `.image-container {
  width: 200px;
  height: 200px;
  object-fit: cover;
  background-image: url('photo.jpg');
}`,
    command: `.image-container {
  width: 200px;
  height: 200px;
  background-size: cover;
  background-image: url('photo.jpg');
}`,
    multipleChoice: false,
    success: "Well done!",
    hint: "Object-fit works only on replaced elements.",
    difficulty: "INTERMEDIATE",
  },
  {
    info: "What will happen when this code executes?",
    task: `const numbers = [1, 2, 3, 4, 5];

try {
  const [first, ...middle, last] = numbers;
  console.log(first, middle, last);
} catch (error) {
  console.log('Error occurred');
}`,
    command: "It will log 'Error occurred'",
    multipleChoice: true,
    a: "It will log 'Error occurred'",
    b: "It will log 1 [2, 3, 4] 5",
    c: "It will log 1 [2, 3, 4, 5] undefined",
    d: "It will log 1 [] 5",
    success: "Yep, you cannot have elements after a rest element",
    hint: "the rest element must always be the last element in destructuring assignment",
    difficulty: "INTERMEDIATE",
  },
  {
    info: "What's wrong with this event delegation code?",
    task: `<div class="container">
  <button class="delete-btn primary">Delete User</button>
  <button class="delete-btn secondary">Remove Item</button>
  <button class="save-btn">Save</button>
</div>

<script>
  document.querySelector('.container').addEventListener('click', (e) => {
    if (e.target.className === 'delete-btn') {
        console.log('Delete button clicked!');
        e.target.style.opacity = '0.5';
    }
  });
</script>`,
  command: "className returns all classes as a string",
  multipleChoice: true,
  a: "Should use ===",
  b: "Missing preventDefault()",
  c: "e.target should be e.currentTarget",
  d: "className returns all classes as a string",
  success: "Yep!",
  hint: "Hint not available.",
  difficulty: "INTERMEDIATE",
  },
  {
    info: "What will this code output?",
    task: `const urls = ['url1', 'url2', 'url3'];

async function processUrls() {
  const results = [];
  
  urls.forEach(async (url) => {
    const data = await mockFetch(url);
    results.push(data);
  });
  
  console.log('Results:', results);
  return results;
}

function mockFetch(url) {
  return new Promise(resolve => 
    setTimeout(() => resolve(url), 100)
  );
}

processUrls();`,
  command: "Results: []",
  multipleChoice: true,
  a: "Results: ['url1', 'url2', 'url3']",
  b: "Results: [Promise, Promise, Promise]",
  c: "Results: []",
  d: "TypeError: forEach is not a function",
  success: "Correct answer, the console.log executes immediately while the async callbacks are still pending.",
  hint: "Does forEach wait for async operations?",
  difficulty: "INTERMEDIATE",
  },
  {
    info: "What will this code output?",
    task: `const inputs = ['08', '09', '10', '16'];
const numbers = inputs.map(str => parseInt(str));

console.log(numbers);`,
    command: "[8, 9, 10, 16]",
    multipleChoice: true,
    a: "0, 0, 10, 16]",
    b: "[8, 9, 10, 16]",
    c: "[8, 9, NaN, NaN]",
    d: "[NaN, NaN, 10, 16]",
    success: "Correct",
    hint: "Hint not available.",
    difficulty: "INTERMEDIATE",
  },
  {
    info: "What will this code log?",
    task: `const user = {
  name: 'John',
  'last-name': 'Doe',
  age: 30
};

console.log(user.last-name);
console.log(user['last-name']);`,
    command: "NaN and 'Doe'",
    multipleChoice: true,
    a: "NaN and 'Doe'",
    b: "SyntaxError on the first line",
    c: "undefined and 'Doe'",
    d: "'Doe' and 'Doe'",
    success: `Well done, user.last-name is interpreted as user.last - name, which becomes undefined - undefined = NaN. 
    Property names with hyphens must be accessed using bracket notation: user['last-name'] returns "Doe". 
    Dot notation only works with valid JavaScript identifiers.`,
    hint: "Hint not available.",
    difficulty: "INTERMEDIATE",
  },
  {
    info: "Fix this CSS so the calc() calculations work properly",
    task: `.sidebar {
  width: calc(100%-300px);
  height: calc(100vh+20px);
}

.content {
  width: calc(50%*2-40px);
  margin: calc(10px+5%);
}`,
    command: `.sidebar {
  width: calc(100% - 300px);
  height: calc(100vh + 20px);
}

.content {
  width: calc(50% * 2 - 40px);
  margin: calc(10px + 5%);
}`,
    multipleChoice: false,
    success: "Correct, the calc() function requires spaces around mathematical operators.",
    hint: "Hint not available.",
    difficulty: "INTERMEDIATE",
  },
  {
    info: "Why do the grid items overflow the container in this layout?",
    task: `<div class="grid-container">
  <div class="grid-item">Item 1</div>
  <div class="grid-item">Item 2</div>
  <div class="grid-item">Item 3</div>
</div>
<script>
  .grid-container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  gap: 20px;
  width: 300px;
}

.grid-item {
  background: lightblue;
  padding: 10px;
}
</script>`,
    command: "Grid gaps (20px x 2 = 40px) aren't included in the 300px width calculation",
    multipleChoice: true,
    a: "The padding: 10px on grid items adds extra width that causes overflow",
    b: "Grid gaps (20px x 2 = 40px) aren't included in the 300px width calculation",
    c: "repeat(3, 100px) creates 4 columns instead of 3, exceeding the container",
    d: "Missing box-sizing: border-box causes the width calculation to be incorrect",
    success: "Great!",
    hint: "Calculate the total width of the parent div",
    difficulty: "INTERMEDIATE",
  },
  {
    info: "What will this code output?",
    task: `function getValue() {
  console.log('getValue called');
  return { x: myVariable };
}

try {
  const { x } = getValue();
  console.log(x);
} catch (error) {
  console.log('Error caught');
}

const myVariable = 42;`,
    command: "'getValue called' then 'Error caught'",
    multipleChoice: true,
    a: "'getValue called' then 'Error caught'",
    b: "'getValue called' then 42",
    c: "'Error caught' only",
    d: "'getValue called' then undefined",
    success: "Exactly, the const myVariable = 42 declaration comes after the access attempt.",
    hint: "Hint not available.",
    difficulty: "ADVANCED",
  },
  {
    info: "What's the performance problem with this CSS?",
    task: `.expensive-animation {
  will-change: transform, opacity, left, top, width, height, background;
  animation: complexMove 2s infinite;
}

@keyframes complexMove {
  0% { transform: translateX(0); }
  100% { transform: translateX(100px); }
}`,
    command: "will-change declares too many properties, hurting performance",
    multipleChoice: true,
    a: "Too many keyframes in the animation",
    b: "Transform and position properties conflict",
    c: "Missing animation-fill-mode property",
    d: "will-change declares too many properties, hurting performance",
    success: `Correct, will-change creates composite layers for optimization, 
    but declaring too many properties (especially non-compositable ones like width, height, background) 
    can actually hurt performance by creating unnecessary layers and increasing memory usage. 
    Only declare properties that will actually change and only compositable properties when possible.`,
    hint: "Hint not available.",
    difficulty: "ADVANCED",
  },
  {
    info: "What will this code output?",
    task: `const target = {};
Object.defineProperty(target, 'id', {
  value: 123,
  writable: false,
  configurable: false
});

const proxy = new Proxy(target, {
  get(target, prop) {
    if (prop === 'id') {
      return 999; // Try to return different value
    }
    return target[prop];
  }
});

console.log(proxy.id);`,
    command: "TypeError: Proxy invariant violation",
    multipleChoice: true,
    a: "undefined",
    b: "TypeError: Proxy invariant violation",
    c: "999",
    d: "123",
    success: "Perfect! Proxy traps must respect invariants defined by the target object's property descriptors.",
    hint: "Hint not available.",
    difficulty: "ADVANCED",
  }
];