<template>
<div id="linkform">
  <fieldset class="with-state">
  <label>
    <span>Paste Tweet Link Here</span>
              <input name="name" class="field" v-model="tweetlink" placeholder="https://twitter.com/exampleacc/status/1103807507422687234" required>
    </label>
    </fieldset>
</div>

	
</template>

<script>
import { eventBus } from '../main';

export default {
  data () {
    return {
      tweetlink: ''
    } 
  },
  created() {
    eventBus.$on('sendLink', () => {
      eventBus.$emit('updatedlink',this.tweetlink);
    });

  }

}



</script>


<style scoped>
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

body {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #f8fbfd;
}




section {
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: left;
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