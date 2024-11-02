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

/**
 * Obtener documentos a partir de atributos de documentos embebidos
 */

// Obtener todos los usuarios que posean una direccion postal
db.users.find(
    {address: {$exists: true}}
).pretty()

// Obtener todos los usuarios que posean un código postal 1 y un número igual a 10
// Dot Notattion
db.users.find(
    {
       $and:[
        {'address.postalCode': 1},
        {'address.number': 10}          
       ]       
    }
).pretty()

// Obtener el nombre y la primera referencia de todos los usuarios con direccion postal y referencias

db.users.find(
    {
       $and:[
        {
          address: {$exists: true}
        },
        {
          'address.references':{$exists: true}
        }
       ] 
    },
    {
        _id: false, name: true, 'address.references' : {$slice : 1}
    }
).pretty()

/**
 * Actualizar elementos anidados
 */
// Agregamos a Uriel numero y referencias a su direccion postal
db.users.updateOne(
    {
        name: 'Uriel'
    },
    {
        $set: {
            'address.number': 20,
            'address.references': [
                'Fuera de la casa se encuentra un parque',
                'Fuera de la casa se encuentra un pino(árbol)'
            ]
        }
    }
)
// Actualizamos el numero de la direccion postal de Uriel
db.users.updateOne(
    {
        name: 'Uriel'
    },
    {
        $set: {
            'address.number': 25 
        }
    }
)

// Agregamos una nueva referencia a la direccion postal de Marines
db.users.updateOne(
    {name: 'Marines'},
    {
        $push:{
            'address.references':{
                $each: [
                    'Fuera de la casa hay un rio',
                    'En la esquina hay un campo de tenis'
                ]
            }
        }
    }
)

//Actualizamos la segunda referencia de la direccion postal de Marines cambiando a mayusculas la a inicial
db.users.updateOne(
    {
        name: 'Marines',
        'address.references': "a un costado de una tienda"
    },
    {
        $set: {
            'address.references.$': 'A un costado de una tienda'
        }
    }
)