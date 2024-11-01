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


