<script>
    import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
    import { schemeCategory10 } from "d3-scale-chromatic";
  
    export let data;
  
    let width = 270;
    let height = 270;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
  
    $: xScale = scaleBand()
      .domain(data.map((d) => d.country_code))
      .range([0, innerWidth])
      .padding(0.1);
  
    $: yScale = scaleLinear()
      .domain([0, Math.max.apply(null, data.map((d) => +d.count))])
      .range([innerHeight, 0]);
  
    $: colorScale = scaleOrdinal(schemeCategory10);
  </script>
  
  <div class="flex m-0 p-1">
    <svg {width} {height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {#each data as d}
          <rect
            x={xScale(d.country_code)}
            y={yScale(d.count)}
            width={xScale.bandwidth()}
            height={innerHeight - yScale(d.count)}
            fill={colorScale(d.country_code)}
          />
          <text
            x={xScale(d.country_code) + xScale.bandwidth() / 2}
            y={yScale(d.count) - 5}
            text-anchor="middle"
            font-size="12"
          >
            {d.count}
          </text>
        {/each}
        <g transform={`translate(0,${innerHeight})`}>
          <line x1={0} x2={innerWidth} stroke="black" />
          {#each xScale.domain() as tickValue}
            <g transform={`translate(${xScale(tickValue) + xScale.bandwidth() / 2},0)`}>
              <line y2={5} stroke="black" />
              <text y={15} text-anchor="middle" font-size="12">
                {tickValue}
              </text>
            </g>
          {/each}
        </g>
        <g>
          <line y1={0} y2={innerHeight} stroke="black" />
          {#each yScale.ticks(5) as tickValue}
            <g transform={`translate(0,${yScale(tickValue)})`}>
              <line x2={-5} stroke="black" />
              <text x={-10} dy=".32em" text-anchor="end" font-size="12">
                {tickValue}
              </text>
            </g>
          {/each}
        </g>
      </g>
    </svg>
  </div>