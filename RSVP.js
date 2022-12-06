const form = document.getElementById("registrar");
const input = form.querySelector("input");
const list = document.getElementById("invitedList");
const mainDiv = document.querySelector(".main");

const filterLabel = document.createElement("label");
filterLabel.textContent = "hide those who haven't responded";

const filterCheckbox = document.createElement("input");
filterCheckbox.type = "checkbox";  

const div = document.createElement("div");

mainDiv.insertBefore(div, list);

div.appendChild(filterLabel);
div.appendChild(filterCheckbox);

//create elements
  function createElement(elementName, property, value) {
  const element = document.createElement(elementName);
  element[property] = value;
  return element;
}

//append elements
    function append (parent, child, textContent) {
    const appending = parent.appendChild(child)
    child.textContent = textContent;
    return appending;
  }
  
let array = [];
let removedNames = [];

form.addEventListener("submit", function(e) {
e.preventDefault();
  
const text = input.value;
input.value = "";

  const span = createElement("span");
  const listItem = createElement("li");
  const checkbox = createElement("input", "type", "checkbox");
  const label = createElement("label");
  const button = createElement("button");
  const remove = createElement("button");
  
  append(listItem,span);
  append(list,listItem);
  append(listItem,span, text);
  append(listItem,label, "confirmed");
  append(label,checkbox);
  append(listItem,button,"edit");
  append(listItem,remove,"remove");
  
  array.push(listItem.firstElementChild.textContent);
  const lastName = array[array.length - 1];  
  const duplicateNames = array.lastIndexOf(lastName, array.length - 2);
  const filter = array.filter(element => removedNames.includes(element));
  const index = removedNames.indexOf(text);
  const includes = filter.includes(text);
    
  if (text.length === 0) {
        alert('Please type a name.');
     } else if (array.length > 1 && duplicateNames > -1 && includes === false) {
        alert("You've entered this name already.")
        list.removeChild(list.lastElementChild)
        array.pop();
      }  else {
  removedNames.splice(index, 1);
  checkbox.addEventListener("change", (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
    listItem.classList.add("responded");
    listItem.style.border = "2px solid #1e7eb7";
    } else {
      listItem.classList.remove("responded");
    listItem.style.border = "";
    }
  })
  filterCheckbox.addEventListener("change", (e) => {
  const isChecked = e.target.checked;
  const ul = list.children;
  if (isChecked) {
    for (i = 0; i < ul.length; i++) {
      let lis = ul[i];
      if (lis.className === "responded") {
        lis.style.display = ""; 
      }
     else {
        lis.style.display = "none";
        }
       }
  } else {
        for (i = 0; i < ul.length; i++) {
        let lis = ul[i];
        lis.style.display = "";
  }
}
})
}

  list.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON')  {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    const action = button.textContent;
    const nameActions = {
     remove: () => {
      const span = li.firstElementChild;
      ul.removeChild(li);
      removedNames.push(span.textContent);
      console.log(removedNames);
    },
     edit: () => {
      const span = li.firstElementChild;
      const input = document.createElement("input");
      input.type = "text";
      input.value = span.textContent;
      li.insertBefore(input,span);
      li.removeChild(span);
      button.textContent = "save";
    },
     save: () => {
      const input = li.firstElementChild;
      const span = document.createElement("span");
      span.textContent = input.value;
      li.insertBefore(span,input);
      li.removeChild(input);
      button.textContent = "edit";
      array.push(span.textContent);
    }
  };
  nameActions[action]();
}

})
button.addEventListener("click", (e) => {
    if (button.textContent === "edit") {
     removedNames.push(span.textContent);
     console.log(removedNames);
    }})
})