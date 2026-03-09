
const issueCount = document.getElementById('issues-cnt'); 
const itemsContainer = document.getElementById('items-container') ; 
const allBtn = document.getElementById('all-btn') ;
const openBtn = document.getElementById('open-btn') ;
const closedBtn = document.getElementById('closed-btn') ;
  const searchItem =  document.getElementById('search-input')
console.log(itemsContainer) ;

console.log(searchItem) ; 
const getData = async ()=>{
   const jsonRes = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues"); 
   const jsonData = await jsonRes.json() ; 
   console.log(jsonData.data) ; 
   return jsonData.data; 
}

const getSearchData = async (searchValue)=>{
   const jsonRes = await  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`); 
   const jsonData = await jsonRes.json() ; 
   console.log(jsonData.data) ; 
   return jsonData.data; 
}


async function displayData(state){
    manageSpinner(1) ; 
    let data =await getData() ; 
    itemsContainer.replaceChildren() ; 
    const searchValue = searchItem.value ; 
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
   else if(state == 3 &&  searchValue != "") { 
    
        // search 
        data = await getSearchData(searchValue) ; 
   }
   else{
    // do nothing if state 0 
   }
    console.log(data) ; 
    issueCount.innerText=`${data.length} Issues` ; 

    data.forEach(element => {
        const newElement = document.createElement('div')  ; 

        newElement.innerHTML=`
             <div onclick="displayModal(${element.id})" class="issue-card p-5 flex flex-col gap-5 ">
                <div class="flex flex-wrap justify-between items-center">
                    <img src= ${element.status== "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status.png"} alt="closed">
                    <h2 class="priority px-4 py-2 text-xl font-bold rounded-3xl ${element.priority == "high" ? "bg-red-100 text-red-600": element.priority == "medium" ?  "bg-yellow-100 text-yellow-400" : "bg-gray-100 text-gray-600"}">
                    ${element.priority}</h2>
                </div>

                <div class="space-y-3">
                    <h2 class="font-bold text-2xl">${element.title}</h2>
                    <h4 class="text-gray-400">${element.description}</h4>

                    <div class="flex flex-wrap gap-4 ">
                       ${element.labels.map(label =>
                            `<span class="px-3 py-1 text-sm rounded-full bg-yellow-100 yellow-red-600">
                                ${label}
                                </span>`

                       ).join("")}
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
        console.log(element.status) ;
        console.log(newElement) ;

        itemsContainer.appendChild(newElement) ; 
    });

    manageSpinner(0);
    
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

searchItem.addEventListener('keyup' , ()=>{
    removeBtnActive(); 
    allBtn.classList.add('btn-primary') ; 
    displayData(3) ; 
})

function displayModal(id){
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`).then((res) => res.json()).then((json) =>{
        console.log(json.data) ;
        const issue = json.data; 
        const modalBox = document.getElementById('modal-box'); 
        modalBox.innerHTML =`
         <h2 class="text-2xl font-bold">${issue.title}</h2>
            <h3><span class="px-2 py-1 text-white ${issue.status == "open" ? "bg-green-400" : "bg-purple-400"} rounded-4xl">${issue.status}</span> &middot <span class="text-gray-400 text-xs">Opened by ${issue.author}</span> &middot <span class="text-gray-400 text-xs">${issue.createdAt}</span></h3>
            <div class="flex flex-wrap gap-4 ">
                       ${issue.labels.map(label =>
                            `<span class="px-3 py-1 text-sm rounded-full bg-yellow-100 yellow-red-600">
                                ${label}
                                </span>`

                       ).join("")}
            </div>

            <p class="text-gray-400 ">${issue.description}</p>

            <div class="flex flex-wrap gap-30 p-4  items-center bg-gray-100">
                <div class="flex flex-col gap-3 items-center justify-center">
                    <p class="text-gray-400 ">Assignnee: </p>
                    <p class="font-bold">${issue.assignee ? issue.assignee : "NA"}</p>
                </div>

                <div  class="flex flex-col gap-3 items-center justify-center">
                    <p class="text-gray-400 ">Priority : </p>
                    <span class="priority text-white px-4 py-2 text-xs rounded-3xl ${issue.priority == "high" ? "bg-red-400": issue.priority == "medium" ?  "bg-yellow-400" : "bg-gray-400"}">
                    ${issue.priority}</span>
                </div>
            </div>
                <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn btn-primary">Close</button>
            </form>
            </div>`

        my_modal_5.showModal();

        

        
    })
}

function manageSpinner(state){
    if(state == true){
        document.getElementById('spinner').classList.remove('hidden'); 
        document.getElementById('items-section').classList.add('hidden'); 
    }
    else{
          document.getElementById('spinner').classList.add('hidden'); 
        document.getElementById('items-section').classList.remove('hidden'); 
    }
}




displayData(0); 

