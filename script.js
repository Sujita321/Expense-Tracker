const descInput      = document.getElementById('descInput');
const amountInput    = document.getElementById('amountInput');
const categorySelect = document.getElementById('categorySelect');
const addBtn         = document.getElementById('addBtn');
const warning        = document.getElementById('warning');
const totalDisplay   = document.getElementById('totalDisplay');
const categoryBars   = document.getElementById('categoryBars');
const expenseList    = document.getElementById('expenseList');
const listEmpty      = document.getElementById('listEmpty');

const CATEGORY_COLORS = {
  Food:      '#f97316',
  Transport: '#3b82f6',
  Shopping:  '#a855f7',
  Bills:     '#ef4444',
  Other:     '#34d399'
};

let expenses = [];
let nextId   = 1;

function getTotal() {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total = total + expenses[i].amount;
  }
  return total;
}

function getTotalForCategory(category) {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].category === category) {
      total = total + expenses[i].amount;
    }
  }
  return total;
}

function renderTotal() {
  const total = getTotal();
  totalDisplay.textContent = '$' + total.toFixed(2);
}

function renderBars() {
  const grandTotal = getTotal();

  if (grandTotal === 0) {
    categoryBars.innerHTML = '<p class="empty-state">No expenses yet.</p>';
    return;
  }

  const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Other'];
  let html = '';

  for (let i = 0; i < categories.length; i++) {
    const cat      = categories[i];
    const catTotal = getTotalForCategory(cat);

    if (catTotal === 0) {
      continue;
    }

    const percent = (catTotal / grandTotal) * 100;
    const color   = CATEGORY_COLORS[cat];

    html = html + '<div class="bar-row">';
    html = html + '<div class="bar-label-row">';
    html = html + '<span class="bar-category-name">' + cat + '</span>';
    html = html + '<span class="bar-amount">$' + catTotal.toFixed(2) + '</span>';
    html = html + '</div>';
    html = html + '<div class="bar-track">';
    html = html + '<div class="bar-fill" style="width:' + percent.toFixed(1) + '%; background-color:' + color + ';"></div>';
    html = html + '</div>';
    html = html + '</div>';
  }

  categoryBars.innerHTML = html;
}

function renderList() {
  if (expenses.length === 0) {
    expenseList.innerHTML   = '';
    listEmpty.className     = 'empty-state';
    return;
  }

  listEmpty.className = 'empty-state hidden';

  let html = '';

  for (let i = 0; i < expenses.length; i++) {
    const expense = expenses[i];
    const color   = CATEGORY_COLORS[expense.category];

    html = html + '<li class="expense-item">';
    html = html + '<div class="expense-left">';
    html = html + '<div class="category-dot" style="background-color:' + color + ';"></div>';
    html = html + '<div>';
    html = html + '<div class="expense-desc">'     + expense.desc     + '</div>';
    html = html + '<div class="expense-category">' + expense.category + '</div>';
    html = html + '</div>';
    html = html + '</div>';
    html = html + '<div class="expense-right">';
    html = html + '<span class="expense-amount">$' + expense.amount.toFixed(2) + '</span>';
    html = html + '<button class="btn-delete" onclick="deleteExpense(' + expense.id + ')">✕</button>';
    html = html + '</div>';
    html = html + '</li>';
  }

  expenseList.innerHTML = html;
}

function renderAll() {
  renderTotal();
  renderBars();
  renderList();
}

function addExpense() {
  warning.className = 'warning hidden';

  const desc   = descInput.value;
  const amount = parseFloat(amountInput.value);

  if (desc === '' || isNaN(amount) || amount <= 0) {
    warning.className = 'warning';
    return;
  }

  warning.className = 'warning hidden';

  expenses.push({
    id:       nextId,
    desc:     desc,
    amount:   amount,
    category: categorySelect.value
  });

  nextId = nextId + 1;

  descInput.value   = '';
  amountInput.value = '';

  renderAll();
}

function deleteExpense(id) {
  let updated = [];
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id !== id) {
      updated.push(expenses[i]);
    }
  }
  expenses = updated;
  renderAll();
}

addBtn.onclick = function() {
  addExpense();
};

descInput.onkeydown = function(e) {
  if (e.key === 'Enter') {
    addExpense();
  }
};

renderAll();
