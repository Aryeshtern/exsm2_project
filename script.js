let storageList = JSON.parse(localStorage.getItem("storageList")) || [];

document.getElementById("add-form").addEventListener("submit",
  addForse
);

function addForse() {
  let fullName = document.querySelector("#full-name-input").value.trim();
  let rank = document.querySelector("#rank-input").value.trim();
  let position = document.querySelector("#position-input").value.trim();
  let platoon = document.querySelector("#platoon-input").value.trim();
  let status = document.querySelector("#status").value.trim();
  let missionTime = document.querySelector("#Mission-time-input").textContent;
  let newForse = {
    id: Math.random().toString(16).slice(2),
    fullName: fullName,
    rank: rank,
    position: position,
    platoon: platoon,
    status: status,
    missionTime: missionTime,
  };
  storageList.push(newForse);
  localStorage.setItem("storageList", JSON.stringify(storageList));
  updateTable();
}

function renderTable(list) {
  let tbody = document.getElementById("forces-tbody");
  tbody.innerHTML = "";
  list.forEach((element) => {
    let row = tbody.insertRow();
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);

    cell1.textContent = element.fullName;
    cell2.textContent = element.rank;
    cell3.textContent = element.position;
    cell4.textContent = element.platoon;
    cell5.textContent = element.status;

    let removeButton = document.createElement("button");
    removeButton.id = `remove-btn`;
    removeButton.textContent = "Remove";
    removeButton.classList.add("btn");
    removeButton.addEventListener("click", () => {
      removeForse(element.id);
    });
    cell6.appendChild(removeButton);

    let editButton = document.createElement("button");
    editButton.id = `edit-btn`;
    editButton.textContent = "Edit";
    editButton.classList.add("btn");
    editButton.addEventListener("click", () => {
      editSecsionControl(element.id);
    });
    cell6.appendChild(editButton);

    if (element.status != "retired") {
      let missionBotton = document.createElement("button");
      missionBotton.id = `mission-btn-${element.id}`;
      missionBotton.textContent = "Mission";
      missionBotton.classList.add("btn");
      missionBotton.addEventListener("click", () => {
        OperateForse(element.id);
      });
      cell6.appendChild(missionBotton);
    }
  });
}

function updateTable() {
  renderTable(storageList);
}

let idOlder = "";

function editForse(forsedetails) {
  let forse = storageList.filter((f) => f.id === forsedetails.id);
  forse.fullName = forsedetails.fullName;
  forse.rank = forsedetails.rank;
  forse.position = forsedetails.position;
  forse.platoon = forsedetails.platoon;
  forse.status = forsedetails.status;
  forse.missionTime = forsedetails.missionTime;
  localStorage.setItem("storageList", JSON.stringify(storageList));
  updateTable();
}

function editSecsionControl(id) {
  document.querySelector(`#edit-btn`).addEventListener("click", () => {
    editForse(id);
  });
  if ((document.querySelector("#section-2").style.display = "none")) {
    document.querySelector("#section-2").style.display = "block";
  } else {
    document.querySelector("#section-2").style.display = "none";
  }
}

function editForseDetails(id) {
  let fullName = document.querySelector("#edit-full-Name");
  let rank = document.querySelector("#edit-rank");
  let position = document.querySelector("#edit-position");
  let platoon = document.querySelector("#edit-platoon");
  let status = document.querySelector("#edit-status");
  let missionTime = document.querySelector("#edit-mission-time");
  let forse = storageList.filter((f) => f.id === id);
  fullName.textContent = forse.fullName;
  rank.textContent = forse.rank;
  position.textContent = forse.position;
  platoon.textContent = forse.platoon;
  status.textContent = forse.status;
  missionTime.textContent = forse.missionTime;
}

function removeForse(id) {
  storageList = storageList.filter((f) => f.id !== id);
  localStorage.setItem("storageList", JSON.stringify(storageList));
  updateTable();
}

function sortTable() {
  document.querySelector("#sort-btn").style.display = "none";
  document.querySelector("#sort-reverse-btn").style.display = "block";
  let sortedForse = storageList.sort((a, b) => {
    a.fullName > b.fullName;
  });
  updateTable(sortedForse);
}

function sortTableREverse() {
  document.querySelector("#sort-btn").style.display = "block";
  document.querySelector("#sort-reverse-btn").style.display = "none";
  let sortedForse = storageList.sort((a, b) => {
    a.fullName < b.fullName;
  });
  updateTable(sortedForse);
}

function OperateForse(id) {
  if (document.querySelector(`#mission-btn-${id}`).textContent === "Mission") {
    let forse = storageList.filter(f => f.id === id);
    let timer = forse[0].missionTime;
    let interval = setInterval(() => {
      timer--;
      document.querySelector(
        `#mission-btn-${id}`
      ).textContent = `Mission (${timer} seconds)`;
      if (timer === 0) {
        clearInterval(interval);
        document.querySelector(`#mission-btn-${id}`).textContent =
          "completed mission";
      }
      
    }, 1000);
  }
}

updateTable();
