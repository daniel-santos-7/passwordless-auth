async function getResource(relativePath,token) {
    
    const url = 'http://localhost:3333/'+relativePath;

    const response = await fetch( url, { 
        
        headers: { 
        
            authorization: `Bearer ${token}`
        
        }

    });

    if(response.ok) {

        const data = await response.json();

        return data;

    }  

}

async function getAccessToken(loginToken) {
    
    const data = await getResource('auth', loginToken);

    return data?data.accessToken:undefined;

}

async function getUser(accessToken) {

    const user = await getResource('user', accessToken);

    return user;

}

document.addEventListener('DOMContentLoaded', async () => {

    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const views = document.querySelectorAll('#loading, #failure-access, #successful-access');

    const showView = (viewId)=> { 

        views.forEach(view=> {
            
            if(view.id === viewId) {

                view.classList.remove('hidden');
            
            } else {

                view.classList.add('hidden');
            
            }

        });

    };

    if(urlParams.has('token')) {

        const loginToken = decodeURIComponent(urlParams.get('token'));

        const accessToken = await getAccessToken(loginToken);

        const user = await getUser(accessToken);

        if(user) {

            const userNameLabel = document.querySelector('#user-name-label');

            userNameLabel.textContent = user.name;

            showView('successful-access');

        } else {

            showView('failure-access');

        }
    
    } else {

        const showFailureAcessView = ()=> { showView('failure-access') };

        setTimeout(showFailureAcessView, 3000);

    }

});