<script>
    import { onMount } from 'svelte';
    import BarChart from '../components/BarChart.svelte';
    import WorldMap from '../components/WorldMap.svelte';
    import CountryList from '../components/CountryList.svelte';
    import PieChart from '../components/PieChart.svelte';
    import BarChart2 from '../components/BarChart2.svelte';
  
    let data = [];
    let c_list = [];
    let show_list = [];
    let top5 = [];
    let map_width;
    let map_height;
    let activeChart = 0;
    let w = 0;
    let h = 0;
    let code="";
    let inputValue = '';
  
    onMount(async () => {
      try {
        const locationResponse = await fetch('http://localhost:8080/api/ips/country-count-gps');
        data = await locationResponse.json();
        data.sort((a, b) => b.count - a.count);
        c_list = JSON.parse(JSON.stringify(data));
        show_list = JSON.parse(JSON.stringify(data));
        top5 = data.slice(0, Math.min(5, data.length));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    /**
	 * @param {any[]} data
	 */
    function getTop5(data) {
        top5 = data.slice(0, Math.min(5, data.length));
    }

    $: top5 = show_list.slice(0, Math.min(5, data.length));
  
    function nextChart() {
      activeChart = (activeChart + 1) % 3;
    }
  
    function prevChart() {
      activeChart = (activeChart - 1 + 3) % 3;
    }

    function handleKeyboardInput(event) {
        inputValue = event.target.value;
        const filteredData = data.filter(item => item.country_code.toLowerCase().includes(inputValue.toLowerCase()));
        c_list = filteredData; // 새로운 배열을 할당
    }

    function handleCheckBoxInput(event) {
        inputValue = event.target.id;
    }

    // function handleKeyboardInput(event) {
    //     inputValue = event.target.value;
    //     const filteredData = data.filter(item => item.country_code.toLowerCase().includes(inputValue.toLowerCase()));
    //     const filteredJson = JSON.stringify(filteredData);
    //     console.log(`입력된 키: ${filteredJson}`);
    //     c_list = filteredJson;

    //     // 입력된 키 값 가져오기
    //     // const key = event.key;

    //     // // 입력된 키에 따라 동작 수행
    //     // switch (key) {
    //     //     case 'Enter':
    //     //         // 엔터 키 입력 시 동작
    //     //         console.log('엔터 키가 입력되었습니다.');
    //     //         break;
    //     //     case 'Escape':
    //     //         // ESC 키 입력 시 동작
    //     //         console.log('ESC 키가 입력되었습니다.');
    //     //         break;
    //     //     default:
    //     //         // 그 외의 키 입력 시 동작
                
    //     //         console.log(`입력된 키: ${code}`);
    //     //         break;
    //     // }
    // }
  </script>
  
  <div class="container mt-10 mx-auto">
    <div class="grid grid-cols-8 grid-rows-12 gap-4 min-w-[1072px]">
        <div class="p-4 bg-gray-200 flex col-span-6 row-span-12 min-w-[764px]">
            <div id="world_map" class="flex-1 h-[600px] max-h-[600px] overflow-hidden" bind:clientWidth={map_width} bind:clientHeight={map_height}>
                <WorldMap locationData={show_list} bind:width={map_width} bind:height={map_height}></WorldMap>
            </div>
        </div>
      <div class="flex-cols bg-gray-200 p-4 col-span-2 row-span-6 max-h-[308px] min-w-[308px] overflow-y-auto">
        <div class="flex pb-3">
            <label for="code" class="mr-2">필터:</label>
            <input id="code" type="text" class="flex-1 rounded px-2 min-w-20" placeholder="국가코드" on:input={handleKeyboardInput}>
            <!-- <button class="flex-auto bg-blue-500 hover:bg-blue-700 text-white rounded ml-2 min-w-14 max-w-14">확인</button> -->
        </div>
        <CountryList bind:data={c_list} bind:show_list></CountryList>
      </div>
      <div id="chart" class="flex items-center bg-gray-200 p-4 col-span-2 row-span-6 max-h-[308px] min-w-[308px]" bind:clientWidth={w} bind:clientHeight={h}>
        {#if activeChart === 0}
            <BarChart {w} {h} data={top5}></BarChart>
        {:else if activeChart === 1}
            <BarChart2 {w} {h} data={top5}></BarChart2>
        {:else if activeChart === 2}
            <PieChart {w} {h} data={top5}></PieChart>
        {/if}
        <button class="absolute left-0 top-1/2 transform -translate-y-1/2" on:click={prevChart}>
            <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
            </svg>
        </button>
        <button class="absolute right-0 top-1/2 transform -translate-y-1/2" on:click={nextChart}>
            <svg class="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
            </svg>
        </button>
      </div>
    </div>
  </div>