/////////////////////////////
//Success Rate Table Area chart
/////////////////////////////
var dataSuccessRate = [
    {
        subject: 'اللغة العربية', 
        SuccessRate: countarabicGreaterThanTen,
    },

    {
        subject: 'اللغة اﻷمازيغية', 
        SuccessRate: countamazighGreaterThanTen,
        },
    {
        subject: 'اللغة الفرنسية', 
        SuccessRate: countfrenchGreaterThanTen,
        },
    {
        subject: 'اللغة الإنجليزية', 
        SuccessRate: countenglishGreaterThanTen,
        },
    {
        subject: 'التربية الإسلامية', 
        SuccessRate: countislamicGreaterThanTen,
        },
    {
        subject: 'التربية المدنية', 
        SuccessRate: countcivicsGreaterThanTen,
        },
    {
        subject: 'التاريخ والجغرافيا', 
        SuccessRate: counthistoryandgeographyGreaterThanTen,
        },
    {
        subject: 'الرياضيات', 
        SuccessRate: countmathGreaterThanTen,
        },
    {
        subject: 'ع الطبيعة و الحياة', 
        SuccessRate: countnatureGreaterThanTen,
        },
    {
        subject: 'ع الفيزيائية والتكنولوجيا', 
        SuccessRate: countphysicalGreaterThanTen,
        },
    {
        subject: 'المعلوماتية', 
        SuccessRate: countinformaticsGreaterThanTen,
        },
    {
        subject: 'التربية التشكيلية', 
        SuccessRate: countfineGreaterThanTen,
        },
    {
        subject: 'التربية الموسيقية', 
        SuccessRate: countmusicGreaterThanTen,
        },
    {
        subject: 'ت البدنية و الرياضية', 
        SuccessRate: countathleticGreaterThanTen,
        },
    {
        subject: 'معدل الفصل 1', 
        SuccessRate: countrateGreaterThanTen,
        },

];

// Extract subject names and GreaterThanTen values
var subjectsSuccessRate = dataSuccessRate.map(item => item.subject);
var SuccessRate = dataSuccessRate.map(item => item.SuccessRate);


// Create Bar Chart
var traceSuccessRate = {
    x: subjectsSuccessRate,
    y: SuccessRate,
    type: 'bar',
    name: 'أكبر أو يساوي 10'
};

var tracedataSuccessRate = [traceSuccessRate];

var layouttraceSuccessRate = {
    title: 'رسم بياني يمثل تحليل نتائج الفصل الأول حسب معدلات المواد',
    xaxis: {
        title: 'المواد'
    },
    yaxis: {
        title: 'Mean Score'
    },
    legend: {
        orientation: 'h', // Horizontal orientation
        x: 0.32, // Adjust as needed
        y: -0.2 // Position below the plot area
    }
};

Plotly.newPlot('SuccessRate-chart', tracedataGreater, layoutGreater, {displaylogo: false});

/////////////////////////////
//Greater 10 Male Table Area chart
/////////////////////////////
var dataGreaterMale = [
    {
        subject: 'اللغة العربية', 
        GreaterThanTenMale: countArabicGTenMale,
        BEightAndNineMale: countArabicBetweenEightAndNineMale,
        LessThanEightMale: countArabicLessThanEightMale
    },

    {
        subject: 'اللغة اﻷمازيغية', 
        GreaterThanTenMale: countAmazighGTenMale,
        BEightAndNineMale: countAmazighBetweenEightAndNineMale,
        LessThanEightMale: countAmazighLessThanEightMale
        },
    {
        subject: 'اللغة الفرنسية', 
        GreaterThanTenMale: countFrenchGTenMale,
        BEightAndNineMale: countFrenchBetweenEightAndNineMale,
        LessThanEightMale: countFrenchLessThanEightMale
        },
    {
        subject: 'اللغة الإنجليزية', 
        GreaterThanTenMale: countEnglishGTenMale,
        BEightAndNineMale: countEnglishBetweenEightAndNineMale,
        LessThanEightMale: countEnglishLessThanEightMale
        },
    {
        subject: 'التربية الإسلامية', 
        GreaterThanTenMale: countIslamicGTenMale,
        BEightAndNineMale: countIslamicBetweenEightAndNineMale,
        LessThanEightMale: countIslamicLessThanEightMale
        },
    {
        subject: 'التربية المدنية', 
        GreaterThanTenMale: countCivicsGTenMale,
        BEightAndNineMale: countCivicsBetweenEightAndNineMale,
        LessThanEightMale: countCivicsLessThanEightMale
        },
    {
        subject: 'التاريخ والجغرافيا', 
        GreaterThanTenMale: countHistoryGeographyGTenMale,
        BEightAndNineMale: countHistoryGeographyBetweenEightAndNineMale,
        LessThanEightMale: countHistoryGeographyLessThanEightMale
        },
    {
        subject: 'الرياضيات', 
        GreaterThanTenMale: countMathGTenMale,
        BEightAndNineMale: countMathBetweenEightAndNineMale,
        LessThanEightMale: countMathLessThanEightMale
        },
    {
        subject: 'ع الطبيعة و الحياة', 
        GreaterThanTenMale: countNatureGTenMale,
        BEightAndNineMale: countNatureBetweenEightAndNineMale,
        LessThanEightMale: countNatureLessThanEightMale
        },
    {
        subject: 'ع الفيزيائية والتكنولوجيا', 
        GreaterThanTenMale: countPhysicalGTenMale,
        BEightAndNineMale: countPhysicalBetweenEightAndNineMale,
        LessThanEightMale: countPhysicalLessThanEightMale
        },
    {
        subject: 'المعلوماتية', 
        GreaterThanTenMale: countInformaticsGTenMale,
        BEightAndNineMale: countInformaticsBetweenEightAndNineMale,
        LessThanEightMale: countInformaticsLessThanEightMale
        },
    {
        subject: 'التربية التشكيلية', 
        GreaterThanTenMale: countFineGTenMale,
        BEightAndNineMale: countFineBetweenEightAndNineMale,
        LessThanEightMale: countFineLessThanEightMale
        },
    {
        subject: 'التربية الموسيقية', 
        GreaterThanTenMale: countMusicGTenMale,
        BEightAndNineMale: countMusicBetweenEightAndNineMale,
        LessThanEightMale: countMusicLessThanEightMale
        },
    {
        subject: 'ت البدنية و الرياضية', 
        GreaterThanTenMale: countAthleticGTenMale,
        BEightAndNineMale: countAthleticBetweenEightAndNineMale,
        LessThanEightMale: countAthleticLessThanEightMale
        },
    {
        subject: 'معدل الفصل 1', 
        GreaterThanTenMale: countRateGTenMale,
        BEightAndNineMale: countRateBetweenEightAndNineMale,
        LessThanEightMale: countRateLessThanEightMale
        },

];

// Extract subject names and GreaterThanTen values
var subjectsGreaterMale = dataGreaterMale.map(item => item.subject);
var GreaterThanTenMale = dataGreaterMale.map(item => item.GreaterThanTenMale);
var BetweenEightAndNineMale = dataGreaterMale.map(item => item.BEightAndNineMale);
var LessThanEightMale = dataGreaterMale.map(item => item.LessThanEightMale);

// Create Bar Chart
var traceGreaterThanTenMale = {
    x: subjectsGreaterMale,
    y: GreaterThanTenMale,
    type: 'bar',
    name: 'أكبر أو يساوي 10'
};

var traceBEightAndNineMale = {
    x: subjectsGreaterMale,
    y: BetweenEightAndNineMale,
    type: 'bar',
    name: 'من 08 الى 09.99'
};

var traceLessThanEightMale = {
    x: subjectsGreaterMale,
    y: LessThanEightMale,
    type: 'bar',
    name: 'أقل من 08'
};

var tracedataGreaterMale = [traceGreaterThanTenMale, traceBEightAndNineMale, traceLessThanEightMale];

var layoutGreaterMale = {
    title: 'رسم بياني يمثل تحليل نتائج الفصل الأول حسب معدلات المواد',
    xaxis: {
        title: 'المواد'
    },
    yaxis: {
        title: 'Mean Score'
    },
    legend: {
        orientation: 'h', // Horizontal orientation
        x: 0.32, // Adjust as needed
        y: -0.2 // Position below the plot area
    }
};

Plotly.newPlot('GreaterMale-chart', tracedataGreaterMale, layoutGreaterMale, {displaylogo: false});

/////////////////////////////
//Greater 10 Female Table Area chart
/////////////////////////////
var dataGreaterFemale = [
    {
        subject: 'اللغة العربية', 
        GreaterThanTenFemale: countArabicGTenFemale,
        BEightAndNineFemale: countArabicBetweenEightAndNineFemale,
        LessThanEightFemale: countArabicLessThanEightFemale
    },

    {
        subject: 'اللغة اﻷمازيغية', 
        GreaterThanTenFemale: countAmazighGTenFemale,
        BEightAndNineFemale: countAmazighBetweenEightAndNineFemale,
        LessThanEightFemale: countAmazighLessThanEightFemale
        },
    {
        subject: 'اللغة الفرنسية', 
        GreaterThanTenFemale: countFrenchGTenFemale,
        BEightAndNineFemale: countFrenchBetweenEightAndNineFemale,
        LessThanEightFemale: countFrenchLessThanEightFemale
        },
    {
        subject: 'اللغة الإنجليزية', 
        GreaterThanTenFemale: countEnglishGTenFemale,
        BEightAndNineFemale: countEnglishBetweenEightAndNineFemale,
        LessThanEightFemale: countEnglishLessThanEightFemale
        },
    {
        subject: 'التربية الإسلامية', 
        GreaterThanTenFemale: countIslamicGTenFemale,
        BEightAndNineFemale: countIslamicBetweenEightAndNineFemale,
        LessThanEightFemale: countIslamicLessThanEightFemale
        },
    {
        subject: 'التربية المدنية', 
        GreaterThanTenFemale: countCivicsGTenFemale,
        BEightAndNineFemale: countCivicsBetweenEightAndNineFemale,
        LessThanEightFemale: countCivicsLessThanEightFemale
        },
    {
        subject: 'التاريخ والجغرافيا', 
        GreaterThanTenFemale: countHistoryGeographyGTenFemale,
        BEightAndNineFemale: countHistoryGeographyBetweenEightAndNineFemale,
        LessThanEightFemale: countHistoryGeographyLessThanEightFemale
        },
    {
        subject: 'الرياضيات', 
        GreaterThanTenFemale: countMathGTenFemale,
        BEightAndNineFemale: countMathBetweenEightAndNineFemale,
        LessThanEightFemale: countMathLessThanEightFemale
        },
    {
        subject: 'ع الطبيعة و الحياة', 
        GreaterThanTenFemale: countNatureGTenFemale,
        BEightAndNineFemale: countNatureBetweenEightAndNineFemale,
        LessThanEightFemale: countNatureLessThanEightFemale
        },
    {
        subject: 'ع الفيزيائية والتكنولوجيا', 
        GreaterThanTenFemale: countPhysicalGTenFemale,
        BEightAndNineFemale: countPhysicalBetweenEightAndNineFemale,
        LessThanEightFemale: countPhysicalLessThanEightFemale
        },
    {
        subject: 'المعلوماتية', 
        GreaterThanTenFemale: countInformaticsGTenFemale,
        BEightAndNineFemale: countInformaticsBetweenEightAndNineFemale,
        LessThanEightFemale: countInformaticsLessThanEightFemale
        },
    {
        subject: 'التربية التشكيلية', 
        GreaterThanTenFemale: countFineGTenFemale,
        BEightAndNineFemale: countFineBetweenEightAndNineFemale,
        LessThanEightFemale: countFineLessThanEightFemale
        },
    {
        subject: 'التربية الموسيقية', 
        GreaterThanTenFemale: countMusicGTenFemale,
        BEightAndNineFemale: countMusicBetweenEightAndNineFemale,
        LessThanEightFemale: countMusicLessThanEightFemale
        },
    {
        subject: 'ت البدنية و الرياضية', 
        GreaterThanTenFemale: countAthleticGTenFemale,
        BEightAndNineFemale: countAthleticBetweenEightAndNineFemale,
        LessThanEightFemale: countAthleticLessThanEightFemale
        },
    {
        subject: 'معدل الفصل 1', 
        GreaterThanTenFemale: countRateGTenFemale,
        BEightAndNineFemale: countRateBetweenEightAndNineFemale,
        LessThanEightFemale: countRateLessThanEightFemale
        },

];

// Extract subject names and GreaterThanTen values
var subjectsGreaterFemale = dataGreaterFemale.map(item => item.subject);
var GreaterThanTenFemale = dataGreaterFemale.map(item => item.GreaterThanTenFemale);
var BetweenEightAndNineFemale = dataGreaterFemale.map(item => item.BEightAndNineFemale);
var LessThanEightFemale = dataGreaterFemale.map(item => item.LessThanEightFemale);

// Create Bar Chart
var traceGreaterThanTenFemale = {
    x: subjectsGreaterFemale,
    y: GreaterThanTenFemale,
    type: 'bar',
    name: 'أكبر أو يساوي 10'
};

var traceBEightAndNineFemale = {
    x: subjectsGreaterFemale,
    y: BetweenEightAndNineFemale,
    type: 'bar',
    name: 'من 08 الى 09.99'
};

var traceLessThanEightFemale = {
    x: subjectsGreaterFemale,
    y: LessThanEightFemale,
    type: 'bar',
    name: 'أقل من 08'
};

var tracedataGreaterFemale = [traceGreaterThanTenFemale, traceBEightAndNineFemale, traceLessThanEightFemale];

var layoutGreaterFemale = {
    title: 'رسم بياني يمثل تحليل نتائج الفصل الأول حسب معدلات المواد',
    xaxis: {
        title: 'المواد'
    },
    yaxis: {
        title: 'Mean Score'
    },
    legend: {
        orientation: 'h', // Horizontal orientation
        x: 0.32, // Adjust as needed
        y: -0.2 // Position below the plot area
    }
};

Plotly.newPlot('GreaterFemale-chart', tracedataGreaterFemale, layoutGreaterFemale, {displaylogo: false});
