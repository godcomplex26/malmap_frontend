<script>
  import { onMount } from 'svelte';
  import { geoPath, geoMercator } from 'd3-geo';
  import { select } from 'd3-selection';
  import { scaleLinear, scaleOrdinal } from 'd3-scale';
  import { schemeCategory10 } from 'd3-scale-chromatic';
  // import { interpolateRainbow } from 'd3-scale-chromatic';
  import { zoom, zoomIdentity } from 'd3-zoom';
  import worldData from '../data/worldmap.geo.json';
	import { timeDay } from 'd3';
  import { colorScale } from "../data/colorScale";
  
  // let worldData = [];
    /**
	 * @type {number}
	 */
     export let width;
    /**
	 * @type {number}
	 */
     export let height;
    /**
	 * @type {any[]}
	 */
     export let locationData;
    /**
	 * @type {import("d3-selection").Selection<SVGGElement, any, HTMLElement, any>}
	 */
    let mapGroup;
    let zoomHandler;
    let currentZoom = null;
    let currentTransform = null;

    // function getWorldMapSize() {
    //   const worldMapElement = document.getElementById('world_map');
    //   if (worldMapElement) {
    //       width = worldMapElement.clientWidth-30;
    //       height = worldMapElement.clientHeight-30;
    //       console.log(width);
    //       console.log(height);
    //   }
    // }

    // function focusCenter() {
    //   const [[x0, y0], [x1, y1]] = pathGenerator.bounds(worldData);
    //   const dx = x1 - x0;
    //   const dy = y1 - y0;
    //   const x = (x0 + x1) / 2;
    //   const y = (y0 + y1) / 2;
    //   const scale = 1 / Math.max(dx / width, dy / height);

    //   select('#map')
    //     .transition()
    //     .duration(750)
    //     .call(
    //       zoomHandler.transform,
    //       zoomIdentity.translate(width / 2, height / 2).scale(scale).translate(-x, -y)
    //     );
    // }
    
    onMount(async () => {
      try {
        // const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
        // worldData = await response.json();
        // const locationResponse = await fetch('http://localhost:8080/api/ips/country-count-gps');
        // locationData = await locationResponse.json();
        // getWorldMapSize();
        // await focusCenter();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
  
    $: projection = geoMercator()
      .scale(width / 2 / Math.PI)
      .translate([width / 2, height / 2]);
  
    $: pathGenerator = geoPath().projection(projection);
  
    // $: latitudeScale = scaleLinear()
    //   .domain([-90, 90])
    //   .range([height, 0]);
  
    // $: longitudeScale = scaleLinear()
    //   .domain([-180, 180])
    //   .range([0, width]);
  
    $: countScale = scaleLinear()
      .domain([0, Math.max(...locationData.map(d => d.count))])
      .range([3, 50]);
  
    // $: colorScale = scaleOrdinal(schemeCategory10);
    // $: colorScale = scaleOrdinal(schemeCategory10).domain([...new Set(locationData.map(d => d.country))]);
    // $: colorScale = scaleSequential(interpolateRainbow).domain([...new Set(locationData.map(d => d.country))]);
  
    function initZoom() {
      zoomHandler = zoom()
        .scaleExtent([1, 15])
        .on('zoom', handleZoom);
  
      select('#map')
        .call(zoomHandler);
    }
  
    function handleZoom(event) {
      mapGroup.attr('transform', event.transform);
      currentZoom = event.transform.k;
      currentTransform = event.transform;
    }
    
  
    function drawMap() {
      if (worldData.features) {
        
        mapGroup = select('#map')
          .append('g');
  
        mapGroup.selectAll('path')
          .data(worldData.features)
          .enter()
          .append('path')
          .attr('d', pathGenerator)
          .attr('fill', 'lightgray')
          .attr('stroke', 'white')
          .attr('stroke-width', 0.5);
  
        mapGroup.selectAll('circle')
          .data(locationData.filter(d => d.country_code !== 'Unknown'))
          .enter()
          .append('circle')
          .attr('cx', d => projection([d.longitude, d.latitude])[0])
          .attr('cy', d => projection([d.longitude, d.latitude])[1])
          .attr('r', d => countScale(d.count))
          .attr('fill', d => colorScale(d.country_code))
          .attr('opacity', 0.7);
        
        // mapGroup.selectAll('text')
        //   .data(locationData.filter(d => d.country_code !== 'Unknown'))
        //   .enter()
        //   .append('text')
        //   .attr('x', d => projection([d.longitude, d.latitude])[0])
        //   .attr('y', d => projection([d.longitude, d.latitude])[1])
        //   .attr('dy', '0.35em')
        //   .attr('text-anchor', 'middle')
        //   .attr('font-size', '8px')
        //   .attr('fill', 'black')
        //   .text(d => d.country_code);
        if (currentZoom && currentTransform) {
          select('#map')
            .call(zoomHandler.transform, currentTransform);
        }
      }
    }
  
    $: {
      async function updateMap() {
        if (worldData.features && locationData.length > 0) {
          clearSVG();
          await drawMap();
          initZoom();
        }
      }
      updateMap();
    }

    function clearSVG() {
      select('#map')
        .selectAll('*')
        .remove();
    }

    function resetZoom() {
      select('#map')
        .transition()
        .duration(750)
        .call(zoomHandler.transform, zoomIdentity);
    }
</script>
<div class="flex">
    <svg class="flex flex-1 items-center" id="map" width={width} height={height}></svg>
    <!-- <button on:click={focusCenter}>test</button> -->
</div>