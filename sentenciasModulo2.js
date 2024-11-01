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
