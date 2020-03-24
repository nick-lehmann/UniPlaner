<ul>
  {#each Array.from(course_map.keys()) as module_name}
    <li>{module_name}: {course_map.get(module_name).length}</li>
  {/each}
</ul>
