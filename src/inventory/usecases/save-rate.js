import { dbtoRate } from "../mappers/rate-to-db";


export const updateRate = async (rate) => {
    console.log("updateRate", rate)
    const url = `${import.meta.env.VITE_BASE_URL2}/rate/${1}`;
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(rate),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updateRate = await res.json();
    return dbtoRate(updateRate);
}