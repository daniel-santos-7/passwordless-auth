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

    const logoutButton = document.querySelector('#logout-button');

    const showView = (viewId)=> { 

        views.forEach(view=> {
            
            if(view.id === viewId) {

                view.classList.remove('hidden');
            
            } else {

                view.classList.add('hidden');
            
            }

        });

    };

    const showSuccessfulAcessView = (name)=> {

        const userNameLabel = document.querySelector('#user-name-label');

        userNameLabel.textContent = name;

        showView('successful-access');

    };

    const showFailureAcessView = ()=> { showView('failure-access') };

    if(urlParams.has('token')) {

        const loginToken = decodeURIComponent(urlParams.get('token'));

        const accessToken = await getAccessToken(loginToken);

        const user = await getUser(accessToken);

        if(user) {

            localStorage.setItem('access-token',accessToken);

            showSuccessfulAcessView(user.name);

        } else {

            showView('failure-access');

        }
    
    } else {

        const storedAccessToken = localStorage.getItem('access-token');

        if(storedAccessToken) {

            const user = await getUser(storedAccessToken);

            if(user) {

                showSuccessfulAcessView(user.name)
    
            } else {
    
                showView('failure-access');
    
            }

        } else {

            setTimeout(showFailureAcessView, 3000);
        
        }

    }

    logoutButton.addEventListener('click', (event)=> {

        event.preventDefault();

        localStorage.removeItem('access-token');

        location.replace('/');

    });

});