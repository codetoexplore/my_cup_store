<template>
<div id="main">
    <form @submit.prevent >
      <div v-if = "status === ''">
        <fieldset class="with-state">
        <div v-if = submitted> 
          <AppLoader></AppLoader>
        </div>
        <div v-else>
            <label>
                <span>Email</span>
                <input id="email" type="email" v-model="stripeEmail" placeholder="name@example.com" class="StripeElement field" style="width: 100%;"/>
            </label>
            <label>
                <span>Card Number</span>
                <card-number
                class="stripe-element card-number field"
                ref="cardNumber"
                :stripe="stripeKey"
                :options="stripeOptions"
                @change="number = $event.complete"
            />
            </label>

            <label>
                <span>Expiration Date</span>
                <card-expiry
                class="stripe-element card-expiry field"
                ref="cardExpiry"
                :stripe="stripeKey"
                :options="stripeOptions"
                @change="expiry = $event.complete"
            />
            </label>
            

            <label>
                <span>CVC</span>
                <card-cvc
                class="stripe-element card-cvc field"
                ref="cardCvc"
                :stripe="stripeKey"
                :options="stripeOptions"
                @change="cvc = $event.complete"
            />
            </label>
        </div>
        

        <v-btn
            class="button is-primary is-fullwidth"
            :class="{ 'is-loading': loading }"
            color="info"
            @click="pay"
            :disabled="!complete"
            v-if = !submitted
            
        >
            Pay {{ 1700 | dollar }}
        </v-btn>

        <p class="is-danger" v-if="status" v-text="status"></p>
        </fieldset>
      </div>
      <div v-else-if = "status === 'success'">
        <AppSuccess></AppSuccess>
      </div>
      <div v-else>
        <p>Error</p>
      </div>
    </form>
</div>
</template>


<script>
    import {
        CardNumber,
        CardExpiry,
        CardCvc,
        createToken
    } from 'vue-stripe-elements-plus';
    import axios from 'axios';
    import { eventBus } from '../main';
    import AppLoader from './AppLoader';
    import AppSuccess from './AppSuccess';
    export default {
        components: { CardNumber, CardExpiry, CardCvc, AppLoader, AppSuccess },
        filters: {
            dollar (amount) {
                return `$${amount / 100}`
            }
        },
        props: {
            amount: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                response: '',
                stripeShippingName:' ',
                stripeShippingAddressLine1: '',
                shippingAddressstate: '', 
                stripeShippingAddressCity: '',
                stripeShippingAddressCountry: '',
                postal_code: '',
                metadata: { },
                submitted: false,
                complete: false,
                number: false,
                expiry: false,
                cvc: false,
                loading: false,
                token: null,
                status: '',
                stripeKey: process.env.VUE_APP_MYSTRIPEKEY,
                url: process.env.VUE_APP_URL,
                stripeEmail: '',
                stripeOptions: {
                    classes: {
                        focus: 'focus',
                        empty: 'empty',
                        invalid: 'invalid'
                    }
                }
            }
        },
        watch: {
            number () {
                this.update()
            },
            expiry () {
                this.update()
            },
            cvc () {
                this.update()
            }
        },
         created() {
            eventBus.$on('addressdata', (myinput) => { 
              this.stripeShippingAddressCountry = myinput[0];
              this.stripeShippingName = myinput[1];
              this.stripeShippingAddressLine1 = myinput[2];
              this.stripeShippingAddressCity = myinput[3];
              this.shippingAddressstate = myinput[4];
              this.postal_code = myinput[5];
              this.metadata['mylink'] = myinput[6];
              console.log('PForm Metadata '+this.metadata['mylink'])
              
    
            });
        },
        methods: {
            update () {
                this.complete = this.number && this.expiry && this.cvc
            },
            pay() {
             createToken().then(data => {
                this.submitted = true;
                //console.log(data.token); //this is a token we would use for the stripeToken below
                //console.log(this.shipping);
                axios
                .post(
                    this.url,
                    {
                    stripeEmail: this.stripeEmail,
                    stripeToken: data.token.id, 
                    stripeAmt: '1700',
                    metadata: this.metadata,
                    stripeShippingName: this.stripeShippingName,
                    stripeShippingAddressLine1: this.stripeShippingAddressLine1,
                    shippingAddressstate: this.shippingAddressstate,  
                    stripeShippingAddressCity: this.stripeShippingAddressCity,
                    stripeShippingAddressCountry: this.stripeShippingAddressCountry
                    },
                    {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    }
                )
                .then(response => {
                    this.status = 'success';
                    this.submitted = false;
                    this.$emit('successSubmit');
                    //console logs for you :)
                    this.response = JSON.stringify(response, null, 2);
                    // console.log(this.response);
                })
                .catch(error => {
                    this.status = 'failure';
                    //console logs for you :)
                    this.response = 'Error: ' + JSON.stringify(error, null, 2);
                });
            });
        }
  }
};
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