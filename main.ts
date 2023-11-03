import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getAllContactos from "./resolvers/getAllContactos.ts";
import getContacto from "./resolvers/getContacto.ts";
import addContacto from "./resolvers/addContacto.ts";
import updateContacto from "./resolvers/updateContacto.ts";
import deleteContacto from "./resolvers/deleteContacto.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if(!MONGO_URL){
    console.log("No mongo URL found");
    Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
    .get("/api/contactos", getAllContactos)
    .get("/api/contactos/:dni", getContacto)
    .post("/api/contactos", addContacto)
    .put("/api/contactos/:dni", updateContacto)
    .delete("/api/contactos/:dni", deleteContacto)


app.listen(3000, () => {
    console.log("Server listening on port 3000");
})