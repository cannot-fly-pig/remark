let orangeFlag = 0;
window.onload = function(){
		make_editer();
		let overview = document.getElementById("overview");
		let sortable = Sortable.create(overview,{
				onEnd: (e) => {
						movePage(e.oldIndex-1,e.newIndex-1);
				}
		});
}
$(window).resize(function(){
		page_style();
})

function movePage(from, to) {
		f = $(".CodeMirror").eq(from);
		$(".CodeMirror").eq(from).remove();
		if(to != 0) $(".CodeMirror").eq(to-1).after(f);
		else $(".CodeMirror").eq(to).before(f);

}

function make_editer(){
		requirejs([
		"codemirror",
		"hypermd",
		"codemirror/mode/stex/stex",
		"hypermd/powerpack/fold-math-with-katex",
		"hypermd/powerpack/paste-with-turndown", "turndown-plugin-gfm",
		], function (CodeMirror, HyperMD) {
		console.log(HyperMD);
		var myTextarea = document.createElement("textarea");
		$("#preview").append(myTextarea);
		var editor = HyperMD.fromTextArea(myTextarea, {
		lineNumbers: false,
		//scrollbarStyle: "null"
		});
		editor.setSize("65%",null);
		editor.focus();
		page_style();
		editor.on("change",function(){
				let height = $(".CodeMirror-focused .CodeMirror-code").height();
				if(height >= $(".CodeMirror-focused .CodeMirror-scroll").height() * 0.95){
						make_editer();
				}
		})
});
}


$(".humberger").on("click",function(){
		if($(".row").has("#preview").hasClass("open")){
				$(".row").has("#preview").removeClass("open");
				page_style();
		}else{
				realtime_preview();
				$(".row").has("#preview").addClass("open");
				page_style();
		}

})

function realtime_preview(){
		$(".preview-img").remove()
		const elements = document.getElementsByClassName("CodeMirror");
		for(let i=0;i<elements.length;i++){
				html2canvas(elements[i]).then(function(canvas){
						const url = canvas.toDataURL();
						let img = document.createElement("img");
						img.classList.add("preview-img");
						img.classList.add("shadow-gray");
						img.id = "preview-img" + String(i);
						img.addEventListener("mouseover",() => {
								if(!orangeFlag){
										let imgs = img.parentNode.children;
										for (let i=0;i<imgs.length;i++){
												imgs[i].classList.remove("shadow-orange");
												imgs[i].classList.add("shadow-gray");
										}
										img.classList.remove("shadow-gray");
										img.classList.add("shadow-orange");
								}
						})
						img.addEventListener("mouseleave",() => {
								if(!orangeFlag){
										img.classList.remove("shadow-orange");
										img.classList.add("shadow-gray");
								}
						})
						img.addEventListener("click",() => {
								orangeFlag = 1;
								img.classList.add("shadow-orange");
						})
						window.document.addEventListener("click",(e) => {
								if(!e.path[0].classList.contains("shadow-orange")){
										orangeFlag = 0;
										$(".shadow-orange").removeClass("shadow-orange");
										$(".shadow-orange").addClass("shadow-shadow");
								}
						})
						img.src = url;
						$(".overview").append(img);
				})
		}
}

function page_style(){
		let width;
		width = $(".CodeMirror").width();
		$(".CodeMirror").css("fontSize",String(width * 0.01761904761)+"px");
		$(".CodeMirror").height(width * 297 / 210);
		$(".CodeMirror").css("padding-left",String(width * 15 / 210) + "px");
		$(".CodeMirror").css("padding-right",String(width * 15 / 210) + "px");
		$(".CodeMirror").css("padding-top",String(width * 25 / 210) + "px");
		$(".CodeMirror").css("padding-bottom",String(width * 25 / 210) + "px");
		//$(".CodeMirror-scroll").width(width * 16 / 21);
		//$(".CodeMirror-scroll").height(width * 297 /210 * 6 / 7);
		$(".CodeMirror-scroll").css("margin",0);
		$(".CodeMirror-scroll").css("padding",0);
}

async function make_pdf(){
		let doc = new jsPDF();
		let width = doc.internal.pageSize.width;    
		let height = doc.internal.pageSize.height;
		i = 1
		const elements = document.getElementsByClassName("CodeMirror");
		for(let i=0;i<elements.length;i++){
				html2canvas(elements[i]).then(function(canvas){
						if(i != 0) doc.addPage();
						doc.setPage(i+1);
						const url = canvas.toDataURL();
						doc.addImage(url, 'JPEG', 0, 0, width, height);
						console.log(i);
				}).then(function(){
						if(i == $(".CodeMirror").length - 1) save_pdf(doc);
				})	
		}
}

function save_pdf(doc){
		doc.save("test.pdf");
		console.log("fin");
}
//
//function pdf(){
//		make_pdf().then(function(doc){
//				console.log(doc);
//				save_pdf(doc);
//		})
//}
//
function make_menu(){
		let template = [{
		  label: 'file',
		  submenu: [{
				  label: "save"
		  },{
				  label: "save as"
		  },{
			label: 'export as',
		    submenu: [{
					label: "export to pdf",
					click: async () => {make_pdf()}
			},{
					label: "export to md"
			},{
					label: "export to html"
			}]
		  }]
		}]
		const menu = Menu.buildFromTemplate(template)
		Menu.setApplicationMenu(menu)
}
async function new_page(){
		await make_editer()
		realtime_preview()
}
