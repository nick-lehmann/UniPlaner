import Course from './Course'
import Module from './Module'

export default class UniPlaner {
    courses: Course[]
    modules: Module[]

    constructor(courses: Course[]) {
        this.courses = courses
        this.modules = uniqueModules(courses)
        
        console.log(`Found ${this.modules.length} modules`)
    }

    /**
     * Moves a course to a new module if the move is valid.
     * 
     * @param course 
     * @param to 
     */
    moveCourse(course: Course, to: Module) {
        if (!to.acceptsCourse(course)) return
        to.addCourse(course)
        this.moduleByCourse(course).removeCourse(course)
    }

    /**
     * Return the module that currently contains the given course. 
     * 
     * @param course 
     */
    moduleByCourse(course: Course): Module | null {
        for (const module of this.modules)
            if (module.courses.indexOf(course) >= 0)
                return module
        return null
    }
}


/**
 * Returns a set of unique module names from the
 * given courses.
 * 
 * @param {Array} courses 
 */
function uniqueModules(courses: Course[]): Module[] {
    const moduleNames = [], modules = [];
    for (const course of courses)
        for (const module of course.possibleModules) {
            if (moduleNames.indexOf(module.name) != -1) continue
            moduleNames.push(module.name);
            modules.push(module)
        }
    return modules
}