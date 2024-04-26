/*function toggleMenu() {
    var menuBar = document.getElementById('menuBar');
    menuBar.classList.toggle('expanded');
}*/

// SVG 요소 선택
const svg = d3.select("svg");

// 투영(projection)을 정의합니다.
const projection = d3.geoNaturalEarth1()
  .scale(153)
  .translate([480, 300]);

// 지도의 경로 생성기를 생성합니다.
const pathGenerator = d3.geoPath().projection(projection);

// GeoJSON 데이터 로드 (이 부분은 실제 GeoJSON 파일을 가리키도록 수정해야 함)
d3.json("path_to_your_geojson.json").then(world => {
  svg.selectAll("path")
    .data(world.features)
    .enter().append("path")
    .attr("d", pathGenerator)
    .attr("fill", "lightgrey"); // 지도 색상 설정
});

// 버블 차트 데이터
const bubblesData = [
  { id: "Country1", latitude: -25.27, longitude: 133.77, value: 10 },
  // ... 추가 데이터
];

// 버블의 크기와 색상 스케일
const sizeScale = d3.scaleSqrt().domain([0, 100]).range([0, 10]);
const colorScale = d3.scaleSequential(d3.interpolateWhitesReds).domain([0, 100]);

// 버블 추가
svg.selectAll("circle")
  .data(bubblesData)
  .enter().append("circle")
  .attr("cx", d => projection([d.longitude, d.latitude])[0])
  .attr("cy", d => projection([d.longitude, d.latitude])[1])
  .attr("r", d => sizeScale(d.value))
  .attr("fill", d => colorScale(d.value))
  .attr("fill-opacity", 0.7); // 투명도 설정
  