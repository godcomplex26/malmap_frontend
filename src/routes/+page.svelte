<script>
	import { onMount } from 'svelte';
    import BarChart from '../components/BarChart.svelte'
	import WorldMap from '../components/WorldMap.svelte';
	import CountryList from '../components/CountryList.svelte';
    
    let data = [];

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
<CountryList {data}></CountryList>
<WorldMap></WorldMap>
