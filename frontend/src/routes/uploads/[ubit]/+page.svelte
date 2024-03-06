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
    <Hero>
        <span class="loading loading-spinner text-warning"></span>
    </Hero>
{:else}
    <div class="px-8 py-6">
        <h1 class="mb-4">
            Output for <code>{submission.user}</code>
        </h1>
        <textarea
            class="textarea textarea-bordered px-8 py-4 w-full h-[80vh] font-mono"
            value={submission.content}
        />
    </div>
{/if}
