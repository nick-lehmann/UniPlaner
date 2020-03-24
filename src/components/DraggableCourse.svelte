<script>
  import Draggable from "../utils/DnD/Draggable.svelte";
  import Course from "./Course.svelte";

  import { currentlyDraggedCourse } from "../stores/currentlyDragged"

  export let course;

  function dragStart(event) {
    console.log("Drag started")
    currentlyDraggedCourse.set(event.detail.props)
  }
</script>

<Draggable component={Course} props={course} on:dragStart={dragStart}/>