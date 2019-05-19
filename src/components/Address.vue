<template>
<div id="main" class="loading">
    <div id="checkout">
      <div id="payment-request">
        <div id="payment-request-button"></div>
      </div>
      <form id="payment-form" method="POST" action="/orders">
        <p class="instruction">Complete your shipping details below</p>
        <section>
          <h2>Shipping &amp; Billing Information</h2>
          <fieldset class="with-state">
            <label>
              <span>Name</span>
              <input name="name" class="field" placeholder="Jenny Rosen" v-model="cust_name" required>
            </label>
            <label>
              <span>Address</span>
              <input name="address" class="field" placeholder="185 Berry Street Suite 550" v-model="address">
            </label>
            <label>
              <span>City</span>
              <input name="city" class="field" placeholder="San Francisco" v-model="city">
            </label>
            <!--- This needs to be changed depending on selected value -->
            <div id="uszipdom" v-if="selected === 'US'">
              <label class="state">
                <span>State</span>
                <input name="state" class="field" placeholder="CA" v-model="state">
              </label>
              <label class="zip">
                <span>ZIP</span>
                <input name="postal_code" class="field" placeholder="94107" v-model="postcode">
              </label>
            </div>
            <div id="otherpostcodes" v-else>
              <label>
                <span>County</span>
                <input name="state" class="field" placeholder="Berkshire" v-model="state">
              </label>
              <label>
                <span>Postcode</span>
                <input name="postal_code" class="field" placeholder="RG20DJ" v-model="postcode">
              </label>
            </div>
            <div 
            <!--- ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^     ---->
            <label class="select">
              <span>Country</span>
              <div id="country" class="field US">
                <select name="country" @change="countryChanged($event)">
                  <option value="AU">Australia</option>
                  <option value="AT">Austria</option>
                  <option value="BE">Belgium</option>
                  <option value="BR">Brazil</option>
                  <option value="CA">Canada</option>
                  <option value="CN">China</option>
                  <option value="DK">Denmark</option>
                  <option value="FI">Finland</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                  <option value="HK">Hong Kong</option>
                  <option value="IE">Ireland</option>
                  <option value="IT">Italy</option>
                  <option value="JP">Japan</option>
                  <option value="LU">Luxembourg</option>
                  <option value="MX">Mexico</option>
                  <option value="NL">Netherlands</option>
                  <option value="NZ">New Zealand</option>
                  <option value="NO">Norway</option>
                  <option value="PT">Portugal</option>
                  <option value="SG">Singapore</option>
                  <option value="ES">Spain</option>
                  <option value="SE">Sweden</option>
                  <option value="CH">Switzerland</option>
                  <option value="GB">United Kingdom</option>
                  <option value="US" selected="selected">United States</option>
                </select>
              </div>
            </label>
          </fieldset>
        </section>
    </form>
    </div>
</div>
</template>

<script>
import { eventBus } from '../main';
export default {
  data () {
      return {
        selected: 'US',
        cust_name: '',
        address: '',
        city: '',
        state: '',
        postcode: '',
        thelink: '',
      }
  },
  methods: {
    countryChanged(input) {
      this.selected = input.target.value;
    }
  },
  created() {
    eventBus.$on('updatedlink', (data) => { 
        this.thelink = data;
        console.log('Address comp '+this.thelink);
      }),
    eventBus.$on('sendinfo', () => {
  
          eventBus.$emit('addressdata', [this.selected, this.cust_name, this.address, this.city, this.state, this.postcode, this.thelink ]);
        
      })
  }

}


</script>



<style>
* {
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: none;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  font-size: 15px;
  line-height: 1.4em;
  color: #525f7f;
}
.loading {
  margin: 0px;
}
body {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #f8fbfd;
}

#main {
  width: 100%;
  height: 60vh; /* was 100 vh*/
  text-align: center;
  transition: width 0.3s ease-in-out;
}

#main.checkout:not(.success):not(.error) {
  width: calc(100% - 450px);
}

section {
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: left;
}
#payment-form {
  margin: 0 -30px;
  padding: 20px 30px 30px;
  border-radius: 4px;
  border: 1px solid #e8e8fb;
}

/* Form */

fieldset {
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(50, 50, 93, 0.15),
    0 4px 6px 0 rgba(112, 157, 199, 0.15);
  border-radius: 4px;
  border: none;
  font-size: 0;
}

fieldset label {
  position: relative;
  display: flex;
  flex-direction: row;
  height: 42px;
  padding: 10px 0;
  align-items: center;
  justify-content: center;
  color: #8898aa;
  font-weight: 400;
}

fieldset label:not(:last-child) {
  border-bottom: 1px solid #f0f5fa;
}

fieldset label.state {
  display: inline-flex;
  width: 75%;
}

fieldset:not(.with-state) label.state {
  display: none;
}

fieldset label.zip {
  display: inline-flex;
  width: 25%;
  padding-right: 60px;
}

fieldset:not(.with-state) label.zip {
  width: 100%;
}

fieldset label span {
  min-width: 125px;
  padding: 0 15px;
  text-align: right;
}

fieldset .redirect label span {
  width: 100%;
  text-align: center;
}

p.instruction {
  display: inline-table;
  margin-top: -32px;
  padding: 0 5px;
  text-align: center;
  background: #f8fbfd;
}
p.tip {
  margin: -10px auto 10px;
  padding: 5px 0 5px 30px;
  font-size: 14px;

}
.field {
  flex: 1;
  padding: 0 15px;
  background: transparent;
  font-weight: 400;
  color: #31325f;
  outline: none;
  cursor: text;
}
.field::-webkit-input-placeholder {
  color: #aab7c4;
}
.field::-moz-placeholder {
  color: #aab7c4;
}
.field:-ms-input-placeholder {
  color: #aab7c4;
}
fieldset .select::after {
  content: '';
  position: absolute;
  width: 9px;
  height: 5px;
  right: 20px;
  top: 50%;
  margin-top: -2px;
  
  pointer-events: none;
}
input {
  flex: 1;
  border-style: none;
  outline: none;
  color: #313b3f;
}
select {
  flex: 1;
  border-style: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  color: #313b3f;
  cursor: pointer;
  background: transparent;
}
select:focus {
  color: #666ee8;
}
::-webkit-input-placeholder {
  color: #cfd7e0;
}
::-moz-placeholder {
  color: #cfd7e0;
  opacity: 1;
}
:-ms-input-placeholder {
  color: #cfd7e0;
}
input:-webkit-autofill,
select:-webkit-autofill {
  -webkit-text-fill-color: #666ee8;
  transition: background-color 100000000s;
  -webkit-animation: 1ms void-animation-out 1s;
}
</style>