import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const addContacto = async(req: Request, res: Response) => {
    try{
        const { dni, nombre, apellidos, email, codigoPostal, codigoIso } = req.body;
        if(!dni || !nombre || ! apellidos || ! email || ! codigoPostal || ! codigoIso){
            res.status(400).send("Se requieren todos los datos");
            return;
        }

        const alreadyExists = await ContactoModel.findOne({ dni }).exec();
        if(alreadyExists){
            res.status(400).send("Ya existe el contacto");
            return;
        }

        const newContacto = new ContactoModel({ dni, nombre, apellidos, email, codigoPostal, codigoIso });
        await newContacto.save();

        res.status(200).send({
            dni: newContacto.dni,
            nombre: newContacto.nombre,
            apellidos: newContacto.apellidos,
            email: newContacto.email,
            codigoPostal: newContacto.codigoPostal,
            codigoIso: newContacto.codigoIso,
            id: newContacto._id.toString(),
        });
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default addContacto;