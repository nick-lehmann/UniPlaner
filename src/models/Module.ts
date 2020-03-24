import Course from "./Course"

export default class Module {
    name: string
    code: string
    level: number

    courses: Course[]

    constructor() {
        this.courses = []
    }
    
    /**
     * Checks if the given course can be added in this board.
     *  
     * @param course Course that should be added
     */
    acceptsCourse(course: Course): boolean {
        return course.possibleModules.findIndex(module => module.name == this.name) >= 0
    }

    addCourse(course: Course) {
        this.courses.push(course)
    }

    removeCourse(course: Course) {
        const index = this.courses.indexOf(course)
        this.courses.splice(index, 1)
    }
    
    containsCourse(course: Course): boolean {
        return false
    }
}