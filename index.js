import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://cartapp-276d6-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()
})

onValue(shoppingListInDB, function (snapshot) {
    if (snapshot.exists()) {
        let shoppingItems = Object.entries(snapshot.val())
        clearShoppingList()

        for (let i = 0; i < shoppingItems.length; i++) {
            let currentItem = shoppingItems[i]

            appendToShoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = `<p class="Noitems" >No items in the shopping list</p>`
    }
})

function clearShoppingList() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendToShoppingListEl(listitem) {
    let itemId = listitem[0]
    let itemValue = listitem[1]

    let listEl = document.createElement("li")

    listEl.textContent = itemValue

    listEl.addEventListener("click", function () {
        let exactLocationOfItem = ref(database, `shoppingList/${itemId}`)

        remove(exactLocationOfItem)
    })

    shoppingListEl.append(listEl)
}