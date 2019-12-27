<template>
  <section class="section">
    <div class="columns is-mobile">   
      <gameboard M=2 N=3 L=7>
		
	  </gameboard>
    
    </div>
  </section>
</template>

<script>
import gameboard from '~/components/gameboard'
export default {
  name: 'HomePage',

  components: {
      gameboard
      
  }
}
</script>
