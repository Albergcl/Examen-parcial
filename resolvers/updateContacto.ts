import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const updateContacto = async(req: Request, res: Response) => {
    try{
        const { dni } = req.params;
        const { nombre, apellidos, email, codigoPostal, codigoIso} = req.body;
        if(!nombre || ! apellidos || ! email || ! codigoPostal || ! codigoIso){
            res.status(400).send("Se requieren todos los datos");
            return;
        }

        const updateContacto = await ContactoModel.findOneAndUpdate(
            { dni },
            { nombre, apellidos, email, codigoPostal, codigoIso},
            { new: true }
        ).exec();

        if(!updateContacto){
            res.status(404).send("Contacto not found");
        }

        res.status(200).send8({
            nombre: updateContacto.nombre,
            apellidos: updateContacto.apellidos,
            email: updateContacto.email,
            codigoPostal: updateContacto.codigoPostal,
            codigoIso: updateContacto.codigoIso,
            id: updateContacto._id.toString(),
        })
    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default updateContacto;