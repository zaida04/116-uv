<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { fetcher } from "../../lib/fetcher";
    import Hero from "../../components/Hero.svelte";

    interface Upload {
        id: string;
        user: string;
        content: string;
        created_at: Date | null;
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

<div class="flex w-full justify-center">
    <div class="w-3/4">
        <table class="table table-zebra">
            <thead>
                <tr>
                    <th>UBIT</th>
                    <th>Created At</th>
                    <th>View</th>
                </tr>
            </thead>
            <tbody>
                {#if uploads}
                    {#each uploads as upload}
                        <tr>
                            <th>{upload.user}</th>
                            <td>{upload.created_at}</td>
                            <td>
                                <a href={`/uploads/${upload.user}`}>View </a>
                            </td>
                        </tr>
                    {/each}
                {/if}
            </tbody>
        </table>
    </div>
</div>
