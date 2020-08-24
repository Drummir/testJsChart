var INTERVAL_IN_MILLISECONDS = 1000;  // Как часто буду появляться точки
var PREHISTORY_INTERVAL = 3605;       // Сколько по времени будут храниться точки отношение 1 к 5
var LENGTH_SERIES = 0;

var series = [];
var chart = null;
var presetsElement = document.getElementById('presets');
var selectedIndices = [];
var selectedPreset = null;
var selectedChkbox2 = null;
var selectedChkbox3 = null;

var tgSwitchPreset = false;

function tgPreset() {
  let viewPresets = document.getElementById("chkBox2").checked;
  let changeStyle = document.getElementById('peresetsBlock');
  let changeStyle2 = document.getElementById('peresetsBlock2');
  let changeStyle3 = document.getElementById('save-property');

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


var option = [];

var timeStampBuffer1 = null;
var interval;
var selectElementsIds = ['slct1', 'slct2', 'slct3', 'slct4'];
var selectElements = selectElementsIds.map((x) => document.getElementById(x));

function getObjectFromString(string) {
  const parts1 = string.split(';');
  const object = {};

  for (let i = 17; i < parts1.length - 1; ++i) {      // Изначально i = 5, теперь i = 17. P.S. пропуск первых значений в получаемых данных
    const parts2 = parts1[i].split('::');

    object[parts2[0]] = Number(parts2[1].split(':')[0]);
  };

  return object;
};

var isInitialized;

async function init() {
  const csvResponse = await axios.get('/common/csv/values.csv');
  const allValues = Papa.parse(csvResponse.data, { delimiter: ',', header: true }).data;
  
  for (let i = 0; i < selectElements.length; ++i) {
    allValues.forEach((x) => {
      const optionElement = document.createElement('option');
      optionElement.innerHTML = x.name;
      optionElement.id = x.id;
      optionElement.value = `${x.axis}:${x.scale}`;
      selectElements[i].appendChild(optionElement);
    });
  }

  checkCookies();

  createChart();
  updateScale();


  if (isInitialized) {
    return;
  }

  isInitialized = true;

  interval = setInterval(async function () {
    /*
      * Остановка всех интервалов на странице в случае 
      * если не найден будет элемент с Id = presets.
      * Необходимо для того, что при переходе на другую
      * страницу интервал не продолжал рабоать и выключался.
    */
    if (document.getElementById('presets') === null) {
      console.log('STOP INTERVAL!');
      clearInterval(interval);
      isInitialized = false;

      return;
    };

    const url = 'http://arm2:8800/data';
    const response = await axios.get(url);
    const { data } = response;

    const timeStamp = data.substr(5, 17);
    console.log(timeStamp);

    const obj = getObjectFromString(data);
    // console.warn(obj);
    const newValues = series.map((x) => Number(obj[x.id]));
    //const newValues = series.map(() => Math.random() * 1000);

    updatePoints(newValues, timeStamp);
    timeStampBuffer1 = timeStamp;
  }, INTERVAL_IN_MILLISECONDS);
}


function saveProperty() {
  let cookiesData = { series };

  // Запись пресетов
  // console.log(presetsElement);
  // console.log('lastIndex = ' + presetsElement.options.length);

  cookiesData.presets = Array.from(presetsElement.options).map((x) => `${x.text}.${x.value}`);

  // Получение значений переключателей
  cookiesData.usePrstTgSw = Number(document.getElementById("chkBox2").checked);

  // Получение выбранного пресета
  cookiesData.selectPreset = presetsElement.selectedIndex;

  // Получение выбранных значений
  selectedIndices = selectElements.map((x) => Number(x.selectedIndex));
  // Запись выбранного option из select величин
  cookiesData.selectedIndices = selectedIndices;

  // Запись значений выбранного пресета
  selectedPreset = Number(presetsElement.selectedIndex);

  // Запись положения ползунка
  selectedChkbox2 = Number(document.getElementById("chkBox2").checked);

  // Запись положения ползунка маштаба
  selectedChkbox3 = Number(document.getElementById("chkBox").checked);
  cookiesData.selectedChkbox3 = Number(document.getElementById("chkBox").checked);


  document.cookie = `data = ${encodeURI(JSON.stringify(cookiesData))}; max-age=31536000`;
};

 
function checkCookies() {
  if (undefined !== getCookie('data')) {
    console.warn('getCookie(\'data\')');

    // ЕСЛИ КУКИ СУЩЕСТВУЮТ ПОСЛЕ ОБНОВЛЕНИЯ СТРАНИЦЫ ЗАПОЛНИТЬ
    // ДАННЫМИ ИЗ КУКОВ
    // GET COOKIE FOR DATA GRAPH

    const cookiesData = JSON.parse(decodeURI(getCookie('data')));
    series = cookiesData.series;

    selectedPreset = Number(presetsElement.selectedIndex);

    // Получение выбранного option из select величин
    selectedIndices = selectElements.map((x) => Number(x.selectedIndex));

    // Получение положения ползунка
    selectedChkbox2 = Number(document.getElementById("chkBox2").checked);

    // Получение положения ползунка
    selectedChkbox3 = Number(document.getElementById("chkBox").checked);

    // GET COOKIE FOR PRESETS
    cookiesData.presets.forEach((x) => {
      const parts = x.split('.');
      const optionElement = document.createElement('option');
      optionElement.innerHTML = parts[0];
      optionElement.value = parts[1];
      presetsElement.appendChild(optionElement);
    });

    // GET SCALE AND TOGGLESWITCH PARAMETRS
    document.getElementById("chkBox2").checked = cookiesData.usePrstTgSw;
    document.getElementById("chkBox").checked = cookiesData.selectedChkbox3;
    document.getElementById("chkBox").checked ?  document.getElementById("text_switch").innerHTML = 'Динамический' :  document.getElementById("text_switch").innerHTML = 'Статический';
    tgPreset();
    //document.getElementById("text_switch").innerHTML = 'Статический';
    presetsElement.selectedIndex = cookiesData.selectPreset;
    // console.warn('cookiesData.selectedIndices', cookiesData.selectedIndices);
    cookiesData.selectedIndices.forEach((x, i) => selectElements[i].selectedIndex = x);
  } else {
    console.log('No cookies.');

    series = [
      { id: 'tpcP', name: 'P', axis: 'Мощность [МВт]', scale: 30 },
      { id: 'tpcF', name: 'F', axis: 'Частота [об/мин]', scale: 3900 },
      { id: 'Id1', name: 'Id1', axis: 'Ток [А]', scale: 1500 },
      { id: 'Id2', name: 'Id2', axis: 'Ток [А]', scale: 1500 },
    ];

    [
      { name: "P : F : Id1 : Id2", value: "tpcP:tpcF:Id1:Id2" },
      { name: "Fz : F : S : P", value: "tpcFz:tpcF:tpcS:tpcP" },
      { name: "T°a1 : T°a2 : T°a3 : T°a4", value: "r1ta:r2ta:i1ta:i2ta" },
      { name: "T°b1 : T°b2 : T°b3 : T°b4", value: "r1tb:r2tb:i1tb:i2tb" },
      { name: "T°c1 : T°c2 : T°c3 : T°c4", value: "r1tc:r2tc:i1tc:i2tc" }
    ].forEach((x) => {
      const optionElement = document.createElement('option');
      optionElement.innerHTML = x.name;
      optionElement.value = x.value;
      presetsElement.appendChild(optionElement);
    });

    // Получение выбранного option из select пресета
    selectedPreset = Number(presetsElement.selectedIndex);

    // Получение выбранного option из select величин
    selectedIndices = selectElements.map((x) => Number(x.selectedIndex));

    // Получение положения ползунка
    selectedChkbox2 = Number(document.getElementById("chkBox2").checked);

    // Получение положения ползунка маштаба
    selectedChkbox3 = Number(document.getElementById("chkBox").checked);
    
    //document.getElementById("text_switch").innerHTML = 'Статический';
    saveProperty();
  }
}

function updateOptionGraph() {
  const optionGraph = selectElements.map((x) => x.options[x.selectedIndex]);

  series = optionGraph.map((x) => {
    const parts = x.value.split(':');

    return {
      id: x.id,
      name: x.text,
      axis: parts[0],
      scale: parts[1],
    };
  });
}

function buildChart() {
  if (tgSwitchPreset) {
    const getTgSwitchPreset = presetsElement.options[presetsElement.selectedIndex];
    const arrPresetsID = getTgSwitchPreset.value.split(':');

    for (let i = 0; i <= 3; ++i) {
      selectElements[i].options[arrPresetsID[i]].selected = true;
    }
  };

  updateOptionGraph();

  series.forEach((x, i) => {
    chart.series[i].update({ name: x.name, data: [] }, false);
    chart.yAxis[i].setTitle({ text: x.axis });
  });

  updateScale();
}

function editPreset(operation) {
  switch (operation) {
    case 'delete':
      presetsElement.removeChild(presetsElement.options[presetsElement.selectedIndex]);
      break;
    case 'save':
      updateOptionGraph();
      let newOption = new Option(series.map((x) => x.name).join(' : '));
      presetsElement.append(newOption);
      newOption.value = series.map((x) => x.id).join(':');
      newOption.selected = true;
      break;
    default:
      console.error('Unknown operation.');
  }
}

function updateScale() {
  let tgSwitch = document.getElementById("chkBox").checked;
  let textTgSwitch = document.getElementById("text_switch");
  //console.log(textTgSwitch);

  if (tgSwitch) {
    // Динамический масштаб
    //console.log('ON!');
    for (let i = 0; i <= 3; ++i) {
      chart.yAxis[i].update({ max: null }, false);
    }
    
    textTgSwitch.innerHTML = 'Динамический';
  } else {
    // Статический масштаб
    //console.log('OFF!');

    series.forEach((x, i) => chart.yAxis[i].update({ max: x.scale }, false));
    textTgSwitch.innerHTML = 'Статический';
  };

  chart.redraw();
};

function createChart() {
  chart = Highcharts.stockChart('container', {
    chart: {
      borderWidth: 1,
      animation: false,
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
        { type: 'minute', count: 60, text: '1 час' }
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
      maxZoom: 60000,         // Максимальное увеличение в навигаторе до 60 сек = минимальная ширина графика.  3600000 один час
      tickInterval: 5000,     // Интервал в милисекундах по оси Х
      title: { text: 'Время, с' },
      gridLineWidth: 1,
      labels: {
        formatter: function () {
          return moment(this.value).format('HH:mm:ss');
        }
      }
    },
    yAxis: series.map((x) => ({
      type: 'linear',
      opposite: false,
      tickAmount: 10,
      max: x.scale,
      min: 0,
      title: { offset: 50, text: x.axis }
    })),
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
      },
      // series: {
      //   turboThreshold: 10000
      // }
    },
    series: series.map((x, i) => ({
      type: 'spline',
      yAxis: i,
      name: x.name,
      data: [],
    })),
    legend: {
      enabled: true,
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -10,
      y: 60,
      itemStyle: { padding: '10px' }
    },
  });
}

function updatePoints(newValues, timeStamp) {
  /*
    *
    * Проверка на изменение чего-либо из конфигурации графика.
    * Если что-либо было измененно, то происходит сохранение
    * новых куков.
    *
  */
  if((presetsElement.selectedIndex != selectedPreset) ||
    (selectElements[0].selectedIndex != selectedIndices[0]) ||
    (selectElements[1].selectedIndex != selectedIndices[1]) ||
    (selectElements[2].selectedIndex != selectedIndices[2]) ||
    (selectElements[3].selectedIndex != selectedIndices[3]) ||
    (document.getElementById("chkBox2").checked != selectedChkbox2 ||
    document.getElementById("chkBox").checked != selectedChkbox3)
  ) {
    // console.log('Что-то поменяли');
    saveProperty();
  }
  //  else {
  //   // console.log('Ничего не меняли');
  // }
  
  seconds = new Date().getTime();

  // console.log(newValues.map((x, i) => `${i + 1}: ${x}`).join(', '));
  if (LENGTH_SERIES < 3607) {
    LENGTH_SERIES++;
  }
  
  // console.log(`После довабления ${LENGTH_SERIES}`);
  const isBreak = null !== timeStampBuffer1 && timeStamp === timeStampBuffer1;
  newValues.forEach((x, i) => chart.series[i].addPoint([
    seconds,
    //isBreak ? null : x,
    //x
    Math.random() * 1000
    
  ], true, LENGTH_SERIES >= PREHISTORY_INTERVAL));

  // if(LENGTH_SERIES >= 3067) {
  //   // console.log(`Перед удаление ${LENGTH_SERIES}`);
  //   LENGTH_SERIES--;
  //   // console.log(`После удаления ${LENGTH_SERIES}`);
  // };
  
  //console.log(`length = ${lengthSeries}`);
  //, chart.series[i].data.length > PREHISTORY_INTERVAL
  // if(lengthSeries + 1 >= PREHISTORY_INTERVAL) {
  //   chart.series[0].removePoint(0);
  //   chart.series[1].removePoint(0);
  //   chart.series[2].removePoint(0);
  //   chart.series[3].removePoint(0);
  //   // for(let z = 0; z <= 4; ++z){
  //   //   chart.series[z].removePoint(0);
  //   // };
  //   console.log("deleted");
  //   //chart.redraw();
  // }

  // console.log(`Легенда 0: ${chart.series[0].data.length}`);
  // console.log(`Легенда 1: ${chart.series[1].data.length}`);
  // console.log(`Легенда 2: ${chart.series[2].data.length}`);
  // console.log(`Легенда 3: ${chart.series[3].data.length}`);

};

init();
