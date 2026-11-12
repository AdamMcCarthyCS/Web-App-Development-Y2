<script>
  // svelte-ignore non_reactive_update
  let todoText = "";
  // @ts-ignore
  let todoItems = $state([]);

  function addTodo() {
    console.log(todoText)
    todoItems.push(todoText);
  }
</script>

<!--Header-->

<div class="container">
  <div class="box has-text-centered">
    <div class="title">Simple Todo List</div>
    <div class="subtitle">Fun things to do</div>
  </div>
</div>

<!--Form-->

<div class="section box">
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label for="todo" class="label">What should I do</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input 
            bind:value={todoText}
            type="text" 
            class="input" 
            id="todo" 
            placeholder="type something...">
        </p>
      </div>
      <button onclick={() => addTodo()} class="button">Add todo</button>
    </div>
  </div>
</div>

<!-- Table of todos -->
 <div class="section box">
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Task</th>
      </tr>
    </thead>
    <tbody>
      {#each todoItems as todo}
        <tr>
          <td>{todo}</td>
        </tr>
      {/each}
    </tbody>
  </table>
 </div>