webpackJsonp([3],{"F9+C":function(t,e){},"Ja/8":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={components:{},data:function(){return{data:{author:"",content:"",contentText:"",createTime:"",eye:"",img:"",title:"",type:"",updateTime:"",_id:""}}},created:function(){this.get()},methods:{get:function(){var t=this;this.$axios.post("getNews",{id:this.$route.query.id,type:2}).then(function(e){console.log(e.data),t.data=e.data.data[0]})}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"xw"},[a("div",{attrs:{id:"da"}},[a("h5",[t._v(t._s(t.data.title))]),t._v(" "),a("p",{attrs:{id:"q"}},[t._v(t._s(t.data.author))]),t._v(" "),a("div",{attrs:{id:"w"},domProps:{innerHTML:t._s(t.data.content)}})])])},staticRenderFns:[]};var d=a("VU/8")(n,i,!1,function(t){a("F9+C")},"data-v-573e5801",null);e.default=d.exports}});
//# sourceMappingURL=3.0c2461e0ed210acb7a87.js.map