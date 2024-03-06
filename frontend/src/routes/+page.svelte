<script lang="ts">
    let ubit: string = "";
</script>

<div class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-5xl font-bold mb-4">
                116 Autolab Compilation Viewer
            </h1>

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
        </div>
    </div>
</div>
