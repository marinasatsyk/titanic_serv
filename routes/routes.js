import  express  from "express";
import PassengerModel from "../models/Passenger.js";
import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';


const router = express.Router();

router.get('/pokemons', async(req, res) => {
    try {
        const pokemons = await PassengerModel.find({});
        res.json({pokemons})

    }catch(err){
        res.json({error: 'No dataset /pokemons'})
    }
})

router.get("/pokemons/find/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const pokemon = await PokemonModel.find({_id: id});
        res.json({pokemon})

    }catch(err){
        res.json({error: 'No dataset id'})
    }
})



router.post( '/pokemons/add', (req, res) => {
    try
    {
        const newPokemon = req.body.body;
        PokemonModel.insertMany([ newPokemon ]).then( () => {
            res.json({ message: 'pokemon ajouté avec succès' })
        });
    }
    catch( error )
    {
        res.json({ error })
    }
});


router.delete( '/pokemons/delete', (req, res) => {
    try
    {
        const pokemonToDelete = req.body;
        PokemonModel.deleteOne( pokemonToDelete ).then( () => {
            res.json({ message: 'pokemon supprimé avec succès' })
        });
    }
    catch( error )
    {
        res.json({ error })
    }
});


router.get("/", async(req, res) =>{
    try{
        res.json({ message: 'api connected' });
    }catch(err){
        res.json({error: 'no dataset get /'})
    }
})


router.post('/users/login', async(req, res) => {
   try 
   {
    const { email, password } = req.body.body;
    const user = await UserModel.find({email});

    if( typeof user === 'undefined' || user.length === 0 )
    {
        res.json({ message: 'L\'utilisateur n\'existe pas' }).status(404);
    }
    else
    {
        // on demande à bcrypt de nous dire si le mot de passe saisi est le meme que le mot de pass hashé
        const isPasswordValid = await bcrypt.compare( password , user[0].password );

        if( !isPasswordValid ) // si le mot de passe n'est pas bon
        {
            res.json({ message: 'Le mot de passe est incorrect' }).status(401);
        }
        else
        {
            // on retourne l'utilisateur pour le logger
            res.json({ user: user[0] }).status(200);
        }
    }
   }
   catch(err)
   {
    console.log(err);
    // res.json({error})
   }
});

router.post('/users/checkAuth', async (req, res) => {
    try
    {
        const userToCheck = req.body.body;
        console.log(userToCheck);

        const user = await UserModel.find(userToCheck);

        if( typeof user === 'undefined' || user.length === 0 )
        {
            res.json({ isValid: false }).status(404);
        }
        else
        {
            res.json({ isValid: true }).status(200);
        }
    }
    catch( err )
    {
        console.log(err);
    }
});

export default router;