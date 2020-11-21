 var menu_items= [
     {
         name: "Pepperoni Pizza",
         description:"description 1",
         image_path:"img/dishes/dish1.png",
         image_alt:"Pepperoni Pizza"
     },
     {
        name: "Cheese Pizza",
        description:"description 2",
        image_path:"img/dishes/dish2.png",
        image_alt:"Cheese Pizza"
    },
    {
        name: "Canadian Pizza",
        description:"description 3",
        image_path:"img/dishes/dish3.png",
        image_alt:"Canadian Pizza"
    },
    {
        name: "Beef Noodlefull Bowl",
        description:"description 4",
        image_path:"img/dishes/dish4.png",
        image_alt:"Beef Noodlefull Bowl"
    },
    {
        name: "Veggie Noodlefull Bowl",
        description:"description 5",
        image_path:"img/dishes/dish5.png",
        image_alt:"Veggie Noodlefull Bowl"
    },
    {
        name: "Kingburger Supreme",
        description:"description 6",
        image_path:"img/dishes/dish6.png",
        image_alt:"Kingburger Supreme"
    },
    {
        name: "Waffle Bowl",
        description:"description 7",
        image_path:"img/dishes/dish7.png",
        image_alt:"Waffle Bowl"
    },
    {
        name: "White Chocolate Waffle Bowl",
        description:"description 8",
        image_path:"img/dishes/dish8.png",
        image_alt:"White Chocolate Waffle Bowl"
    },
 ];

 $(document).ready(function(){
    const tabs = document.querySelectorAll("tr[data-tabname]");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {// This straps a hidden button onto each tab that will call the "changeTab" function
            changeTab(tab.dataset.tabname)
        })
    }) 

    const restaurants = document.querySelectorAll("div.restaurant");
    restaurants.forEach(restaurant => {
        restaurant.addEventListener("click", () => {// This straps a hidden button onto each restaurant in the restaurant tab
            openMenu(restaurant.dataset.restaurant)
        })
    })

    const nav = document.getElementById("nav");
    nav.addEventListener("click", () => {// This straps a hidden button onto the nav image on the left that will reset the screen to news
        changeTab("news")
    })

    for(var i=0; i<menu_items.length; i++){
        $("#menu_items").prepend('\
        <div class="col-12 menu_item row" id="menu_item_'+i+'"> \
            <div class="col-3"><img src="'+menu_items[i].image_path+'" alt="'+menu_items[i].image_alt+'"></div>\
                <div class="col">\
                    <div><strong>'+menu_items[i].name+'</strong></div>\
                <div>'+menu_items[i].description+'</div>\
            </div>\
        </div>')
        attachModal(menu_items[i])
    }

    for(var i=0; i<4; i++){// 4 is the number of popular items that can fit in the popular items section
        $("#popular_items").prepend('\
        <div class="col menu_item_highlight row" id="menu_item_highlight_'+i+'"> \
            <div class="col-3"><img src="'+menu_items[i].image_path+'" alt="'+menu_items[i].image_alt+'"></div>\
                <div class="col">\
                    <div><strong>'+menu_items[i].name+'</strong></div>\
                <div>'+menu_items[i].description+'</div>\
            </div>\
        </div>')
        attachModal(menu_items[i])
    }
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

function openMenu(menu_name){
    document.getElementById ("restaurants").setAttribute("hidden","true")
    document.getElementById ("menu").removeAttribute("hidden")
    // Show menu tab

}

function attachModal(item){

    $("#menu_item_popup").append('<div class="modal-dialog">\
        <div class="modal-content">\
            <div class="modal-body">\
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                <span aria-hidden="true">&times;</span>\
            </button>\
            <div class="rows">\
                <div class="col-6" id="modal_left_col">\
                <div id="modal_image"><img src="'+item.image_path+'" alt="'+item.image_alt+'"/></div>\
                <div id="modal_description">'+item.deep_description+'</div>\
                </div>\
                <div class="col-6" id="modal_right_col">\
                <div><input type="number"></div>\
                <div id="modal_options">'+item.options+'</div>\
                </div>\
            </div>\
            </div>\
            <div class="modal-footer">\
            <button type="button" class="btn">Add to Cart</button>\
            </div>\
        </div>\
    </div>')
}