# Expense Tracker

A simple expense tracker built with plain HTML, CSS, and JavaScript. No frameworks, no installs. Open `index.html` and start adding expenses.

## What it does

- Add an expense with a description, amount, and category
- See the running total of everything you've spent
- Colored bars show how your spending breaks down by category
- Delete any expense from the list
- Everything saves automatically in the browser so your data is still there after a refresh

## Categories

Food, Transport, Shopping, Bills, Other — each gets its own color.

## How to run it

Download the folder, double-click `index.html`. That's it. No internet needed.

## Files

```
expense-tracker/
├── index.html
├── style.css
└── script.js
```

## How the JavaScript works

The whole script follows four simple steps every time something changes:

1. Update the expense array (add or remove an item)
2. Save the array to localStorage
3. Recalculate the total
4. Redraw the bars and the list from scratch

That's it. No frameworks, no state management — just an array, a save, and a redraw.
