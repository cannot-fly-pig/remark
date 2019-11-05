window.onload = function(){
		var options = {
		  editor: document.getElementsByClassName("page")[0],
		  class: 'pen',
		  debug: false, 
		}
		let pen = window.pen = new Pen(options);
		pen.focus();
		page_style();
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
		$(".page").each(function(){
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
		width = $(".page").width();
		console.log(width);
		$(".pen").css("fontSize",String(width * 0.01761904761)+"px");
		$(".page").height(width * 297 / 210);
		$(".page").css("padding-left",String(width * 15 / 210) + "px");
		$(".page").css("padding-right",String(width * 15 / 210) + "px");
		$(".page").css("padding-top",String(width * 25 / 210) + "px");
		$(".page").css("padding-bottom",String(width * 25 / 210) + "px");

}
