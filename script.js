const fileInput = document.getElementById("fileInput");
const convertButton = document.getElementById("convertButton");
const resultDisplay = document.getElementById("result");

convertButton.addEventListener("click", function () {
     event.preventDefault();

    const file = fileInput.files[0];
    console.log(file);

    if (file) {
        const extension = file.name.split(".").pop();  //check and store the extension of file
        const newExtansion = prompt("Enter the new extension: "); //enter the new extension of file

        if (newExtansion) {
            const newFileName = file.name.replace(extension, newExtansion); //now replace the extension

            const reader = new FileReader();//read the file content

                reader.onload = function() {
                    const blob = new Blob([reader.result], { type: file.type });
                    const url = window.URL.createObjectURL(blob); //generate a url

                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    a.download = newFileName;
                    document.body.appendChild(a);

                    a.click();
                    

                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a); 
                };

                reader.readAsArrayBuffer(file);
            resultDisplay.textContent = `New file name: ${newFileName}`;


        }
        else {
            resultDisplay.textContent = "Extension change cancle! ";
        }
    } else {
        resultDisplay.textContent = "Please select a file : ";
    }


})
