<script>
    import { scaleOrdinal } from "d3-scale";
    import { schemeCategory10 } from "d3-scale-chromatic";
    import { pie, arc } from "d3-shape";
    import { colorScale } from "../data/colorScale";
    
    export let data;
    export let w = 0;
    export let h = 0;
    
    let width = w - 38;
    let height = h;
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    
    // $: colorScale = scaleOrdinal(schemeCategory10);
    
    $: pieData = pie().value((d) => d.count)(data);
    
    $: arcGenerator = arc()
      .innerRadius(0)
      .outerRadius(radius);
  </script>
  
  <div class="flex m-0 p-1">
    <svg {width} {height}>
      <g transform={`translate(${width / 2}, ${height / 2})`}>
        {#each pieData as slice, i}
          <path
            d={arcGenerator(slice)}
            fill={colorScale(data[i].country_code)}
            stroke="white"
            stroke-width="2"
          />
          <text
            transform={`translate(${arcGenerator.centroid(slice)})`}
            dy=".35em"
            text-anchor="middle"
            font-size="12"
          >
            {data[i].country_code}
          </text>
        {/each}
      </g>
    </svg>
  </div>