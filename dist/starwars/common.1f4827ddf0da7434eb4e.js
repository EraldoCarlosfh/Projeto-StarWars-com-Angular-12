(self.webpackChunkstarwars=self.webpackChunkstarwars||[]).push([[592],{2255:(t,e,p)=>{"use strict";p.d(e,{g:()=>h});var i=p(5257),s=p(2340),n=p(3018),r=p(1841);let h=(()=>{class t{constructor(t){this.http=t,this.endpoint="pilots",this.endpoint2="pilot"}getAllPilot(){return this.http.get(s.N.api+this.endpoint).pipe((0,i.q)(1))}getPilotPage(t){return this.http.get(`${s.N.api+this.endpoint}/?page=${t}`).pipe((0,i.q)(1))}getPilotById(t){return this.http.get(`${s.N.api+this.endpoint2}/${t}`).pipe((0,i.q)(1))}postPilot(t){return this.http.post(s.N.api+"save/"+this.endpoint2,t).pipe((0,i.q)(1))}putPilot(t){return this.http.put(s.N.api+"update/"+this.endpoint2,t).pipe((0,i.q)(1))}deletePilot(t){return this.http.delete(`${s.N.api+"delete/"}${t}`).pipe((0,i.q)(1))}deletePilotById(t){return this.http.delete(`${s.N.api+"delete/pilot/"}${t}`).pipe((0,i.q)(1))}}return t.\u0275fac=function(e){return new(e||t)(n.LFG(r.eN))},t.\u0275prov=n.Yz7({token:t,factory:t.\u0275fac}),t})()}}]);
//# sourceMappingURL=common.1f4827ddf0da7434eb4e.js.map