const t=document.getElementById("clockCanvas").getContext("2d");let e=t.canvas.width,n=t.canvas.height,a=e/2,o=e/200;setInterval((function(){t.clearRect(0,0,e,n);const i=new Date,l=i.getHours(),c=i.getMinutes(),s=i.getSeconds();!function(){t.save(),t.translate(a,a),t.beginPath(),t.lineWidth=10*o,t.arc(0,0,a-t.lineWidth/2,0,2*Math.PI,!1),t.stroke(),t.font=18*o+"px Arial",t.textAlign="center",t.textBaseline="middle",[3,4,5,6,7,8,9,10,11,12,1,2].forEach(((e,n)=>{const i=2*Math.PI/12*n,l=Math.cos(i)*(a-30*o),c=Math.sin(i)*(a-30*o);t.fillText(String(e),l,c)}));for(let e=0;e<=60;e++){const n=2*Math.PI/60*e,i=Math.cos(n)*(a-18*o),l=Math.sin(n)*(a-18*o);t.beginPath(),e%5==0?(t.fillStyle="#000",t.arc(i,l,2,0,2*Math.PI,!1)):(t.fillStyle="#ccc",t.arc(i,l,2,0,2*Math.PI,!1)),t.fill()}}(),function(e,n){t.save(),t.beginPath();const i=2*Math.PI/12*e,l=2*Math.PI/12/60*n;t.rotate(i+l),t.lineWidth=6*o,t.lineCap="round",t.moveTo(0,10),t.lineTo(0,-a/2),t.stroke(),t.restore()}(l,c),function(e,n){t.save(),t.beginPath();const i=2*Math.PI/60*e,l=2*Math.PI/60/60*n;t.rotate(i+l),t.lineWidth=3*o,t.lineCap="round",t.moveTo(0,10),t.lineTo(0,30*o-a),t.stroke(),t.restore()}(c,s),function(e){t.save(),t.beginPath(),t.fillStyle="#c14543";const n=2*Math.PI/60*e;t.rotate(n),t.moveTo(-2,20),t.lineTo(2,20),t.lineTo(1,18*o-a),t.lineTo(-1,18*o-a),t.fill(),t.restore()}(s),t.beginPath(),t.fillStyle="#fff",t.arc(0,0,3,0,2*Math.PI,!1),t.fill(),t.restore()}),0);
//# sourceMappingURL=index.7e0c00f1.js.map