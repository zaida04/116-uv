<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { fetcher } from "../../../lib/fetcher";
    import Hero from "../../../components/Hero.svelte";
    import { formatDateTime } from "$lib/date";

    interface Upload {
        user: string;
        content: string;
        created_at: string;
    }

    let upload: Upload | null = null;
    let notFound = false;

    onMount(async () => {
        const response = await fetcher<{ upload: Upload }>(
            "GET",
            `/uploads/requests/${$page.params.id}`,
        );

        if (response.error === false) {
            upload = response.upload;
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
    </Hero>
{:else if upload === null}
    <Hero>
        <span class="loading loading-spinner text-warning"></span>
    </Hero>
{:else}
    <div class="px-8 py-6">
        <a href="/" class="btn btn-sm btn-neutral mb-2">go back</a>

        <h1 class="mb-1">
            Output for <code>{upload.user}</code>
        </h1>
        <p class="text-sm mb-4">
            Uploaded at {formatDateTime(new Date(upload.created_at))}
        </p>

        <textarea
            class="textarea textarea-bordered px-8 py-4 w-full h-[80vh] font-mono"
            readonly
            value={upload.content}
        />
    </div>
{/if}
