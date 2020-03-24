<script lang="ts">
  import Index from "./Index.svelte"
  import Boards from "./Boards.svelte"
  
  import allCourses from "../stores/allCourses"
  import groupBy from "../utils/groupBy.js"

  const course_map = groupBy(allCourses, course =>
    course.possibleModules.map(module => module.name)
  );
</script>

<style>
  /* The sidebar menu */
  aside {
    height: 100%;
    width: 20%;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    overflow-x: hidden;
    padding: 20px;
    background-color: darkgrey;
  }

  .boards {
    width: 80%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: lightgrey;
    padding: 20px;
  }
</style>

<aside>
  <Index courses={allCourses} />
</aside>

<div class="boards">
  <Boards courses={allCourses}/>
</div>