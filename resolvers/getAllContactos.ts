import { Request, Response } from "npm:express@4.18.2";
import ContactoModel from "../db/contacto.ts";

const getAllContactos = async (req: Request, res: Response) => {
    try{
        const contacto = await ContactoModel.find();

        res.status(200).send({
            dni: contacto.dni,
            nombre: contacto.nombre,
        });
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
};

export default getAllContactos;