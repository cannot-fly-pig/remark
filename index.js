requirejs.config({
		baseUrl: "./node_modules/",
		packages: requirejs_packages,
		// You may add more RequireJS config
		waitSeconds: 30
})
window.onload = function(){
		make_editer();
}
$(window).resize(function(){
		page_style();
})

function make_editer(){
		requirejs([
		"codemirror",
		"hypermd",
		"codemirror/mode/stex/stex",
		"hypermd/powerpack/fold-math-with-katex",
		"hypermd/powerpack/paste-with-turndown", "turndown-plugin-gfm",
		], function (CodeMirror, HyperMD) {
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
		$(".overview").empty();
		const elements = document.getElementsByClassName("CodeMirror");
		for(let i=0;i<elements.length;i++){
				html2canvas(elements[i]).then(function(canvas){
						const url = canvas.toDataURL();
						let img = document.createElement("img");
						img.classList.add("preview-img");
						img.classList.add("shadow-lg");
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
