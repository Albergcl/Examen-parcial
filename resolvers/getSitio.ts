const getSitio = async(country_code: string, postal_code: number) => {
    const URL= `https://zip-api.eu/api/v1/info/${country_code}/${postal_code}`;
    const data = await fetch(URL);

    if(data.status !== 200){
        throw new Error("Bad Rquest");
    }
    const json = await data.json();
    return json;
}  