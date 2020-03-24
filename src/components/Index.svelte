<script>
  import Search from "./Search.svelte";
  import DraggableCourse from "./DraggableCourse.svelte";

  export let courses = [];
  let search = "";

  $: filtered = courses.filter(course =>
    course.name.toLowerCase().includes(search)
  );
</script>

<style>
  ul {
    list-style: none
  }
  li {
    padding-top: 15px
  }
</style>

<Search bind:search />
<ul>
  {#each filtered as course}
    <li>
      <DraggableCourse {course} />
    </li>
  {/each}
</ul>
