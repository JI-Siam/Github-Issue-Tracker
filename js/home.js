
fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues").then((res) => res.json()).then((json) =>{
    console.log(json.data) ;
    console.log(json.data.length) ; 
    issueCount.innerText=`${json.data.length} Issues` ; 
    displayData(json.data) ;
}); 

const issueCount = document.getElementById('issues-cnt'); 
const itemsContainer = document.getElementById('items-container') ; 
console.log(itemsContainer) ;

function displayData(data){

    data.forEach(element => {
        const newElement = document.createElement('div')  ; 

        newElement.innerHTML=`
             <div class="issue-card p-5 flex flex-col gap-5 ">
                <div class="flex flex-wrap justify-between items-center">
                    <img src= ${element.status== "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"} alt="closed">
                    <h2 class="priority px-4 py-2 text-xl font-bold rounded-4xl">
                    ${element.priority}</h2>
                </div>

                <div class="space-y-3">
                    <h2 class="font-bold text-2xl">${element.title}</h2>
                    <h4 class="text-gray-400">${element.description}</h4>

                    <div class="flex flex-wrap gap-4 ">
                        <h3 class="px-4 py-2 text-red-600 bg-red-100 rounded-4xl">BUG</h3>

                        <h3 class="px-4 py-2 text-yellow-600 bg-yellow-200 rounded-4xl">Help Wanted</h3>
                    </div>
                </div>

                <hr class="text-gray-300">
                <div>
                    <p class="text-gray-400">${element.author}</p>
                    <p class="text-gray-400">${element.createdAt}</p>
                </div>

            </div>
        `; 
        if(element.status == "open"){
            newElement.classList.add("border-green-50",  "border-t-green-500" , "rounded-2xl",  "border-2"); 
        }
        else{
             newElement.classList.add("border-purple-50",  "border-t-purple-500" ,  "rounded-2xl",  "border-2"); 
        }

        // const priorityElement = newElement.querySelector('.priority') ; 

        // if(priority== "low"){
        //     priorityElement.classList.add(' bg-purple-100',  'text-purle-600'); // purple
        // }
        // else if( priority = "high"){
        //      priorityElement.classList.add(' bg-red-100',  'text-red-600'); // red 
        // }
        // else{
        //       priorityElement.classList.add(' bg-yellow-100',  'text-yellow-600'); // yellow
        // }
        console.log(element.status) ;
        console.log(newElement) ;

        itemsContainer.appendChild(newElement) ; 
    });
    
}

