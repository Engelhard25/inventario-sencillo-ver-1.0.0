
/**
 * 
 * @param {String|Number} id 
 * @returns 
 */
export const deleteInventoryById = async (id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/inventory/${id}`;
    const res = await fetch(url, {
        method: 'DELETE',
    });

    const deleteResult = await res.json();
    return true;
}