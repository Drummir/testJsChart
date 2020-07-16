
  var tgSwitchPreset = false;

  function tgPreset() {
    let viewPresets = document.getElementById("chkBox2").checked;
    console.log('viewPreset = ' + viewPresets);
    let changeStyle = document.getElementById('peresetsBlock');
    let changeStyle2 = document.getElementById('peresetsBlock2');
    let changeStyle3 = document.getElementById('save-property');

    //let changeStyleBlock = document.getElementById('presets');
    if (viewPresets) {
      changeStyle.style.display = 'block';
      changeStyle2.style.display = 'table-cell';
      changeStyle3.style.marginTop = '0';
      tgSwitchPreset = true;
    } else {
      changeStyle.style.display = 'none';
      changeStyle2.style.display = 'none';
      changeStyle3.style.marginTop = '53px';
      tgSwitchPreset = false;
    };
  };


  var selectors = ["slct1", "slct2", "slct3", "slct4"];
  var option = [];
  // var value_name = [
  //   "   Fz",  "    F",  " Idz1",  "  Id1",  " Idz2",  "  Id2",  "   P1",  "   P2",  "    P",  "   S1",
  //   "   S2",  "    S",  "   Q1",  "   Q2",  "    Q",  "   Iв",  " Uab1",  " Ubc1",  " Uca1",  " Uab2", 
  //   " Ubc2",  " Uca2",  " Uab3",  " Ubc3",  " Uca3",  " Uab4",  " Ubc4",  " Uca4",  "  Ia1",  "  Ib1",
  //   "  Ic1",  "  Ia2",  "  Ib2",  "  Ic2",  "  Ia3",  "  Ib3",  "  Ic3",  "  Ia4",  "  Ib4",  "  Ic4",
  //   "T° a1",  "T° b1",  "T° c1",  "T° a2",  "T° b2",  "T° c2",  "T° a3",  "T° b3",  "T° c3",  "T° a4",
  //   "T° b4",  "T° c4"
  // ];
  // var value_id = [
  //   "tpcFz",  " tpcF",  " Idz1",  "  Id1",  " Idz2",  "  Id2",  "tpcP1",  "tpcP2",  " tpcP",  "tpcS1",
  //   "tpcS2",  " tpcS",  "tpcQ1",  "tpcQ2",  " tpcQ",  "  Iwz",  "v1uab",  "v1ubc",  "v1uca",  "v2uab", 
  //   "v2ubc",  "v2uca",  "v3uab",  "v3ubc",  "v3uca",  "v4uab",  "v4ubc",  "v4uca",  " v1ia",  " v1ib",
  //   " v1ic",  " v2ia",  " v2ib",  " v2ic",  " v3ia",  " v3ib",  " v3ic",  " v4ia",  " v4ib",  " v4ic",
  //   " r1ta",  " r1tb",  " r1tc",  " r2ta",  " r2tb",  " r2tc",  " i1ta",  " i1tb",  " i1tc",  " i2ta",
  //   " i2tb",  " i2tc"      
  // ];

  // var value_axis = [
  //   "Частота", "Частота", "Ток",   "Ток",  "Ток",  "Ток" ........
  // ];
  //  value keys = name : id : axis : scale
  var value = [
    {name: "    F",  id:  "tpcF" , axis: "            Частота [об/мин]", scale: 3900},
    {name: "   Fz",  id:  "tpcFz", axis: "            Частота [об/мин]", scale: 3900},
    {name: " Idz1",  id:  "Idz1" , axis: "                     Ток [А]", scale: 1500},
    {name: "  Id1",  id:  "Id1"  , axis: "                     Ток [А]", scale: 1500},
    {name: " Idz2",  id:  "Idz2" , axis: "                     Ток [А]", scale: 1500},
    {name: "  Id2",  id:  "Id2"  , axis: "                     Ток [А]", scale: 1500},
    {name: "   P1",  id:  "tpcP1", axis: "              Мощность [МВт]", scale: 15},
    {name: "   P2",  id:  "tpcP2", axis: "              Мощность [МВт]", scale: 15},
    {name: "    P",  id:  "tpcP" , axis: "              Мощность [МВт]", scale: 30},
    {name: "   S1",  id:  "tpcS1", axis: "       Полная мощность [МВА]", scale: 15},

    {name: "   S2",  id:  "tpcS2", axis: "       Полная мощность [МВА]", scale: 15},
    {name: "    S",  id:  "tpcS" , axis: "       Полная мощность [МВА]", scale: 30},
    {name: "   Q1",  id:  "tpcQ1", axis: "  Реактивная мощность [Мвар]", scale: 15},
    {name: "   Q2",  id:  "tpcQ2", axis: "  Реактивная мощность [Мвар]", scale: 15},
    {name: "    Q",  id:  "tpcQ" , axis: "  Реактивная мощность [Мвар]", scale: 30},
    {name: "   Iв",  id:  "Iwz"  , axis: "                     Ток [А]", scale: 500},
    {name: " Uab1",  id:  "v1uab", axis: "             Напряжение [кВ]", scale: 12},
    {name: " Ubc1",  id:  "v1ubc", axis: "             Напряжение [кВ]", scale: 12},
    {name: " Uca1",  id:  "v1uca", axis: "             Напряжение [кВ]", scale: 12},
    {name: " Uab2",  id:  "v2uab", axis: "             Напряжение [кВ]", scale: 12},

    {name: " Ubc2",  id:  "v2ubc", axis: "             Напряжение [кВ]", scale: 12},
    {name: " Uca2",  id:  "v2uca", axis: "             Напряжение [кВ]", scale: 12},
    {name: " Uab3",  id:  "v3uab", axis: "             Напряжение [кВ]", scale: 12},
    {name: " Ubc3",  id:  "v3ubc", axis: "             Напряжение [кВ]", scale: 12},
    {name: " Uca3",  id:  "v3uca", axis: "             Напряжение [кВ]", scale: 12},
    {name: " Uab4",  id:  "v4uab", axis: "             Напряжение [кВ]", scale: 12},
    {name: " Ubc4",  id:  "v4ubc", axis: "             Напряжение [кВ]", scale: 12},
    {name: " Uca4",  id:  "v4uca", axis: "             Напряжение [кВ]", scale: 12},
    {name: "  Ia1",  id:  "v1ia" , axis: "                     Ток [А]", scale: 1500},
    {name: "  Ib1",  id:  "v1ib" , axis: "                     Ток [А]", scale: 1500},

    {name: "  Ic1",  id:  "v1ic" , axis: "                     Ток [А]", scale: 1500},
    {name: "  Ia2",  id:  "v2ia" , axis: "                     Ток [А]", scale: 1500},
    {name: "  Ib2",  id:  "v2ib" , axis: "                     Ток [А]", scale: 1500},
    {name: "  Ic2",  id:  "v2ic" , axis: "                     Ток [А]", scale: 1500},
    {name: "  Ia3",  id:  "v3ia" , axis: "                     Ток [А]", scale: 1500},
    {name: "  Ib3",  id:  "v3ib" , axis: "                     Ток [А]", scale: 1500},
    {name: "  Ic3",  id:  "v3ic" , axis: "                     Ток [А]", scale: 1500},
    {name: "  Ia4",  id:  "v4ia" , axis: "                     Ток [А]", scale: 1500},
    {name: "  Ib4",  id:  "v4ib" , axis: "                     Ток [А]", scale: 1500},
    {name: "  Ic4",  id:  "v4ic" , axis: "                     Ток [А]", scale: 1500},

    {name: "T° a1",  id:  "r1ta" , axis: "Температура выпрямителя [°С]", scale: 60},
    {name: "T° b1",  id:  "r1tb" , axis: "Температура выпрямителя [°С]", scale: 60},
    {name: "T° c1",  id:  "r1tc" , axis: "Температура выпрямителя [°С]", scale: 60},
    {name: "T° a2",  id:  "r2ta" , axis: "Температура выпрямителя [°С]", scale: 60},
    {name: "T° b2",  id:  "r2tb" , axis: "Температура выпрямителя [°С]", scale: 60},
    {name: "T° c2",  id:  "r2tc" , axis: "Температура выпрямителя [°С]", scale: 60},
    {name: "T° a3",  id:  "i1ta" , axis: "  Температура инвертора [°С]", scale: 60},
    {name: "T° b3",  id:  "i1tb" , axis: "  Температура инвертора [°С]", scale: 60},
    {name: "T° c3",  id:  "i1tc" , axis: "  Температура инвертора [°С]", scale: 60},
    {name: "T° a4",  id:  "i2ta" , axis: "  Температура инвертора [°С]", scale: 60},

    {name: "T° b4",  id:  "i2tb" , axis: "  Температура инвертора [°С]", scale: 60},
    {name: "T° c4",  id:  "i2tc" , axis: "  Температура инвертора [°С]", scale: 60},
  ];
  console.log(value.length);
  //var vid = value[0];
  
  for(var i = 0; i < selectors.length; i++) {
    for(var j = 0; j < value.length; j++) {   
      option[j] = document.createElement("option");
      option[j].innerHTML = value[j].name;
      option[j].id = value[j].id;
      option[j].value = value[j].axis + ':' + value[j].scale;
      option[j].selectors = value[j].name;
      // console.log(option[j]);
      // console.log(value[0]);
      // console.log(boxSel);
      var boxSel = document.getElementById(selectors[i]);
      boxSel.appendChild(option[j]);
    }
  }

  var sep = ';';
  var sep1 = '::';
  var sep2 = ':';
  
  var text = '';
  var arr1 = [];
  var arr2 = [];
  var arr3 = [];
  var arr4 = [];

  var interval2 = setInterval(() => {
    var d = '';
    $.ajax({  // Получение данных от сервера
      url: 'http://arm2:8800/data',
      dataType: 'text',
      crossDomain: true,
      async: false,
      success: (json) => {
        d = json;
      }
    });
    /*
     *
     * Выборка элементов из записи.
     * 
     * @param {string}          d       Список параметров с их значениями на текущий момент
     * @param {string}          sep     Разделитель строки
     * @param {string}          sep1    Разделитель строки
     * @param {string}          sep2    Разделитель строки
     * @param {string}          text    Промежеточная переменная для хранения одномерного массива
     * @param {Array}           newArr  Промежуточный массив для преобразования многомерного массива в одномерный 
     * @param {Array of Array}  mas     Конечные данные разделения строк в виде mas[i][0] = v2ia, mas[i][1] = 10, mas[i][2] = 3
     *  
    */
    // Изначально данные идут в формате v2ia::10:3:2330:1734;v2ib::11:3:2330:1746;v2ic::12:3:2329:1778;v3uab::13:5:2329:1829; [имя, знач, стат, ?, ?];
    var newArr = [];
    var mas = d.split(sep); // Получаем данные в формате mas[i] = v2ia::10:3:2330:1734, mas[i + 1] = v2ib::11:3:2330:1746
    mas.splice(0, 6);       // Удаляем из массива значения типа mbts:13251600620032020:0:0:0. P.S. удаляем первые 6 элементов массива
    /*
      * Цикл For для получения приемлемых данных для отправки в БД
    */
    for (let i = 0; i < mas.length - 1; i++) {
      mas[i] = mas[i].split(sep1);                              // Разделяем их до mas[i][0] = v2ia, mas[i][1] = 10:3:2330:1734 
      newArr.push(mas[i].reduce((a, b) => a.concat(':' + b)));  // Превращаем в массив строк newArr[i] = v2ia:10:3:2330:1734
      text = newArr[i];                                         // Записываем элемент массива как строку
      mas[i] = text.split(sep2);                                // Делим строку на элементы по разделителю sep2
      mas[i].pop();                                             // Удаляем последний элемент массива
      mas[i].pop();
    };
    //console.log(mas);
    function getElemnt(arr, element) {
      for (let i = 0; i < mas.length; i++) {
        if (mas[i][0] === element) {
          arr.push(mas[i][1]);
        }
      };
    };
    getElemnt(arr1, value_id1);
    getElemnt(arr2, value_id2);
    getElemnt(arr3, value_id3);
    getElemnt(arr4, value_id4);

    console.log('last  ' + value_name1 + '  |  ' + lastIndex(arr1));
    console.log('last  ' + value_name2 + '  |  ' + lastIndex(arr2));
    console.log('last  ' + value_name3 + '  |  ' + lastIndex(arr3));
    console.log('last  ' + value_name4 + '  |  ' + lastIndex(arr4));
    console.log('================================');

  }, 950);

  function lastIndex(arr) {
      return arr[arr.length - 1];
  }

// COOKIE START ---> 

// COOKIE......


  function saveProperty() {
    function deleteAllCookies() {
        let cookies = document.cookie.split("; ");
        console.log(cookies);
        for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i];
          let cookie_name = cookie.split('=');
          console.log('cookie name: ' + cookie_name[0] + ' тип: ' + typeof(cookie_name[0]) + ' | cookie value: ' + cookie_name[1]);
          if(['DateSelector', 'TypeSelector'].includes(cookie_name[0])) {
            console.log('cookie_name ========= '+ cookie_name[0]);
          } else {
            let eqPos = cookie.indexOf("=");
            //console.log('Cookie: ' + cookie + ' eqPos: ' + eqPos);
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
          };
        }
      };
    
    deleteAllCookies();

    document.cookie = 'value_name1 = ' + value_name1;
    document.cookie = 'value_name2 = ' + value_name2;
    document.cookie = 'value_name3 = ' + value_name3;
    document.cookie = 'value_name4 = ' + value_name4;

    document.cookie = 'value_id1 = ' + value_id1;
    document.cookie = 'value_id2 = ' + value_id2;
    document.cookie = 'value_id3 = ' + value_id3;
    document.cookie = 'value_id4 = ' + value_id4;

    document.cookie = 'value_axis1 = ' + value_axis1;
    document.cookie = 'value_axis2 = ' + value_axis2;
    document.cookie = 'value_axis3 = ' + value_axis3;
    document.cookie = 'value_axis4 = ' + value_axis4;

    document.cookie = 'value_scale1 = ' + value_scale1;
    document.cookie = 'value_scale2 = ' + value_scale2;
    document.cookie = 'value_scale3 = ' + value_scale3;
    document.cookie = 'value_scale4 = ' + value_scale4;

    // Запись пресетов
    let selPreset = document.getElementById('presets');

    console.log(selPreset);
    console.log('lastIndex = ' + selPreset.options.length);

    for (let i = 0; i <  selPreset.options.length; i++) {
      document.cookie = i + ' = ' + selPreset.options[i].text + '.' + selPreset.options[i].value;
      console.log('last index = ' + selPreset.options[i].text);
    }
    document.cookie = 'qtyOptions = ' + selPreset.options.length;

    // Получение значений переключателей
    document.getElementById("chkBox2").checked ? document.cookie = 'usePrstTgSw = ' + 1 : document.cookie = 'usePrstTgSw = ' + 0; 
    
    // Получение выбранного пресета
    document.cookie = 'selectPreset =' + document.getElementById('presets').selectedIndex;

    // Получение выбранных значений
    document.cookie = 'slct1 = ' + document.getElementById('slct1').selectedIndex;
    document.cookie = 'slct2 = ' + document.getElementById('slct2').selectedIndex;
    document.cookie = 'slct3 = ' + document.getElementById('slct3').selectedIndex;
    document.cookie = 'slct4 = ' + document.getElementById('slct4').selectedIndex;

    // Запись значений выбранного пресета
    selectedPreset = document.getElementById('presets').selectedIndex;

    // Запись выбранного option из select величин
    selectedSlct1 = Number(document.getElementById('slct1').selectedIndex);
    selectedSlct2 = Number(document.getElementById('slct2').selectedIndex);
    selectedSlct3 = Number(document.getElementById('slct3').selectedIndex);
    selectedSlct4 = Number(document.getElementById('slct4').selectedIndex);

    // Запись положения ползунка
    selectedChkbox2 = Number(document.getElementById("chkBox2").checked);

  };

 
  if(document.cookie === '') {
    // Первый запуск без куков!
    console.log('нет куков');

    var value_name1 = 'P';
    var value_name2 = 'F';
    var value_name3 = 'Id1';
    var value_name4 = 'Id2';

    var value_id1 = 'tpcP';
    var value_id2 = 'tpcF';
    var value_id3 = 'Id1';
    var value_id4 = 'Id2';

    var value_axis1 = 'Мощность [МВт]';
    var value_axis2 = 'Частота [об/мин]';
    var value_axis3 = 'Ток [А]';
    var value_axis4 = 'Ток [А]';

    var value_scale1 = 30;
    var value_scale2 = 3900;
    var value_scale3 = 1500;
    var value_scale4 = 1500;


    let options_default = [];
    let option_value_default = [{
      name: "P : F : Id1 : Id2",
      value: "tpcP:tpcF:Id1:Id2"
    }, {
      name: "Fz : F : S : P",
      value: "tpcFz:tpcF:tpcS:tpcP"      
    }, {
      name: "T°a1 : T°a2 : T°a3 : T°a4",
      value: "r1ta:r2ta:i1ta:i2ta"      
    }, {
      name: "T°b1 : T°b2 : T°b3 : T°b4",
      value: "r1tb:r2tb:i1tb:i2tb"      
    }, {
      name: "T°c1 : T°c2 : T°c3 : T°c4",
      value: "r1tc:r2tc:i1tc:i2tc"      
    }];

    for(let j = 0; j < 4; j++) {   

      options_default[j] = document.createElement("option");
      options_default[j].innerHTML = option_value_default[j].name;
      options_default[j].value = option_value_default[j].value;

      let boxSel = document.getElementById('presets');
      boxSel.appendChild(options_default[j]);
    }
    // Получение выбранного option из select пресета
    var selectedPreset = Number(document.getElementById('presets').selectedIndex);

    // Получение выбранного option из select величин
    var selectedSlct1 = Number(document.getElementById('slct1').selectedIndex);
    var selectedSlct2 = Number(document.getElementById('slct2').selectedIndex);
    var selectedSlct3 = Number(document.getElementById('slct3').selectedIndex);
    var selectedSlct4 = Number(document.getElementById('slct4').selectedIndex);

    // Получение положения ползунка
    var selectedChkbox2 = Number(document.getElementById("chkBox2").checked);
    
    document.getElementById("text_switch").innerHTML = 'Статический';
    saveProperty();

  } else {
    // ЕСЛИ КУКИ СУЩЕСТВУЮТ ПОСЛЕ ОБНОВЛЕНИЯ СТРАНИЦЫ ЗАПОЛНИТЬ
    // ДАННЫМИ ИЗ КУКОВ
    // GET COOKIE FOR DATA GRAPH

    value_name1 = getCookie('value_name1');
    value_name2 = getCookie('value_name2');
    value_name3 = getCookie('value_name3');
    value_name4 = getCookie('value_name4');

    value_id1 = getCookie('value_id1');
    value_id2 = getCookie('value_id2');
    value_id3 = getCookie('value_id3');
    value_id4 = getCookie('value_id4');

    value_axis1 = getCookie('value_axis1');
    value_axis2 = getCookie('value_axis2');
    value_axis3 = getCookie('value_axis3');
    value_axis4 = getCookie('value_axis4');

    value_scale1 = getCookie('value_scale1');
    value_scale2 = getCookie('value_scale2');
    value_scale3 = getCookie('value_scale3');
    value_scale4 = getCookie('value_scale4');

    selectedPreset = Number(document.getElementById('presets').selectedIndex);
    // Получение выбранного option из select величин
    selectedSlct1 = Number(document.getElementById('slct1').selectedIndex);
    selectedSlct2 = Number(document.getElementById('slct2').selectedIndex);
    selectedSlct3 = Number(document.getElementById('slct3').selectedIndex);
    selectedSlct4 = Number(document.getElementById('slct4').selectedIndex);

    // Получение положения ползунка
    selectedChkbox2 = Number(document.getElementById("chkBox2").checked);
    // GET COOKIE FOR PRESETS

    let quantityOptions = getCookie('qtyOptions');
    // console.log('Создаем option из cookie в количестве = ' + quantityOptions);
    // console.log(typeof(quantityOptions));

    for(let i = 0; i < Number(quantityOptions); i++) {
      let getCookieData = getCookie(String(i));
      let splitData = getCookieData.split('.');
      let newOptionForCookie = document.createElement("option");
      newOptionForCookie.innerHTML = splitData[0];
      newOptionForCookie.value = splitData[1];

      let boxSel = document.getElementById('presets');
      boxSel.appendChild(newOptionForCookie);
    }

    // GET SCALE AND TOGGLESWITCH PARAMETRS
    document.getElementById("chkBox2").checked = Number(getCookie('usePrstTgSw'));
    tgPreset();

    document.getElementById("text_switch").innerHTML = 'Статический';

    document.getElementById('presets').selectedIndex = Number(getCookie('selectPreset'));

    document.getElementById('slct1').selectedIndex = Number(getCookie('slct1'));
    document.getElementById('slct2').selectedIndex = Number(getCookie('slct2'));
    document.getElementById('slct3').selectedIndex = Number(getCookie('slct3'));
    document.getElementById('slct4').selectedIndex = Number(getCookie('slct4'));
    //console.log('Куки успешно получены' + getCookie('value_scale4'));  
  };
  //alert(document.cookie);

// <-- COOKIE END.

  function updateOptionGraph() {
    let optionGraph = [
        document.getElementById('slct1').options[document.getElementById('slct1').selectedIndex],
        document.getElementById('slct2').options[document.getElementById('slct2').selectedIndex],
        document.getElementById('slct3').options[document.getElementById('slct3').selectedIndex],
        document.getElementById('slct4').options[document.getElementById('slct4').selectedIndex]
    ];

    value_name1 = optionGraph[0].text;
    value_name2 = optionGraph[1].text;
    value_name3 = optionGraph[2].text;
    value_name4 = optionGraph[3].text;

    value_id1 = optionGraph[0].id;
    value_id2 = optionGraph[1].id;
    value_id3 = optionGraph[2].id;
    value_id4 = optionGraph[3].id;

    let split1 = optionGraph[0].value.split(':');
    let split2 = optionGraph[1].value.split(':');
    let split3 = optionGraph[2].value.split(':');
    let split4 = optionGraph[3].value.split(':');

    value_axis1 = split1[0];
    value_axis2 = split2[0];
    value_axis3 = split3[0];
    value_axis4 = split4[0];

    value_scale1 = split1[1];
    value_scale2 = split2[1];
    value_scale3 = split3[1];
    value_scale4 = split4[1];
  }

  function buildChart() {
    if(tgSwitchPreset) {
      let getTgSwitchPreset = document.getElementById('presets').options[document.getElementById('presets').selectedIndex];

      let arrPresetsID = getTgSwitchPreset.value.split(':');
      // console.log(arrPresetsID);
      // console.log(document.getElementById('slct1').options[text=arrPresetsID[0]].selected);
      document.getElementById('slct1').options[text=arrPresetsID[0]].selected = true;
      document.getElementById('slct2').options[text=arrPresetsID[1]].selected = true;
      document.getElementById('slct3').options[text=arrPresetsID[2]].selected = true;
      document.getElementById('slct4').options[text=arrPresetsID[3]].selected = true;
      arrPresetsID.length = 0;
    };

    updateOptionGraph();

    arr1.length = 0;
    arr2.length = 0;
    arr3.length = 0;
    arr4.length = 0;

    chart.series[0].update({ name: value_name1, data: [] }, false);
    chart.series[1].update({ name: value_name2, data: [] }, false);
    chart.series[2].update({ name: value_name3, data: [] }, false);
    chart.series[3].update({ name: value_name4, data: [] }, false);

    chart.yAxis[0].setTitle({ text: value_axis1 });
    chart.yAxis[1].setTitle({ text: value_axis2 });
    chart.yAxis[2].setTitle({ text: value_axis3 });
    chart.yAxis[3].setTitle({ text: value_axis4 });

    updateScale();
  }

// EDIT PRESETS... -->
  function editPreset(operation) {
    let selPreset = document.getElementById('presets');
    if(operation === 'delete') {
      selPreset.removeChild(selPreset.options[selPreset.selectedIndex]);
    } else if(operation === 'save') {
        updateOptionGraph();
        let newOption = new Option(value_name1 + ' : ' + value_name2 + ' : ' + value_name3 + ' : ' + value_name4);
        selPreset.append(newOption);
        newOption.value = value_id1 + ':' + value_id2 + ':' + value_id3 + ':' + value_id4;
        newOption.selected = true;
    } else {
        console.log('Sorry not working!');
    }
  }
// <-- END EDIT PRESETS

  function updateScale() {
    let tgSwitch = document.getElementById("chkBox").checked;
    let textTgSwitch = document.getElementById("text_switch");
    console.log(textTgSwitch);

    if (tgSwitch) {
      // Динамический масштаб
      //console.log('ON!');
      chart.yAxis[0].update({max: null}, false);
      chart.yAxis[1].update({max: null}, false);
      chart.yAxis[2].update({max: null}, false);
      chart.yAxis[3].update({max: null}, false);

      textTgSwitch.innerHTML = 'Динамический';
    } else {
      // Статический масштаб
      //console.log('OFF!');
      chart.yAxis[0].update({max: value_scale1}, false);
      chart.yAxis[1].update({max: value_scale2}, false);
      chart.yAxis[2].update({max: value_scale3}, false);
      chart.yAxis[3].update({max: value_scale4}, false);

      textTgSwitch.innerHTML = 'Статический';
    };

    chart.redraw();
  };

 // var width= $("#container").width(); // Костыль! Но после очистки cookie и обнолвения страницы это прошло

  var chart = Highcharts.stockChart('container', {
    chart: {
      // margin: [60, 15, 40, 15],
      //type: 'minute',
      borderWidth: 1,
      animation: false,
      //width: width, // Костыль! Почему-то в режиме пол экрана график занимал больше 100% !??
      height: 700,
    },
    title: {
      text: 'График',
      align: 'center',
    },
    subtitle: {
      text: 'График зависимости значений от времени',
      align: 'center',
    },
    // rangeSelector: {    // Выбор интервала
    //     enabled: false
    // },
    setOptions: {      
      lang: {
        rangeSelectorZoom: 'Масштаб',
        rangeSelectorFrom: 'От',
        rangeSelectorTo: 'До'
      },
    },

    rangeSelector: {
      buttons: [
        { type: 'minute', count: 1, text: '1 мин' },
        { type: 'minute', count: 5, text: '5 мин' },
        { type: 'minute', count: 15, text: '15 мин' },
        { type: 'all', text: 'Всё' }
      ],
      buttonTheme: {
        width: 50
      },
      selected: 0,
      inputPosition: {
        align: 'left'
      }
    },
    xAxis: {
      maxZoom: 10000,         // Максимальное увеличение в навигаторе до 10 сек = вся ширина графика
      tickInterval: 5000,     // Интервал в милисекундах по оси Х
      title: {
        text: 'Время, с'
      },
      gridLineWidth: 1,
      labels: {
        formatter: function () {
          return moment(this.value).format('HH:mm:ss');
        }
      }
    },
    yAxis: [{
      tickAmount: 10,
      max: value_scale1,
      min: 0,
      type: 'linear',
      opposite: false,
      title: {
        offset: 50,
        text: value_axis1
      },
      // labels: {            // Окрас шкалы
      //     style: {
      //         color: 'red'
      //     }
      // }
    }, {
      opposite: false,
      tickAmount: 10,
      max: value_scale2,
      min: 0,
      title: {
        offset: 50,
        text: value_axis2
      }
    }, {
      opposite: false,
      tickAmount: 10,
      max: value_scale3,
      min: 0,
      title: {
        offset: 50,
        text: value_axis3
      }
    }, {
      opposite: false,
      tickAmount: 10,
      max: value_scale4,
      min: 0,
      title: {
        offset: 50,
        text: value_axis4
      }
    }],
    navigator: {
      xAxis: {
        labels: {
          formatter: function () {
            return moment(this.value).format('HH:mm:ss');
          }
        }
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          // enabled: true
        },
        enableMouseTracking: true
      }
    },
    series: [{
      type: 'spline',
      yAxis: 0,
      name: value_name1,
      data: [],
    }, {
      type: 'spline',
      yAxis: 1,
      name: value_name2,
      data: [],
    }, {
      type: 'spline',
      yAxis: 2,
      name: value_name3,
      data: [],
    }, {
      type: 'spline',
      yAxis: 3,
      name: value_name4,
      data: [],
    }
    ],
    legend: {
      enabled: true,
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -10,
      y: 60,
      itemStyle: {
        padding: '10px'
      }
    },
  });

 function stop() {
   clearInterval(interval);
   clearInterval(interval2);
 }

  var interval = setInterval(() => {

    /*
     * Остановка всех интервалов на странице в случае 
     * если не найден будет элемент с Id = presets.
     * Необходимо для того, что при переходе на другую
     * страницу интервал не продолжал рабоать и выключался.
    */

    if (document.getElementById('presets') === null) { 
      //console.log('STOP INTERVAL!');
      stop();
      return 0;
    };

    /*
     *
     * Проверка на изменение чего-либо из конфигурации графика.
     * Если что-либо было измененно, то происходит сохранение
     * новых куков.
     *
    */
    if((document.getElementById('presets').selectedIndex != selectedPreset) ||
      (document.getElementById('slct1').selectedIndex != selectedSlct1) ||
      (document.getElementById('slct2').selectedIndex != selectedSlct2) ||
      (document.getElementById('slct3').selectedIndex != selectedSlct3) ||
      (document.getElementById('slct4').selectedIndex != selectedSlct4) ||
      (document.getElementById("chkBox2").checked != selectedChkbox2)
    ) {
      console.log('Что-то поменяли');
      saveProperty();
    } else {
      console.log('Ничего не меняли');
    }
    
    seconds = new Date().getTime();
    const needToShift  = chart.series[0].data.length > 3600;
    const needToShift1 = chart.series[1].data.length > 3600;
    const needToShift2 = chart.series[2].data.length > 3600;
    const needToShift3 = chart.series[3].data.length > 3600;
    console.log('1: ' + lastIndex(arr1) + ', 2: ' + lastIndex(arr2) + ', 3: ' + lastIndex(arr3) + ', 4: ' + lastIndex(arr4));
    chart.series[0].addPoint([
      seconds,
      Number(lastIndex(arr1))
      //Math.random() * 1000
    ], true, needToShift);
    chart.series[1].addPoint([
      seconds,
      Number(lastIndex(arr2))
      //Math.random() * 100
    ], true, needToShift1);
    chart.series[2].addPoint([
      seconds,
      Number(lastIndex(arr3))
      //Math.random() * 500
    ], true, needToShift2);
    chart.series[3].addPoint([
      seconds,
      Number(lastIndex(arr4))
      //Math.random() * 300
    ], true, needToShift3);

    // seconds += 1;

  }, 1000);
  // let seconds = 0;




