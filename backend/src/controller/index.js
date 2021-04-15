require('dotenv').config()
const mongoose = require('mongoose');
const model = require('../models');
const redis = require('redis');
const client = redis.createClient();
const fetch = require('node-fetch');
const {compare, encrypt, signJwt} = require('./helper')

// Mongo Start
mongoose.connect(process.env.MONGOURL, {useNewUrlParser: true});
const pokelist = mongoose.model('pokelist', model.pokelist,'pokelist');
const users = mongoose.model('users', model.users,'users');
// Mongo

const getPoke = (req,res) => {
    // console.log(req.query) { offset: '10', limit: '10' }
    const redisKey = 'pokelist';
    client.get(redisKey, async (err,data) => {
        const redisData = JSON.parse(data)
        let fetchData = await fetch(redisData ? redisData.next : "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20")
        .then((response)=> {
            return response.json();
        });
        
        pokelist.insertMany(fetchData.results)  
        .then((result) => {
            client.set(redisKey, JSON.stringify(fetchData),'EX',60);
            res.status(200).send({
                isCached:true,
                data: result,
            });
        })
        .catch(err => {
            console.error("error ", err);
            res.status(400).json({err});
        });
    });
}

const getPokeLimit = (req,res) => {
    const redisKey = 'pokelimit';
    client.get(redisKey, async (err,data) => {
        const redisData = JSON.parse(data)
        if(redisData ? redisData.limit == req.params.lim : false){
            res.status(200).send({isCached:true,data:redisData});
        } else {
            let fetchData = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${req.params.lim}`)
            .then((response)=> {
                return response.json();
            });

            pokelist.insertMany(fetchData.results)  
            .then((result) => {
                client.set(redisKey, JSON.stringify({
                    limit: req.params.lim,
                    result: fetchData.results
                }),'EX',60);

                res.status(200).send({
                    isCached:true,
                    data: result,
                });
            })
            .catch(err => {
                console.error("error ", err);
                res.status(400).json({err});
            });
        }
    });
}

const login = async (req,res) => {
    const {
        username,
        password
    } = req.body

    const user = await users.findOne({'username' : username}).then(res => res).catch(err => err)

    if(user){
        if(compare(password, user.password)){
            const token = signJwt({
                user: user.username //cek region
            }, process.env.JWTPASS || 'jwtPass')
            res.status(200).json({
                success: true,
                msg: 'Login berhasil',
                token: token
            })
        } else {
            res.status(400).json({
                success: false,
                msg: 'Password Salah',
                token: null
            });
        }
    } else {
        res.status(400).json({
            success: false,
            msg: 'User Tidak Terdaftar',
            token: null
        });
    }
}

const register = (req,res) => {
    const {
        username,
        password
    } = req.body

    const saveData = {
        username: username,
        password: encrypt(password)
    }

    users.create(saveData, (err, result) => {
        if (err) {
            console.error("error ", err);
            res.status(400).json({err});
        } else {
          res.status(201).send({
              success: true,
              msg: `Berhasil Membuat user ${result.username}`
          });
        }
    });
}

module.exports = {
    getPoke,
    getPokeLimit,
    login,
    register
}