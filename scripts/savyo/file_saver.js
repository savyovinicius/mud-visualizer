function file_saver(text, name, type, element_id) {
	var dlbtn = document.getElementById(element_id);
	var file = new Blob([text], {type: type});
	dlbtn.href = URL.createObjectURL(file);
	dlbtn.download = name;
}