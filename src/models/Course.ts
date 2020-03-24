import Module from "./Module"

export default class Course {
    name: string
    hours: number[]    
    teachers: string[]    
    institute: string
    code: string
    exam: string
    master: boolean
    possibleModules: Module[]

    constructor({
        name, hours, teachers, institute,
        code, exam, master, possibleModules = []
    }) {
        this.name = name
        this.hours = hours,
        this.teachers = teachers
        this.institute = institute
        this.code = code ? code : ""
        this.exam = exam
        this.master = master
        this.possibleModules = possibleModules
    }
}