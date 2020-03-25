<script lang="ts">
  import Sidebar from "./Sidebar.svelte"
  import Boards from "./Boards.svelte"
  
  import { allCourses, boardsStore } from "../stores/"
  
  const unsubscribe = boardsStore.subscribe(boards => {
    console.log(boards);
    window.boards = boards
  })
</script>

<style>
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
  <Sidebar courses={allCourses} />
</aside>

<div class="boards">
  <Boards courses={allCourses}/>
</div>