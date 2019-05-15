<template>
  <div>
      <b-table 
        :striped="true" 
        bordered  
        :items="crypto" 
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
      >
        <template slot="index" slot-scope="data">
          <p class="number-cell">{{ data.index + 1 }}</p>
        </template>
        <template slot="coin" slot-scope="data">
          <div class="coin-block">
            <div class="coin-img">
              <img :src="data.value.img" >
              <!-- {{ data.value.img }} -->
            </div>
            <div class="coin-description">
                <h3> {{ data.value.fullName }} </h3>
                <h4> {{ data.value.name }} </h4>
            </div>
          </div>
        </template>
        <template slot="price" slot-scope="data" class="price-cell">
          $ {{ data.value }}
        </template>
      </b-table>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      sortBy: 'price',
      sortDesc: true,
      fields: [
        'index',
        'coin',
        {
          key: 'price',
          sortable: true,
          initial_sort: true
        },
        {
          key: 'supply',
          label: 'Direct Vol.',
          sortable: false
        }
      ],
      errors: [],
      crypto: []
    }
  },
  methods: {
    getValues() {
          axios.get('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD')
          .then(responce => {
            const values = responce.data.Data;
            for (const key in values) {
              let obj = new Object();
              let coin = new Object();
              coin.name = values[key].CoinInfo.Name;
              coin.img = 'https://www.cryptocompare.com' + values[key].CoinInfo.ImageUrl;
              coin.fullName = values[key].CoinInfo.FullName;
              obj.coin = coin;
              obj.price = values[key].RAW.USD.PRICE;
              obj.supply = values[key].RAW.USD.SUPPLY;
              this.crypto.push(obj);
            }
          })
          .catch(e => {
            this.errors.push(e)
          })
    }
  },
  created() {

  },
  mounted() {
    this.getValues();

  setInterval(function () {
      this.crypto = [];
      this.getValues();
    }.bind(this), 300000); 

  }
};
</script>


<style lang="scss" scoped>
  @import "../styles/main.scss";
</style>
