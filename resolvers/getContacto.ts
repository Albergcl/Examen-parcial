import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const getContacto = async (req: Request, res: Response) => {
    try{
        const { dni } = req.params;
        const contacto = await ContactoModel.findOne({ dni }).exec();

        if(!contacto){
            res.status(404).send("Contacto not found");
            return;
        }
        res.status(200).send({
            dni: contacto.dni,
            nombre: contacto.nombre,
            apellidos: contacto.apellidos,
            email: contacto.email,
            codigoPostal: contacto.codigoPostal,
            codigoIso: contacto.codigoIso,
            id: contacto._id.toString(),
        });
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
};

export default getContacto;