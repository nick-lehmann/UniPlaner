import Course from "./Course"

export default class Module {
    name: string
    code: string
    level: number

    courses: Course[]

    constructor({name, code, level, courses = []}) {
        this.name = name
        this.code = code
        this.level = level
        this.courses = courses
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
        this.courses = [...this.courses, course]
    }

    removeCourse(course: Course) {
        const index = this.courses.indexOf(course)
        this.courses.splice(index, 1)
    }
    
    containsCourse(course: Course): boolean {
        return this.courses.findIndex(c => c.name == course.name) > -1
    }

    /**
     * Returns the cumulative hours of work from the currently
     * selected courses.
     */
    currentHours(): number[] {
        const sum = [0,0,0]
        for (const course of this.courses) {
            sum[0] += course.hours[0]
            sum[1] += course.hours[1]
            sum[2] += course.hours[2]
        }
        return sum
    }
}