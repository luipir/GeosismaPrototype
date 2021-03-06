/*
 # -*- coding: utf-8 -*-
 # Copyright (C) 2013 Luigi Pirelli (luipir@gmail.com)
 #
 # This program is free software: you can redistribute it and/or modify
 # it under the terms of the GNU General Public License as published by
 # the Free Software Foundation, either version 3 of the License, or
 # (at your option) any later version.

 # This program is distributed in the hope that it will be useful,
 # but WITHOUT ANY WARRANTY; without even the implied warranty of
 # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 # GNU General Public License for more details.

 # You should have received a copy of the GNU General Public License
 # along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * */

function updateObservations(observations) {
    // get row snippet from the DOM to reuse it in case to add new rows
    // add Number(observations)-x table row for each observation
    // number-x: because some can be already available
    // add new element simulating click on the add button
    var howManyToAdd = (Object.keys(observations).length - $(".obs_topic").length);
    for (var row=0; row < howManyToAdd; row++ ) {
        $(".observationsfield_actions_add").trigger("click");
    }
    // set values of all the rows
    $(".obs_topic").each(function(i, element) {
        $(this).val( observations[i][0] );
        $(this).trigger("change");
    });
    $(".obs_notes").each(function(i, element) {
        $(this).val( observations[i][1] );
        $(this).trigger("change");
    });
}

function updateSafety(newvalue) {
    //console.log(newvalue);
    if (undefined == newvalue) {
        return;
    }
    // manage first unexisting DOM elements (most of radio buttons)
    // first: because dome text element selection depends on radiobutton value
    // unexisting: due they dinamic/positional id name
    // e.g: s2nfloors_1 instead of only s2nfloors
    $.each(newvalue, function(key, value) {
        // skip if key exist
        if ($("#" + key).length) {
            return;
        }
        var element = $("#" + key + "_" + value);
        var type = element.get(0).type;
        element.prop("checked", true);
        element.trigger("click");
        element.trigger("change");
    });
    // manage known DOM elements
    $.each(newvalue, function(key, value) {
        // skip if key doesn't exist
        if (!$("#" + key).length) {
            return;
        }
        var element = $("#" + key);
        var type = element.get(0).type;
        // first check if it's and observation
        if (key == "s9obs") {
            updateObservations(value);
            return;
        }
        // set value basing on object type
        switch (type) {
            case "text":
                element.val(value);
                element.trigger("change");
                break;
            case "checkbox":
                element.attr("checked", true);
                element.trigger("change");
                break;
            default:
                console.log(key + ": I don't know what to do type: " + type);
                break;
        }
    });
}

// switch (key+"_uused_") {
// case "s1viacorso":
// case "s2nfloors":
// case "s2floorh":
// case "s2floorsfc":
// case "s2nunder":
// case "s2percuse":
// case "s2prop":
// case "s3isolpill":
// case "s3reg1":
// case "s3cover":
// case "s7morfo":
// case "s8riskst":
// case "s8risknst":
// case "s8riskext":
// case "s8riskgeo":
// case "s8agibilita":
// case "s8accuracy":
// case "s8whynot":
// case "s8prov1":
// case "s8prov2":
// case "s8prov3":
// case "s8prov4":
// case "s8prov5":
// case "s8prov6":
// case "s8prov7":
// case "s8prov8":
// case "s8prov9":
// case "s8prov10":
// case "s8prov11":
// case "s8prov12":
// element.prop("checked", true);
// element.trigger("click");
// element.trigger("change");
// break;
// default:
// //console.log("I don't know what to do with: "+key);
// break;
// }
// testdata {"s1istatprov":"045","s1istatcom":"004","sdate":"23/10/2013","s9obs":[["arg1","note1"],["arg2","note2"],["arg3","note3"]],"s0com":"com","s0sigla":"sigla","number":3,"s1prov":"MS","s1istatreg":"009","s1com":"Casola in Lunigiana","s1loc":"Casola in Lunigiana","s1istatloc":"10003","s1istatcens":"001","s1catfoglio":"24","s1catpart1":"955","s1viacorso":"1","s1via":"del corso","s1civico":"17","s1coorde":12,"s1coordn":44,"s1fuso":33,"s1name":"pasquale","s1coduso":"02","s2nfloors":"8","s2nunder":"1","s2floorh":"4","s2floorsfc":"15","s2cer8":true,"s2uso8":true,"s2uson8":3,"s2percuse":"6","s2occupiers":4,"s2prop":"0","s3isolpill":"1","s3tG3":true,"s3tH3":true,"s3tG2":true,"s3tG1":true,"s3cover":"2","s3reg1":"0","s3reg2":"1","s3as3":true,"s3as2":true,"s3as1":true,"s4dA6":true,"s4dB5":true,"s4dC4":true,"s4dC5":true,"s4dE5":true,"s4dH6":true,"s4pA5":true,"s4pC4":true,"s4pC2":true,"s4pB2":true,"s4pE2":true,"s5ensA6":true,"s5ensB6":true,"s5ensE5":true,"s5ensC4":true,"s5ensD4":true,"s5ensE4":true,"s5ensD3":true,"s5ensB2":true,"s5ensG1":true,"s5ensA1":true,"s6extA2":true,"s6extB2":true,"s6extB1":true,"s6extC1":true,"s6extE2":true,"s7diss":"3","s8riskst":"1","s8risknst":"0","s8riskext":"1","s8riskgeo":"2","s8agibilita":"1","s8accuracy":"3","s8whynot":"4","s8whyother":"altro1","s8prov1":"0","s8prov2":"0","s8prov3":"0","s8prov4":"0","s8prov5":"0","s8prov6":"0","s8prov7":"1","s8prov8":"1","s8prov9":"1","s8prov10":"1","s8prov11":"1","s8prov12":"1","s8prov11other":"altro2","s8prov12other":"altro3","s8inag":3,"s8famev":4,"s8persev":5}
