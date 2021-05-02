export class Todo {
    
    static parse( { tarea, id, completado, creado } ) {
        return new Todo( tarea, id, completado, creado )
    }

    tarea;
    id;
    completado;
    creado;

    constructor( tarea , id = new Date().getTime(), completado = false, creado = new Date()){

        this.tarea = tarea
        this.id = id
        this.completado = completado
        this.creado = creado

    }

}