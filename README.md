Simple Kanban Board

A drag-and-drop kanban board built with vanilla HTML, CSS, and JavaScript — no frameworks, no libraries. This is a rebuild of an earlier, simpler kanban project, restructured around a proper data model instead of relying on direct DOM manipulation.


Features
Add tasks — prompts for a title and an optional due date
Delete tasks — per-card delete button
Move tasks two ways:
Drag-and-drop between columns (desktop)
A "Select Path" dropdown menu on every card (works on desktop and mobile, where native drag-and-drop isn't reliably supported)
Due dates — tasks can optionally have a due date; overdue tasks are visually flagged
Three columns: To-Do, In Progress, Done
Responsive layout — columns stack vertically on smaller screens
Why Both Drag-and-Drop and a Dropdown?

The native HTML5 Drag and Drop API is desktop-only — most mobile browsers don't support it. Rather than leave mobile users unable to move tasks at all, every card also has a "move to..." dropdown, which works everywhere, including for keyboard/accessibility use cases. Both interactions route through the exact same underlying function, so they always stay in sync.

Tech Stack
HTML5 (Drag and Drop API)
CSS3 (Flexbox, media queries)
Vanilla JavaScript (no frameworks or libraries)
What I Learned Building This

This project started as a simple static kanban board, but I rebuilt it from scratch around a proper data model, which turned out to be a much bigger conceptual leap than expected. Specific things I learned or got much more comfortable with:

Separating state from UI. The biggest shift in this rebuild: instead of the DOM being the source of truth (a task's "position" being wherever its <div> physically sits), I built a single JavaScript array as the single source of truth, and a render() function that rebuilds the entire board from that array every time something changes. Every action (add, delete, move) follows the same pattern: update the array, then re-render.
Why two triggers can share one action. Drag-and-drop and the dropdown menu both call the same underlying "move task" logic — they're just two different inputs into the same state update, which kept the two moving parts in sync without duplicating logic.
Scope and variable declaration order. Ran into (and fixed) several real bugs around const vs let, variables used before they were declared (the "temporal dead zone"), and variables that only exist inside a specific function or loop iteration.
DOM nesting vs. sibling relationships. Understanding the actual parent-child structure required for a working <select> dropdown (options inside the select, not appended next to it) took several iterations to get right.
this and closures inside event listeners, especially the difference between arrow functions and regular functions when it comes to what this refers to.
Type mismatches that silently break comparisons — e.g., dataTransfer.getData() always returns a string, but task IDs were stored as numbers, so direct comparisons failed until I explicitly converted types.
CSS positioning context — learning why position: absolute needs a position: relative ancestor to behave predictably, instead of anchoring to the whole page.
Practical Date object gotchas — getMonth() is zero-indexed, and single-digit months/days need manual zero-padding to produce a consistent, comparable date string format.
Debugging methodically — tracing bugs back to their actual root cause (a missing appendChild, a mismatched class name, a misplaced curly brace) rather than guessing at fixes.


Planned Next Steps
"Due soon" color tier (in addition to the current overdue flag)
localStorage persistence (currently, refreshing the page resets the board)
Dark mode toggle
Author
Alabski.