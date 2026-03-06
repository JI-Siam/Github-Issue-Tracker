
const issueCount = document.getElementById('issues-cnt'); 
const itemsContainer = document.getElementById('items-container') ; 
const allBtn = document.getElementById('all-btn') ;
const openBtn = document.getElementById('open-btn') ;
const closedBtn = document.getElementById('closed-btn') ;
console.log(itemsContainer) ;


const getData = async ()=>{
   const jsonRes = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues"); 
   const jsonData = await jsonRes.json() ; 
   console.log(jsonData.data) ; 
   return jsonData.data; 
}


async function displayData(state){
    let data =await getData() ; 
    itemsContainer.replaceChildren() ; 
   // console.log(data);
   // filter the data according to state 0 - all , 1- open , 2-closed
   if(state == 1 ){
        data = data.filter((data) => data.status == "open") ;
        console.log(data) ;
   }
   else if(state == 2 ){
        data = data.filter((data) => data.status == "closed") ;
        console.log(data) ; 
   }
   else{
    // do nothing if state 0 
   }
    issueCount.innerText=`${data.length} Issues` ; 

    data.forEach(element => {
        const newElement = document.createElement('div')  ; 

        newElement.innerHTML=`
             <div onclick="displayModal(${element.id})" class="issue-card p-5 flex flex-col gap-5 ">
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

function removeBtnActive(){
    allBtn.classList.remove('btn-primary') ; 
    openBtn.classList.remove('btn-primary') ; 
    closedBtn.classList.remove('btn-primary'); 
}

allBtn.addEventListener('click' , ()=>{
    removeBtnActive(); 
    allBtn.classList.add('btn-primary') ; 
    displayData(0) ; 
})


openBtn.addEventListener('click' , ()=>{
     removeBtnActive(); 
    openBtn.classList.add('btn-primary') ; 
    displayData(1) ; 
})


closedBtn.addEventListener('click' , ()=>{
     removeBtnActive(); 
    closedBtn.classList.add('btn-primary') ; 
    displayData(2) ; 
})

function displayModal(id){
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`).then((res) => res.json()).then((json) =>{
        console.log(json.data) ;
        my_modal_5.showModal();

        

        
    })
}



displayData(0); 

