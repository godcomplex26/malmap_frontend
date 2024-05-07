<script>
  import "/node_modules/flag-icons/css/flag-icons.min.css";
  export let data;

  let tableData = [];
  
  $: tableData = data;
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
          <td class="text-center pl-3"><input checked id="{row.country_code}" type="checkbox" value="" class="w-4 h-4 mb-1 align-middle text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 "></td>
          <td class="text-center pl-3"><label for="{row.country_code}"><span class="fi fi-{row.country_code.toLowerCase()}"></span></label></td>
          <td class="text-center font-mono">{row.country_code}</td>
          <td class="text-right pr-4 font-mono">{row.count.toLocaleString()}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</span>