console.log("hello")
let radio_Inputs = document.querySelectorAll("input[type='radio']");
const upload_computer_container = document.querySelector(".upload_computer_container")

const upload_web_container = document.querySelector(".upload_web_container")

const upload_computer_button = document.querySelector(".upload_computer_button")

const file_input = document.querySelector(".file_input")
const preview_image = document.querySelector(".preview_image")

const image_preview_showcase = document.querySelector(".image_preview_showcase")
const closeImage = document.querySelector(".close_image")
closeImage.addEventListener("click", (e) => {

    image_preview_showcase.classList.add("d-none")
})
const extImages = {
    pdf: "picture_as_pdf",
    docx: "insert_drive_file",
    pptx: "collections",
    jpeg: "wallpaper",
    jpg: "wallpaper",
    png: "wallpaper",
    svg: "wallpaper",
    mp4: "video_library",
    mp3: "library_music",
    zip: "layers",
    rar: "layers",
    other: "pages"

}
console.log(extImages["png"], "hello")
const uploaded_files = []
let fullPath = ""
document.querySelector(".submitButton").addEventListener("click", async (e) => {
    e.preventDefault();
    let formData = new FormData();

    formData.set("file", file_input.files)
    console.log(file_input.files[0], formData)
    try {
        const response = await axios({
            method: "post",
            url: "/",
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formData,
            onUploadProgress: (upload) => {
                console.log(upload.loaded)
            }
        })
        console.log(response)


    } catch (err) {
        console.log(err)
    }


})

preview_image.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(fullPath)

    image_preview_showcase.classList.remove("d-none")

})


displayFilePreview = (files) => {
    files.map((file) => {
        let extNameIndex = String(file.name).lastIndexOf(".")
        let extName = String(file.name).substring(extNameIndex + 1, file.name.length)
        console.log(extName)
        extName = extName.toLowerCase()

        const listItem = document.createElement("li");
        image_preview_showcase.appendChild(listItem)
        console.log(file)
        listItem.classList.add("card")


        listItem.style.padding = '8px'
        listItem.style.marginBottom = "10px"
        listItem.style.color = "black"
        listItem.style.backgroundColor = "white"
        console.log(extImages[extName])
        listItem.innerHTML = `
        <i class="material-icons mr-2 text-success ">done</i>
        <h5>${file.name}</h5>
        <i class="material-icons ml-3 text-primary">${extImages[extName]}</i>
        <p class="ml-2 d-inline">${Math.round(file.size / 1024)} KB</p>
        <i class="material-icons float-right rounded-circle bg-danger p-1 text-light" style="font-size:10px;">close</i>`


    })
}


file_input.addEventListener("change", (e) => {
    console.log(e.target.files)
    let files = Array.from(e.target.files);
    files.forEach(file => {
        uploaded_files.push(file)
    })
    preview_image.classList.remove("d-none")

    displayFilePreview(uploaded_files)

})


upload_computer_button.addEventListener(("click"), (e) => {
    console.log(e.target.nextSibling)
    file_input.click();

})
radio_Inputs.forEach((input) => {
    input.addEventListener("click", (e) => {
        console.log(e)
        if (!e.target.classList.contains('upload_computer')) {
            console.log("object")
            upload_web_container.classList.remove("d-none")
            upload_computer_container.classList.add("d-none")
        }



        else {

            upload_web_container.classList.add("d-none")
            upload_computer_container.classList.remove("d-none")



        }
    })
})

const getFileName = (fullPath) => {
    console.log(fullPath)
    let startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
    let filename = fullPath.substring(startIndex);
    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
    }

    console.log(filename)
    return filename

}
