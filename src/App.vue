<template>
  <div class="app">
    <left-layout class="left-container"/>
    <router-view class="main-container"/>
    <bga-back-top :svgMajorColor="'#7b79e5'" :bottom="90" :right="5" :svgMinorColor="'#ba6fda'"
                  :svgType="'rocket_smoke'"/>
  </div>
</template>

<script>
  import LeftLayout from './components/LeftLayout.vue'
  import { mapActions } from 'vuex'

  export default {
    components: {
      LeftLayout
    },
    methods: {
      ...mapActions([
        'setLabels',
        'setGitHubUser',
        'setAccessToken'
      ]),
       fetchAccessToken () {
        const query = this.$queryParse()
        if (query.code) {
          const code = query.code
          delete query.code
          const replacedUrl = `${window.location.origin}${window.location.pathname}${this.$queryStringify(query)}${window.location.hash}`
          history.replaceState(null, null, replacedUrl)

          this.$gitHubApi.getAccessToken(this, code).then(response => {
            if (response.data && response.data.access_token) {
              this.setAccessToken(response.data.access_token)
            }
          })
        }
      }
    },
    mounted () {
      const that=this;
      this.$nextTick(function () {
        this.$gitHubApi.getUserInfo(this).then(this.$http.spread((userResp, labelResp) => {
          that.setGitHubUser(userResp.data)
          that.setLabels(labelResp.data)
          that.fetchAccessToken()
        }))
      });
       
    
    
    }
  }
</script>
