export  function filepicker(callback:any, value:any, meta:any) {

    if (meta.filetype == 'image') {
        var input:any = document.getElementById('my-file');
        input.click();
        input.onchange = function () {
            var file = input.files[0];
            var reader = new FileReader();
            reader.onload = function (e:any) {
                console.log('name',e.target.result);
                callback(e.target.result, {
                    alt: file.name
                });
            };
            reader.readAsDataURL(file);
        };
    }

}

