const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const state = {
  itemCount: 0,
  uncheckedItemCount: 0,
  incrementItemCount: function() {
    this.itemCount++;
  },
  decreaseItemCount: function() {
    this.itemCount--
  },
  incrementUncheckedItemCount: function() {
    this.uncheckedItemCount++;
  },
  decreaseUncheckedItemCount: function() {
    this.uncheckedItemCount--
  },
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const deleteItem = document.getElementById('delete-item');
const itemCheckbox = document.getElementById('item-checkbox');

function newTodo() {
  const html = `
    <li class="${classNames.TODO_ITEM}">
      <input type="checkbox" id="item-checkbox" class="${classNames.TODO_CHECKBOX}"/>
      <span class="${classNames.TODO_TEXT}">Todo Item</span>
      <button id="delete-item" class="delete-item-button ${classNames.TODO_DELETE}">x</button>
    </li>
  `
  list.insertAdjacentHTML("beforeend", html);
  state.incrementItemCount();
  state.incrementUncheckedItemCount();
  updateCount('item');
  updateCount('unchecked');
}

function updateCount(value) {
  if (value === 'item') {
    itemCountSpan.innerHTML = state.itemCount;
  }

  if (value === 'unchecked') {
    uncheckedCountSpan.innerHTML = state.uncheckedItemCount;
  }
}

function manageEvents(e) {
//CHECKBOX EVENT
  if (e.target.id === 'item-checkbox') {
    // if item is checked decrease unchecked count
    if (e.toElement.checked === true) {
      state.decreaseUncheckedItemCount()
      updateCount('unchecked')
    } else {
    // is item is unchecked, increment unchecked count  
      state.incrementUncheckedItemCount()
      updateCount('unchecked')
    }
  }

//DELETE BUTTON EVENT
  if (e.target.id === 'delete-item') {
    const item = e.target.parentElement;
    const itemIsChecked = item.childNodes[1].checked;
    //if item is checked, decrease only item count
    if(itemIsChecked){
      state.decreaseItemCount();
      updateCount('item');
    } else {
    //if item is unchecked, decrease item count and unchecked count
      state.decreaseItemCount();
      state.decreaseUncheckedItemCount();
      updateCount('item');
      updateCount('unchecked');
    }

    //Finally, remove item
    item.parentNode.removeChild(item);
  }

}

document.addEventListener('click', manageEvents);

