<script>
  import axios from "axios";

  const day_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  let previous_price_click = 0;

  let quote_clicked;

  let quotes = [];

  axios
    .get("http://localhost:3000/api/v1/quotes")
    // .get("https://bitprice.vercel.app/api/v1/quotes")
    .then( payload => {
      quotes = payload.data.quotes;

      quotes.sort( (a,b) => a.timestamp - b.timestamp )

      console.log(quotes)

    });


function handleRowClick(i) {

  console.log(i)

  const url = `http://www.example.com/save_hits?priceDate=${quotes[i].timestamp}&priceClick=${quotes[i].price}&previousPriceClick=${ previous_price_click || 'na' }`

  quote_clicked = i

  axios.get( url  )
  .then(  x => console.log(x) )
  .catch( e => { 
    console.log( 'Error:',e)
  } 
    
  )

  previous_price_click = quotes[i].price
}
</script>

<main>
  <div class="uk-container">
    <h1 class="uk-heading-small">Bitcoin Price History</h1>

    <table class="uk-table uk-table-small uk-table-divider uk-table-responsive uk-table-middle">
      <thead>
        <tr>
          <th class="uk-width-1-6">Date</th>
          <th class="uk-width-1-6">Day of Week</th>
          <th class="uk-width-1-6">Price</th>
          <th class="uk-width-1-6">Change</th>
          <th class="uk-width-1-6">Direction</th>
        </tr>
      </thead>
      <tbody>
        {#each quotes as quote, i}
          <tr class="uk-text-left"  class:uk-active="{quote_clicked === i}"  on:click={ () =>  { handleRowClick(i) } }  >
            <td> { new Date(quote.timestamp).toISOString().split('T')[0] + "T00:00:00" }   </td>
            <td> { day_names[ new Date(quote.timestamp).getDay()  ]   } </td>
            <td> {quote.price}   </td>
            <td> { ( i === 0 ) ?  'N/A' : (quotes[i].price - quotes[i-1].price).toFixed(2)   }     </td>
            <td class="uk-align-center"> 
              {#if i === 0} 
                N/A
              {:else if ( (quotes[i].price - quotes[i-1].price) > 0)   }
                <span style="color:green" uk-icon="arrow-up"></span>
              {:else if ( (quotes[i].price - quotes[i-1].price) < 0)   }
                <span style="color:red"  uk-icon="arrow-down"></span>
              {:else}
                <span uk-icon="minus"></span>

              {/if}
            
            </td>
          
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
