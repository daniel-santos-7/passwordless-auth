const db = require('../database');
const jwt = require('jsonwebtoken');
const emailTransporter = require('../services/emailTransporter');
require('dotenv').config();

module.exports = {

    async login(req,res) {

        try {
            
            const { email } = req.body;

            const user = await db('users').where('email',email).first();

            if(!user) {

                return res.status(404).json({ message: 'e-mail not found' });

            }

            const loginToken = jwt.sign({ id:user.id, type:'login' }, process.env.JWT_SECRET, { expiresIn:'10m' });

            const magicLink = process.env.CLIENT + '?token=' + encodeURIComponent(loginToken);

            await emailTransporter.sendMail({ 
                from: 'passwordlessauth@app.com',
                to: user.email,
                html: `<h1>Requisição de Login</h1><a href="${magicLink}">efetuar login</a>`,
                text: `Link: ${magicLink}`
            });

            return res.send();

        } catch (err) {

            return res.status(500).json({message:'server error occurred'});

        }

    }

}