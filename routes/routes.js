import  express  from "express";
import PassengerModel from "../models/Passenger.js";
import UserModel from "../models/User.js";
import bcrypt from 'bcrypt';


const router = express.Router();

router.get('/passengers', async(req, res) => {
    try {
        const passengers = await PassengerModel.find({});
        res.json({passengers})

    }catch(err){
        res.json({error: 'No dataset /passengers'})
    }
})

router.get("/passengers/find/:id", async(req, res) => {
    try{
        const {id} = req.params;
        const passenger = await PassengerModel.find({_id: id});
        res.json({passenger})

    }catch(err){
        res.json({error: 'No dataset id'})
    }
})



router.post( '/passengers/add', (req, res) => {
    try
    {
        const newPassenger = req.body.body;
        PassengerModel.insertMany([ newPassenger ]).then( () => {
            res.json({ message: 'passenger ajouté avec succès' })
        });
    }
    catch( error )
    {
        res.json({ error })
    }
});


router.delete( '/passengers/delete', (req, res) => {
    try
    {
        const passengerToDelete = req.body;
        PassengerModel.deleteOne( passengerToDelete ).then( () => {
            res.json({ message: 'passenger supprimé avec succès' })
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

/**login password */
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