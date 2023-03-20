import bcrypt from 'bcrypt';


const  salt = bcrypt.genSaltSync(10);
const gandalfPwd = bcrypt.hashSync("Gandalf", salt);
const sauronPwd = bcrypt.hashSync('Sauron', salt);



export const users = [
    {
        name: 'Gandalf',
        email: "gandalf@mail.fr",
        password: gandalfPwd
    },
    {
        name: 'Sauron',
        email: "sauronf@mail.fr",
        password: sauronPwd
    },
];