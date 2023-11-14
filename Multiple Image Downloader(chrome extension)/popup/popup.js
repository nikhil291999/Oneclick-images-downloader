var images = [];

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
 
    console.log("these are all tabs",tabs,tabs[0],tabs[0].id);
    
    chrome.tabs.sendMessage(tabs[0].id, {action: "get_images"}, response => {
        document.querySelector('.gallery').innerHTML='';
        
        images = response;
        // console.log(images);
        response.map((img) => {
           
            const image = document.createElement("img");
            image.src=img.src;
           
            document.querySelector('.gallery').appendChild(image);
            image.addEventListener('click',(e)=>{
            //   console.log(e.path[0])
                var oneImage = [];
                oneImage.push({src:e.path[0].src})

                chrome.runtime.sendMessage({action: "download", data: oneImage}, res => {
                    console.log("Completed");
                })
            })

          
        })
    })
})


document.querySelector('#download_all').addEventListener('click',(e)=>{
    console.log("Downloading all");
    chrome.runtime.sendMessage({action: "download", data: images}, res => {
        console.log("Completed");
    })
})

