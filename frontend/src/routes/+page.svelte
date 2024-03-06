<script lang="ts">
    import Hero from "../components/Hero.svelte";

    let ubit: string = "";
</script>

<Hero>
    <h1 class="mb-4">116 Autolab Compilation Viewer</h1>

    <input
        type="text"
        placeholder="Type UBIT here"
        class="input w-full max-w-xs mr-2"
        bind:value={ubit}
        on:keypress={(e) => {
            if (e.key === "Enter") {
                window.location.href = `/uploads/${ubit}`;
            }
        }}
    />
    <a href={`/uploads/${ubit}`} class="btn btn-primary">Lookup</a>
</Hero>
