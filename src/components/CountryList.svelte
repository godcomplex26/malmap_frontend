<script>
  import "/node_modules/flag-icons/css/flag-icons.min.css";
  export let data;
  /**
	 * @type {any[]}
	 */
   export let show_list;

  let tableData = [];
  
  $: tableData = data;

  function handleCheckBoxInput(event) {
    // inputValue = event.target.id;
    console.log(event.target.checked);
    // console.log(event.target.id);
    if (event.target.checked) {
      const selectedCountry = tableData.find(country => country.country_code === event.target.id);
      if (selectedCountry) {
        show_list = [...show_list, selectedCountry];
      }
    }
    else {
      const filteredData = show_list.filter(item => item.country_code.toLowerCase().includes(event.target.id.toLowerCase()));
    // show_list = show_list.filter(country => country.country_code === filteredData.toString());
    // console.log(show_list);

    // 삭제할 객체의 country_code 값
      const countryCodeToRemove = event.target.id;

      // show_list에서 해당 country_code를 가진 객체를 제외한 새로운 배열 생성
      const updatedShowList = show_list.filter(country => country.country_code !== countryCodeToRemove);

      // show_list를 업데이트
      show_list = updatedShowList;
    // console.log(show_list);
    }
  }
</script>

<span class="flex">
  <table class="table-auto w-full text-l rtl:text-right text-gray-500">
    <thead class="text-sm text-gray-700 uppercase bg-gray-50">
      <tr>
        <th class="text-center"></th>
        <th class="text-center"></th>
        <th class="text-center">국가코드</th>
        <th class="text-center">악성IP</th>
      </tr>
    </thead>
    <tbody>
      {#each tableData as row}
        <tr>
          <td class="text-center pl-3"><input checked on:change={handleCheckBoxInput} id="{row.country_code}" type="checkbox" value="" class="w-4 h-4 mb-1 align-middle text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "></td>
          <td class="text-center pl-3"><label for="{row.country_code}"><span class="fi fi-{row.country_code.toLowerCase()}"></span></label></td>
          <td class="text-center font-mono"><label for="{row.country_code}">{row.country_code}</label></td>
          <td class="text-right pr-4 font-mono">{row.count.toLocaleString()}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</span>