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

/**
 * Listas de documentos anidados
 * 
 */

/**
 * Sustituir listas de string por listas documentos para los cursos en los usuarios
 */ 
//Quitamos las listas de string cursos
db.users.updateMany(
    {
        courses: {$exists: true}
    },
    {
        $unset: {
            courses: true
        }
    }
)

// creamos las listas de documentos
db.users.updateOne(
    {name: 'Rafael'},
    {
        $set: {
            courses:[
                {
                    title: 'MongoDB',
                    progress: 50,
                    completed: false
                },
                {
                    title: 'Base de datos',
                    progress: 100,
                    completed: true
                },
                {
                    title: 'Git',
                    progress: 100,
                    completed: true
                }                
            ]
        }
    }
)

db.users.updateOne(
    {name: 'Eduardo'},
    {
        $set: {
            courses:[
                {
                    title: 'MongoDB',
                    progress: 50,
                    completed: false
                },
                {
                    title: 'Python',
                    progress: 100,
                    completed: true
                },
                {
                    title: 'Ruby',
                    progress: 80,
                    completed: false
                }                
            ]
        }
    }
)

db.users.updateOne(
    {name: 'Fernando'},
    {
        $set: {
            courses:[
                {
                    title: 'VUE',
                    progress: 50,
                    completed: false
                },
                {
                    title: 'Docker',
                    progress: 50,
                    completed: false
                }             
            ]
        }
    }
)
/**
 * ElemMatch
 * Obtener documentos a través de atributos dentro de listas
 */

// Obtener todos los usuarios que hayan completado por lo menos un curso
db.users.find(
    {
        courses: {
            $elemMatch:{
                completed:true
            }
        }
    }
).pretty()


// Obtener todos los usuarios con un progreso mayor a 80
db.users.find(
    {
        courses:{
            $elemMatch:{
                progress:{
                    $gte : 80
                } 
            }
        }
    }
).pretty()

/**
 * Proyecciones
 * 
 */

//Obtener el nombre del usuario junto con el titulo de cada uno de sus cursos
db.users.find(
    {
        courses :{$exists:true}
    },
    {
        _id:false, name: true, 'courses.title': true
    }
).pretty()

/**
 * Actualizar elementos de listas de documentos
 */

// Actualizar al 100 porciento uno de los cursos de Fernando (con el indice)
db.users.updateOne(
    {name: 'Fernando'},
    {
        $set:{
            'courses.0.progress':100,
            'courses.0.completed': true
        }
    }
)

// Actualizar al 100 porciento uno de los cursos de Fernando (sin conocer el indice)
db.users.updateOne(
    {  name: 'Fernando',
       'courses.title':'Docker'
    },
    {
        $set:{
            'courses.$.progress':100,
            'courses.$.completed': true
        }
    }
)
// Actualizar al 100 porciento uno de los cursos de Fernando (sin conocer el indice) 
// Y agregar nuevos atributos a la lista de documentos
db.users.updateOne(
    {  name: 'Fernando',
       'courses.title':'Docker'
    },
    {
        $set:{
            'courses.$.progress':100,
            'courses.$.completed': true,
            'courses.$.tutor':{ 'name': 'Cody'}
        }
    }
)

// Actualizar el tutor del curso Docker de Fernando con CodigoFacilito

db.users.updateOne(
    {name: 'Fernando', 'courses.title':'Docker'},
    {
        $set:{
            'courses.$.tutor.name':'Codigo Facilito'
        }
    }
)