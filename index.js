requirejs.config({
		baseUrl: "https://cdn.jsdelivr.net/npm/",
		packages: requirejs_packages,
		// You may add more RequireJS config
		waitSeconds: 30
})
window.onload = function(){
		requirejs([
		"codemirror",
		"hypermd",
		"codemirror/mode/stex/stex",
		"hypermd/powerpack/fold-math-with-katex",
		"hypermd/powerpack/paste-with-turndown", "turndown-plugin-gfm",
		], function (CodeMirror, HyperMD) {
		var myTextarea = document.getElementsByClassName('page')[0];
		var editor = HyperMD.fromTextArea(myTextarea, {
		lineNumbers: false,
		scrollbarStyle: "null"
		});
		editor.setSize("65%",null);
		editor.focus();
		page_style();
});
}
$(window).resize(function(){
		page_style();
})

const observer = new MutationObserver(function (mutations) {
		realtime_preview();
});
observer.observe($(".page")[0],{
		childList: true
})

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
		$(".CodeMirror").each(function(){
				html2canvas(this).then(function(canvas){
						const url = canvas.toDataURL();
						let img = document.createElement("img");
						img.classList.add("preview-img");
						img.classList.add("shadow-lg");
						img.src = url;
						$(".overview").append(img);
				})
		})
}

function page_style(){
		let width;
		width = $(".CodeMirror").width();
		console.log(width);
		//$(".CodeMirror").css("fontSize",String(width * 0.01761904761)+"px");
		//$(".CodeMirror").height(width * 297 / 210);
		//$(".CodeMirror").css("padding-left",String(width * 15 / 210) + "px");
		//$(".CodeMirror").css("padding-right",String(width * 15 / 210) + "px");
		//$(".CodeMirror").css("padding-top",String(width * 25 / 210) + "px");
		//$(".CodeMirror").css("padding-bottom",String(width * 25 / 210) + "px");
		//$(".CodeMirror-scroll").width(width * 16 / 21);
		//$(".CodeMirror-scroll").height(width * 297 /210 * 6 / 7);
		//$(".CodeMirror-scroll").css("margin",0);
		//$(".CodeMirror-scroll").css("padding",0);

}
