/**
 *   DOCUMENTOS ANIDADOS
 */

/**
 * Crear direccion postal que será un documento anidado
 */
db.users.updateOne(
    {
        name: 'Uriel'
    },
    {
        $set: {
            address: {
                state: 'CDMX',
                city: 'CDMX',
                postalCode: 1
            }
        }
    }
)

db.users.updateOne(
    {
        name: 'Marines'
    },
    {
        $set: {
            address: {
                state: 'CDMX',
                city: 'CDMX',
                number: 10,
                street: 'Calle número 1',
                postalCode: 1,
                references: ['Casa color azul', 'a un costado de una tienda']
            }
        }
    }
)