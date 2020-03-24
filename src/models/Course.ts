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
}