const inputNameUser = document.querySelector('.index__input')
const btnSearch = document.querySelector('.index__button')
.addEventListener('click', async ()=>{
    const nameUser = inputNameUser.value
    searchUser(nameUser)
})


async function searchUser (userGithub){
    const searchApiGitHub = await fetch(`https://api.github.com/users/${userGithub}`,{
        method: 'GET'
    })
    .then(async (Response) =>{
        if(Response.ok){
            const user = await Response.json()
            const convertToJson = JSON.stringify(user)
            localStorage.setItem('userData', convertToJson)
            location.replace("./src/pages/profile.html");
        }else{
            location.replace("./src/pages/error.html")
        }
    })
    
}