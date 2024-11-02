function calcul(){

    var somme = (r_14.value* c_14.value) - (-r_13.value* c_13.value) - (-r_12.value* c_12.value) - (-r_11.value* c_11.value) - (-r_10.value* c_10.value) - (-r_9.value* c_9.value) - (-r_8.value* c_8.value) - (-r_7.value* c_7.value) - (-r_6.value* c_6.value) - (-r_5.value* c_5.value) - (-r_4.value* c_4.value) - (-r_3.value* c_3.value) - (-r_2.value* c_2.value) - (-r_1.value* c_1.value) ;
    sum.value = (somme).toFixed(0);
    
    var c_total = (c_14.value) - (-c_13.value) - (-c_12.value) - (-c_11.value) - (-c_10.value) - (-c_9.value) - (-c_8.value) - (-c_7.value) - (-c_6.value) - (-c_5.value) - (-c_4.value) - (-c_3.value) - (-c_2.value) - (-c_1.value) ;
    coefficients.value = c_total;
    average.value = (somme/c_total).toFixed(2);  
}


//-------1----------
var e_1 = document.getElementById("e_1"),
    d_1 = document.getElementById("d_1"),
    t_1 = document.getElementById("t_1"),
    c_1 = document.getElementById("c_1"),
    coefficients = document.getElementById("coefficients"),
    sum = document.getElementById("sum"),
    average = document.getElementById("average"),
    r_1 = document.getElementById("r_1");

function f1() { r_1.value = ((d_1.value*1) + (t_1.value*1))/2;
                r_1.value = ((e_1.value * 2) + (r_1.value*1))/3;};
e_1.onkeyup = function () { "use strict"; f1(); calcul(); };
d_1.onkeyup = function () { "use strict"; f1(); calcul(); };
t_1.onkeyup = function () { "use strict"; f1(); calcul(); };

//-------2----------
var e_2 = document.getElementById("e_2"),
    d_2 = document.getElementById("d_2"),
    t_2 = document.getElementById("t_2"),
    c_2 = document.getElementById("c_2"),
    r_2 = document.getElementById("r_2");

function f2() { r_2.value = ((d_2.value*1) + (t_2.value*1))/2;
                r_2.value = ((e_2.value * 2) + (r_2.value*1))/3;};
e_2.onkeyup = function () { "use strict"; f2(); calcul(); };
d_2.onkeyup = function () { "use strict"; f2(); calcul(); };
t_2.onkeyup = function () { "use strict"; f2(); calcul(); };

//-------3----------
var e_3 = document.getElementById("e_3"),
    d_3 = document.getElementById("d_3"),
    t_3 = document.getElementById("t_3"),
    c_3 = document.getElementById("c_3"),
    r_3 = document.getElementById("r_3");

function f3() { r_3.value = ((d_3.value*1) + (t_3.value*1))/2;
                r_3.value = ((e_3.value * 2) + (r_3.value*1))/3;};
e_3.onkeyup = function () { "use strict"; f3(); calcul(); };
d_3.onkeyup = function () { "use strict"; f3(); calcul(); };
t_3.onkeyup = function () { "use strict"; f3(); calcul(); };

//-------4----------
var e_4 = document.getElementById("e_4"),
    d_4 = document.getElementById("d_4"),
    t_4 = document.getElementById("t_4"),
    c_4 = document.getElementById("c_4"),
    r_4 = document.getElementById("r_4");

function f4() { r_4.value = ((d_4.value*1) + (t_4.value*1))/2;
                r_4.value = ((e_4.value * 2) + (r_4.value*1))/3;};
e_4.onkeyup = function () { "use strict"; f4(); calcul(); };
d_4.onkeyup = function () { "use strict"; f4(); calcul(); };
t_4.onkeyup = function () { "use strict"; f4(); calcul(); };

//----------5---------------
var e_5 = document.getElementById("e_5"),
    d_5 = document.getElementById("d_5"),
    t_5 = document.getElementById("t_5"),
    c_5 = document.getElementById("c_5"),
    r_5 = document.getElementById("r_5");

function f5() { r_5.value = ((d_5.value*1) + (t_5.value*1))/2;
                r_5.value = ((e_5.value * 2) + (r_5.value*1))/3;};
e_5.onkeyup = function () { "use strict"; f5(); calcul(); };
d_5.onkeyup = function () { "use strict"; f5(); calcul(); };
t_5.onkeyup = function () { "use strict"; f5(); calcul(); };

//------------6-----------
var e_6 = document.getElementById("e_6"),
    d_6 = document.getElementById("d_6"),
    t_6 = document.getElementById("t_6"),
    c_6 = document.getElementById("c_6"),
    r_6 = document.getElementById("r_6");

function f6() { r_6.value = ((d_6.value*1) + (t_6.value*1))/2;
                r_6.value = ((e_6.value * 2) + (r_6.value*1))/3;};
e_6.onkeyup = function () { "use strict"; f6(); calcul(); };
d_6.onkeyup = function () { "use strict"; f6(); calcul(); };
t_6.onkeyup = function () { "use strict"; f6(); calcul(); };

//-------7--------
var e_7 = document.getElementById("e_7"),
    d_7 = document.getElementById("d_7"),
    t_7 = document.getElementById("t_7"),
    c_7 = document.getElementById("c_7"),
    r_7 = document.getElementById("r_7");

function f7() { r_7.value = ((d_7.value*1) + (t_7.value*1))/2;
                r_7.value = ((e_7.value * 2) + (r_7.value*1))/3;};
e_7.onkeyup = function () { "use strict"; f7(); calcul(); };
d_7.onkeyup = function () { "use strict"; f7(); calcul(); };
t_7.onkeyup = function () { "use strict"; f7(); calcul(); };

//-------8--------
var e_8 = document.getElementById("e_8"),
    d_8 = document.getElementById("d_8"),
    t_8 = document.getElementById("t_8"),
    c_8 = document.getElementById("c_8"),
    r_8 = document.getElementById("r_8");

function f8() { r_8.value = ((d_8.value*1) + (t_8.value*1))/2;
                r_8.value = ((e_8.value * 2) + (r_8.value*1))/3;};
e_8.onkeyup = function () { "use strict"; f8(); calcul(); };
d_8.onkeyup = function () { "use strict"; f8(); calcul(); };
t_8.onkeyup = function () { "use strict"; f8(); calcul(); };

//-------9--------
var e_9 = document.getElementById("e_9"),
    d_9 = document.getElementById("d_9"),
    t_9 = document.getElementById("t_9"),
    c_9 = document.getElementById("c_9"),
    r_9 = document.getElementById("r_9");

function f9() { r_9.value = ((d_9.value*1) + (t_9.value*1))/2;
                r_9.value = ((e_9.value * 2) + (r_9.value*1))/3;};
e_9.onkeyup = function () { "use strict"; f9(); calcul(); };
d_9.onkeyup = function () { "use strict"; f9(); calcul(); };
t_9.onkeyup = function () { "use strict"; f9(); calcul(); };

//-------10----------
var e_10 = document.getElementById("e_10"),
    d_10 = document.getElementById("d_10"),
    t_10 = document.getElementById("t_10"),
    c_10 = document.getElementById("c_10"),
    r_10 = document.getElementById("r_10"),
    ar = document.getElementById("ar");

function f10() { r_10.value = ((d_10.value*1) + (t_10.value*1))/2;
                r_10.value = ((e_10.value * 2) + (r_10.value*1))/3;};
e_10.onkeyup = function () { "use strict"; f10(); calcul(); };
d_10.onkeyup = function () { "use strict"; f10(); calcul(); };
t_10.onkeyup = function () { "use strict"; f10(); calcul(); };

ar.onclick = function () {
    if (ar.checked == true){
          e_10.disabled = false;d_10.disabled = false;t_10.disabled = false;c_10.value = "1";
        } else {
        e_10.disabled = true;d_10.disabled = true;t_10.disabled = true;
        e_10.value = "";d_10.value = "";t_10.value = "";c_10.value = "";r_10.value = "";
        }
        f10(); calcul();

};

//-------11----------
var e_11 = document.getElementById("e_11"),
    d_11 = document.getElementById("d_11"),
    t_11 = document.getElementById("t_11"),
    c_11 = document.getElementById("c_11"),
    r_11 = document.getElementById("r_11"),
    mus = document.getElementById("mus");

function f11() { r_11.value = ((d_11.value*1) + (t_11.value*1))/2;
                r_11.value = ((e_11.value * 2) + (r_11.value*1))/3;};
e_11.onkeyup = function () { "use strict"; f11(); calcul(); };
d_11.onkeyup = function () { "use strict"; f11(); calcul(); };
t_11.onkeyup = function () { "use strict"; f11(); calcul(); };

mus.onclick = function () {
    if (mus.checked == true){
        e_11.disabled = false;d_11.disabled = false;t_11.disabled = false;c_11.value = "1";
        } else {
        e_11.disabled = true;d_11.disabled = true;t_11.disabled = true;
        e_11.value = "";d_11.value = "";t_11.value = "";c_11.value = "";r_11.value = "";
        }
        f11(); calcul();

};

//-------12----------
var e_12 = document.getElementById("e_12"),
    d_12 = document.getElementById("d_12"),
    t_12 = document.getElementById("t_12"),
    c_12 = document.getElementById("c_12"),
    r_12 = document.getElementById("r_12"),
    inf = document.getElementById("inf");

function f12() { r_12.value = ((d_12.value*1) + (t_12.value*1))/2;
                r_12.value = ((e_12.value * 2) + (r_12.value*1))/3;};
e_12.onkeyup = function () { "use strict"; f12(); calcul(); };
t_12.onkeyup = function () { "use strict"; f12(); calcul(); };
t_12.onkeyup = function () { "use strict"; f12(); calcul(); };

inf.onclick = function () {
    "use strict";
    if (inf.checked == true){
        e_12.disabled = false;d_12.disabled = false;t_12.disabled = false;c_12.value = "1";
      } else {
        e_12.disabled = true;d_12.disabled = true;t_12.disabled = true;
        e_12.value = "";d_12.value = "";t_12.value = "";c_12.value = "";
        r_12.value = "";
      }
      f14(); calcul();

};

//-------13----------
var e_13 = document.getElementById("e_13"),
    d_13 = document.getElementById("d_13"),
    t_13 = document.getElementById("t_13"),
    c_13 = document.getElementById("c_13"),
    r_13 = document.getElementById("r_13"),
    spo = document.getElementById("spo");

function f13() { r_13.value = ((d_13.value*1) + (t_13.value*1))/2;
                r_13.value = ((e_13.value * 2) + (r_13.value*1))/3;};
e_13.onkeyup = function () { "use strict"; f13(); calcul(); };
d_13.onkeyup = function () { "use strict"; f13(); calcul(); };
t_13.onkeyup = function () { "use strict"; f13(); calcul(); };

spo.onclick = function () {
    if (spo.checked == true){
        e_13.disabled = false;d_13.disabled = false;t_13.disabled = false;
        c_13.value = "1";
      } else {
        e_13.disabled = true;d_13.disabled = true;t_13.disabled = true;
        e_13.value = "";d_13.value = "";t_13.value = "";c_13.value = "";r_13.value = "";
      }
      f13(); calcul();
};

//-------14----------
var e_14 = document.getElementById("e_14"),
    d_14 = document.getElementById("d_14"),
    t_14 = document.getElementById("t_14"),
    c_14 = document.getElementById("c_14"),
    r_14 = document.getElementById("r_14"),
    tam = document.getElementById("tam");

function f14() { r_14.value = ((d_14.value*1) + (t_14.value*1))/2;
                r_14.value = ((e_14.value * 2) + (r_14.value*1))/3;};
e_14.onkeyup = function () { "use strict"; f14(); calcul(); };
d_14.onkeyup = function () { "use strict"; f14(); calcul(); };
t_14.onkeyup = function () { "use strict"; f14(); calcul(); };

tam.onclick = function () {
    "use strict";
    if (tam.checked == true){
        e_14.disabled = false;d_14.disabled = false;t_14.disabled = false;c_14.value = "2";
      } else {
        e_14.disabled = true;d_14.disabled = true;t_14.disabled = true;
        e_14.value = "";d_14.value = "";t_14.value = "";c_14.value = "";r_14.value = "";
      }
      f14(); calcul();

};