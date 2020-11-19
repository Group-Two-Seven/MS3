 $(document).ready(function(){
    const rows = document.querySelectorAll("tr[data-tabname]");

    rows.forEach(row => {
        row.addEventListener("click", () => {// This straps a hidden button onto each tab that will call the "changeTab" function
            changeTab(row.dataset.tabname)
        })
    }) 
})

function changeTab(tab_name){
    //get all elements needed
    const rows = $(".tab");
    const screens = $("#main_content").children()

    //Remove the highlight from the previous tab and highlight the new tab
    for(var i=0; i<rows.length; i++){
        if(rows[i].getAttribute("data-tabname") == tab_name){
            rows[i].classList.add("active");

        }else{
            rows[i].classList.remove("active");
        }
    }

    //Hide old screen content and unhide new screen content
    for(var i=0; i<screens.length; i++){
        if(screens[i].id == tab_name){
            screens[i].removeAttribute("hidden")//Here is the workaround for setAttribute("hidden","false"), which wasn't working.
        }else{
            screens[i].setAttribute("hidden","true")
        }
    }
    return true;
}