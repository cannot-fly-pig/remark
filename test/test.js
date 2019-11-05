requirejs.config({
		baseUrl: "https://cdn.jsdelivr.net/npm/",
		packages: requirejs_packages,
		// You may add more RequireJS config
		waitSeconds: 30
})

requirejs([
	  "codemirror",
	  "hypermd",
	  "codemirror/mode/stex/stex",
	  "hypermd/powerpack/fold-math-with-katex",
	  "hypermd/powerpack/paste-with-turndown", "turndown-plugin-gfm",
	], function (CodeMirror, HyperMD) {
	  var myTextarea = document.getElementById('myTextarea')
	  var editor = HyperMD.fromTextArea(myTextarea, {
		// you may add CodeMirror/HyperMD config here
	  })
	  // and that's all
	  // now you get a `editor` and you can do whatever you want
	  editor.setSize(null, "900px") // set height
	  editor.focus()
	});
