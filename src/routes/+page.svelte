<script>
    import { onMount } from 'svelte';
    import BarChart from '../components/BarChart.svelte';
    import WorldMap from '../components/WorldMap.svelte';
    import CountryList from '../components/CountryList.svelte';
    import PieChart from '../components/PieChart.svelte';
    import BarChart2 from '../components/BarChart2.svelte';
  
    let data = [];
    let top5 = [];
    let width = 0;
    let height = 0;
    let activeChart = 0;
  
    onMount(async () => {
      try {
        const locationResponse = await fetch('http://localhost:8080/api/ips/country-count');
        data = await locationResponse.json();
        data.sort((a, b) => b.count - a.count);
        top5 = data.slice(0, Math.min(5, data.length));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
  
    function nextChart() {
      activeChart = (activeChart + 1) % 3;
    }
  
    function prevChart() {
      activeChart = (activeChart - 1 + 3) % 3;
    }
  </script>
  
  <div class="container mt-10 mx-auto">
    <div class="grid grid-cols-8 grid-rows-2 gap-4">
      <div id="world_map" class="bg-gray-200 p-4 col-span-6 row-span-2 overflow-auto">
        <WorldMap></WorldMap>
      </div>
      <div class="flex bg-gray-200 p-4 col-span-2 row-span-1 overflow-y-scroll max-h-[308px]">
        <CountryList {data}></CountryList>
      </div>
      <div class="flex items-center bg-gray-200 p-4 col-span-2 row-span-1 max-h-[308px] relative">
        {#if activeChart === 0}
            <BarChart data={top5}></BarChart>
        {:else if activeChart === 1}
            <BarChart2 data={top5}></BarChart2>
        {:else if activeChart === 2}
            <PieChart data={top5}></PieChart>
        {/if}
        <button class="absolute left-0 top-1/2 transform -translate-y-1/2" on:click={prevChart}>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
            </svg>
        </button>
        <button class="absolute right-0 top-1/2 transform -translate-y-1/2" on:click={nextChart}>
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
            </svg>
        </button>
      </div>
    </div>
  </div>