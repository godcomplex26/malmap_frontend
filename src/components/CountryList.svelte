<script>
    import "/node_modules/flag-icons/css/flag-icons.min.css";
    export let data;
</script>
<table class="table-auto w-full text-l rtl:text-right text-gray-500 dark:text-gray-400">
    <thead class="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th class="text-center"></th>
            <th class="text-center">국가코드</th>
            <th class="text-center">악성IP</th>
        </tr>
    </thead>
    <tbody>
        {#each data as row}
          <tr>
                <td class="text-center pl-3"><span class="fi fi-{row.country_code.toLowerCase()}"></span></td>
                <td class="text-center">{row.country_code}</td>
                <td class="text-right pr-4">{row.count}</td>
          </tr>
        {/each}
    </tbody>
</table>