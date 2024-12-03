

let radio = document.querySelectorAll(".radio")
let body = document.body
let pStatus = document.querySelector("#status")
let logout = document.querySelector("#logout")

logout.addEventListener("click", () => {
    console.log("code ran here")
    fetch("/logout", {
        method:'post',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({})
    })
    console.log("damn")
})
console.log(radio)
let status;
pStatus.textContent = "undone"
radio.forEach((rad) => {
    if(rad.checked){
        rad.parentElement.style.display = "none"
    }
})
pStatus.addEventListener("click", () => {
    if(pStatus.textContent == "undone"){
        pStatus.textContent = "done"
        radio.forEach((rad) => {
            if(rad.checked){
                rad.parentElement.style.display = "flex"
            }
            if(rad.checked == false){
                rad.parentElement.style.display = "none"
            }
        })
        
    }
    else if(pStatus.textContent == "done"){
        pStatus.textContent = "undone"
        radio.forEach((rad) => {
            if(rad.checked){
                rad.parentElement.style.display = "none"
            }
            if(rad.checked == false){
                rad.parentElement.style.display = "flex"
            }
        })
    }
})

radio.forEach((rad) => {
rad.addEventListener("click", () => {
    let id = rad.getAttribute("id")
    console.log(id)
    if(rad.checked){
        status = 1
    }
    else{
        status = 0
    }
    fetch("/updateStatus", {
        method:'post',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({stat:status,task_id :id})
    })
})
})
