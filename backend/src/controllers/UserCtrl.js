const db = require('../database');

module.exports = {

    async select(req,res) {
        
        try {

            const { id, type } = req.jwt;

            if(type === 'login') {

                return res.status(303).json({message: 'get an access token'});

            }

            const user = await db('users').where('id',id).first();

            if(!user) {

                return res.status(404).json({ message: 'user not found' });

            }

            return res.json(user);
        
        } catch(err) {

            return res.status(500).json({message:'server error occurred'});

        }

    },

    async store(req,res) {
        
        try {

            const { name, email } = req.body;

            if(!name || !email) {

                return res.status(400).json({ message: 'invalid data was sent' });

            }

            await db('users').insert({ name, email: email.toLowerCase() });

            return res.status(201).send();
        
        } catch(err) {

            return res.status(500).json({message:'server error occurred'})

        }

    }

}