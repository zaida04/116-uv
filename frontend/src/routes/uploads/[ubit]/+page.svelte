<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { fetcher } from "../../../lib/fetcher";
    import Hero from "../../../components/Hero.svelte";

    let exists: boolean | null = null;
    let notFound = false;
    let ubit: string = "";
    let createRequestSuccess: boolean | null = null;

    onMount(async () => {
        const response = await fetcher<{ error: false | string }>(
            "GET",
            `/uploads/${$page.params.ubit}`,
        );

        if (response.error === false) {
            exists = true;
        } else {
            if (response.error === "No uploads found") {
                notFound = true;
                return;
            }

            console.error(response);
            alert("Failed to fetch data");
        }
    });

    async function submitRequest() {
        if (ubit === "") {
            alert("Please enter your UBIT");
            return;
        }

        const data = await fetcher<{}>(
            "POST",
            `/uploads/${$page.params.ubit}/request`,
            {
                body: { requested_by: ubit },
            },
        );

        if (data.error === false) {
            createRequestSuccess = true;
            return;
        }

        if (data.error === "You are not authorized to request this upload") {
            alert("You are NOT a TA.");
            return;
        }

        alert("Failed to send email. Contact Zaid.");
        console.error(data);
    }
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
{:else if createRequestSuccess === true}
    <Hero>
        <h1 class="mb-2">Request Sent</h1>
        <p class="mb-8">An email has been sent to YOU with the output link.</p>
        <p>You can close this tab now.</p>
    </Hero>
{:else if exists === null}
    <Hero>
        <span class="loading loading-spinner text-warning"></span>
    </Hero>
{:else}
    <Hero>
        <h1 class="mb-4 text-5xl">Upload found!</h1>
        <p class="mb-1">You must be a TA to view this output.</p>
        <p class="mb-1">
            For security purposes, you need to input YOUR TA UBIT.
        </p>
        <p class="mb-3">You will then be emailed a link to view the output.</p>
        <input
            type="text"
            placeholder="Type your TA UBIT here"
            class="input w-full max-w-xs mb-2"
            bind:value={ubit}
            on:keypress={(e) => {
                if (e.key === "Enter") {
                    submitRequest();
                }
            }}
        />
        <button class="btn btn-primary btn-md" on:click={() => submitRequest()}
            >Submit</button
        >
    </Hero>
{/if}
