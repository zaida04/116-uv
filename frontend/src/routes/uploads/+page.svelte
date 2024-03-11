<script lang="ts">
    import { onMount } from "svelte";
    import { fetcher } from "../../lib/fetcher";
    import { formatDateTime } from "$lib/date";

    interface Upload {
        id: string;
        user: string;
        content: string;
        created_at: string;
    }

    let uploads: Upload[] | null = null;

    onMount(async () => {
        const response = await fetcher<{ uploads: Upload[] }>(
            "GET",
            `/uploads`,
        );

        if (response.error === false) {
            uploads = response.uploads;
        } else {
            console.error(response);
            alert("Failed to fetch data");
        }
    });
</script>

<div class="flex w-full justify-center my-8">
    <div class="w-3/4">
        <h2 class="mb-2">All Uploads</h2>

        <table class="table table-zebra">
            <thead>
                <tr>
                    <th>UBIT</th>
                    <th>Created At</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {#if uploads}
                    {#each uploads as upload}
                        <tr>
                            <th>{upload.user}</th>
                            <td
                                >{formatDateTime(
                                    new Date(upload.created_at),
                                )}</td
                            >
                            <td>
                                <a
                                    class="link"
                                    href={`/uploads/${upload.user}`}
                                    target="_blank"
                                >
                                    View
                                </a>
                            </td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    </div>
</div>
