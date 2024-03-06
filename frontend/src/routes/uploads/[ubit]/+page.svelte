<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { fetcher } from "../../../lib/fetcher";

    interface Submission {
        user: string;
        content: string;
    }

    let submission: Submission | null = null;
    let notFound = false;

    onMount(async () => {
        const response = await fetcher<{ submission: Submission }>(
            "GET",
            `/uploads/${$page.params.ubit}`,
        );

        if (response.error === false) {
            submission = response.submission;
        } else {
            if (response.error === "No uploads found") {
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
