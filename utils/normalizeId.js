/**
 * Normaliza un ID recibido como string desde req.params.
 * Retorna el ID como entero si es válido, o null si no lo es.
 *
 * Casos inválidos: undefined, null, string vacío,
 * no numérico ("abc"), decimal ("1.5"), negativo, cero.
 */
const normalizeId = (rawId) => {
    if (rawId === undefined || rawId === null) return null;
 
    const str = String(rawId).trim();
    if (str === '') return null;
 
    // Rechazar si contiene caracteres no numéricos
    if (!/^\d+$/.test(str)) return null;
 
    const id = parseInt(str, 10);
 
    if (id <= 0) return null;
 
    return id;
};
 
module.exports = normalizeId;