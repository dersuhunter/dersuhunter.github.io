"use strict";

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
};


const uuidv4 = ()=>"yxx-xxx-xxxxx-xxxxxxx-xxxxxxxxxxx".replace(/[xy]/g, 
function(r) {
        var t = 16 * Math.random()|0;
        return ("x" == r ? t :3 & t|8).toString(16)
    }),
    change_id = ()=>{
        const r = uuidv4();
        let t = new URL(window.location);
        t.searchParams.set("ruta",""),t.searchParams.set("id", r), Math.seedrandom(r), window.history.replaceState(null, "Maze", t.href)
    },

   alpha=document.documentElement.clientWidth > document.documentElement.clientHeight,
   LEVELS={
	bb:{W: alpha ? 8 : 5,H: alpha ? 5 : 8},
	basico:{W: alpha ? 20 : 15,H: alpha ? 15 : 20},
        intermedio:{W: alpha ? 40 : 30,H: alpha ? 30 : 40},
        avanzado:{W: alpha ? 60 : 45,H: alpha ? 45 : 60},
        experto:{W: alpha ? 80 : 60,H: alpha ? 60 : 80},
	leyenda:{W: alpha ? 100 : 75,H: alpha ? 75 : 100}
    },
    draw_maze=r=>{
	const t=r.length,
		e=r[0].length,
		l=Math.PI,
		o=l/2,
		n=3*l/2,
		a=2*l,
		s=888/e,
		d=.25*s,
		u=.5,

		h=-d/u+.5*(s-Math.sqrt(d*(4*d-3*d*u+1*s)/u)),

		i=h,
		c=d/u,
		m=h+c,
		w=-.5*d/u,

		f=Math.asin((2*d-2*d*u+u*s)/(2*d-d*u+u*s)),
		g=f-Math.PI/2,

		p=d,
		A=p/2,
		x=s-p,
		v=s-A,
		y=x-p,
		L=s/2-p/2,
		S=s/2-p,
		M=s/2,

		b=r.map((r,t)=>s*t), 
		E=r[0].map((r,t)=>s*t);
		//var color= ['#000', '#008f39', "#0080FF", "#FF0000", "#9933FF", "#800000","#FF00FF"]; 
	   	var color= ['#000'];
		const randomcolor = color[Math.floor(Math.random() * color.length)];

        class z{ 
		constructor(r,t,e){
			this.svg="",this.dots="",
			this.colour=r,
			this.stroke_width=t,
			this.opacity=e
		}
		path(){return['<path opacity="',this.opacity,'", stroke-width="',this.stroke_width,'" stroke="',this.colour,'" d="',this.svg,' "></path>',this.dots].join("")}
		dot(r,t,e=s/3){
			const l=r+M,o=t+M;
			this.dots+='<circle cx="'+l+'" cy="'+o+'" r="'+e+'" fill-opacity="1.0" stroke-opacity="0" fill="'+randomcolor+'" />'
		}
		posAngle(r) { return r < 0 ? r+a :r}
		polar(r,t,e,l) {return [r+e*Math.cos(l),t+e*Math.sin(l)]}
		a(r,t,e,o,n,a=1) {
			const s=this.posAngle(o),
			    d=this.posAngle(n),
			    [u,h]=this.polar(r,t,e,s),
			    [i,c]=this.polar(r,t,e,d),
			    m=d-s,
			    w=0 < m && m <= l ? 1-a :a;
			this.svg+= ["L",u," ",h," A",e," ",e," 0 ",w," ",a," ",i," ",c," "].join("")
		}

		m(r,t) {this.svg+= ["M",r," ",t," "].join("")}
		l(r,t) {this.svg+= ["L",r," ",t," "].join("")}
		ml(r,t,e,l) {this.m(r,t),this.l(e,l)}
		mh(r,t,e) {this.ml(r,t,r+e,t)}
		mv(r,t,e) {this.ml(r,t,r,t+e)}
		h(r,t,e) {this.ml(r,t+e,r+s,t+e)}
		v(r,t,e) {this.ml(r+e,t,r+e,t+s)}
        	}

        let R=new z("#000000",1.3,"1.0"), U=new z(randomcolor,3,"1.0"), k=new z(randomcolor,3,"0.1");

        const 
	    P=(r,t,e=p)=>{R.m(r+p,t),R.a(r,t,e,0,o)},
            _=(r,t,e=p)=>{R.m(r,t+x),R.a(r,t+s,e,n,a)},
            D=(r,t,e=p)=>{R.m(r+s,t+p),R.a(r+s,t,e,o,l)},
            H=(r,t,e=p)=>{R.m(r+x,t+s),R.a(r+s,t+s,e,l,n)},

            Y=(r,t)=>{
		R.v(r,t,p)
		R.v(r,t,x)
		},
            $=(r,t)=>{
		R.h(r,t,p),
		R.h(r,t,x)
		},
            W=(r,t)=>{
		R.m(r+x,t,m),
		R.l(r+x, t+x),
		R.l(r+p, t+x),
		R.l(r+d,t)
		},
            V=(r,t)=>{
		R.m(r+x,t+s,m)
		R.l(r+x, t+p),
		R.l(r+p, t+p),
		R.l(r+p,t+s)
		},
            j=(r,t)=>{
		R.m(r+s,t+x),
		R.l(r+d,t+x);
		R.l(r+p,t+p),
		R.l(r+s,t+p)
		},
            T=(r,t)=>{
		R.m(r,t+x),
		R.l(r+x,t+x),
		R.l(r+x,t+p),
		R.l(r,t+p)
		},
            q=(r,t)=>{
		D(r,t),
		R.m(r+s,t+x),
		R.a(r+x,t+p,y,o,l),
		R.l(r+p,t)
		},
            F=(r,t)=>{
		H(r,t),
		R.m(r+s,t+p),
		R.a(r+x,t+x,y,n,l,0),
		R.l(r+p,t+s)
		},
            J=(r,t)=>{
		P(r,t),
		R.m(r+x,t),
		R.a(r+p,t+p,y,0,o),
		R.l(r,t+x)
		},
            N=(r,t)=>{
		_(r,t),
		R.m(r,t+p),
		R.a(r+p,t+x,y,n,a),
		R.l(r+x,t+s)
		},
            Q=(r,t)=>{
		R.v(r,t,p),
		D(r,t),
		H(r,t)
		},
            X=(r,t)=>{
		R.v(r,t,x),
		P(r,t),
		_(r,t)
		},
            tr=(r,t)=>{
		R.h(r,t,x),
		P(r,t),
		D(r,t)
		},
            er=(r,t)=>{
		R.h(r,t,p),
		_(r,t),H(r,t)
		},
            lr=(r,t)=>{
		P(r,t),
		_(r,t),
		D(r,t),
		H(r,t)
		},
            or=(r,t)=>{
		R.v(r,t,p),
		R.v(r,t,x),
		R.mh(r,t+p,p),
		R.mh(r,t+x,p),
		R.mh(r+s,t+p,x-s),
		R.mh(r+s,t+x,x-s)
		},
            ar=(r,t)=>{
		R.h(r,t,p),
		R.h(r,t,x),
		R.mv(r+p,t,p),
		R.mv(r+x,t,p),
		R.mv(r+p,t+x,s-x),
		R.mv(r+x,t+x,s-x)
		},

            I=(r,t)=>{U.mv(r+M,t,M)},
            B=(r,t)=>{U.mh(r+s,t+M,-M)},
            C=(r,t)=>{U.m(r+s,t+M),U.a(r+v,t+A,L,o,l),U.l(r+M,t)},
            G=(r,t)=>{U.m(r+s,t+M),U.a(r+v,t+v,L,n,l,0),U.l(r+M,t+s)},
            K=(r,t)=>{U.m(r+M,t),U.a(r+A,t+A,L,0,o),U.l(r,t+M)},
            O=(r,t)=>{U.m(r,t+M),U.a(r+A,t+v,L,n,a),U.l(r+M,t+s)},
            Z=(r,t)=>{U.v(r,t,M)},
            rr=(r,t)=>{U.h(r,t,M)},
            nr=(r,t)=>{U.mh(r,t+M,p),U.mh(r+s,t+M,-p),k.mh(r+p,t+M,S),k.mh(r+x,t+M,-S)},
            sr=(r,t)=>{U.mv(r+M,t,p),U.mv(r+M,t+s,-p),k.mv(r+M,t+p,S),k.mv(r+M,t+x,-S)},

 	    dr={ 1:W,2:V,3:Y,4:j,5:q,6:F,7:Q,8:T,9:J,10:N,11:X,12:$,13:tr,14:er,15:lr,19:or,28:ar},

            ur={
                ArrowDown:{[q.name]:"ArrowRight",[J.name]:"ArrowLeft",[Y.name]:"ArrowDown",[or.name]:"ArrowDown",[ar.name]:"ArrowDown"},
                ArrowUp:{[F.name]:"ArrowRight",[N.name]:"ArrowLeft",[Y.name]:"ArrowUp",[or.name]:"ArrowUp",[ar.name]:"ArrowUp"},
                ArrowRight:{[J.name]:"ArrowUp",[N.name]:"ArrowDown",[or.name]:"ArrowRight",[$.name]:"ArrowRight",[ar.name]:"ArrowRight"},
                ArrowLeft:{[q.name]:"ArrowUp",[F.name]:"ArrowDown",[or.name]:"ArrowLeft",[$.name]:"ArrowLeft",[ar.name]:"ArrowLeft"}
		},
            hr=r.map(r=>r.map(r=>dr[r])),
            ir={t:{ l:K,r:C,b:Z},
                l:{t:K,r:rr,b:O},
                r:{l:rr,t:C,b:G},
                b:{l:O,r:G,t:Z
                }},
            cr={r:B,l:(r,t)=>{U.mh(r,t+M,M)},
                b:(r,t)=>{U.mv(r+M,t+s,-M)},
                t:I},
            mr=new Set([q,F,J,N,$,Y,or,ar]),
            wr=new Set([W,q,J,Q,X,tr,or,ar,Y,lr]),
            fr=new Set([V,F,N,Q,X,er,or,ar,Y,lr]),
            gr=new Set([j,q,F,Q,$,tr,er,or,ar,lr]),
            pr=new Set([T,J,N,X,$,tr,er,or,ar,lr]);

        let Ar=[[0,t-1]];

        let vr=0, yr=t-1;

        const xr=(r,t)=>0 == r ?-1 == t ? "b" :"t" :-1 == r ? "r" :"l";
        const Lr=r =>{
		let l,o,n=vr,
		a=yr;
                switch (r) {
                    case "ArrowDown":
                        a=yr < t-1 ? yr+1 :yr,l=fr,o=wr;
                        break;
                    case "ArrowUp":
                        a=yr > 0 ? yr-1 :yr,l=wr,o=fr;
                        break;
                    case "ArrowRight":
                        n=vr < e-1 ? vr+1 :vr,l=gr,o=pr;
                        break;
                    case "ArrowLeft":
                        n=vr > 0 ? vr-1 :vr,l=pr,o=gr
                }

                if (console.log(n,a),n===vr && a===yr) return console.log("false 1"),!1;
                const s=hr[yr][vr];
                console.log("a-b",n,a,hr[a][n],"name",hr[a][n].name);
                const d=hr[a][n];
                return l.has(s) && o.has(d) ? (vr=n,yr=a,Ar.length > 1 && Ar.slice(-2)[0][0] == vr && Ar.slice(-2)[0][1] == yr ? Ar=Ar.slice(0,Ar.length-1) :Ar.push([vr,yr]),vr == e-1 && 0 == yr ? (console.log("false 3"),!1) :mr.has(d) ? (console.log("false 4",r,d.name,ur[r][d.name]),ur[r][d.name]) :(console.log("false 5"),!1)) :(console.log("false 2"),!1)},
	    
            Sr=valor=>{
		 var greetings = [
			      "El mundo que hemos creado es un proceso de nuestro pensamiento. No se puede cambiar sin cambiar nuestra forma de pensar.",
			      "Debo estar dispuesto a renunciar a lo que soy con el fin de convertirse en lo que seré.",
			      "Hay una fuerza motriz más poderosa que el vapor, la electricidad y la energía atómica: la voluntad.",
			      "Existen dos formas de ver la vida: una es creyendo que nada es un milagro, la otra es creyendo que todo es un milagro.",
			      "En medio de la dificultad reside la oportunidad.",
			      "En medio de la dificultad reside la oportunidad.",
			      "Todos sabemos que la luz viaja más rápido que el sonido. Es por eso que algunas personas parecen brillantes hasta que las escuchamos hablar.",
			      "La medida de la inteligencia es la capacidad de cambiar.",
			      "El tiempo es una ilusión.",
			      "Somos arquitectos de nuestro propio destino.",
			      "La creatividad es la inteligencia divirtiéndose.",
			      "Lo importante es no dejar de cuestionar. La curiosidad tiene su propia razón de existir.",
			      "La búsqueda de la verdad y la belleza es una actividad que nos permite seguir siendo niños toda la vida.",
			      "Sólo aquellos que intentan el absurdo pueden lograr lo imposible.",
			      "Si no puedes controlar lo que está pasando, intenta controlar cómo reacciones a la situación. Ahí es donde está el poder.",
			      "Se mide la inteligencia de un individuo por la cantidad de incertidumbres que es capaz de soportar ",
			      "Alguien inteligente aprende de la experiencia de los demás",
			      "Sólo la inteligencia se examina a sí misma",
			      "Las inteligencias poco capaces se interesan en lo extraordinario; las inteligencias poderosas, en las cosas ordinarias",
			      "El tiempo es el único capital de las personas que no tienen más que su inteligencia por fortuna",
			      "Los locos abren los caminos que más tarde recorren los sabios",
			      "No es que el genio se adelante un siglo a su tiempo, es la humanidad la que se encuentra cien años por detrás de él",
			      "Cuando no comprendemos una cosa, es preciso declararla absurda o superior a nuestra inteligencia, y generalmente, se adopta la primera determinación",
			      "En ciertos momentos, la única forma de tener razón es perdiéndola",
			      "Así como el hierro se oxida por falta de uso, así también la inactividad destruye el intelecto",
			      "Así como el hierro se oxida por falta de uso, así también la inactividad destruye el intelecto",
			      "La imaginación es más importante que el conocimiento. El conocimiento es limitado y la imaginación circunda el mundo",
			      "La curiosidad es una de las más permanentes y seguras características de una vigorosa inteligencia",
			      "El cerebro humano es como una máquina de acuñar monedas. Si echas en ella metal impuro, obtendrás escoria; si echas oro, obtendrás moneda de ley",
			      "Vale más saber alguna cosa de todo, que saberlo todo de una sola cosa",
			      "Nada es más peligroso que una idea cuando no se tiene más que una",
			      "Cuando las expectativas de uno se reducen a cero, uno aprecia realmente todo lo que tiene",
			      "Inteligencia y belleza: gran rareza ",
			      "La obligación primaria de la inteligencia es desconfiar de ella",
			      "Cuando se comprende que la condición humana es la imperfección del entendimiento, ya no resulta vergonzoso equivocarse, sino persistir en los errores",
			      "Lo que sabemos es una gota de agua; lo que ignoramos es el océano",
			      "Se necesita un gran conocimiento sólo para darse cuenta de la enormidad de la propia ignorancia",
			      "La sabiduría nos llega cuando ya no nos sirve de nada",
			      "El insensato que reconoce su insensatez es un sabio. Pero un insensato que se cree sabio es, en verdad, un insensato ",
			      "Lo que quiere el sabio, lo busca en sí mismo; el vulgo, lo busca en los demás",
			      "El que parece sabio, entre los tontos, parece tonto entre los sabios",
			      "Inteligencia: conócete, acéptate, supérate",
			      "La mayoría prefiere pagar por entretenerse que por instruirse",
			      "La mayoría prefiere pagar por entretenerse que por instruirse",
			      "La mayoría prefiere pagar por entretenerse que por instruirse",
			      "La creatividad requiere tener el valor de desprenderse de las certezas",
			      "Cuando hables, procura que tus palabras sean mejores que el silencio",
			      "Ser un intelectual genera un montón de preguntas y ninguna respuesta"
		 ];
		var greeting_id = Math.floor(Math.random() * greetings.length);    
		    
		    
		let r=valor;
		let t=r;
                for (; t;) t=Lr(t);
                if (U.svg="",U.dots="",k.svg="",Ar.length > 1)
                    for (let r=0; r < Ar.length; r++) {
                        const [t,e]=Ar[r];
                        if (r == Ar.length-1) {
				const [l,o]=Ar[r-1],n=xr(t-l,e-o);
				cr[n](t*s,e*s),U.dot(t*s,e*s,s/5);
				document.getElementById("link").value =  window.location;
				if (t*s==E[E.length-1] && e*s==b[0]){
				     document.getElementById("mensaje").innerHTML = '¡Felicitaciones lo lograste! '
				}
                        }
			else {
                            const [l,o]=Ar[r+1];
                            if (0 == r) t == l ? I(t*s,e*s) :B(t*s,e*s);
                            else {const [n,a]=Ar[r-1],d=xr(t-n,e-a),u=xr(t-l,e-o),h=ir[d][u],i=hr[e][t];h == rr && i == or ? nr(t*s,e*s) :h == Z && i == ar ? sr(t*s,e*s) :h(t*s,e*s)}
                        }
                    }
                document.getElementById("maze").innerHTML=k.path()+U.path()+R.path()
            };

        let 
		Mr=document.getElementById("maze");
		Mr.setAttribute("width",e*s),
		Mr.setAttribute("height",t*s),
		document.getElementById("inner").setAttribute("style","height:"+t*s+"px;width:"+e*s+"px");
        const 
		br=E.length,
		Er=b.length;

        for (let r=0; r < Er; r++) for (let t=0; t < br; t++) 0 == t && r == Er-1 || t == br-1 && 0 == r || hr[r][t](E[t],b[r]);

	//circles star and end
        R.dot(E[0],b[b.length-1], ),
	R.dot(E[E.length-1],b[0]),
	Mr.innerHTML=k.path()+U.path()+R.path(),
	document.body.onkeydown=(valor=>Sr(valor.code)),
	document.getElementById("bottom").onclick=(valor=>Sr('ArrowDown')),
	document.getElementById("top").onclick=(valor=>Sr('ArrowUp')),
	document.getElementById("left").onclick=(valor=>Sr('ArrowLeft')),
	document.getElementById("right").onclick=(valor=>Sr('ArrowRight'));


        const zr=document.levelform.nivel;
	var nivelrandom= ['basico','intermedio','avanzado','experto','leyenda','intermedio']; 
	const randomnivel = nivelrandom[Math.floor(Math.random() * nivelrandom.length)];
	    
        for (let r=0; r < zr.length; r++) zr[r].onclick=function() {
            //const r=this.value;
	    const r=randomnivel;
            change_id();
            let t=new URL(window.location);
            t.searchParams.set("nivel",r),t.searchParams.set("ruta",""),window.history.replaceState(null,"Maze",t.href);
	    
            const e=create_maze(LEVELS[r].W,LEVELS[r].H);
            draw_maze(e);
	    document.getElementById("link").value =  window.location;
	    document.getElementById("mensaje").innerHTML = ''
        };

        const Rr={
                u:"ArrowUp",
                d:"ArrowDown",
                l:"ArrowLeft",
                r:"ArrowRight"
		},

            Ur={ l:"l", r:"r", u:"u", d:"d", b:"lu", c:"lul", e:"lulu", f:"luld", g:"lur", h:"luru", i:"lurd", j:"ld", k:"ldl", m:"ldlu", n:"ldld", o:"ldr", p:"ldru", q:"ldrd", s:"ru", t:"rul", v:"rulu", w:"ruld", x:"rur", y:"ruru", z:"rurd", A:"rd", B:"rdl", C:"rdlu", D:"dld", E:"rdr", F:"rdru", G:"rdrd", H:"ul", I:"ulu", J:"ulul", K:"ulur", L:"uld", M:"uldl", N:"uldr", O:"ur", P:"uru", Q:"urul", R:"urur", S:"urd", T:"urdl", U:"urdr", V:"dl", W:"dlu", X:"dlul", Y:"dlur", Z:"dld", "+":"dldl", "-":"dldr", "/":"dr", "*":"dru", "!":"drul", "@":"drur", "#":"drd", $:"drdl", "^":"drdr"},
            kr=new Set(["2","3","4","5","6","7","8","9"]),
            Pr=(r=>{if (null===r) return "";
                let t="";
                const e=r.split("");
                let l=!1,o=-1;
                for (const r of e) o+= 1,l ? l=!1 :kr.has(r) ? (t+= e[o+1].repeat(r),l=!0) :t+= r;
                let n="";
                for (const r of t.split("")) n+= Ur[r];
                return n
            })(new URL(window.location).searchParams.get("ruta"));
	
        for (let r of Pr.split("")) Lr(Rr[r]);
        Sr(null),document.body.onkeyup=(r=>{
            let t="";
	  
            const e=(r,t)=>t[0] == r[0] ? t[1] > r[1] ? "d" :"u" :t[0] > r[0] ? "r" :"l";
            for (const [r,l] of Ar.entries()) {
                if (0===r) continue; t+= e(Ar[r-1],l)
            }
            const l=(r=>{let t="", e=r;
			const l=[ ["drdr","^"], ["drdl","$"], ["drur","@"], ["drul","!"], ["dldr","-"], ["dldl","+"], ["dlur","Y"], ["dlul","X"], ["urdr","U"], ["urdl","T"], ["urur","R"], ["urul","Q"], ["uldr","N"], ["uldl","M"], ["ulur","K"], ["ulul","J"], ["rdrd","G"], ["rdru","F"], ["rdld","D"], ["rdlu","C"], ["rurd","z"], ["ruru","y"], ["ruld","w"], ["rulu","v"], ["ldrd","q"], ["ldru","p"], ["ldld","n"], ["ldlu","m"], ["lurd","i"], ["luru","h"], ["luld","f"], ["lulu","e"], ["drd","#"], ["dru","*"], ["dld","Z"], ["dlu","W"], ["urd","S"], ["uru","P"], ["uld","L"], ["ulu","I"], ["rdr","E"], ["rdl","B"], ["rur","x"], ["rul","t"], ["ldr","o"], ["ldl","k"], ["lur","g"], ["lul","c"], ["dr","/"], ["dl","V"], ["ur","O"], ["ul","H"], ["rd","A"], ["ru","s"], ["ld","j"], ["lu","b"] ];
                    for (; e;) {
                        let r=!1;
                        for (const [o,[n,a]] of l.entries())
                            if (e.startsWith(n)) {
                                e=e.substring(n.length),t+= a,r=!0;
                                break
                            } r || (t+= e[0],e=e.substring(1))
                    }
                    let o="",n="",a=1;
                    for (const r of t.split("")) n == r && a < 9 ? a+= 1 :(a > 1 && (o+= a),a=1,o+= n,n=r);
                    return a > 1 && (o+= a),o+= n
                })(t),
                o=new URL(window.location);o.searchParams.set("ruta",l),window.history.replaceState(null,"Maze",o.href)
        })
    },
    create_maze=(r,t)=>{
        const [e,l,o,n,a]=[1,2,4,8,16],
		s=[0,0,0,0,1,0,0,0,-1],
		d=[0,-1,1,0,0,0,0,0,0],
		u=[0,2,1,0,8,0,0,0,4],
		h=o|n|a,i=e|l|a,
		c=e|l|n|o,
		m=r=>{ for (let t=0; t < r.length; t++) { const e=Math.floor(Math.random()*(t+1)); [r[t],r[e]]=[r[e],r[t]] } return r };

        let w=new Set, f=new Set;
        const g=(r,t)=>f[[r.x,r.y]]===f[[t.x,t.y]], p=(r,t)=>{const e=f[[r.x,r.y]],l=f[[t.x,t.y]];w[e].add(l); const o=w[l];w[e]=new Set([...w[e],...o]),w[l]=new Set,w[e].forEach(r=>{f[r]=e})};
	
	var complex= [0.3,0.4,0.5,0.6,0.7,0.8,0.9,0.09,0.08,0.07,0.06,0.05,0.04,0.03,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]; 
	const randomcomplex = complex[Math.floor(Math.random() * complex.length)];
	    

        return ((r,t,a)=>{
            const A=[...Array(t)].map(()=>Array(r).fill(0)), x=[...Array(t)].map((t,e)=>[...Array(r)].map((r,t)=>new class { constructor(r,t) {this.x=r,this.y=t,w[[r,t]]=new Set,f[[r,t]]=[r,t]}}(t,e)));
            let v=[];
            for (let l=0; l < t; l++)
                for (let t=0; t < r; t++) l > 0 && v.push([t,l,e]),t > 0 && v.push([t,l,n]);
            m(v);
            for (let s=1; s < t-1; s++)
                for (let t=1; t < r-1; t++) {
                    if (Math.random() < a) continue;
                    const [r,d]=[t,s-1],[u,c]=[t-1,s],[m,w]=[t+1,s],[f,y]=[t,s+1],L=x[w][m],S=x[d][r],M=x[y][f],b=x[c][u];
                    0 !== A[s][t] || g(S,M) || g(L,b) || (p(S,M),p(L,b),A[s][t]=Math.random() <= .5 ? h :i,A[d][r] |= l,A[c][u] |= o,A[w][m] |= n,A[y][f] |= e,v=v.filter(r=>{const [l,o,a]=r;
                        return !(l===t && o===s || l===m && o===w && a===n || l===f && o===y && a===e)
                    }))
                }
            for (; v.length > 0;) { const [r,t,e]=v.pop(),[l,o]=[r+s[e],t+d[e]],[n,a]=[x[t][r],x[o][l]]; g(n,a) || (p(n,a),A[t][r] |= e,A[o][l] |= u[e]) }
            let y=[];
            for (let e=1; e < t-2; e+= 2)
                for (let t=1; t < r-2; t+= 2) A[e][t] !== i && A[e][t] !== h || y.push([e,t]);
            if (y.length > 0) {m(y);const [r,t]=y[0];A[r][t]=c}
            return A
        })(r,t,randomcomplex)
    },

    init=()=>{
        const r = new URL(window.location);
        let t = r.searchParams.get("nivel");
        null===t && (t = 'basico'),r.searchParams.set("nivel", t), window.history.replaceState(null, "Maze", r.href);
        const e = r.searchParams.get("id");
        null===e ? change_id() :Math.seedrandom(e);
	const l = create_maze(LEVELS[t].W, LEVELS[t].H);
	alert('Para una mejor experiencia usa auriculares: la música de fondo esta acompañada por una fuente de sonido diferente en cada auricular que estimula las ondas ALFA (Terapia Binaural)');
        document.getElementById("link").value =  window.location;
	draw_maze(l)
	  
    };
