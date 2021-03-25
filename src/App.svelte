<script>
  import axios from "axios";

  let quotes = [];

  axios
    .get("http://localhost:3000/api/v1/quotes")
    // .get("https://bitprice.vercel.app/api/v1/quotes")
    .then( payload => {
      quotes = payload.data.quotes;

      console.log(quotes)

    });
</script>

<main>
  <div class="uk-container">
    <h1 class="uk-heading-small">Bitcoin Price History</h1>

    <table class="uk-table uk-table-divider uk-table-responsive">
      <thead>
        <tr>
          <th class="uk-width-1-6">Date</th>
          <th class="uk-width-1-6">Day of Week</th>
          <th class="uk-width-1-6">Price</th>
          <th class="uk-width-1-6">Direction</th>
          <th class="uk-width-1-6">Change</th>
        </tr>
      </thead>
      <tbody>
        {#each quotes as quote}
          <tr class="uk-text-left">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
