var server = "http://localhost:3000";


var node_num = 0;
var selected_node = -1;
var curr_selected_tree = [];
var curr_selected_tree_list = [];
var curr_selected_option = "";
var info_box_present = false;

var selected_option_id = "";
var prev_sel_name = "";
var selected_gear = '';

var weap_toggle = 0;
var arm_toggle = 0;

var playback = false;

function disp_Node(x, y, parent_id, tree_arr){
    var nDiv = document.createElement('div');
    var nImg = document.createElement('img');
    var new_id = node_num;
    
    var nTitle = document.createElement('div');
    nTitle.style.height = '50%';
    nTitle.style.width = '100%';
    nTitle.style.overflow = 'auto'
    nTitle.style.position = "absolute";
    nTitle.style.top = '0px';
    nTitle.style.left = '0px';
    nTitle.style.zIndex = '2';
    nTitle.style.fontSize = '10pt';
    
    nDiv.id = new_id*10;
    nTitle.id = nDiv.id+"_title";
    nDiv.className = 'panel';
    nImg.className = 'ImgPan';
    
    nImg.src = tree_arr[y][x].pic;
    
    nDiv.style.top = (y*100)+'px';
    nDiv.style.left = (x*100)+'px';
   
    nDiv.style.borderColor = "dimgray";
    
    //nDiv.innerHTML = tree_arr[y][x].name;
    nTitle.innerHTML = tree_arr[y][x].name;
    //nDiv.style.color = update_rare_color(tree_arr[y][x].rarity);
    nTitle.style.color = update_rare_color(tree_arr[y][x].rarity);
    //nDiv.style.textShadow = "1px 0px rgba(156,154,160,0.5)";
    //nTitle.style.textShadow = "0px 1px grey";
    nDiv.onclick = function(){
        var div_coor = Object.assign({},getPos(nDiv));
        
        if(selected_node == -1){
            selected_node = nDiv.id;
            nDiv.style.borderColor = 'turquoise';
            disp_info_box(x, y, tree_arr);
            move_info_box(div_coor.x - 60, div_coor.y - 60);
            scroll_window(div_coor.x, div_coor.y);
        }
        else{
            if(selected_node == nDiv.id){
                selected_node = -1;
                nDiv.style.borderColor = 'dimgray';
                remove_info_box();

            }
            else{
                document.getElementById(selected_node).style.borderColor = 'dimgray';
                selected_node = nDiv.id;
                nDiv.style.borderColor = 'turquoise';
                disp_info_box(x, y, tree_arr);
                move_info_box(div_coor.x - 60, div_coor.y - 60);
                //window.scrollTo(div_coor.x + 50, div_coor.y + 50);
                scroll_window(div_coor.x, div_coor.y);
                clear_cost_panel();
            }
        }
        
    };
    
    nDiv.appendChild(nTitle);
    
    nDiv.appendChild(nImg);
    document.getElementById(parent_id).appendChild(nDiv);
    
    node_num += 1;
}

function disp_Conn(x, y, parent_id, tree_arr){
    var nDiv = document.createElement('div');
    var nImg = document.createElement('img');
    
    nDiv.className = 'conn_panel';
    nImg.className = 'ConnPan';
    
    nImg.src = tree_arr[y][x].pic;
    
    nDiv.style.top = (y*100) + 'px';
    nDiv.style.left = (x*100) + 'px';
    
    nDiv.appendChild(nImg);
    
    document.getElementById(parent_id).appendChild(nDiv);
    
}

function disp_Tree(tree_arr, id_name, parent_id){
    var created_id = id_name;
    var parent_ele_id = parent_id;
    var nDiv = document.createElement('div');
    nDiv.id = created_id;
    nDiv.style.position = 'absolute';
    
    nDiv.style.left = '0px';
    nDiv.style.border = "1px outset";
    nDiv.style.backgroundImage = "url(Img/tree_back.jpg)";
    nDiv.style.backgroundSize = "cover";
    nDiv.style.transition = "300ms";
    
    if(id_name == "rare_list"){
        nDiv.className = "tree_diagram2";
    }
    else{
        nDiv.className = "tree_diagram";
    }
    
    var height = tree_arr.length * 100;
    var width = 0;
    for (var index = 0; index < tree_arr.length; index++){
        if (width < tree_arr[index].length){
            width = tree_arr[index].length;
        }
    }
    
    width *= 100;
    
    nDiv.style.height = (height)+'px';
    nDiv.style.width = (width)+'px';
    
    var r_limit = document.createElement('div');
    var b_limit = document.createElement('div');
    
    r_limit.id = "right_limit";
    b_limit.id = "bottom_limit";
    
    r_limit.style.right = "-750px";
    b_limit.style.bottom = "-100px";
    
    nDiv.appendChild(r_limit);
    nDiv.appendChild(b_limit);
    
    document.getElementById(parent_ele_id).appendChild(nDiv);
    
    for (var y = 0; y < tree_arr.length; y++){
        for(var x = 0; x < tree_arr[y].length; x++){
            if(tree_arr[y][x].type != 'blank'){
                if (tree_arr[y][x].type == 'connector'){
                    disp_Conn(x, y, nDiv.id, tree_arr);
                }
                else{
                    disp_Node(x, y, nDiv.id, tree_arr);
                }
            }
        }
    }
    
        document.getElementById("info_box").style.visibility = "visible";
        document.getElementById("info_box").style.opacity = 1;
        document.getElementById("page_1").style.visibility = "visible";
        document.getElementById("page_1").style.opacity = 1;
        info_box_present = true;
        remove_info_box();
    
    
    
}

function delete_tree(){
    
    var content_div = document.getElementById("content");
    var tree_div = document.getElementById('diagram');
    
    if(tree_div != null){

        content_div.removeChild(tree_div);    
        node_num = 0;
        selected_node = -1;
        remove_info_box();
    }

    
}

function delete_listings(){
    var tree_div = document.getElementById('listings');

    if(tree_div != null){

        document.body.removeChild(tree_div);    
        node_num = 0;
        selected_node = -1;
        remove_info_box();
    }
}

function delete_rare_list(){
    var tree_div = document.getElementById('rare_list');

    if(tree_div != null){
        document.getElementById("listings").removeChild(tree_div);    
        node_num = 0;
        selected_node = -1;
        remove_info_box();
    }
}

function toggle_page(page_num){
    switch(page_num){
        case 1:
            document.getElementById("page_1").style.visibility = "hidden";
            document.getElementById("page_1").style.opacity = 0;
            document.getElementById("page_2").style.visibility = "visible";
            document.getElementById("page_2").style.opacity = 1;
            document.getElementById("page_3").style.visibility = "hidden";
            document.getElementById("page_3").style.opacity = 0;
            document.getElementById("page_4").style.visibility = "hidden";
            document.getElementById("page_4").style.opacity = 0;
            document.getElementById("get_cost").style.visibility = "hidden";
            document.getElementById("get_cost").style.opacity = 0;
            document.getElementById("info_img").style.visibility = "hidden";
            document.getElementById("info_img").style.opacity = 0;
            document.getElementById("preview_lable").innerHTML = "Preview";
            break;
        
        case 2:
            document.getElementById("page_1").style.visibility = "hidden";
            document.getElementById("page_1").style.opacity = 0;
            document.getElementById("page_2").style.visibility = "hidden";
            document.getElementById("page_2").style.opacity = 0;
            document.getElementById("page_3").style.visibility = "visible";
            document.getElementById("page_3").style.opacity = 1;
            document.getElementById("page_4").style.visibility = "hidden";
            document.getElementById("page_4").style.opacity = 0;
            document.getElementById("get_cost").style.visibility = "visible";
            document.getElementById("get_cost").style.opacity = 1;
            document.getElementById("info_img").style.visibility = "hidden";
            document.getElementById("info_img").style.opacity = 0;
            document.getElementById("preview_lable").innerHTML = "Preview";
            break;
            
        case 3:
            document.getElementById("page_1").style.visibility = "hidden";
            document.getElementById("page_1").style.opacity = 0;
            document.getElementById("page_2").style.visibility = "hidden";
            document.getElementById("page_2").style.opacity = 0;
            document.getElementById("page_3").style.visibility = "hidden";
            document.getElementById("page_3").style.opacity = 0;
            document.getElementById("page_4").style.visibility = "visible";
            document.getElementById("page_4").style.opacity = 1;
            document.getElementById("get_cost").style.visibility = "visible";
            document.getElementById("get_cost").style.opacity = 1;
            document.getElementById("info_img").style.visibility = "hidden";
            document.getElementById("info_img").style.opacity = 0;
            document.getElementById("preview_lable").innerHTML = "Preview";
            break;
            
        case 4:
            document.getElementById("page_1").style.visibility = "visible";
            document.getElementById("page_1").style.opacity = 1;
            document.getElementById("page_2").style.visibility = "hidden";
            document.getElementById("page_2").style.opacity = 0;
            document.getElementById("page_3").style.visibility = "hidden";
            document.getElementById("page_3").style.opacity = 0;
            document.getElementById("page_4").style.visibility = "hidden";
            document.getElementById("page_4").style.opacity = 0;
            document.getElementById("get_cost").style.visibility = "hidden";
            document.getElementById("get_cost").style.opacity = 0;
            document.getElementById("info_img").style.visibility = "hidden";
            document.getElementById("info_img").style.opacity = 0;
            document.getElementById("preview_lable").innerHTML = "Preview";
            break;
            
        case 5:
            document.getElementById("page_1").style.visibility = "hidden";
            document.getElementById("page_1").style.opacity = 0;
            document.getElementById("page_2").style.visibility = "hidden";
            document.getElementById("page_2").style.opacity = 0;
            document.getElementById("page_3").style.visibility = "hidden";
            document.getElementById("page_3").style.opacity = 0;
            document.getElementById("page_4").style.visibility = "hidden";
            document.getElementById("page_4").style.opacity = 0;
            document.getElementById("get_cost").style.visibility = "hidden";
            document.getElementById("get_cost").style.opacity = 0;
            document.getElementById("info_img").style.visibility = "visible";
            document.getElementById("info_img").style.opacity = 1;
            document.getElementById("preview_lable").innerHTML = "End Preview";
    }
}



function disp_info_box(x, y, tree_arr){
    if (info_box_present != false){
        remove_info_box();
    }

    
    //document.getElementById("info_box").style.top = (y* 100 + 20)+'px';
    //document.getElementById("info_box").style.left = (x*100 +102)+'px';
    
    //document.getElementById("info_box").style.top = y+'px';
    //document.getElementById("info_box").style.left = x +'px';
    
    document.getElementById("info_box").style.visibility = "visible";
    document.getElementById("info_box").style.opacity = 1;
    toggle_page(4);
    
    var new_y = document.getElementById("info_box").offsetTop;
    var new_x = document.getElementById("info_box").offsetleft;
    
    document.getElementById("main_cost_panel").style.bottom = "0px";
    document.getElementById("main_cost_panel").style.left = "0px";
    document.getElementById("shop_cost_line").innerHTML = "";
    document.getElementById("main_cost_panel").style.visibility = "hidden";
    document.getElementById("main_cost_panel").style.opacity = "0";
    
    
    info_box_present = true;
    update_info_box(tree_arr[y][x]);
}

function clear_material_info(){
    for(var i = 1; i < 5; i++){
            
        var up_clr_lable = "up_mat"+i;
        var up_clr_val = "up_mat"+i+"_amt";
        var cr_clr_lable = "cr_mat"+i;
        var cr_clr_val = "cr_mat"+i+"_amt";
            
        document.getElementById(up_clr_lable).innerHTML = "";
        document.getElementById(up_clr_val).innerHTML = "";
        document.getElementById(cr_clr_lable).innerHTML = "";
        document.getElementById(cr_clr_val).innerHTML = "";
            
    }
}

function update_info_box(node_object){
    clear_material_info();
    document.getElementById("info_box_header").innerHTML = node_object.name;
    document.getElementById("info_box_header").style.color = update_rare_color(node_object.rarity);
    document.getElementById("info_rare").innerHTML = "Rarity " + node_object.rarity;
    document.getElementById("info_rare").style.color = update_rare_color(node_object.rarity);
    document.getElementById("atk_val").innerHTML = node_object.attack;
    document.getElementById("ele_lable").innerHTML = node_object.ele_type;
    document.getElementById("ele_val").innerHTML = node_object.ele_val;
    document.getElementById("sharp_img").src = node_object.sharp;
    document.getElementById("sharp_p_img").src = node_object.p_sharp;
    document.getElementById("slot_val").innerHTML = node_object.num_slot;
    document.getElementById("aff_val").innerHTML = node_object.affinity;
    document.getElementById("weap_type_val").innerHTML = node_object.playstyle;
    document.getElementById("extra_info").innerHTML = node_object.extra;
    document.getElementById("flavour").innerHTML = node_object.flavour;
    document.getElementById("flavour").innerHTML = node_object.flavour;
    
    if (node_object.upgrade.length != 0){
        document.getElementById("parent_lable").innerHTML = "Material List";
        document.getElementById("up_cost_lable").innerHTML = "Cost"
        document.getElementById("parent_name").innerHTML = node_object.parent[0];
        document.getElementById("parent_name").style.borderTopStyle = "groove";
        document.getElementById("parent_name").style.borderBottomStyle = "groove";
        document.getElementById("up_cost").innerHTML = node_object.upgrade[0];
        var up_count = 1;
        for(var i = 1; i < node_object.upgrade.length; i+=2){
            var mat_name = node_object.upgrade[i];
            var mat_amt = node_object.upgrade[i+1];
            
            var up_lable_id = "up_mat"+up_count;
            var up_val_id = "up_mat"+up_count+"_amt";
            
            document.getElementById(up_lable_id).innerHTML = mat_name;
            document.getElementById(up_val_id).innerHTML = mat_amt;
            up_count++;
            
        }
    }
    else{
        document.getElementById("parent_name").innerHTML = "Nothing";
        document.getElementById("parent_lable").innerHTML = "";
        document.getElementById("up_cost_lable").innerHTML = '';
        document.getElementById("up_cost").innerHTML = '';
        document.getElementById("parent_name").style.borderTopStyle = "groove";
        document.getElementById("parent_name").style.borderBottomStyle = "groove";
        
    }
    
    if (node_object.craft.length != 0){
        document.getElementById("cr_cost_lable").innerHTML = "Cost";
        document.getElementById("cr_cat").innerHTML = "Crafting Materials";
        document.getElementById("cr_cost").innerHTML = node_object.craft[0];
        var cr_count = 1;
        for(var x = 1; x < node_object.craft.length; x+=2){
            var cr_mat_name = node_object.craft[x];
            var cr_mat_amt = node_object.craft[x+1];
            
            var cr_lable_id = "cr_mat"+cr_count;
            var cr_val_id = "cr_mat"+cr_count+"_amt";

            
            document.getElementById(cr_lable_id).innerHTML = cr_mat_name;
            document.getElementById(cr_val_id).innerHTML = cr_mat_amt;
            cr_count++;
        }
    }
    else{
        document.getElementById("cr_cost_lable").innerHTML = "";
        document.getElementById("cr_cost").innerHTML = "";
        document.getElementById("cr_cat").innerHTML = "Cannot be Created";

    }
    
    document.getElementById("shop_price").innerHTML = node_object.shop;
    
    document.getElementById('lg_img').src = node_object.pic;
    
}

function update_rare_color(rare){
    color='';
    switch(rare){
        case 1:
            color = "white";
            break;
            
        case 2:
            color = "rgb(140,58,165)";
            //color = "fuchsia";
            break;
            
        case 3:
            color = "yellow";
            break;
            
        case 4:
            color = "pink";
            break;
            
        case 5:
            color = "green";
            break;
            
        case 6:
            color = "cornflowerblue";
            break;
            
        case 7:
            color = "firebrick";
            break;
            
        case 8:
            color = "skyblue";
            break;
            
        case 9:
            color = "orange";
            break;
            
        case 10:
            color = "deeppink";
            break;
            
        
    }
    return color;
}

function remove_info_box(){
    document.getElementById("info_box").style.visibility = "hidden";
    document.getElementById("info_box").style.opacity = 0;
    document.getElementById("page_1").style.visibility = "hidden";
    document.getElementById("page_1").style.opacity = 0;
    document.getElementById("page_2").style.visibility = "hidden";
    document.getElementById("page_2").style.opacity = 0;
    document.getElementById("page_3").style.visibility = "hidden";
    document.getElementById("page_3").style.opacity = 0;
    document.getElementById("page_4").style.visibility = "hidden";
    document.getElementById("page_4").style.opacity = 0;
    document.getElementById("info_img").style.visibility = "hidden";
    document.getElementById("info_img").style.opacity = 0;
    document.getElementById("get_cost").style.visibility = "hidden";
    document.getElementById("get_cost").style.opacity = 0;
    info_box_present = false;
    document.getElementById("main_cost_panel").style.top = "0px";
    document.getElementById("main_cost_panel").style.left = "0px";
    document.getElementById("shop_cost_line").innerHTML = "";
    document.getElementById("main_cost_panel").style.visibility = "hidden";
    document.getElementById("main_cost_panel").style.opacity = "0";
    clear_cost_panel();
    document.getElementById("info_box").style.top = '-1000px';
    document.getElementById("info_box").style.left = '50px';
}

function clear_list(){
    var drop_list = document.getElementById("tree_selection");
    while (drop_list.length > 1){
        drop_list.remove(1);
    }
    curr_selected_option = '';
}

function option_select (option){
    if(option.indexOf("wpn_") != -1){
        remove_bkmk();
        var wpn_option = option.replace("wpn_", "");
        init_wpn_list(wpn_option);
        
    }
    else if(option.indexOf("armor_") != -1){
        var amr_option = option.replace("armor_", "");
        select_armor(amr_option);
        
    }
    
}

function get_wpn_path_list(wpn_type){
    var returned_data = "";
    fetch(server+"/get_path_list/"+wpn_type).then((resp)=>{
                return resp.text();
            }).then((text)=>{
                //alert(text);
                returned_data = text.slice();
                //console.log("server output" + returned_data);
                curr_selected_tree_list = eval(returned_data);
                select_wpn_type(curr_selected_tree_list);
                //curr_selected_tree = document.getElementById("clipboard").innerHTML;
                //console.log(document.getElementById("clipboard").innerHTML);
                
            });
}

function init_wpn_list(selection){
    update_header(selection);
    if(selection != selected_gear){
        document.getElementById("tree_header_bot").innerHTML = '';
        selected_gear = selection;
        clear_list();
        delete_tree();
        delete_listings();
        delete_name_list();
        set_selection(-1);
        remove_info_box();
        selected_node = -1;
        
        document.getElementById("selection").style.visibility = "hidden";
        document.getElementById("selection").style.opacity = "0";
        reset_prev_selection();
        
        get_wpn_path_list(selection);
        //update_header(selection);
    }
}

function select_wpn_type(selected_list){
    if(selection != selected_gear){
        
        
        
        
        //var selected_wpn_type_lise = eval(selection + "_trees");
        var selected_wpn_type_lise = selected_list.slice();
        curr_selected_tree_list = selected_list.slice();
        //console.log(selected_wpn_type_lise);
        
        for(var index = 0; index < selected_wpn_type_lise.length; index++){
            var new_option = document.createElement("option");
            var new_op_text = selected_wpn_type_lise[index];

            while( new_op_text.indexOf("_") != -1){
                new_op_text = new_op_text.replace("_", " ");
            }

            var new_op_val = selected_gear + "_" + selected_wpn_type_lise[index];

            new_option.innerHTML = new_op_text;
            new_option.value = new_op_val;

            document.getElementById("tree_selection").add(new_option);
        }
        display_control();
    }
}

function select_armor(selection){
    var gear_selection = "";
    switch(selection){
        case "lrb":
            gear_selection = "Low Rank Blademaster Armor";
            break;
            
        case "lrg":
            gear_selection = "Low Rank Gunner Armor";
            break;
            
        case "hrb":
            gear_selection = "High Rank Blademaster Armor";
            break;
            
        case "hrg":
            gear_selection = "High Rank Gunner Armor";
            break;
            
        case "grb":
            gear_selection = "G Rank Blademaster Armor";
            break;
            
        case "grg":
            gear_selection = "G Rank Gunner Armor";
            break;
            
        case "rlc":
            gear_selection = "Relic Armor";
            break;
    }
    
    var body_message = "Your selection of " + gear_selection + " is currently unavailable" + "<br>" + "Please select a different option."
    
    pop_up("NOTICE", body_message);
}

function pop_up(header_message, body_message){
    document.getElementById("message_box").style.display = "block";
    document.getElementById("pop_header").innerHTML = header_message;
    document.getElementById("pop_header").style.textAlign = "center";
    document.getElementById("message_bod").innerHTML = body_message;
    document.getElementById("message_bod").style.textAlign = "center";
   
}

function close_message(){
    document.getElementById("message_box").style.display = "none";
}

function display_tree_header(){
    document.getElementById("tree_header").style.opacity = "1";
    document.getElementById("tree_header").style.visibility = "visible";
}

function hide_header(){
    document.getElementById("tree_header").style.opacity = "0";
    document.getElementById("tree_header").style.visibility = "hidden";
}

function update_header(selection){
    var wpn_class = document.getElementById(selection).innerHTML;
    var display_string = "Type: " + wpn_class;
    document.getElementById("tree_header_top").innerHTML = display_string;
    display_tree_header();
}

function update_header_body(path){
    var stripped_str = path.slice(path.indexOf('_') + 1);
    while(stripped_str.indexOf('_') != -1){
        stripped_str = stripped_str.replace('_', ' ');
    }
    
    document.getElementById("tree_header_bot").innerHTML = stripped_str;
}

function calculate_cost(selected_node){
    var curr_node = Object.assign({}, selected_node);
    var shop_cost = selected_node.shop;
    var craft_cost = selected_node.craft;
    var upgrade_cost = [];
    if(selected_node.upgrade.length > 0){
        
        var raw_info = upgrade_options(curr_node);
        
        upgrade_cost = raw_info.slice(1, raw_info.length);
    }
    var acquisition_options = [shop_cost, craft_cost, upgrade_cost, selected_node.name];
    return acquisition_options;
}

function add_dictionary(dict1, dict2){
    var base = Object.assign({}, dict1);
    var op = Object.assign({}, dict2);
    
    var base_key = Object.keys(base);
    
    var op_key = Object.keys(op);
    
    var result_dict = {};
    
    var interim_value = 0;
    
    for(var i = 0; i < op_key.length; i++){
        
        if(base_key.indexOf(op_key[i]) != -1){
            interim_value = base[op_key[i]] + op[op_key[i]];
            
            base[op_key[i]] = interim_value;
        }
        else{
            base[op_key[i]] = op[op_key[i]];
        }
    }
    result_dict = Object.assign({}, base);
    return result_dict;
}

function upgrade_options(curr_node){
    //keep using arrays instead
    
    var work_node = Object.assign({}, curr_node);
    var result_arr = [];
    var current_total = {};
    var alt_total = {};
    var next_parent = work_node.parent;
    
    curr_node = Object.assign({}, get_keyVal_pair(work_node.upgrade));
    result_arr.push(curr_node);
    
    while(next_parent.length > 0){
        work_node = Object.assign({}, curr_selected_tree[next_parent[2]][next_parent[1]]);
        
        
        if(work_node.craft.length > 0){
            alt_total = add_dictionary(result_arr[0], get_keyVal_pair(work_node.craft));
            alt_total["Base"] = work_node.name;
            alt_total["Method"] = "Craft";
            result_arr.push(alt_total);
        }
        
        if(work_node.shop != "N/A"){
            alt_total = Object.assign({}, result_arr[0]);
            alt_total["Cost"] = alt_total["Cost"] + parseInt(work_node.shop);
            alt_total["Base"] = work_node.name;
            alt_total["Method"] = "Buy";
            result_arr.push(alt_total);
        }
        
        if(work_node.upgrade.length > 0){
            current_total = add_dictionary(result_arr[0], get_keyVal_pair(work_node.upgrade));
            result_arr[0] = Object.assign({}, current_total);
        }
     
        next_parent = work_node.parent;
    }
    
    return result_arr;
}

function get_keyVal_pair(base_arr){
    var result_dict = {};
    result_dict["Cost"] = parseInt(base_arr[0]);
    for(var i = 1; i < base_arr.length; i+=2){
        result_dict[base_arr[i]] = parseInt(base_arr[i+1]);
    }
    return result_dict;
}

function dragPanel(panel){
    var pos1 = 0;
    var pos2 = 0;
    var pos3 = 0;
    var pos4 = 0;
    
    var head_id = panel.id + "_header";
    
    document.getElementById(head_id).onmousedown = mouseDrag;
    
    function mouseDrag(e){
        e = e || window.event;
        
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = stopMouseDrag;
        document.onmousemove = panelDrag;
    }
    
    function panelDrag(e){
        e = e|| window.event;
        panel.style.transition = '0s';
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        panel.style.top = (panel.offsetTop - pos2) + 'px';
        panel.style.left = (panel.offsetLeft - pos1) + 'px';
        
        
    }
    
    function stopMouseDrag(){
        panel.style.transition = "300ms";
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function append_craft_options (cost_arr){
    
    var work_arr = cost_arr.slice();
    var num_options = 0;
    if(cost_arr[1].length > 0){
        
        num_options = 1;
    }
    num_options += cost_arr[2].length;
    var container_height = (num_options  * 20) + 50;
    var panel_height = container_height + 41;
    
    
    
    document.getElementById("main_cost_panel").style.top = "0px";
    
    if(document.getElementById("options_cont").innerHTML != ""){
        return;
    }
    
    document.getElementById("main_cost_panel").style.height = panel_height + "px";
    document.getElementById("options_cont").style.height = container_height + "px";
    
    if(cost_arr[0] != "N/A"){
        document.getElementById("shop_cost_line").innerHTML = "Buy for " + cost_arr[0];
    }
    
    if(cost_arr[1].length > 0 || work_arr[2].length > 0){
        var op_nDiv = document.createElement('div');
        
    
        op_nDiv.className = "details_cont";
        
    
        op_nDiv.id = "details_container";
        
    
        
        document.getElementById("options_cont").appendChild(op_nDiv);
    }
    
    if(cost_arr[1].length > 0){
        var cr_nDiv = document.createElement('div');
        cr_nDiv.id = "cr_mat_0";
        cr_nDiv.className = "cost_panel_line";
        var craft_cost_obj = Object.assign({}, get_keyVal_pair(work_arr[1]));
        cr_nDiv.onclick = function(){
            expand_option(craft_cost_obj, cr_nDiv.id, work_arr[3]);
        }
        cr_nDiv.innerHTML = "Craft Directly";
        document.getElementById("options_cont").appendChild(cr_nDiv);
    }
    
    if(work_arr[2].length > 0){
        
        
        for(var index = 0; index < work_arr[2].length; index++){
            create_option(work_arr[2][index], index, container_height, work_arr[3]);
        }
    }
    
    var op_Close = document.createElement('div');
    
    op_Close.id = "close_option_div";
    op_Close.innerHTML = "Close Acquisition Options";
    op_Close.onclick = function(){
        document.getElementById("main_cost_panel").style.top = "0px";
        document.getElementById("main_cost_panel").style.left = "0px";
        document.getElementById("shop_cost_line").innerHTML = "";
        document.getElementById("main_cost_panel").style.visibility = "hidden";
        document.getElementById("main_cost_panel").style.opacity = "0";
        clear_cost_panel();
        
    };
    document.getElementById("options_cont").appendChild(op_Close);
    
}

function create_option(mat_obj, index, parent_height, target_name){
    
    var curr_obj = Object.assign(mat_obj);
    var cont_height = parent_height;
    var entry = curr_obj.Method;
    var base = curr_obj.Base;
    var option_str = "";
    var nDiv = document.createElement('div');
    nDiv.id = "up_craft_" + index;
    nDiv.className = "cost_panel_line";
    option_str = entry.slice(0,1) + ": " + base;
    nDiv.innerHTML = option_str;
    
    nDiv.onclick = function(){
        expand_option(curr_obj, nDiv.id, target_name);
    }
    document.getElementById("options_cont").appendChild(nDiv);
}

function expand_option(mat_obj, option_id, target_name){
    var working_arr = Object.assign({}, mat_obj);
    var key_list = Object.keys(working_arr);
    //var height_offset = cont_height;
    
    if(option_id == selected_option_id){
        return;
    }
    
    else{
        document.getElementById(option_id).style.color = "black";
        document.getElementById(option_id).style.backgroundColor = "rgb(175,175,175)";
        
        if(selected_option_id != ""){
            document.getElementById(selected_option_id).style.color = "white";
            document.getElementById(selected_option_id).style.backgroundColor = "black";
        }
        
        selected_option_id = option_id;
        
    }
    
    if (key_list.indexOf("Base") != -1){
        key_list.splice(key_list.indexOf("Base"), 1);
    }
    
    if(key_list.indexOf("Method") != -1){
        key_list.splice(key_list.indexOf("Method"), 1);
    }
    
    
    var window_height = ((key_list.length + 1) * 21) + 52;
    
    if(document.getElementById("details_container").innerHTML != ""){
        document.getElementById("details_container").innerHTML = "";
    }
    else{
        document.getElementById("details_container").style.visibility = "visible";
        document.getElementById("details_container").style.opacity = "1";
        
        document.getElementById("details_container").style.left = "-2px";
        //document.getElementById("details_container").style.top = (-1 * (window_height - height_offset)) + 'px';
        document.getElementById("details_container").style.top = '0px';
        //document.getElementById("details_container").style.bottom = "0px";
    }
    
    document.getElementById("details_container").style.height = window_height + 'px';
    
    
    
    var op_head = document.createElement('div');
    op_head.className = "options_header";
    op_head.id = "details_container_header";
    document.getElementById("details_container").appendChild(op_head);
    //var header_string = working_arr.Method.slice(0,1) + ": " + working_arr.Base + " Total Cost";
    op_head.innerHTML = "Total Cost";
    //op_head.innerHTML = header_string;
    //op_head.style.fontSize = "9pt";
    dragPanel(document.getElementById("details_container"));
    
    var nBase = document.createElement('div');
    nBase.id = "option_base";
    nBase.className = "total_info_line";
    nBase.style.color = "white";
    nBase.style.textAlign = "center";
    nBase.innerHTML = document.getElementById(option_id).innerHTML;
    document.getElementById("details_container").appendChild(nBase);
    
    
    //console.log(key_list);
    key_list.sort();
    for (var index = 0; index < key_list.length; index++){
        if(key_list[index] != "Cost"){
            add_mat(key_list[index], working_arr[key_list[index]], "details_container");
        }
    }
    add_mat("Cost", working_arr["Cost"], "details_container");
    
    var nClose = document.createElement('div');
    nClose.id = "close_details_pan";
    nClose.className = "total_info_line";
    nClose.innerHTML = "Close Cost Panel";
    
    nClose.onclick = function(){
        document.getElementById(selected_option_id).style.color = "white";
        document.getElementById(selected_option_id).style.backgroundColor = "black";
        //document.getElementById("details_container").innerHTML = "";
        selected_option_id = "";
        while (document.getElementById("details_container").hasChildNodes()) {
            document.getElementById("details_container").removeChild(document.getElementById("details_container").lastChild);
        }
        
        close_expanded_options();
        
    };
    
    document.getElementById("details_container").appendChild(nClose);
    
    var nSave = document.createElement('div');
    nSave.id = "save_button";
    nSave.className = "total_info_line";
    nSave.innerHTML = ("Save Current List");
    /*==================================================================SAVE FUNCTION HERE==================================================================*/
    nSave.onclick = function(){
        //alert("Saving " + target_name + " - " + document.getElementById(option_id).innerHTML);
        //console.log(working_arr);
        working_arr.target = target_name;
        save_current_option(working_arr, document.getElementById(option_id).innerHTML);
    }
    /*==================================================================SAVE FUNCTION HERE==================================================================*/
    document.getElementById("details_container").appendChild(nSave);
}

function add_mat (mat_name, mat_amt, parent_id){
    //console.log(mat_name, mat_amt);
    var line_nDiv = document.createElement('div')
    var name_nDiv = document.createElement('div');
    var amt_nDiv = document.createElement('div');
    
    if(mat_name != "Cost"){
        name_nDiv.className = "mat_lable";
        amt_nDiv.className = "mat_value";
        
        name_nDiv.innerHTML = mat_name;
        amt_nDiv.innerHTML = mat_amt;
        
        
    }
    else{
        name_nDiv.className = "totalCost_lable";
        amt_nDiv.className = "totalCost_value";
        
        name_nDiv.innerHTML = "Total: ";
        amt_nDiv.innerHTML = mat_amt + 'z';
    }
    
    line_nDiv.className = "total_info_line";
    
    line_nDiv.appendChild(name_nDiv);
    line_nDiv.appendChild(amt_nDiv);
    
    document.getElementById(parent_id).appendChild(line_nDiv);
}

function clear_cost_panel(){
    document.getElementById("options_cont").innerHTML = "";
    selected_option_id = "";
}

document.getElementById('gen_button').addEventListener("click", function(){
    var selected_option = document.getElementById("tree_selection").value;
    if(selected_option != "Empty"){
        update_header_body(selected_option);
        if(curr_selected_option != selected_option){
            curr_selected_option = selected_option;
            display_tree_header();
            disp_selection_box();
            reset_prev_selection();
            delete_tree();
            hide_controls();
            //curr_selected_tree = eval(curr_selected_option).slice();
            var returned_data = "";
            
            fetch(server+"/get_arr/"+curr_selected_option).then((resp)=>{
                return resp.text();
            }).then((text)=>{
                //alert(text);
                returned_data = text.slice();
                curr_selected_tree = eval(returned_data);
                //curr_selected_tree = document.getElementById("clipboard").innerHTML;
                //console.log(document.getElementById("clipboard").innerHTML);
                
            });
            
            
        }
        else{
            display_tree_header();
        }
        
    }
    
    
    
});

document.getElementById('del_button').addEventListener("click", function(){

    
    remove_info_box();

    if(document.getElementById("rare_list") != null){
        reshow_listings();
    }
    else if(document.getElementById("chosen_obj_disp") != null){
        delete_chosen_node();
    }
    else{
        delete_tree();
        selected_node = -1;
        delete_listings();
        reset_prev_selection();
        //disp_selection_box();
        delete_name_list();
        curr_selected_option = '';
        document.getElementById("tree_selection").value = "Empty";
        document.getElementById("tree_header_bot").innerHTML = "";
        
        document.getElementById("disp_select_button").style.visibility = "hidden";
        document.getElementById("disp_select_button").style.opacity = "0";

        document.getElementById("selection").style.visibility = "hidden";
        document.getElementById("selection_header").style.visibility = "hidden";
        document.getElementById("selection").style.opacity = "0";
        document.getElementById("selection_header").style.opacity = "0";
        
        display_tree_header();
        
        
    }
    
    
    
});

document.getElementById("toggle_img").addEventListener("click", function(){
    document.getElementById("options").style.visibility = 'hidden';
    document.getElementById("options").style.opacity = '0';


    
    document.getElementById("toggle_button").style.visibility = 'visible';
    document.getElementById("toggle_button").style.opacity = '1';

});

document.getElementById("toggle_button").addEventListener("click", function(){
    document.getElementById("toggle_button").style.visibility = 'hidden';
    document.getElementById("toggle_button").style.opacity = '0';
    

    
    document.getElementById("options").style.visibility = 'visible';
    document.getElementById("options").style.opacity = '1';

});

document.getElementById("op_weap").addEventListener("click", function(){
    var element1 = document.getElementById("options_middle");
    var style1 = window.getComputedStyle(element1);
    var att_value1 = parseInt(style1.getPropertyValue('top'));
    
    var element2 = document.getElementById("options_bottom");
    var style2 = window.getComputedStyle(element2);
    var att_value2 = parseInt(style1.getPropertyValue('top'));
    
    var new_val1;
    var new_val2;
    
    var pan_ele = document.getElementById("options_containter");
    var pan_style = window.getComputedStyle(pan_ele);
    var pan_top = parseInt(pan_style.getPropertyValue('top'));
    
    if(weap_toggle == 0){
        element1.style.top = 280 + 'px';
        
        weap_toggle = 1;
        
        
        
        if(arm_toggle == 1){
            element2.style.top = 420 + 'px';
        }
        else{
            element2.style.top = 280 + 'px';
        }
        
    }
    else{
        element1.style.top = 0 + 'px';
        
        
        
        if(arm_toggle == 1){
            element2.style.top = 140 + 'px';
        }
        else{
            element2.style.top = 0 + 'px';
        }
        
        weap_toggle = 0;
    }
    
    
});

document.getElementById("op_armor").addEventListener("click", function(){
    var element1 = document.getElementById("options_bottom");
    var style1 = window.getComputedStyle(element1);
    var att_value1 = parseInt(style1.getPropertyValue('top'));
    
    if(arm_toggle == 0){
        if(weap_toggle == 1){
            element1.style.top = 420 + 'px';
        }
        else{
            element1.style.top = 140+ 'px';
        }
        
        arm_toggle = 1;
    }
    else{
        if(weap_toggle == 1){
            element1.style.top = 280 + 'px';
        }
        else{
            element1.style.top = 0 + 'px';
        }
        
        arm_toggle = 0;
    }

});

document.getElementById("get_cost").addEventListener("click", function(){
    
    

    var selected_name = document.getElementById(selected_node+"_title").innerHTML;
    var chosen_node = {};

    for(var row = 0; row < curr_selected_tree.length; row++){
        for (var col = 0; col < curr_selected_tree[row].length; col++){
            if(selected_name == curr_selected_tree[row][col].name){
                chosen_node = Object.assign({}, curr_selected_tree[row][col]);
                break;
            }
        }
    }
    var cost_arr = calculate_cost(chosen_node);


    document.getElementById("main_cost_panel").style.left = '0px';
    document.getElementById("main_cost_panel").style.top = '0px';
    if(document.getElementById("details_container") != null){
        document.getElementById("details_container").style.left = "-2px";
        document.getElementById("details_container").style.top = "0px";

    }
    document.getElementById("main_cost_panel").style.visibility = "visible";
    document.getElementById("main_cost_panel").style.opacity = "1";
    document.getElementById("main_cost_panel_header").innerHTML = chosen_node.name;
    document.getElementById("main_cost_panel_header").style.color = update_rare_color(chosen_node.rarity);
    //console.log(cost_arr);   
    append_craft_options(cost_arr);
    



});

document.getElementById("min_bar").addEventListener("click", function(){
    var ctrl_min_bar = document.getElementById("min_bar");
    if(ctrl_min_bar.innerHTML == " "){
        document.getElementById("control").style.right = "-150px";
        ctrl_min_bar.innerHTML = "";
    }
    else{
        document.getElementById("control").style.right = "0px";
        ctrl_min_bar.innerHTML = " ";
    }
});

dragPanel(document.getElementById("main_cost_panel"));
dragPanel(document.getElementById("info_box"));
/*===============================================INDEX STUFF===============================================*/

var prev_selection = -1;

function reset_prev_selection(){
    if(prev_selection >=1 && prev_selection <= 3){
        document.getElementById("selection"+prev_selection).style.backgroundColor = "rgba(250,250,250,0.5)";
        document.getElementById("selection"+prev_selection).style.color = "white";
        prev_selection = -1;
        delete_chosen_node();
        delete_name_list();
        delete_rare_list();
        delete_listings();
        delete_tree();
        
        
    }
}

function set_selection(selected_num){
    if(selected_num != -1){
        document.getElementById("selection"+selected_num).style.backgroundColor = "rgba(5,5,5,0.5)";
        document.getElementById("selection"+selected_num).style.color = "rgb(250,250,250)";
    }
    else{
        document.getElementById("disp_select_button").style.visibility = "hidden";
        document.getElementById("disp_select_button").style.opacity = "0";
    }
    
    reset_prev_selection();
    prev_selection = selected_num;
    delete_listings();
    delete_name_list();
    remove_info_box();
    selected_node = -1;
}

function disp_selection_box(){
    document.getElementById("disp_select_button").style.visibility = "hidden";
    document.getElementById("disp_select_button").style.opacity = "0";
    
    setTimeout(function(){
        document.getElementById("selection").style.visibility = "visible";
        document.getElementById("selection").style.opacity = "1";
        document.getElementById("selection").style.right = "0px";
        document.getElementById("selection_toggle").style.visibility = "hidden";
        document.getElementById("selection_toggle").style.opacity = "0";
        document.getElementById("selection_header").style.visibility = "visible";
        document.getElementById("selection_header").style.opacity = "1";
        
        
        setTimeout(function(){
            document.getElementById("selection").style.top = "100px";
            document.getElementById("selection_header_text").innerHTML = "Choose an Option";
            document.getElementById("selection_header").style.top = "-26px";
        }, 150);
        
    }, 150);
    
    
}

function display_control(){
    document.getElementById("control").style.visibility = 'visible';
    document.getElementById("control").style.opacity = '1';
    document.getElementById("min_bar").innerHTML = " ";
    setTimeout(function(){
        document.getElementById("control").style.right = "0px";
    },100);
}

function hide_controls(){
    document.getElementById("control").style.visibility = 'visible';
    document.getElementById("control").style.opacity = '1';
    document.getElementById("min_bar").innerHTML = "";
    setTimeout(function(){
        document.getElementById("control").style.right = "-150px";
    },100);
}

function toggle_selection_box(){
    var sBox_element = document.getElementById("selection");
    var sBox_header = document.getElementById("selection_header")
    if(document.getElementById("selection_header_text").innerHTML != 'Show Options'){
        sBox_element.style.top = "-66px";
        sBox_header.style.top = "66px";
        document.getElementById("selection_header_text").innerHTML = "Show Options";
        setTimeout(function(){
            document.getElementById("selection_toggle").style.visibility = 'visible';
            document.getElementById("selection_toggle").style.opacity = '1';
        }, 200);
        
        
    }
    else{
        
        document.getElementById("selection_toggle").style.visibility = 'hidden';
        document.getElementById("selection_toggle").style.opacity = '0';
        setTimeout(function(){
            sBox_element.style.top = "100px";
            sBox_header.style.top = "-23px";
            document.getElementById("selection_header_text").innerHTML = "Choose an Option";
        }, 100);
    }
}

function create_rarity_list(rare_list){
    var nDiv = document.createElement('div');
    var D_height = 20 * rare_list.length + 50;
    var is_first = false;
    var nCont = document.createElement('div');
    
    nCont.id = "rare_list_cont";
    nDiv.id = "listings";
    nDiv.style.height = D_height + 'px';
    nCont.style.height = D_height + 'px';
    
    for(var index = 0;index < rare_list.length; index++){
        is_first = (index == 0);
        append_rare_list(rare_list[index], nCont, is_first);
    }
    
    nDiv.appendChild(nCont);
    document.body.appendChild(nDiv);
}

function append_rare_list(rarity, parent, is_first){
    var rarity_value = rarity;
    var nBox = document.createElement('div');
    nBox.id = "rare_" + rarity_value;
    nBox.className = "cost_panel_line";
    nBox.innerHTML = "Rarity: " + rarity_value;
    nBox.style.color = update_rare_color(rarity_value);
    nBox.style.border = "1px solid";
    nBox.style.borderColor = "chocolate";
    if(!is_first){
        nBox.style.borderTopStyle = "hidden";
    }
    
    nBox.onclick = function(){
        //document.getElementById("listings").style.opacity = "0";
        document.getElementById("rare_list_cont").style.visibility = "hidden";
        document.getElementById("rare_list_cont").style.opacity = "0";
        list_wpn_by_rarity(rarity_value);
        
        
        
    };
    parent.appendChild(nBox);
}

function reshow_listings(){
    
    if(document.getElementById("rare_list") != null){
        delete_rare_list();
        document.getElementById("rare_list_cont").style.visibility = "visible";
        document.getElementById("rare_list_cont").style.opacity = "1";
    }
    

}

function list_wpn_by_rarity(input_rarity){
    var working_tree = curr_selected_tree.slice();
    var wpn_list = [];
    
    var nBut = document.createElement('button');
    nBut.id = "rare_list_back_but";
    nBut.innerHTML = "Back";
    nBut.onclick = function(){
        reshow_listings();
    }
    
    
    
    for(var row = 0; row < working_tree.length; row +=2){
        for(var index = 0; index < working_tree[row].length; index++){
            if(working_tree[row][index].type == 'node'){
                if(working_tree[row][index].rarity == input_rarity)
                    wpn_list.push(working_tree[row][index]);
            }
            
        }
    }
    var formatted_arr = transpose_arr(wpn_list).slice();
    //console.log(output_arr);
    disp_Tree(formatted_arr, "rare_list", "listings");
    //document.getElementById("rare_list").style.opacity = "1";
    document.getElementById("rare_list").appendChild(nBut);
}

function transpose_arr(input_arr){
    var working_arr = input_arr.slice();
    var output_arr = [];
    
    for(var index = 0; index < working_arr.length; index++){
        output_arr.push([working_arr[index]]);
        if(index != working_arr.length - 1){
            output_arr.push([{type: 'blank'}]);
        }
        
    }
    
    return output_arr;
}

function getPos(el) {
    
    for (var lx=0, ly=0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {x: lx,y: ly};
}

function move_info_box(x_coor, y_coor){
    document.getElementById("info_box").style.top = y_coor + 'px';
    document.getElementById("info_box").style.left = x_coor + 'px';
    
}

function create_name_list(){
    var nDiv = document.createElement('div');
    var nSel = document.createElement('select');
    var nOp = document.createElement('option');
    var nBut = document.createElement('button');
    
    nBut.id = "name_sel_but";
    nDiv.id = "names_cont";
    nSel.id = "name_list";
    nOp.id = "default_name_op";
    nOp.innerHTML = "Pick a Name";
    nBut.innerHTML = "Select";
    
    nBut.onclick = function(){
        var sel_coor = document.getElementById("name_list").value;
        disp_selected_name(sel_coor);  
    };
    
    nOp.value = "Empty";
    nSel.appendChild(nOp);;
    nDiv.appendChild(nSel);
    nDiv.appendChild(nBut);
    document.body.appendChild(nDiv);
}

function populate_name_list(){
    var working_arr = curr_selected_tree.slice();
    var list_of_names = [];
    var list_of_obj = [];
    
    for(var row = 0; row < working_arr.length; row += 2){
        for(var index = 0; index < working_arr[row].length; index++){
            if(working_arr[row][index].type == 'node'){
                var new_obj = {};
                new_obj["name"] = working_arr[row][index].name;
                new_obj["coor"] = [index, row];
                list_of_obj.push(new_obj);
                list_of_names.push(working_arr[row][index].name);
            }
        }
    }
    
    list_of_names.sort();
    fill_name_list(list_of_names, list_of_obj);
}

function fill_name_list(input_arr, obj_arr){
    var arr = input_arr.slice();
    var working_obj_arr = obj_arr.slice();
    var list = document.getElementById("name_list");
    
    for(var index = 0; index < arr.length; index++){
        var nOp = document.createElement('option');
        nOp.id = "name"+index;
        for(var i = 0; i < working_obj_arr.length; i++){
            if(arr[index] == working_obj_arr[i].name){
                nOp.value = working_obj_arr[i].coor;
            }
        }
        nOp.innerHTML = arr[index];
        
        list.appendChild(nOp);
    }
}

function disp_selected_name(tree_coordinates){
    var chosen_arr = tree_coordinates.split(",");
    var chosen_x = chosen_arr[0];
    var chosen_y = chosen_arr[1];
    var chosen_obj = Object.assign(curr_selected_tree[chosen_y][chosen_x]);
    
    var single_obj_tree = [[chosen_obj]];
    
    if(prev_sel_name != chosen_obj.name){
        
        if(document.getElementById("chosen_obj_disp") != null){
            delete_chosen_node();
        }           
        var nDiv = document.createElement('div');
        nDiv.id = "selected_name_display";
        document.getElementById("names_cont").appendChild(nDiv);
        prev_sel_name = chosen_obj.name;
        remove_info_box();
        selected_node = -1;
        disp_Tree(single_obj_tree, "chosen_obj_disp", "selected_name_display");
        
    }
    

    
    
}

function delete_chosen_node(){
    var display_node = document.getElementById("selected_name_display");
    if(display_node != null){
    document.getElementById("names_cont").removeChild(display_node);       
    }
    

}

function delete_name_list(){
    if(document.getElementById("names_cont") != null){
        var name_list_ele = document.getElementById("names_cont");
        document.body.removeChild(name_list_ele);
    }

}

function scroll_window(x, y){
    /*
    console.log(x, y)
    console.log(window.innerHeight, window.innerWidth);
    console.log(window.pageXOffset, window.pageYOffset);
    */
    var win_midX = window.pageXOffset + (window.innerWidth / 2);
    var win_midY = window.pageYOffset + (window.innerHeight / 2);
    
    var obj_midX = x + 50;
    var obj_midY = y + 50;
    
    var new_win_X = obj_midX - (window.innerWidth/2);
    var new_win_Y = obj_midY - (window.innerHeight/2);
    
    //console.log(new_win_X, new_win_Y);
    
    //window.scrollTo(new_win_X, new_win_Y);
    
    var i = window.pageXOffset;
    var j = window.pageYOffset;
    
    var x_inc = 10;
    var y_inc = 10;
    
    if(new_win_X < i){
        x_inc = -10;
    }
    
    if(new_win_Y < j){
        y_inc = -10;
    }
    
    var start_X = window.pageXOffset;
    var start_Y = window.pageYOffset;
    
    var int = setInterval(function() {
        window.scrollTo(start_X, start_Y);
        start_X += x_inc;
        start_Y += y_inc;
        if (start_X >= new_win_X && x_inc > 0){
            start_X = new_win_X;
            x_inc = 0;
        } 
        else if(start_X <= new_win_X && x_inc < 0){
            start_X = new_win_X;
            x_inc = 0;
        }
        
        if(start_Y >= new_win_Y && y_inc > 0 ){
            start_Y = new_win_Y;
            y_inc = 0;
        }
        else if(start_Y <= new_win_Y && y_inc < 0){
            start_Y = new_win_Y;
            y_inc = 0;
        }
        
        if(x_inc == 0 && y_inc == 0){
            clearInterval(int);
        }
    }, 1);
    
}

function reset_info_box(){
    if(selected_node != -1){
        var div_coor = Object.assign({},getPos(document.getElementById(selected_node)));
        move_info_box(div_coor.x - 60, div_coor.y - 60);
    }
    
}

function close_expanded_options(){
    document.getElementById("details_container").style.height = "0px";
    document.getElementById("details_container").style.visibility = "hidden";
    document.getElementById("details_container").style.opacity = "0";
}

document.getElementById("selection1").addEventListener("click", function(){
    if(prev_selection != 1){
        set_selection(1);
        
        if(curr_selected_option != ""){
            
            var rarity_list = [];
            var working_tree = curr_selected_tree.slice();



            for(var row = 0; row < working_tree.length; row +=2){
                for(var index = 0; index < working_tree[row].length; index++){
                    if(working_tree[row][index].type == 'node'){
                        if(rarity_list.indexOf(working_tree[row][index].rarity) == -1)
                            rarity_list.push(working_tree[row][index].rarity);
                    }

                }
            }

            rarity_list.sort(function(a, b){return a-b});
            create_rarity_list(rarity_list);
            toggle_selection_box();
            
        }
        
    }
    

    
});

document.getElementById("selection2").addEventListener("click", function(){
    if(prev_selection != 2){
        set_selection(2);

        if(curr_selected_option != ""){
            create_name_list();
            populate_name_list();
            toggle_selection_box();
        }

        
        
    }
    

    
});

document.getElementById("selection3").addEventListener("click", function(){
    if(prev_selection != 3){
        set_selection(3);
        var selected_tree = curr_selected_option;
        document.getElementById("tree_header_bot").innerHTML = document.getElementById("tree_header_bot").innerHTML + " Tree";
        if (selected_tree != "Empty" && selected_tree != ""){
            delete_tree();
            disp_Tree(curr_selected_tree, "diagram", "content");
            toggle_selection_box();
        }
        
    }
    
});

document.getElementById("selection_header").addEventListener("click", function(){
    toggle_selection_box();
});

document.getElementById("selection_toggle").addEventListener("click", function(){
    document.getElementById("selection").style.visibility = "hidden";
    document.getElementById("selection").style.opacity = "0";
    document.getElementById("selection").style.right = '-100px';
    
    document.getElementById("disp_select_button").style.visibility = "visible";
    document.getElementById("disp_select_button").style.opacity = "1";
});

document.getElementById("disp_select_button").addEventListener("click", function(){
    document.getElementById("selection").style.visibility = "visible";
    document.getElementById("selection").style.opacity = "1";
    document.getElementById("selection").style.right = '0px';
    
    document.getElementById("disp_select_button").style.visibility = "hidden";
    document.getElementById("disp_select_button").style.opacity = "0";
});


document.getElementById("info_close").addEventListener("click", function(){
    document.getElementById(selected_node).style.borderColor = 'dimgray';
    remove_info_box();
    selected_node = -1;
   
});

document.getElementById("options_up_butt").addEventListener("click", function(){
    var ele = document.getElementById("options_containter");
    var ele_style = window.getComputedStyle(ele);
    var ele_top = parseInt(ele_style.getPropertyValue('top'));
    
    var new_ele_top = ele_top + 100;
    if(new_ele_top > 0){
        new_ele_top = 0
    }
    ele.style.top = new_ele_top + 'px';
});

document.getElementById("options_down_butt").addEventListener("click", function(){
    var ele = document.getElementById("options_containter");
    var ele_style = window.getComputedStyle(ele);
    var ele_top = parseInt(ele_style.getPropertyValue('top'));
    var new_ele_top = ele_top - 100;
    
    var top_value2 = document.getElementById("options_bottom").offsetTop;

    if((top_value2 + new_ele_top) < 0){
        new_ele_top = -1 * top_value2;
    }
    //console.log(top_value2);
    //console.log(new_ele_top);
    ele.style.top = new_ele_top + 'px';
});

document.getElementById("preview_lable").addEventListener("click", function(){
    var prev_lable = document.getElementById("preview_lable");
    
    if(prev_lable.innerHTML == "Preview"){
        toggle_page(5);
        
    }
    else{
        
        toggle_page(4);
    }
});
/*===========================================================================================================================================================*/

var page_bgm = new Audio("Audio/Tracks/mhfu_install_theme.mp3");
var first_play = true;

var track_list = ["Audio/Tracks/main_theme.mp3", "Audio/Tracks/mhfu_install_theme.mp3", "Audio/Tracks/shagaru_magala_theme.mp3", "Audio/Tracks/white_fatalis_theme.mp3", "Audio/Tracks/zinogre_theme.mp3"];
var track_pool = [];

var saved_local_list = {};

var initialize_local_list = false;

var bkmk_data_index = [-1, -1, -1];
var bkmk_data_id = ["", "", ""];

function play_audio(input){
    
    if(input == 0){
        if(playback){
            document.getElementById("playback_img").src = "Img/Felyne/img1.png";
            setTimeout(function(){
                play_audio(1);
            }, 600);
        }
    }
    else if(input == 1){
        if(playback){
            document.getElementById("playback_img").src = "Img/Felyne/img2.png";
            setTimeout(function(){
                play_audio(0);
            }, 600);
        }
    }
    else if(input == -1){
        document.getElementById("playback_img").src = "Img/play.png";
    }
}

function random_playback(){
    var index = -1;
    if(track_pool.length == 0){
        track_pool = track_list.slice();
    }
    index = Math.random() * (track_pool.length - 0) + 0;
    var output = Math.floor(Number(index));
    page_bgm = new Audio(track_pool[output]);
    
    page_bgm.addEventListener("ended", function(){
        playback = false;
        setTimeout(function(){
            random_playback();
            playback = true;
            page_bgm.currentTime=0;
            page_bgm.play();
            play_audio(1);
        }, 600);
    

    
    });
    
    track_pool.splice(index, 1);
    //console.log(track_pool);
}

function save_current_option(input_obj, acq_method){
    load_local_list();
    
    var curr_obj = Object.assign({}, input_obj);
    var gear_type = selected_gear;
    var craft_path = acq_method;
    var target_gear = curr_obj.target;
    //console.log(curr_obj);
    //check_saved_list(gear_type, target_gear, craft_path);
    
    //If there's no data in local storage, create an entirely new list
    if (saved_local_list == null){
        var new_list = [{type: gear_type, gear_list: [{name: target_gear, path_list: [{path_name: craft_path, materials: curr_obj}]}]}];
        var arrText = JSON.stringify(new_list);
        //console.log("local storage empty");
        localStorage.setItem("saved_list", arrText);
        alert("List saved to local storage.");
    }
    else{
        //console.log("local storage not empty");
        var index_arr = check_saved_list(gear_type, target_gear, craft_path);
        var indentifier_arr = [gear_type, target_gear, craft_path];
        //console.log(index_arr);
        if(index_arr[2] == -1){
            append_to_local_list(index_arr, indentifier_arr, curr_obj);
            
            var updated_local_list = saved_local_list.slice();
            var new_arrText = JSON.stringify(updated_local_list);
            
            localStorage.setItem("saved_list", new_arrText);
            
            alert("List saved to local storage.");
        }
        
        else{
            alert("List already exists in local storage.");
        }
        
        //console.log(saved_local_list);
        
    }
    
    

    
}

function check_saved_list(input_type, input_target, input_path){
    var result = "none";
    var loaded_arr = saved_local_list.slice();
    
    var type_index = -1;
    var target_index = -1;
    var path_index = -1;
    
   
    
    for(var type_i = 0; type_i < loaded_arr.length; type_i +=1){
        
        //console.log(loaded_arr[type_i].type + ", " + input_type);
        
        if(loaded_arr[type_i].type == input_type){
            type_index = type_i;
            var target_list = loaded_arr[type_index].gear_list.slice();
             
            for(var target_i = 0; target_i < target_list.length; target_i += 1){
                
                //console.log(target_list[target_i].name + ", " + input_target);
                
                if(target_list[target_i].name == input_target){
                    target_index = target_i;
                    
                    var paths = target_list[target_i].path_list.slice();
                    
                    for(var path_i = 0; path_i < paths.length; path_i += 1){
                        if(paths[path_i].path_name == input_path){
                            path_index = path_i;
                            
                        }
                    }
                }
            }
            
        }
    }
           
    return [type_index, target_index, path_index];
}

function append_to_local_list (index_arr, identifier_arr, mat_obj){
    var list_index = index_arr.slice();
    var list_id = identifier_arr.slice();
    var work_obj = Object.assign({}, mat_obj);
    
    var current_list = saved_local_list.slice();
    
    if(list_index[0] == -1){
        var new_type = {type: list_id[0], gear_list: [{name: list_id[1], path_list: [{path_name: list_id[2], materials: work_obj}]}]};
        current_list.push(new_type);
    }
    else{
        if(list_index[1] == -1){
            var new_target = {name: list_id[1], path_list: [{path_name: list_id[2], materials: work_obj}]};
            current_list[list_index[0]].gear_list.push(new_target);
        }
        else{
            var new_path = {path_name: list_id[2], materials: work_obj};
            current_list[list_index[0]].gear_list[list_index[1]].path_list.push(new_path);
        }
    }
    
    saved_local_list = current_list.slice();
}

function load_local_list(){
    var arrText = localStorage.getItem("saved_list");
    var arr = JSON.parse(arrText);
    
    if(arr != null){
        saved_local_list = arr.slice();
    }
    else{
        saved_local_list = arr;
    }
    
    //console.log(arr);
    //display_arr_elements();
    
}

function create_type_list(){
    if(saved_local_list == null || saved_local_list.length == 0){
        alert("There are no saved lists.");
        return;
    }
    
    var saved_list = saved_local_list.slice();
    
    var nDiv = document.createElement('div');
    
    var nType = document.createElement('div');
    var nTarget = document.createElement('div');
    var nPath = document.createElement('div');
    
    var nType_L = document.createElement('select');
    var nType_B = document.createElement('button');
    
    var nTarget_L = document.createElement('select');
    var nTarget_B = document.createElement('button');
    
    var nPath_L = document.createElement('select');
    var nPath_B = document.createElement('button');
    
    nDiv.id = "bookmark_cont";
    
    nType.id = "type_list";
    nType.className = "category_container";
    nType_L.id = "bkmk_type_list";
    nType_L.className = "category_list";
    nType_B.id = "bkmk_type_button";
    nType_B.className = "category_button";
    nType_B.innerHTML = "Select";    
    
    nTarget.id = "target_list";
    nTarget.className = "category_container";
    nTarget_L.id = "bkmk_target_list";
    nTarget_L.className = "category_list";
    nTarget_B.id = "bkmk_target_button";
    nTarget_B.className = "category_button";
    nTarget_B.innerHTML = "Select";
    
    nPath.id = "path_list";
    nPath.className = "category_container";
    nPath_L.id = "bkmk_path_list";
    nPath_L.className = "category_list";
    nPath_B.id = "bkmk_path_button";
    nPath_B.className = "category_button";
    nPath_B.innerHTML = "Display";
    
    
    nType.appendChild(nType_L);
    nType.appendChild(nType_B);
    
    nTarget.appendChild(nTarget_L);
    nTarget.appendChild(nTarget_B);
    
    nPath.appendChild(nPath_L);
    nPath.appendChild(nPath_B);
    
    nDiv.appendChild(nType);
    nDiv.appendChild(nTarget);
    nDiv.appendChild(nPath);
    
    document.body.appendChild(nDiv);
    
    populate_saved_list("type", nType_L.id, saved_list);
    
    nType_B.onclick = function(){
        check_bkmk();
        bkmk_type_operation(nType_L.value);
    };
    
    nTarget_B.onclick = function(){
        check_bkmk();
        bkmk_target_operation(nTarget_L.value);
    };
    
    nPath_B.onclick = function(){
        check_bkmk();
        bkmk_path_operation(nPath_L.value);
    }
}

function check_bkmk(){
    if(document.getElementById("bkmk_mat_cont") != null){
        document.getElementById("bookmark_cont").removeChild(document.getElementById("bkmk_mat_cont"));
        document.getElementById("bookmark_cont").style.top = "180px";
    }
}

function populate_saved_list (mode, ele_id, input_arr){
    var saved_list = input_arr.slice();
    var nOp = document.createElement('option');
    
    var parent = document.getElementById(ele_id);
    parent.innerHTML = "";
    nOp.id = "list_default";
    nOp.value = "Empty";
    nOp.innerHTML = "Select an Option";
    
    parent.appendChild(nOp);
    
    switch(mode){
        case "type":
            
            for(var index = 0; index < saved_list.length; index += 1){
                var nList_Op = document.createElement('option')
                nList_Op.id = "type_list_option" + index;
                nList_Op.value = index + saved_list[index].type;
                nList_Op.innerHTML = convert_wpn_name(saved_list[index].type);
                nOp.innerHTML = "Select a Weapon Type";
                parent.appendChild(nList_Op);
                
                if(document.getElementById("target_list") != null){
                    document.getElementById("target_list").style.visibility = "hidden";
                    document.getElementById("target_list").style.opacity = "0";
                }
                
                if(document.getElementById("path_list") != null){
                    document.getElementById("path_list").style.visibility = "hidden";
                    document.getElementById("path_list").style.opacity = "0";
                }
            }
            
            break;
            
        case "target":
             for(var index = 0; index < saved_list.length; index += 1){
                var nList_Op = document.createElement('option')
                nList_Op.id = "target_list_option" + index;
                nList_Op.value = index + saved_list[index].name;
                nList_Op.innerHTML = saved_list[index].name;
                nOp.innerHTML = "Select a Weapon";
                parent.appendChild(nList_Op);
                 
                if(document.getElementById("path_list") != null){
                    document.getElementById("path_list").style.visibility = "hidden";
                    document.getElementById("path_list").style.opacity = "0";
                }
                 
            }
            break;
            
        case "path":
            for(var index = 0; index < saved_list.length; index += 1){
                var nList_Op = document.createElement('option')
                nList_Op.id = "path_lise_option" + index;
                nList_Op.value = index + saved_list[index].path_name;
                nList_Op.innerHTML = saved_list[index].path_name;
                nOp.innerHTML = "Select a Crafting Option";
                parent.appendChild(nList_Op);
            }
            break;
    }
    
}

function bkmk_type_operation(selection_value){
    if(selection_value == "Empty"){
        document.getElementById("bkmk_target_list").innerHTML = "";
        document.getElementById("bkmk_path_list").innerHTML = "";
        
        if(document.getElementById("target_list") != null){
            document.getElementById("target_list").style.visibility = "hidden";
            document.getElementById("target_list").style.opacity = "0";
        }
                
        if(document.getElementById("path_list") != null){
            document.getElementById("path_list").style.visibility = "hidden";
            document.getElementById("path_list").style.opacity = "0";
        }
        
        return;
    }
    
    var type_index = parseInt(selection_value);
    var type_val = selection_value.slice(1);
    
    bkmk_data_index[0] = type_index;
    bkmk_data_id[0] = type_val;
    
    var target_list = saved_local_list[type_index].gear_list.slice();
    
    populate_saved_list("target", "bkmk_target_list", target_list);
    
    document.getElementById("target_list").style.visibility = "visible";
    document.getElementById("target_list").style.opacity = "1";
}

function bkmk_target_operation(selection_value){
    if(selection_value == "Empty"){
        document.getElementById("bkmk_path_list").innerHTML = "";
        
        if(document.getElementById("path_list") != null){
            document.getElementById("path_list").style.visibility = "hidden";
            document.getElementById("path_list").style.opacity = "0";
        }
        
        return;
    }
    
    var target_index = parseInt(selection_value);
    var target_val = selection_value.slice(1);
    
    bkmk_data_index[1] = target_index;
    bkmk_data_id[1] =   target_val;
    
    var path_list = saved_local_list[bkmk_data_index[0]].gear_list[target_index].path_list.slice();
    //console.log(path_list);
    populate_saved_list("path", "bkmk_path_list", path_list);
    
    document.getElementById("path_list").style.visibility = "visible";
    document.getElementById("path_list").style.opacity = "1";
}

function bkmk_path_operation(selection_value){
    
    if(selection_value == "Empty"){
        
        return;
    }
    
    var path_index = parseInt(selection_value);
    var path_val = selection_value.slice(1);
    
    var saved_list = saved_local_list.slice();
    
    bkmk_data_index[2] = path_index;
    bkmk_data_id[2] =   path_val;
    
    var mat_obj = Object.assign({}, saved_list[bkmk_data_index[0]].gear_list[bkmk_data_index[1]].path_list[bkmk_data_index[2]].materials);
    //console.log(mat_obj);
    
    display_bkmk_mat_list(mat_obj);
}

function display_bkmk_mat_list(mat_obj){
    
    var materials = Object.assign({}, mat_obj);
    var key_list = Object.keys(materials);
    
    //console.log(materials);
    
    if (key_list.indexOf("Base") != -1){
        key_list.splice(key_list.indexOf("Base"), 1);
    }
    
    if(key_list.indexOf("Method") != -1){
        key_list.splice(key_list.indexOf("Method"), 1);
    }
    
    if(key_list.indexOf("target") != -1){
        key_list.splice(key_list.indexOf("target"), 1);
    }
    
    if(document.getElementById("bkmk_mat_cont") != null){
        document.getElementById("bookmark_cont").removeChild(document.getElementById("bkmk_mat_cont"));
    }
    
    var window_height = ((key_list.length) * 21) + 32;
    
    var nDiv = document.createElement('div');
    
    var element1 = document.getElementById("bookmark_cont");
    var ele_stye1 = window.getComputedStyle(element1);
    var attribute1 = parseInt(ele_stye1.getPropertyValue('top'));
    
    var pan_offset = window_height;
    
    if(window_height > 330){
        pan_offset = 330;
    }
    
    element1.style.top = attribute1 - pan_offset + 'px';
    
    nDiv.id = "bkmk_mat_cont";
    nDiv.className = "bkmk_details_cont";
    nDiv.style.height = window_height + 'px';
    nDiv.style.bottom = - window_height - 25 + 'px';
    
    document.getElementById("bookmark_cont").appendChild(nDiv);
    
    var op_head = document.createElement('div');
    op_head.className = "bkmk_details_header";
    op_head.id = "bkmk_material_header";
    document.getElementById("bkmk_mat_cont").appendChild(op_head);
    //var header_string = working_arr.Method.slice(0,1) + ": " + working_arr.Base + " Total Cost";
    op_head.innerHTML = "Total Cost";
    
    key_list.sort();
    for (var index = 0; index < key_list.length; index++){
        if(key_list[index] != "Cost"){
            add_mat(key_list[index], materials[key_list[index]], "bkmk_mat_cont");
        }
    }
    
    add_mat("Cost", materials["Cost"], "bkmk_mat_cont");
    
    var nDel = document.createElement('div');
    nDel.id = "del_sel_entry";
    nDel.className = "total_info_line";
    nDel.innerHTML = "Delete Entry";
    
    nDel.onclick = function(){
        delete_bkmk_entry();
    };
    
    var nBack = document.createElement('div');
    nBack.id = "back_sel_entry";
    nBack.className = "total_infor_line";
    nBack.innerHTML = "Back";
    
    nBack.onclick = function(){
        element1.removeChild(document.getElementById("bkmk_mat_cont"));
        element1.style.top = "180px";
    };
        
    document.getElementById("bkmk_mat_cont").appendChild(nDel);
    document.getElementById("bkmk_mat_cont").appendChild(nBack);
    
}

function delete_bkmk_entry(){
    var work_arr = saved_local_list.slice();
    var bkmk_entry_index = bkmk_data_index;
    
    work_arr[bkmk_entry_index[0]].gear_list[bkmk_entry_index[1]].path_list.splice(bkmk_entry_index[2], 1);
    
    if(work_arr[bkmk_entry_index[0]].gear_list[bkmk_entry_index[1]].path_list.length == 0){
        work_arr[bkmk_entry_index[0]].gear_list.splice(bkmk_entry_index[1], 1);
    }
    
    if(work_arr[bkmk_entry_index[0]].gear_list.length == 0){
        work_arr.splice(bkmk_entry_index[0], 1);
    }
    
    saved_local_list = work_arr.slice();
    
    var new_arrText = JSON.stringify(work_arr);
    localStorage.setItem("saved_list", new_arrText);
    load_local_list();
    reset_bkmk();
}

function reset_bkmk(){
    document.body.removeChild(document.getElementById("bookmark_cont"));
    create_type_list();
}

function convert_wpn_name (wpn_name){
    switch(wpn_name){
        case 'gs':
            return "Great Sword";
            break;
        case 'ls':
            return "Long Sword";
            break;
        case 'sns':
            return "Sword and Shield";
            break;
        case 'db':
            return "Dual Blades";
            break;
        case 'ham':
            return "Hamme";
            break;
        case 'hrn':
            return "Hunting Horn";
            break;
        case 'lan':
            return "Lance";
            break;
        case 'gl':
            return "Gun Lance";
            break;
        case 'sa':
            return "Switch Axe";
            break;
        case 'cb':
            return "Charge Blade";
            break;
        case 'ig':
            return "Insect Glaive";
            break;
        case 'lbg':
            return "Light Bow Gun";
            break;
        case 'hbg':
            return "Heavy Bow Gun";
            break;
        case 'bow':
            return "Bow";
            break;
    }
}

function remove_bkmk(){
    if(document.getElementById("bookmark_cont") != null){
        document.getElementById("bookmark_cont").style.visibility = 'hidden';
        document.getElementById("bookmark_cont").style.opacity = '0';
        
        setTimeout(function(){
            document.body.removeChild(document.getElementById("bookmark_cont"));
        }, 300);
        
    }
    
}

document.getElementById("op_bookmk").addEventListener("click", function(){
    load_local_list();
    selected_gear = "";
    clear_list();
    delete_tree();
    delete_listings();
    delete_name_list();
    set_selection(-1);
    remove_info_box();
    selected_node = -1;
    document.getElementById("tree_header_top").innerHTML = "";
    hide_header();
    hide_controls();
    document.getElementById("control").style.visibility = 'hidden';
    document.getElementById("control").style.opacity = '0';
    document.getElementById("selection").style.visibility = 'hidden';
    document.getElementById("selection").style.opacity = '0';

    if(document.getElementById("bookmark_cont") == null){
        create_type_list();
    }
    

    
});

document.getElementById("play_button").addEventListener("click", function(){
    
    if(playback){
        
        playback = false;
        page_bgm.pause();
        play_audio(-1);
        
    }
    else{
        //console.log(playback);
        if(first_play){
            random_playback();
            first_play = false;
        }
        playback = true;
        //random_playback();
        page_bgm.play();
        play_audio(1);
        
    }
});

if(!initialize_local_list){
    load_local_list();
    initialize_local_list = true;
    //alert("list loaded: " + saved_local_list);
}

page_bgm.addEventListener("ended", function(){
    playback = false;
    setTimeout(function(){
        random_playback();
        playback = true;
        page_bgm.currentTime=0;
        page_bgm.play();
        play_audio(1);
    }, 600);
    
});

