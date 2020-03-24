<script>
  import Draggable from "../utils/DnD/Draggable.svelte";
  import Course from "./Course.svelte";

  import { currentlyDraggedCourse } from "../stores/currentlyDragged"

  export let course;

  console.log(course)

  const props = {
    course: course
  }

  function dragStart(event) {
    currentlyDraggedCourse.set(course)
  }
</script>

<Draggable component={Course} props={props} on:dragStart={dragStart}/>