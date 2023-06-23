const getUserLocalStorage = localStorage.getItem("userData");
const convertToObj = JSON.parse(getUserLocalStorage);


function renderHeader({ avatar_url, name, login }) {
  const profile = document.querySelector(".profile_div");
  profile.innerHTML = "";

  let nameProfile = ''
  if(name === null){
      nameProfile = login
    }else{
      nameProfile = name
  }

  profile.insertAdjacentHTML(
    "beforeend",
    `
    <img src="${avatar_url}" alt="user"/>
    <p>${nameProfile}</p>`
  );
}

async function rederRepositorys({ repos_url }) {
  const repositorys = await fetch(`${repos_url}`, {
    method: "GET",
  }).then((Response) => {
    if (Response.ok) {
      return Response.json();
    } else {
      console.log("erro");
    }
  });

  const listRepositorys = document.querySelector(".profile__ul");
  listRepositorys.innerHTML = "";
  let descriptionRepository = "";

  repositorys.forEach((repository) => {
    if (repository.description === null) {
      descriptionRepository = "Sem descrição";
    } else {
      descriptionRepository = repository.description;
    }

    listRepositorys.insertAdjacentHTML(
      "beforeend",
      `
    <li>
    <h4>${repository.name}</h4>
    <p>
      ${descriptionRepository}
    </p>
    <a href="${repository.clone_url}" target="_blank">Repositório</a>
  </li>
    `
    );
  });
}

function switchProfile() {
    const btnSwitch = document.querySelector('#btnSwitch')
    .addEventListener('click',()=>{
        localStorage.clear('userData')
        location.replace("../../");
        
    })
}

switchProfile()
rederRepositorys(convertToObj);
renderHeader(convertToObj);
