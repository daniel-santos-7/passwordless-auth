async function register(name,email) {

    const response = await fetch('http://localhost:3333/user', { 
        
        method: 'POST',
        
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        
        body: JSON.stringify({
            email,
            name
        })

    });

    if(!response.ok) {

        throw new Error('Algum problema ocorreu no servidor, tente novamente mais tarde');
                
    }

}

document.addEventListener('DOMContentLoaded', ()=> {

    const registerForm = document.querySelector('#register-form');

    registerForm.addEventListener('submit', async (event)=> {

        event.preventDefault();

        const formData = new FormData(event.target);

        const email = formData.get('email');

        const name = formData.get('name');

        try {
            
            await register(name,email);

            window.alert('Registrado com sucesso!');

            location.replace('/login');
        
        } catch(err) {

            window.alert(err.message);

        }

    });

});