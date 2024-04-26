<script>
	import { onMount } from 'svelte';
    import BarChart from '../components/BarChart.svelte'
	import WorldMap from '../components/WorldMap.svelte';
	import CountryList from '../components/CountryList.svelte';
    
    let data = [];
    let width = 0;
    let height = 0;

    onMount(async () => {
      try {
        const locationResponse = await fetch('http://localhost:8080/api/ips/country-count');
        data = await locationResponse.json();
        data.sort((a, b) => b.count - a.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
</script>
<div class="container mt-10 mx-auto">
    <div class="grid grid-cols-8 grid-rows-2 gap-4">
        <div id="world_map" class="bg-gray-200 p-4 col-span-6 row-span-2 overflow-auto">
            <WorldMap></WorldMap>
        </div>
        <div class="flex bg-gray-200 p-4 col-span-2 row-span-1 overflow-y-scroll max-h-[308px]">
            <CountryList {data}></CountryList>
        </div>
        <div class="bg-gray-200 p-4 col-span-2 row-span-1 max-h-[308px]">
            <h2 class="text-xl font-bold mb-2">Grid Item 4</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
    </div>
</div>