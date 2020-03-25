<script lang="ts">
  import Board from "./Board.svelte";
  import Course from "./Course.svelte";
  import { Context } from "../utils/DnD/";
  import { UniPlaner, Module, Course as CourseModel } from "../models";
  import { boardsStore } from "../stores/"

  export let courses;

  let planer = new UniPlaner(courses)
  window.planer = planer

  const initialBoards = Object.fromEntries(planer.modules.map(module => [module.name, module]))
  boardsStore.set(initialBoards)
  console.log($boardsStore)

  function courseMoved (event) {
    const receivingModule: Module = event.detail.module
    const movedCourse = event.detail.course
    planer.moveCourse(movedCourse, receivingModule)
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