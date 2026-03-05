export const quizData = [
  {
    topic: "React",
    id: "react-01",
    description: "Test your knowledge of Hooks and Components",
    image: `${import.meta.env.BASE_URL}/assets/images/React.png`,
    questions: [
      {
        id: 1,
        question: "Which hook is used for state management in React?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        answer: "useState",
      },
      {
        id: 2,
        question: "What does JSX stand for?",
        options: [
          "JavaScript XML",
          "Java Syntax Extension",
          "JSON Xylophone",
          "JavaScript Xerox",
        ],
        answer: "JavaScript XML",
      },
      {
        id: 3,
        question: "Which hook is used to handle side effects in React?",
        options: ["useState", "useMemo", "useEffect", "useCallback"],
        answer: "useEffect",
      },

      {
        id: 4,
        question: "What is the primary purpose of the Virtual DOM?",
        options: [
          "To bypass the browser's security",
          "To improve performance by minimizing direct DOM manipulation",
          "To store data in the cloud",
          "To replace the real DOM entirely",
        ],
        answer: "To improve performance by minimizing direct DOM manipulation",
      },
      {
        id: 5,
        question:
          "How do you pass data from a parent component to a child component?",
        options: [
          "Using State",
          "Using Hooks",
          "Using Props",
          "Using Redux only",
        ],
        answer: "Using Props",
      },
      {
        id: 6,
        question: "Which of the following is a 'Rule of Hooks'?",
        options: [
          "Call hooks inside loops",
          "Call hooks at the top level of your component",
          "Call hooks inside regular JavaScript functions",
          "Hooks can only be used in Class components",
        ],
        answer: "Call hooks at the top level of your component",
      },
      {
        id: 7,
        question:
          "What is the default behavior of useEffect if no dependency array is provided?",
        options: [
          "It runs only once on mount",
          "It never runs",
          "It runs after every single render",
          "It runs only when the component unmounts",
        ],
        answer: "It runs after every single render",
      },
      {
        id: 8,
        question:
          "Which hook would you use to store a persistent value that doesn't trigger a re-render when changed?",
        options: ["useState", "useRef", "useMemo", "useReducer"],
        answer: "useRef",
      },
      {
        id: 9,
        question:
          "Which hook is specifically designed to memoize expensive calculations so they don't run on every render?",
        options: ["useCallback", "useMemo", "useRef", "useLayoutEffect"],
        answer: "useMemo",
      },
      {
        id: 10,
        question:
          "In React lists, why is it recommended to avoid using the array 'index' as the 'key' prop?",
        options: [
          "It causes a syntax error",
          "It makes the code harder to read",
          "It can cause issues with state and component reordering",
          "Keys must always be strings, and index is a number",
        ],
        answer: "It can cause issues with state and component reordering",
      },
    ],
  },
  {
    topic: "Python",
    id: "python-01",
    description: "Test your knowledge of Python Language",
    image: `${import.meta.env.BASE_URL}/assets/images/Python.png`,
    questions: [
      {
        id: 1,
        question: "Which keyword is used to define a function in Python?",
        options: ["func", "define", "def", "function"],
        answer: "def",
      },
      {
        id: 2,
        question: "Which data type is used to store text in Python?",
        options: ["int", "float", "str", "bool"],
        answer: "str",
      },
      {
        id: 3,
        question: "Which symbol is used for comments in Python?",
        options: ["//", "#", "/* */", "--"],
        answer: "#",
      },

      {
        id: 4,
        question: "What is the correct way to create a list in Python?",
        options: ["(1, 2, 3)", "{1, 2, 3}", "[1, 2, 3]", "<1, 2, 3>"],
        answer: "[1, 2, 3]",
      },
      {
        id: 5,
        question:
          "Which function is used to get the number of items in a list?",
        options: ["count()", "length()", "size()", "len()"],
        answer: "len()",
      },
      {
        id: 6,
        question: "How do you start a 'for' loop in Python?",
        options: [
          "for x in y:",
          "for x to y:",
          "for (x=0; x<y; x++)",
          "each x in y:",
        ],
        answer: "for x in y:",
      },
      {
        id: 7,
        question:
          "Which method is used to add an element to the end of a list?",
        options: ["add()", "append()", "insert()", "push()"],
        answer: "append()",
      },
      {
        id: 8,
        question: "What is the result of 10 // 3 in Python?",
        options: ["3.333", "3", "4", "1"],
        answer: "3",
      },
      {
        id: 9,
        question: "Which of these is used to handle exceptions in Python?",
        options: [
          "try...except",
          "throw...catch",
          "if...else",
          "error...handle",
        ],
        answer: "try...except",
      },
      {
        id: 10,
        question: "What does the 'range(5)' function generate?",
        options: [
          "Numbers 1 to 5",
          "Numbers 0 to 5",
          "Numbers 0 to 4",
          "Numbers 1 to 4",
        ],
        answer: "Numbers 0 to 4",
      },
    ],
  },
  {
    topic: "C++",
    id: "C++-01",
    description: "Test your knowledge of C++ Language",
    image: `${import.meta.env.BASE_URL}/assets/images/C++ (CPlusPlus).png`,
    questions: [
      {
        id: 1,
        question:
          "Which operator is used to insert data into 'cout' for output?",
        options: [">>", "<<", "||", "&&"],
        answer: "<<",
      },
      {
        id: 2,
        question: "Which data type is used to store a single character?",
        options: ["string", "char", "float", "int"],
        answer: "char",
      },
      {
        id: 3,
        question: "What is the correct way to end a statement in C++?",
        options: [".", ":", ";", "!"],
        answer: ";",
      },
      {
        id: 4,
        question: "Which keyword is used to create a class in C++?",
        options: ["struct", "object", "class", "prototype"],
        answer: "class",
      },
      {
        id: 5,
        question: "What is the index of the first element in a C++ array?",
        options: ["-1", "1", "0", "None"],
        answer: "0",
      },
      {
        id: 6,
        question:
          "Which header file is required for using input/output streams?",
        options: ["<stdio.h>", "<iostream>", "<conio.h>", "<math.h>"],
        answer: "<iostream>",
      },
      {
        id: 7,
        question: "How do you declare a constant variable in C++?",
        options: ["const", "final", "fixed", "static"],
        answer: "const",
      },
      {
        id: 8,
        question: "Which of these is the address-of operator?",
        options: ["*", "->", "&", "."],
        answer: "&",
      },
      {
        id: 9,
        question: "What is the result of 'boolean b = (5 > 3);' in C++?",
        options: ["true", "1", "0", "false"],
        answer: "true",
      },
      {
        id: 10,
        question: "Which function is the starting point of every C++ program?",
        options: ["start()", "init()", "main()", "begin()"],
        answer: "main()",
      },
    ],
  },
  {
    topic: "HTML/CSS",
    id: "HTML&CSS-01",
    description: "Test your knowledge of HTML and CSS",
    image: `${import.meta.env.BASE_URL}/assets/images/HTMLCSS.png`,
    questions: [
      {
        id: 1,
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<script>", "<css>", "<style>", "<link>"],
        answer: "<style>",
      },
      {
        id: 2,
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
          "Hyper Tool Machine Language",
        ],
        answer: "Hyper Text Markup Language",
      },
      {
        id: 3,
        question: "Which HTML attribute is used to define inline styles?",
        options: ["class", "styles", "font", "style"],
        answer: "style",
      },
      {
        id: 4,
        question: "Which is the correct HTML element for the largest heading?",
        options: ["<heading>", "<h6>", "<h1>", "<head>"],
        answer: "<h1>",
      },
      {
        id: 5,
        question:
          "Which HTML element is used to specify a footer for a document or section?",
        options: ["<bottom>", "<section>", "<footer>", "<aside>"],
        answer: "<footer>",
      },
      {
        id: 6,
        question: "What does CSS stand for?",
        options: [
          "Computer Style Sheets",
          "Cascading Style Sheets",
          "Creative Style Sheets",
          "Colorful Style Sheets",
        ],
        answer: "Cascading Style Sheets",
      },
      {
        id: 7,
        question: "Which CSS property is used to change the background color?",
        options: ["color", "bgcolor", "background-color", "canvas-color"],
        answer: "background-color",
      },
      {
        id: 8,
        question:
          "In the CSS Box Model, which layer is between the padding and the margin?",
        options: ["Content", "Border", "Outline", "Space"],
        answer: "Border",
      },
      {
        id: 9,
        question:
          "Which property is used to change the left margin of an element?",
        options: ["padding-left", "indent", "margin-left", "spacing-left"],
        answer: "margin-left",
      },
      {
        id: 10,
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        answer: "font-size",
      },
    ],
  },
  {
    topic: "JavaScript",
    id: "Javascript-01",
    description: "Test your knowledge of JavaScript",
    image: `${import.meta.env.BASE_URL}/assets/images/JavaScript.png`,
    questions: [
      {
        id: 1,
        question:
          "Which keyword is used to declare a variable that can be reassigned?",
        options: ["const", "let", "var", "Both let and var"],
        answer: "Both let and var",
      },
      {
        id: 2,
        question: "What is the correct way to write an arrow function?",
        options: ["function => {}", "() => {}", "-> {}", "() -> {}"],
        answer: "() => {}",
      },
      {
        id: 3,
        question:
          "Which method is used to add an element to the end of an array?",
        options: ["shift()", "pop()", "push()", "unshift()"],
        answer: "push()",
      },
      {
        id: 4,
        question: "What will 'typeof NaN' return?",
        options: ["number", "NaN", "undefined", "object"],
        answer: "number",
      },
      {
        id: 5,
        question:
          "Which operator is used for strict equality (checking both value and type)?",
        options: ["=", "==", "===", "!=="],
        answer: "===",
      },
      {
        id: 6,
        question: "Which function is used to parse a string into an integer?",
        options: ["Integer.parse()", "toInt()", "parseInt()", "parseNumber()"],
        answer: "parseInt()",
      },
      {
        id: 7,
        question: "How do you write an IF statement in JavaScript?",
        options: ["if i = 5 then", "if (i == 5)", "if i == 5", "if i = 5"],
        answer: "if (i == 5)",
      },
      {
        id: 8,
        question: "What is the purpose of the 'map()' array method?",
        options: [
          "To filter out specific elements",
          "To find a single element",
          "To create a new array by transforming every element",
          "To sort the existing array",
        ],
        answer: "To create a new array by transforming every element",
      },
      {
        id: 9,
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["Undefined", "Boolean", "Float", "Symbol"],
        answer: "Float",
      },
      {
        id: 10,
        question: "What is the global object in a web browser environment?",
        options: ["document", "window", "body", "navigator"],
        answer: "window",
      },
    ],
  },
];
