<script>
    import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
    import { schemeCategory10 } from "d3-scale-chromatic";
    import { format } from "d3-format";
  
    export let data;
    export let w = 0;
    export let h = 0;
  
    const margin = { top: 25, right: 50, bottom: 30, left: 30 };
    $: innerHeight = h - margin.top - margin.bottom;
    $: innerWidth = w - margin.left - margin.right;
  
    $: xDomain = data.map((d) => d.country_code);
    $: yDomain = data.map((d) => +d.count);
    $: yScale = scaleBand().domain(xDomain).range([0, innerHeight]).padding(0.1);
    $: xScale = scaleLinear()
      .domain([0, Math.max.apply(null, yDomain)])
      .range([0, innerWidth]);
    $: colorScale = scaleOrdinal(schemeCategory10).domain(xDomain);
  
    // 숫자 포맷팅 함수
    const formatNumber = format(".2s");
  
    // // 리액티브 구문을 사용하여 w 값이 변경되면 차트를 다시 그립니다.
    // $: {
    //   if (data && data.length > 0) {
    //     updateChart();
    //   }
    // }
  
    // function updateChart() {
    //   // 차트 업데이트 로직을 여기에 작성합니다.
    //   // 예를 들어, 축 업데이트, 막대 업데이트 등을 수행합니다.
    //   // 필요한 경우 D3 선택자를 사용하여 요소를 선택하고 업데이트할 수 있습니다.
    // }
</script>
  
<div class="flex m-0 p-1">
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {#each xScale.ticks(3) as tickValue}
          <g transform={`translate(${xScale(tickValue)},0)`}>
            <line y2={innerHeight} stroke="black" />
            <text text-anchor="middle" dy=".71em" y={innerHeight + 3}>
              {formatNumber(tickValue)}
            </text>
          </g>
        {/each}
  
        {#each data as d}
          <text text-anchor="end" x="-3" dy=".32em" y={yScale(d.country_code) + yScale.bandwidth() / 2}>
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