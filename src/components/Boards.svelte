<script lang="ts">
  import Board from "./Board.svelte";
  import Course from "./Course.svelte";

  import { Context } from "../utils/DnD/";
  import { UniPlaner } from "../models";

  export let courses;

  let planer = new UniPlaner(courses)

  function courseMoved (event) {
    console.log("Course moved!")
    console.log(event.detail.course)
    // const moduleIndex = moduleIndexByName(event.detail.module) 
    // const newModules = [...modules]

    // // Remove from old module
    // for (const module of newModules)
    //   module.courses = module.courses.filter(course => course.name != event.detail.course.name)
      
    // // Add to new module
    // newModules[moduleIndex].courses.splice(event.detail.index, 0, event.detail.course)
    // modules = newModules
  }
</script>

<style>
  .board-list {
    justify-content: start;
    display: flex;
    align-items: flex-start;
    overflow: auto;
    height: 100%;
  }
  :global(.active) {
    background: #777;
  }
</style>

<div class="board-list">
<Context>
  {#each planer.modules as module}
    <Board bind:module on:receivedCourse={courseMoved}/>
  {/each}
</Context>
</div>