async function login(email) {

    const response = await fetch('http://localhost:3333/login', { 
        
        method: 'POST',
        
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        
        body: JSON.stringify({
            email
        })

    });

    if(!response.ok) {

        switch(response.status) {

            case 404:
                throw new Error('O endereço de e-mail fornecido não foi cadastrado');

            default:
                throw new Error('Algum problema ocorreu no servidor, tente novamente mais tarde');
                
        }

    }

}

document.addEventListener('DOMContentLoaded', ()=> {

    const loginForm = document.querySelector('#login-form');

    const loginView = document.querySelector('#login');

    const successfulLoginView = document.querySelector('#successful-login');

    loginForm.addEventListener('submit', async (event)=> {

        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email');

        try {
            
            await login(email);

            loginView.classList.add('hidden');

            successfulLoginView.classList.remove('hidden');
        
        } catch(err) {

            window.alert(err.message);

        }

    });

});