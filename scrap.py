import json
import requests
from copy import deepcopy
from bs4 import BeautifulSoup
from dataclasses import dataclass, asdict
from typing import List

content = requests.get('https://wwwdek.inf.tu-dresden.de/lehre/sose/20/studiengang/studiengang_inf_bach.html').content.decode()
document = BeautifulSoup(content, 'html.parser')

structure = [e for e in document.recursiveChildGenerator() if e.name in ['h1', 'h2', 'h3', 'table']][2:-1]


@dataclass
class Module:
    name: str
    code: str = ''

    # HTML heading
    level: int = 0

@dataclass
class Course:
    # Title of course
    name: str
    # Amount of time; [lecture, exercise, practical]
    hours: List[int]
    # Name of tutors/teachers
    teachers: List[str]
    # Three letter code
    institute: str
    # Unique code for course; only mandatory
    code: str = ''
    # Verbal description of type of examination, only obligatory
    exam: str = ''
    # Master level, only obligatory
    master: bool = False
    # Modules
    modules: List[Module] = None


def parse_hours(hours: str) -> List[int]:
    """ '2/2/0' => [2,2,0] """
    return [int(time) for time in hours.split('/')]

def parse_teachers(teachers: str) -> List[str]:
    return teachers.split(', ')

def parse_table(table):
    courses =[]
    rows = table.find_all('tr')

    # Skip headers
    rows = rows[1:]

    for index, row in enumerate(rows):
        cells_content = [td.text.strip() for td in row.find_all('td')]
        if not cells_content:
            continue
        
        if len(cells_content) is 6:
            # Name, Code, Hours, Language, Teachers, Institute
            name, code, hours, _, teachers, institute = cells_content
            courses.append(Course(
                name=name, 
                code=code,
                hours=parse_hours(hours),
                teachers=parse_teachers(teachers),
                institute=institute,
            ))
        else:
            # Name, Hours, Language, Teachers, Institute, Exam, Master
            name, hours, _, teachers, institute, exam, master = cells_content
            courses.append(Course(
                name=name, 
                hours=parse_hours(hours),
                teachers=parse_teachers(teachers),
                institute=institute,
                exam=exam,
                master=True if master == "ja" else False
            ))
        
    return courses



def create_module(tag: str, text: str) -> Module:
    level = int(tag[1])
    if text.startswith('INF'):
        # Module
        code, name = text.split(' ', 1)
        return Module(name=name, code=code, level=level)
    else:
        # Semester
        return Module(name=text, level=level)


module_path = []
all_courses = []

for element in structure:
    tag = element.name

    if tag.startswith('h'):
        # Adapt current module path
        text = element.text.strip()

        module = create_module(tag, text)
        
        if not module_path:
            module_path = [module]
        else:
            if module.level > module_path[-1].level:
                module_path.append(module)
            elif module.level == module_path[-1].level:
                module_path[-1] = module
            else:
                module_path = [module]
        
        print(f'Level {module.level}: {module_path}')
    
    if tag == 'table':
        module = module_path[1] if len(module_path) > 1 else module_path[0]
        courses = parse_table(element)
        for course in courses:
            course.modules = deepcopy(module_path)
        all_courses += courses

with open('output.json', 'w') as file:
    json.dump([asdict(course) for course in all_courses], file, indent=4, ensure_ascii=False)
