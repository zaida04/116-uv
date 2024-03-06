<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    let submission: { user: string; content: string } | null = null;
    let notFound = false;

    onMount(async () => {
        const response = await fetch(
            `http://localhost:3000/uploads/${$page.params.ubit}`,
        );
        if (response.ok) {
            submission = (await response.json()).submission;
        } else {
            if (response.status === 404) {
                notFound = true;
                return;
            }

            console.error("Failed to fetch data");
        }
    });
</script>

<main>
    {#if notFound}
        <h1>404 Not Found</h1>
    {:else if submission === null}
        <h1>Loading...</h1>
    {:else}
        <h1>{submission.user}</h1>
        <p>{@html submission.content}</p>
    {/if}
</main>
