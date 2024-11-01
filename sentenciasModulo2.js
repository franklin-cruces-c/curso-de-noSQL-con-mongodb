/**
 * Listas
 */

//Agregar lista de cursos tomados en la plataforma a Eduardo y Rafael
db.users.updateOne(
    {name: 'Eduardo'},
    {
        $set:{
            courses: ['Python', 'MongoDB', 'SQL', 'Java']
        }
    }

)

db.users.updateOne(
    {name: 'Rafael'},
    {
        $set:{
            courses: ['Git', 'Escritura para programadores', 'Redes']
        }
    }

)

//Obtener los usuarios que posean los cursos Python, MongoDB, SQL, y Java
db.users.findOne(
    {
        courses: ['Python', 'MongoDB', 'SQL', 'Java']
    }
)
//Bucar con el operador equals
db.users.findOne(
    {
        courses: { $eq: ['Python', 'MongoDB', 'SQL', 'Java']}
    }
)
// Tanto para busqueda con o sin equals, la lista debe ser exactamente igual y en el mismo orden

/**
 * Operador $all
 * El orden no importa pero si que existan todos los valores del citerio de busqueda
 */

//Obtener todos los usuarios que posean por curso MongoDB
db.users.find(
    {
        courses:{
            $all:['MongoDB']
        }
    }
).pretty()

//Obtener todos los usuarios que posean por curso SQL y MongoDB
db.users.find(
    {
        courses:{
            $all:['SQL','MongoDB']
        }
    }
).pretty()

//Obtener todos los usuarios que posean por curso SQL o Git
db.users.find(
    {
        $or:[
              {courses : 'SQL'},
              {courses : 'Git'} 
            ]
    }
).pretty()

// Obtener todos los usuarios que posean por curso SQL (los cursos estan en una lista dentro de cada documento usuario)
db.users.find(
    {courses: 'SQL'}
).pretty()

// Agregar atributo calificaciones a los usuarios Fernando y Uriel

db.users.updateOne(
    {name: 'Fernando'},
    {
        $set: {
            scores: [9,8,9,5,10]
        }
    }
)

db.users.updateOne(
    {name: 'Uriel'},
    {
        $set: {
            scores: [10,9,9,8,10]
        }
    }
)

// Obtener todos los usuarios que posean por lo menos una calificación de 10.
db.users.find(
    {scores: 10}
).pretty()

// Obtener todos los usuarios que hayan reprobado por lo menos una calficación.
db.users.find(
    {
        scores:{
            $lt:6
        }
    }
).pretty()

/**
 * Insertar elementos en listas
 * operador $push
 */

// agregar cursos a Rafael y Eduardo

// agregar curso de Python a Rafael
db.users.updateOne(
    {name: 'Rafael'},
    { 
        $push:{
            courses: 'Python'
        }
    }
)
//agregar mas de un curso con $each y $push
//agregar 3 cursos a Eduardo

db.users.updateOne(
    {name: 'Eduardo'},
    { 
        $push:{
            courses:{
                $each:['Django','Rails','Rust']
            }
        }
    }
)

/**
 * Agregar elementos en una posicion determinada de la lista
 * Operador $position
 */

//Agregar curso de Base de datos a Rafael en la posicion 0 de la lista
db.users.updateOne(
    {name: 'Rafael'},
    {
        $push:{
            courses:{
                $each:['Base de datos'],
                $position: 0
            }
        }
    }
)

//Agregar curso de Javascript a Rafael en la posicion 1 de la lista
db.users.updateOne(
    {name: 'Rafael'},
    {
        $push:{
            courses:{
                $each:['Javascript'],
                $position: 1
            }
        }
    }
)

//Agregar curso de C# y Apache Camel a Rafael en la posicion 1 de la lista
db.users.updateOne(
    {name: 'Rafael'},
    {
        $push:{
            courses:{
                $each:['C#','Apache Camel'],
                $position: 1
            }
        }
    }
)

/**
 * Ordenar elementos de las listas
 * operador $sort
 */

//se agregar algunos elementos a la lista de calificaciones de Fernando y establece que se ordene en forma ascendente
db.users.updateOne(
    {
        name: 'Fernando'
    },
    {
        $push:{
            scores:{
                $each:[10,10],
                $sort: 1
            }
        }
    }
)

//se agregar algunos elementos a la lista de calificaciones de Uriel 
//y establece que se ordene en forma descendente
db.users.updateOne(
    {
        name: 'Uriel'
    },
    {
        $push:{
            scores:{
                $each:[7,7],
                $sort: -1
            }
        }
    }
)

/**
 * Eliminar elementos de las listas
 * operador pull
 */

// Eliminar curso de Python en las listas de Rafael y Eduardo

db.users.updateMany(
    {name: {$in:['Rafael','Eduardo']}},
    {
        $pull:{
            courses:'Python'
        }
    }
)
//{ "acknowledged" : true, "matchedCount" : 2, "modifiedCount" : 2 }

// Eliminar varios elementos de la lista
db.users.updateMany(
    {name: 'Rafael'},
    {
        $pull:{
            courses:{$in:['Base de datos','C#']}
        }
    }
)

/**
 * Actualizar un elemento de una lista  por indice 
 * 
 */

// Actualizar una calificacion por indice
// Primera calificacion (indice 0) cambiar el valor a 5 
// para todos los documentos qu tengan una lista de calificaciones
db.users.updateMany(
    {
        scores: { $exists: true}
    },
    {
        $set:{
            'scores.0': 5  //0 es el indice para este caso el primer elemento de la lista
        }
    }
)

// Actualizar cuando no se conoce el indice
// Como no se la posicion voy a actualizar con 6 donde encuentre la primera coincidencia con valor 9
db.users.updateMany(
    {
        scores: {$exists: true},
        scores: 9
        },
    {
        $set:{
            'scores.$': 6
        }
    }
)
/**
 * Obtener elementos
 * Operador $slice -> $position o $index
 */
// Por posicion
db.users.find(
    {
        name: 'Eduardo'
    },
    {
        _id: false, name: true, 
        courses: {
            $slice: 1 // int (Position) o [index]
        }
    }
).pretty()
// Por indice
db.users.find(
    {
        name: 'Eduardo'
    },
    {
        _id: false, name: true, 
        courses: {
            $slice: [0,3] // int (Position) o [index]
        }
    }
).pretty()