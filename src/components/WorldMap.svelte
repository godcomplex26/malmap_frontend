<script>
    import { onMount } from 'svelte';
    import { geoPath, geoMercator } from 'd3-geo';
    import { select } from 'd3-selection';
    import { scaleLinear, scaleOrdinal } from 'd3-scale';
    import { schemeCategory10 } from 'd3-scale-chromatic';
  
    let worldData = [];
    let width = 960;
    let height = 540;
    let locationData = [];
  
    onMount(async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
        worldData = await response.json();
  
        const locationResponse = await fetch('http://localhost:8080/api/ips/country-count-gps');
        locationData = await locationResponse.json();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
  
    $: projection = geoMercator()
      .scale(width / 2 / Math.PI)
      .translate([width / 2, height / 2]);
  
    $: pathGenerator = geoPath().projection(projection);
  
    $: latitudeScale = scaleLinear()
      .domain([-90, 90])
      .range([height, 0]);
  
    $: longitudeScale = scaleLinear()
      .domain([-180, 180])
      .range([0, width]);
  
    $: countScale = scaleLinear()
      .domain([0, Math.max(...locationData.map(d => d.count))])
      .range([3, 50]);
  
    $: colorScale = scaleOrdinal(schemeCategory10);
  
    function drawMap() {
      if (worldData.features) {
        select('#map')
          .selectAll('path')
          .data(worldData.features)
          .enter()
          .append('path')
          .attr('d', pathGenerator)
          .attr('fill', 'lightgray')
          .attr('stroke', 'white')
          .attr('stroke-width', 0.5);
  
        select('#map')
          .selectAll('circle')
          .data(locationData)
          .enter()
          .append('circle')
          .attr('cx', d => longitudeScale(d.longitude))
          .attr('cy', d => latitudeScale(d.latitude))
          .attr('r', d => countScale(d.count))
          .attr('fill', d => colorScale(d.country))
          .attr('opacity', 0.7);
      }
    }
  
    $: {
      if (worldData.features && locationData.length > 0) {
        drawMap();
      }
    }
  </script>
  
  <svg id="map" width={width} height={height}></svg>