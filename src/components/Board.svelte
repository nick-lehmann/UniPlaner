<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { get } from 'svelte/store';
  
  import DraggableCourse from "./DraggableCourse.svelte";
  import { DropZone, Draggable } from "../utils/DnD/";
  import { currentlyDraggedCourse } from "../stores/currentlyDragged"
  
  import { Module, Course }  from '../models'

  export let module: Module;

  // Unique id for a dropzone, format: "name_index"
  type DropZoneId = string;
  
  let activeDropZone = undefined;
	const dispatch = createEventDispatcher();

  /**
   *  Move course after is has been dropped on a new board. 
   */
  function onDrop({ detail: { from, to, item: movedCourse } }) {
    // Details of moved item
    const course: Course = movedCourse.props;
    console.log(
      "%cItem dropped",
      "font-weight: 900; text-transform: uppercase"
    );
    console.log(from, " => ", to);
    console.log("Course: ", course);

    // Do nothing if dragged into same module
    if (from === to) return;
    
		dispatch('receivedCourse', {
      course, 
      module: this.module,
      index: dropZoneIndex(to)
    });
  }

  /**
   * Add active class to board that receives new item
   * if move is valid
   */
  function onDragOver(data) {
    const course: Course = get(currentlyDraggedCourse)
    if (this.module.acceptsCoruse(course))
      activeDropZone = dropZoneIndex(data.detail.dropZoneId);
  }

  /**
   * Remove active class from board where item was dragged out
   */
  function onDragOut(data) {
    activeDropZone = undefined;
  }

  function dropZoneID(index: number): DropZoneId {
    const id = index + 1;
    return module.name + "_" + id;
  }

  function dropZoneIndex(id: DropZoneId): number {
    return parseInt(id.split("_")[1]) - 1;
  }
</script>

<style>
  .list-container {
    min-width: 200px;
    padding: 10px;
    margin: 5px;
    margin-right: 20px;
    background-color: #f3f3f3;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  }

  .list-header {
    margin-bottom: 5px;
  }

  :global(.dropzone) {
    /* border: 1px red solid; */
    display: inline-block;
    width: 100%;
    min-height: 10px;
  }
</style>

<div class="list-container">
  <h2 class="list-header">
    {module.name.toUpperCase()}
    {#if module.code}({module.code}){/if}
  </h2>

  <ul>
    <DropZone
      classes={`dropzone${0 == activeDropZone ? ' active' : ''}`}
      on:drop={onDrop}
      on:dragover={onDragOver}
      on:dragout={onDragOut}
      id={dropZoneID(0)} />

    {#if module.courses}
    {#each module.courses as course, index}
      <li>
        <DraggableCourse {course}/>
        <DropZone
          classes={`dropzone${index + 1 == activeDropZone ? ' active' : ''}`}
          on:drop={onDrop}
          on:dragover={onDragOver}
          on:dragout={onDragOut}
          id={dropZoneID(index + 1)} />
      </li>
    {/each}
    {/if}
  </ul>
</div>
