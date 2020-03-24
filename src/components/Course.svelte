<script lang="ts">
  export let name = "";
  export let modules = [];
  export let hours = [];
  export let teachers = [];
  // export let institute = "";
  // export let code = "";
  // export let exam = "";
  // export let master = undefined;
</script>

<style>
  .course { 
    padding: 10px;
    user-select: none;
    border-radius: 5px;
  }

  h3 {
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 900;
    word-break: break-word;
  }

  .module {
    display: inline-block;
    background-color: #ccc;
    padding: 3px;
    border-radius: 5px;
    margin-right: 5px;
    font-size: 10px;
  }
</style>

<div class="card course">
  <h3>{name}</h3>
  <span>{hours.join('/')} - {teachers.join(', ')}</span>

  <ul>
    {#each modules as module}
      <li class="module">{module.name}</li>
    {/each}
  </ul>
</div>
