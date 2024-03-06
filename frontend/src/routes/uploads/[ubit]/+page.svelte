<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { fetcher } from "../../../lib/fetcher";
    import Hero from "../../../components/Hero.svelte";

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

            console.error(response);
            alert("Failed to fetch data");
        }
    });
</script>

{#if notFound}
    <Hero>
        <h1 class="mb-2">404 Not Found</h1>
        <p class="mb-8">
            No autolab upload for UBIT <code>{$page.params.ubit}</code>
        </p>
        <p>
            Make this student
            <b>has submitted at least once since 3-6-2024.</b>
        </p>
    </Hero>
{:else if submission === null}
    <h1>Loading...</h1>
{:else}
    <h1>{submission.user}</h1>
    <p>{@html submission.content}</p>
{/if}
