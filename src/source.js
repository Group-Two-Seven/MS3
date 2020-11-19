 $(document).ready(function(){
    const rows = document.querySelectorAll("tr[data-tabname]");

    rows.forEach(row => {
        row.addEventListener("click", () => {
            changeTab(row.dataset.tabname)
        })
    }) 
})

function changeTab(tab_name){
    const rows = $(".tab");
    const screens = $("#main_content").children()
    console.log(screens)

    for(var i=0; i<rows.length; i++){
        if(rows[i].getAttribute("data-tabname") == tab_name){
            rows[i].classList.add("active");

        }else{
            rows[i].classList.remove("active");
        }
    }

    for(var i=0; i<screens.length; i++){
        if(screens[i].id == tab_name){
            screens[i].removeAttribute("hidden")
        }else{
            screens[i].setAttribute("hidden","true")
        }
    }
    return true;
}