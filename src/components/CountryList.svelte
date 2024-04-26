<script>
    export let data;
</script>
<table class="table-auto">
    <thead>
        <tr>
            <th>국가코드</th>
            <th>악성IP</th>
        </tr>
    </thead>
    <tbody>
        {#each data as row}
          <tr>
                <td>{row.country_code}</td>
                <td>{row.count}</td>
          </tr>
        {/each}
    </tbody>
</table>