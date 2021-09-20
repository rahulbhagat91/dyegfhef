let globalTaskData=[];
taskContents = document.getElementById("taskContents");
taskModal = document.getElementById("task__modal")

const addCard=()=>{
    const newTaskDetails={
        id: `${Date.now()}`,
        url: document.getElementById("imageURL").value,
        title: document.getElementById("tasktitle").value,
        type: document.getElementById("tasktype").value,
        description: document.getElementById("taskdescription").value
    }
    taskContents.insertAdjacentHTML('beforeend', generateTaskCard(newTaskDetails));

    globalTaskData.push(newTaskDetails);
    saveToLocalStorage();
}
const generateTaskCard=({id, url, title, type, description}) =>
`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class="card shadow-sm task__card">
        <div class="card-header d-flex justify-content-end">
            <button type="button" class="btn btn-outline-info" name=${id} onclick="editTask(this)">
            <i class="fas fa-pencil-alt" name=${id} onclick="editTask(this)"></i>
            </button>
            <button type="button" class="btn btn-outline-danger" name=${id} onclick="deleteTask(this)">
            <i class="far fa-trash-alt" name=${id} onclick="deleteTask(this)"></i>
            </button>
        </div>
        <img
            src="${url}"
            width="100%"
            height="300px"
            alt="image"
            class="card-img-top mb-3 rounded-lg"
            style="padding: 1rem 1rem" />
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <span class="badge bg-primary">${type}</span>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-primary float-begin" name=${id} data-bs-toggle="modal" data-bs-target="#displayTask" onclick="openTask(this)">
            OPEN TASK
            </button>
        </div>
    </div>
</div>`

const saveToLocalStorage=() => {
    localStorage.setItem("tasky", JSON.stringify({tasks: globalTaskData}))
}
// here reloadTaskCard funct always load the card on reload of page.
const reloadTaskCard=() => {
    const localStorageCopy = JSON.parse(localStorage.getItem("tasky"));
    if(localStorageCopy){
        globalTaskData = localStorageCopy["tasks"];
    }
    globalTaskData.map((cardData)=>{
        taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));    
    })
}

const deleteTask = (e) => {
    const targetID = e.getAttribute("name");
    globalTaskData = globalTaskData.filter((cardData) => cardData.id!==targetID);
    saveToLocalStorage();
    window.location.reload();
}

const editTask =(e)=>{
    const targetID = e.getAttribute("name");
    // console.log(e);
    // console.log(e.parentNode);
    // console.log(e.parentNode.parentNode.parentNode);
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1]);
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3]);
    // console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5]);
    // to check index in console.
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[3].setAttribute("contenteditable","true");
    e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","true");
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].innerHTML="Save Changes";
    e.parentNode.parentNode.parentNode.childNodes[7].childNodes[1].setAttribute("onclick","saveEditTask(this)")
}
const saveEditTask =(e)=>{
    const targetID = e.getAttribute("name"); 
    const e_obj = {
        title: e.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML,
        type: e.parentNode.parentNode.childNodes[5].childNodes[5].innerHTML,
        description: e.parentNode.parentNode.childNodes[5].childNodes[3].innerHTML
    }
    console.log(globalTaskData);
    globalTaskData = globalTaskData.filter((cardData)=> {
    if(cardData.id==targetID){
        cardData.title = e_obj.title;
        cardData.type = e_obj.type;
        cardData.description = e_obj.description;
    }
    return globalTaskData;
    })
    saveToLocalStorage();
    window.location.reload();  
}
const openModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return ` <div id=${id}>
                <img width="100%" 
                src=${url || `https://images.unsplash.com/photo-1611465577672-8fc7be1dc826?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDIxfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60`}
                alt="bg image"
                class="img-fluid place__holder__image mb-3"
                />
                <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
                <h2 class="my-3">${title}</h2>
                <p class="lead">${description}</p>
            </div>`;
  };
const openTask = (e) => {
    const targetID = e.getAttribute("name"); 
    const getTask =  globalTaskData.filter((cardData) => cardData.id === targetID);
    taskModal.innerHTML = openModalContent(getTask[0]);
};
// const searchTask =()=>{
//     let s_title = document.getElementById("search_txt").value;
//     console.log(s_title);
//     while (taskContents.firstChild) {
//         taskContents.removeChild(taskContents.firstChild);
//     }
//     globalTaskData = globalTaskData.filter((cardData)=> {
//         if(cardData.title===s_title){
//             taskContents.insertAdjacentHTML('beforeend', generateTaskCard(cardData));
//         }
//     })
//      const resultData = globalTaskData.filter((obj) => obj.title===s_title);
//      resultData.filter((cardData) => {
//          taskContents.insertAdjacentHTML("beforeend", globalTaskData(cardData));
//     });
// }

const searchTask = () =>{
    let search,cards,i,title;
    search = document.getElementById("search_txt").value.toUpperCase();
    cardContainer = document.getElementById("taskContents");
    cards = cardContainer.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
      title = cards[i].querySelector(".card-body h5.card-title");
      if (title.innerText.toUpperCase().indexOf(search) > -1) {
          cards[i].style.display = "";
      } else {
          cards[i].style.display = "none";
      }
  }
  }