const express = require('express');
const fs = require('fs');
const app = express();

const port = 3000;

app.use(express.json());

app.get('/alumnos', (req, res) => {
    const alumnos = JSON.parse(fs.readFileSync('./data/alumnos.json'));
    res.json(alumnos);
});

app.post('/alumnos', (req, res) => {
    const nuevoAlumno = req.body;
    let alumnos = JSON.parse(fs.readFileSync('./data/alumnos.json'));
    
    nuevoAlumno.id = alumnos.length ? alumnos[alumnos.length - 1].id + 1 : 1;
    
    alumnos.push(nuevoAlumno);

    fs.writeFileSync('./data/alumnos.json', JSON.stringify(alumnos, null, 2));
    res.send('Alumno agregado exitosamente');
});

app.put('/alumnos', (req, res) => {
    const data = req.body;
    let alumnos = JSON.parse(fs.readFileSync('./data/alumnos.json'));
    
    const index = alumnos.findIndex(alumno => alumno.id === data.id);
    if (index !== -1) {
        alumnos.push(data)

        fs.writeFileSync('./data/alumnos.json', JSON.stringify(alumnos, null, 2));
        res.send('Alumno actualizado exitosamente');
    } else {
        res.status(404).send('Alumno no encontrado');
    }
});

app.patch('/alumnos/:dni', (req, res) => {
    const dni = parseInt(req.params.dni);
    let alumnos = JSON.parse(fs.readFileSync('./data/alumnos.json'));

    const index = alumnos.findIndex(alumno => alumno.dni === dni);
    if (index !== -1) {
        alumnos[index] = { ...alumnos[index], ...req.body }; // Actualiza solo las propiedades enviadas
        fs.writeFileSync('./data/alumnos.json', JSON.stringify(alumnos, null, 2));
        res.send('Alumno actualizado parcialmente');
    } else {
        res.status(404).send('Alumno no encontrado');
    }
});

app.delete('/alumnos/:dni', (req, res) => { 
    const dni = parseInt(req.params.dni);
    let alumnos = JSON.parse(fs.readFileSync('./data/alumnos.json'));

    const index = alumnos.findIndex(alumno => alumno.dni === dni);

    if (index !== -1) {
        const alumno = alumnos[index];

        if (alumno.enabled) {
            alumno.enabled = false;
            res.send('Alumno deshabilitado exitosamente');
        } else {
            alumno.enabled = true;
            res.send('Alumno habilitado exitosamente');
        }

        // Guardar cambios en el archivo
        fs.writeFileSync('./data/alumnos.json', JSON.stringify(alumnos, null, 2));
    } else {
        res.status(404).send('Alumno no encontrado');
    }
});

app.get('/profesores', (req, res) => {
    const profesores = JSON.parse(fs.readFileSync('./data/profesores.json'));
    res.json(profesores);
});

app.post('/profesores', (req, res) => {
    const nuevoProfesor = req.body;
    let profesores = JSON.parse(fs.readFileSync('./data/profesores.json'));
    
    nuevoProfesor.id = profesores.length ? profesores[profesores.length - 1].id + 1 : 1;

    profesores.push(nuevoProfesor);

    fs.writeFileSync('./data/profesores.json', JSON.stringify(profesores, null, 2));
    res.send('Profesor agregado exitosamente');
});

app.put('/profesores', (req, res) => {
    const data = req.body;
    let profesores = JSON.parse(fs.readFileSync('./data/profesores.json'));
    
    const index = profesores.findIndex(profesor => profesor.id === data.id);
    if (index !== -1) {
        profesores.push(data)

        fs.writeFileSync('./data/profesores.json', JSON.stringify(profesores, null, 2));
        res.send('Profesor actualizado exitosamente');
    } else {
        res.status(404).send('Profesor no encontrado');
    }
});

app.patch('/profesores/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let profesores = JSON.parse(fs.readFileSync('./data/profesores.json'));

    const index = profesores.findIndex(profesor => profesor.id === id);
    if (index !== -1) {
        profesores[index] = { ...profesores[index], ...req.body };
        fs.writeFileSync('./data/profesores.json', JSON.stringify(profesores, null, 2));
        res.send('Profesor actualizado parcialmente');
    } else {
        res.status(404).send('Profesor no encontrado');
    }
});

app.delete('/profesores/:id', (req, res) => { 
    const id = parseInt(req.params.id);
    let profesores = JSON.parse(fs.readFileSync('./data/profesores.json'));

    const index = profesores.findIndex(profesor => profesor.id === id);

    if (index !== -1) {
        const profesor = profesores[index];

        if (profesor.enabled) {
            profesor.enabled = false;
            res.send('Profesor deshabilitado exitosamente');
        } else {
            profesor.enabled = true;
            res.send('Profesor habilitado exitosamente');
        }

        // Guardar cambios en el archivo
        fs.writeFileSync('./data/profesores.json', JSON.stringify(profesores, null, 2));
    } else {
        res.status(404).send('Profesor no encontrado');
    }
});

app.get('/materias', (req, res) => {
    const materias = JSON.parse(fs.readFileSync('./data/materias.json'));
    res.json(materias);
});

app.post('/materias', (req, res) => {
    const nuevaMateria = req.body;
    let materias = JSON.parse(fs.readFileSync('./data/materias.json'));
    
    nuevaMateria.id = materias.length ? materias[materias.length - 1].id + 1 : 1;

    materias.push(nuevaMateria);

    fs.writeFileSync('./data/materias.json', JSON.stringify(materias, null, 2));
    res.send('Materia agregada exitosamente');
});

app.put('/materias', (req, res) => {
    const data = req.body;
    let materias = JSON.parse(fs.readFileSync('./data/materias.json'));
    
    const index = materias.findIndex(materia => materia.id === data.id);
    if (index !== -1) {
        materias.push(data)

        fs.writeFileSync('./data/materias.json', JSON.stringify(materias, null, 2));
        res.send('Materia actualizado exitosamente');
    } else {
        res.status(404).send('Materia no encontrado');
    }
});

app.patch('/materias/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let materias = JSON.parse(fs.readFileSync('./data/materias.json'));

    const index = materias.findIndex(materia => materia.id === id);
    if (index !== -1) {
        materias[index] = { ...materias[index], ...req.body };
        fs.writeFileSync('./data/materias.json', JSON.stringify(materias, null, 2));
        res.send('Materia actualizada parcialmente');
    } else {
        res.status(404).send('Materia no encontrada');
    }
});

app.delete('/materias/:id', (req, res) => { 
    const id = parseInt(req.params.id);
    let materias = JSON.parse(fs.readFileSync('./data/materias.json'));

    const index = materias.findIndex(materia => materia.id === id);

    if (index !== -1) {
        const materia = materias[index];

        if (materia.enabled) {
            materia.enabled = false;
            res.send('Materia deshabilitada exitosamente');
        } else {
            materia.enabled = true;
            res.send('Materia habilitado exitosamente');
        }

        // Guardar cambios en el archivo
        fs.writeFileSync('./data/alumnos.json', JSON.stringify(alumnos, null, 2));
    } else {
        res.status(404).send('Alumno no encontrado');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});