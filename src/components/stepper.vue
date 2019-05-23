<template>

    <v-stepper v-model="e6" vertical class="stepper">
                <v-stepper-step :complete="e6 > 1" step="1" id="id1">Select Your Tweet
                    <!-- <small>Tweet Selected</small> -->
                    </v-stepper-step>

                    <v-stepper-content step="1">
                        <div v-if= query>
                            <p> Tweet by <v-chip>{{ query }}</v-chip> selected</p>
                        </div> 
                        <div v-else>
                            <twitter>
                            </twitter>
                        </div> 
                    <v-btn color="primary" @click="sendmylink();">Continue</v-btn> <!-- link ='$event'-->
                    <v-btn flat>Cancel</v-btn>
                    </v-stepper-content>

                <v-stepper-step :complete="e6 > 2" step="2">Add Your Address
                
                    </v-stepper-step>

                    <v-stepper-content step="2">
                    <Address></Address>
                    
                    <v-btn color="primary" @click="sendaddress();" >Continue</v-btn>
                    <v-btn flat>Cancel</v-btn>
                    
                    </v-stepper-content>

                <v-stepper-step :complete="e6 > 3" step="3">Make a Payment</v-stepper-step>

                    <v-stepper-content step="3">
                    <Pform></Pform>
                    </v-stepper-content>


    </v-stepper>
</template>

<script>
import { eventBus } from '../main';
import twitter from './twitter';
import Pform from './Pform';
import Address from './Address';

export default {
    data: () => ({
        e6: 1
    }),
    props: ['query'],
    methods: {
        sendmylink() {
            this.e6 = 2;
            if(this.query === undefined) {
                eventBus.$emit('sendLink');
            }else {
                eventBus.$emit('updatedlink',this.query);

            }
        },
        sendaddress() {
            this.e6 = 3;
            eventBus.$emit('sendinfo');
        },
    },
        components: {
            twitter,
            Pform,
            Address,
        }

    }


</script>

<style scoped>

</style>