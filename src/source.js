 var menu_items= [
     {
         id:1,
         name: "Pepperoni Pizza",
         description:"A delicious classic!",
         image_path:"img/menu/pepperoni_pizza.jfif",
         image_alt:"Pepperoni Pizza",
         price:16.99,
         deep_description:"Quick, Easy and Delicious-Homemade pizza crust and tomato sauce has never been easier-and this recipe for pepperoni pizza produces a delicious classic!",
         options:[
             {name:"Extra Pepperoni", id:"extra_pepperoni"},
             {name:"Extra Cheese", id:"extra_cheese"},
             {name:"Extra Sauce", id:"extra_sauce"},
         ]
     },
     {
        id:2,
        name: "Cheese Pizza",
        description:"New York style cheese pizza",
        image_path:"img/menu/cheese_pizza.jfif",
        image_alt:"Cheese Pizza",
        price:14.99,
        deep_description:"This New York Style Cheese Pizza Recipe features a chewy crust, sweet and tangy sauce, and plenty of gooey cheese! This pizza is almost identical to the famous slices sold on the streets of New York",
        options:[
            {name:"Extra Cheese", id:"extra_cheese"},
            {name:"Extra Sauce", id:"extra_sauce"},
        ]
    },
    {
        id:3,
        name: "Canadian Pizza",
        description:"A beautifully canadian pizza.",
        image_path:"img/menu/canadian_pizza.png",
        image_alt:"Canadian Pizza",
        price:23.99,
        deep_description:"Canadian bacon with pineapple and green pepper on French bread makes a quick and tasty pizza.",
        options:[
            {name:"Extra Cheese", id:"extra_cheese"},
            {name:"Extra Sauce", id:"extra_sauce"},
            {name:"Extra Bacon", id:"extra_bacon"},
        ]
    },
    {
        id:4,
        name: "Beef Noodlefull Bowl",
        description:"Beef, Noodles, and Broth. Need I say more?",
        image_path:"img/menu/beef_noodle_bowl.jfif",
        image_alt:"Beef Noodlefull Bowl",
        price:14.99,
        deep_description:"Have a bowl of deliciousness at dinnertime tonight with our Beef Noodle Bowl.",
        options:[
            {name:"Extra Spicy", id:"extra_spicy"},
            {name:"Extra Beef", id:"extra_beef"},
            {name:"Extra Noodles", id:"extra_noodles"},
        ]
    },
    {
        id:5,
        name: "Veggie Noodlefull Bowl",
        description:"A vegetarian-treasured noodle specialty",
        image_path:"img/menu/veggie_noodle_bowl.jfif",
        image_alt:"Veggie Noodlefull Bowl",
        price:12.99,
        deep_description:"Have a bowl of deliciousness at dinnertime tonight with our Veggie Noodle Bowl.",
        options:[
            {name:"Extra Spicy", id:"extra_spicy"},
            {name:"Extra Vegetables", id:"extra_vegetables"},
            {name:"Extra Noodles", id:"extra_noodles"},
        ]
    },
    {
        id:6,
        name: "Kingburger Supreme",
        description:"A wonderfully generic burger.",
        image_path:"img/menu/kingburger_supreme.jfif",
        image_alt:"Kingburger Supreme",
        price:10.99,
        deep_description:"A signature flame-grilled beef patty topped with a simple layer of crunchy pickles.",
        options:[
            {name:"Extra Sauce", id:"extra_sauce"},
            {name:"Extra Patty", id:"extra_patty"},
            {name:"Extra Pickles", id:"extra_pickles"},
        ]
    },
    {
        id:7,
        name: "Waffle Bowl",
        description:"Its like icecream in a edible bowl!",
        image_path:"img/menu/waffle_bowl.png",
        image_alt:"Waffle Bowl",
        price:9.99,
        deep_description:"Perfect for all ages and can be jazzed up by dipping the rim into melted chocolate.",
        options:[
            {name:"Add Sprinkles", id:"add_sprinkles"},
            {name:"Extra Scoop", id:"extra_scoop"},
            {name:"Add Chocolate Sauce", id:"add_chocolate_sauce"},
        ]
    },
    {
        id:8,
        name: "Chocolate Waffle Bowl",
        description:"Icecream in an edible bowl dipped in chocolate!",
        image_path:"img/menu/chocolate_waffle_bowl.jfif",
        image_alt:"Chocolate Waffle Bowl",
        price:10.99,
        deep_description:"Perfect for all ages and can be jazzed up by dipping the rim into melted chocolate. Now with 20% more chocolate!",
        options:[
            {name:"Add Sprinkles", id:"add_sprinkles"},
            {name:"Extra Scoop", id:"extra_scoop"},
            {name:"Add Chocolate Sauce", id:"add_chocolate_sauce"},
        ]
    },
 ];

 var cart = [];//Starts empty
 var price_total = 0;
 var address;
 var restaurant_list=[
     "Chick-fil-a",
     "Dairy Queen",
     "In-N-Out Burger",
     "Nando's",
     "Subway"
 ]
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
            <div class="col-3"><img class="menu_img" src="'+menu_items[i].image_path+'" alt="'+menu_items[i].image_alt+'"></div>\
                <div class="col">\
                    <div><strong>'+menu_items[i].name+'</strong></div>\
                <div>'+menu_items[i].description+'</div>\
            </div>\
        </div>')
        attachModal(menu_items[i], i)
    }

    for(var i=0; i<4; i++){// 4 is the number of popular items that can fit in the popular items section
        $("#popular_items").prepend('\
        <div class="col menu_item_highlight row" id="menu_item_highlight_'+i+'"> \
                <div class="col">\
                    <div><strong>'+menu_items[i].name+'</strong></div>\
                <div>'+menu_items[i].description+'</div>\
            </div>\
        </div>');

        attachModalHighlight(menu_items[i].id, i)
    }

    const decide_button = document.getElementById("decide_button")
    decide_button.addEventListener("click", ()=>{//random restaurant picker
        openMenu(restaurant_list[(Math.floor(Math.random() * restaurant_list.length))]);
    })

    
    const disabled_class_elements = document.getElementsByClassName("disabled")
    var disabled_array=[];
    var disabled_buttons=[];
    for(var i =0; i<disabled_class_elements.length; i++){
        disabled_array.push(disabled_class_elements[i])
    }
    disabled_buttons = disabled_array.filter(x => x.localName == "tr")
    disabled_buttons.forEach(disabled_button => {
        disabled_button.addEventListener("click", ()=>{
            if($("#"+disabled_button.id).hasClass("disabled")){
                $("#address_field").addClass("warning")
            }
        })
    })
    // disabled_buttons = disabled_buttons.find(x => x.localName =="tr")
    console.log(disabled_buttons)
})

function changeTab(tab_name){
    //get all elements needed
    const rows = $(".tab");
    const screens = $("#main_content").children()

    if(!$("#"+tab_name).hasClass("disabled")){
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
    }
    return true;
}

function openMenu(menu_name){
    document.getElementById ("restaurants").setAttribute("hidden","true")
    document.getElementById ("menu").removeAttribute("hidden")
    $("#menu_title").text(menu_name + " - Menu")
    // Show menu tab

}

function attachModal(item, id){
    $("#modal_placeholder").append('\
    <div class="modal pt-5" tabindex="-1" id="menu_item_'+item.id+'_popup">\
        <div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-body">\
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\
                    <span aria-hidden="true">&times;</span>\
                </button>\
                <div class="row">\
                    <div id="modal_image" class="col-6"><img class="w-100 rounded" src="'+item.image_path+'" alt="'+item.image_alt+'"/></div>\
                    <div class="col-6"><div>Quantity:</div><button id="step_down_button" class="w-25 text-center" onclick="this.parentNode.querySelector(\'#quantity_'+item.id+'\').stepDown()">-</button><input class="quantity w-50 text-center" id="quantity_'+item.id+'" min="0" name="quantity" value="1" type="number"><button id="step_up_button" class="w-25 text-center" onclick="this.parentNode.querySelector(\'#quantity_'+item.id+'\').stepUp()">+</button></div>\
                    <div id="modal_description" class="col-6">'+item.deep_description+'</div>\
                    <div id="modal_options" class="col-6">'+generateOptionsHTML(item.options, item.id)+'</div>\
                </div>\
                </div>\
                <div class="modal-footer">\
                <span class="pr-3"><strong>$'+item.price+'</strong>/ea</span>\
                <button type="button" class="btn btn-success" onClick="addToCart('+item.id+',\'menu_item_'+item.id+'_popup\')">Add to Cart</button>\
                </div>\
            </div>\
        </div>\
    </div>')

    document.getElementById("menu_item_"+id).addEventListener("click", ()=>{
        $("#menu_item_"+item.id+"_popup").modal("show");
    })
}

// Triggered on pressing "add to cart". This method scrapes the modal to get the items customizations.
function addToCart(item_id, modal_id){
    //scraping
    var options = $(".option_"+item_id)
    var quantity = $("#quantity_"+item_id).val()

    //Object that will be push to cart
    var temp = ({
        options:[],
        quantity:parseInt(quantity,10),
        item_id:item_id
    })

    //find all 'checked' options
    for(var i=0; i<options.length;i++){
        (options[i].checked)?temp.options.push(options[i].id):0;
    }

    cart.push(temp);//push to cart
    updateCart();

    $("#"+modal_id).modal("hide");//hide modal

    //reset modal
    $("#quantity_"+item_id).val(1)
    for(var i=0; i<options.length;i++){
        options[i].checked=false;
    }
}

function attachModalHighlight(menu_item_id, id){
    document.getElementById("menu_item_highlight_"+id).addEventListener("click", ()=>{
        $("#menu_item_"+menu_item_id+"_popup").modal("show");
    })
}

function generateOptionsHTML(options, id){
    var result=""
    if(options){
        options.forEach((option)=>{
            result+= '<input type="checkbox" class="option_'+id+'" id="'+option.id+'" name="'+option.id+'" value="'+option.name+'">\
            <label for="'+option.id+'"> '+option.name+'</label><br>'
        })
    }
    return result
}

function updateCart(){
    $(".displayed_cart_item").remove()//remove old cart display
    var item;
    price_total = 0;

    for(var i=0;i<cart.length;i++){
        item = menu_items.find(x => x.id == cart[i].item_id)
        price_total+=item.price*cart[i].quantity;

        $("#cart_list").append('<div class="col-12 cart_item row displayed_cart_item">\
        <div class="col">\
          <div><strong>'+item.name+'</strong></div>\
          <div>'+item.description+'</div>\
        </div>\
        <div id="selected_options" class="col-2"><ul>\
        '+generateCartOptions(cart[i],item.options)+'\
        </ul></div>\
        <div class="col-1">\
        <input class="quantity text-center w-100" id="cart_quantity_'+item.id+'" min="0" name="quantity" value="'+cart[i].quantity+'" type="number">\
        <button class="btn pl-0" onClick="quantityInCartChange('+i+','+item.id+')">Update</button>\
        </div>\
        <div class="col-2">\
          $'+item.price * cart[i].quantity+'\
        </div>\
        <div class="col-2">\
            <button class="btn btn-danger" onClick="removeItemFromCart('+i+')"><strong>Remove From Cart</strong></button>\
        </div>\
      </div>')
    }
    $("#cost_total").html('<p class="text-right">$'+price_total.toFixed(2)+'</p>')
    if(cart.length!=0){
        $("#restaurants_tab").addClass("completed")
        $("#cart_tab").addClass("completed")
    }else{
        $("#restaurants_tab").removeClass("completed")
        $("#cart_tab").removeClass("completed")
    }
}
function removeItemFromCart(cart_number){
    cart.splice(cart_number,1)
    updateCart()
}
function quantityInCartChange(cart_number, item_id){
    var new_quantity=$("#cart_quantity_"+item_id).val()

    if(new_quantity!=0){
        cart[cart_number].quantity=new_quantity
    }else{
        cart.splice(cart_number,1)
    }
    updateCart()
}
function generateCartOptions(cart_item, options){
    var result=""
    for(var i=0;i<cart_item.options.length;i++){
        result+=" <li>"+options.find(x => x.id == cart_item.options[i]).name+"</li>"
    }
    return result
}
function saveAddress(){
    address = $("#address_field").val()
    $('#address_in_cart').text("Delivering to: "+address)
    if(address!=""){
        $("#address_tab").addClass("completed")
        $('.disabled').addClass("enabled")
        $('.disabled').removeClass("disabled")
    }else{
        $("#address_tab").removeClass("completed")
        $('.enabled').addClass("disabled")
        $('.enabled').removeClass("enabled")
    }
}
function submitPayment(){
    $("#payment_tab").addClass("completed")
    changeTab("order_complete")
}
/* payment page */
$(function() {
$('[data-toggle="tooltip"]').tooltip()
})
/* payment page */
