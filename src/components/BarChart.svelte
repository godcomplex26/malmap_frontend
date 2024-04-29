<script>
    import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
    import { schemeCategory10 } from "d3-scale-chromatic";
  
    export let data;
  
    let width = 270;
    let height = 270;
  
    const margin = { top: 10, right: 20, bottom: 20, left: 30 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
  
    $: xDomain = data.map((d) => d.country_code);
    $: yDomain = data.map((d) => +d.count);
  
    $: yScale = scaleBand().domain(xDomain).range([0, innerHeight]).padding(0.1);
    $: xScale = scaleLinear()
      .domain([0, Math.max.apply(null, yDomain)])
      .range([0, innerWidth]);
    $: colorScale = scaleOrdinal(schemeCategory10).domain(xDomain);
</script>

<div class="flex m-0 p-1">
    <svg {width} {height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
            {#each xScale.ticks(3) as tickValue}
                <g transform={`translate(${xScale(tickValue)},0)`}>
                <line y2={innerHeight} stroke="black" />
                <text text-anchor="middle" dy=".71em" y={innerHeight + 3}>
                    {tickValue}
                </text>
                </g>
            {/each}
            {#each data as d}
                <text
                text-anchor="end"
                x="-3"
                dy=".32em"
                y={yScale(d.country_code) + yScale.bandwidth() / 2}
                >
                {d.country_code}
                </text>
                <rect
                x="0"
                y={yScale(d.country_code)}
                width={xScale(d.count)}
                height={yScale.bandwidth()}
                fill={colorScale(d.country_code)}
                />
            {/each}
        </g>
    </svg>
</div>
