# React Learning Diary 📖

Documentation of my progress and practice with React.

## 📝 Recent Learnings

- **Object State**: Mastered using the spread operator (`...`) to update specific properties in state objects.
- **Array State**: Learned to manage arrays in state by creating copies using `[...prevArr, "newElement"]`.
- **Functional Updates**: Always using `(prev) =>` to ensure state updates are based on the most recent values.
- **Ludo Board Logic**: Implemented a tracker that handles move counts (Objects) and move history (Arrays).

- **Todo List Logic**: Built a functional Todo List application with features like adding, deleting, and updating individual tasks using unique IDs (`uuid`).
- **Array of Objects State**: Mastered managing complex state structures by updating specific objects within an array using `.map()`.
- **UUID Integration**: Integrated the `uuid` library to ensure unique keys for list elements, improving React rendering performance and data integrity.

- **Conditional Styling**: Implemented features to mark tasks as done, applying conditional styles like `textDecoration: "line-through"` and color changes based on component state.
- **State Persistence with Objects**: Enhanced the Todo List to track task completion status (`isDone`) within the state object for each task.

- **Component Decomposition**: Practiced breaking down the UI into smaller, reusable components (e.g., `Ticket` → `TicketNum`).
- **Logic Abstraction**: Introduced a `helper.js` file to separate core logic (like random number generation and sum calculation) from UI components.
- **Lottery Game Logic**: Developed the foundation for a lottery application, focusing on array generation, unique keys for mapped elements, and validation logic.

- **useEffect Hook**: Explored the `useEffect` hook to handle side effects like data fetching and initial component mounting.
- **Async Data Fetching**: Learned to fetch data from APIs using `fetch` and `async/await`. Fixed a common pitfall by ensuring `response.json()` is awaited to resolve its promise before accessing data.

---

_Project is growing! More features to follow._
