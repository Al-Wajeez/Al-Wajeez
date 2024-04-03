
// Add event listener for when the page is loaded
window.addEventListener('load', function() {
    // Hide the section by setting its display property to none
    //$('.edu-about-area').hide();
    //$('.course-details-area').hide();
    //$('.edu-Achievement-area').hide();
    //$('.edu-Ranking-area').hide();
});

document.addEventListener("DOMContentLoaded", function() {
    const dropArea = document.getElementById("dropArea");

    // Prevent default behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop area on drag over
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    // Unhighlight drop area on drag leave
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    // Handle file drop
    dropArea.addEventListener('drop', handleDrop, false);

    // Click event to trigger file input
    dropArea.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = ".xlsx, .xls";
        fileInput.onchange = handleFileInputChange;
        fileInput.multiple = true; // Enable multiple file selection
        fileInput.click();
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight() {
        dropArea.classList.add('highlight');
    }

    function unhighlight() {
        dropArea.classList.remove('highlight');
    }

    function handleDrop(e) {
        const files = e.dataTransfer.files;
        handleFiles(files);
    }

    function handleFileInputChange(e) {
        const files = e.target.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            uploadFile(file);
        }
    }

    function appendDataToDataTable(newData) {
    const table = $('#data-table').DataTable();

        // Add the new data to the DataTable
        table.rows.add(newData).draw();
    }

    function uploadFile(file) {
        const progressCircle = document.getElementById('progressCircle');
        progressCircle.classList.remove('hidden');

        const uploadIcon = document.getElementById('uploadIcon');
        uploadIcon.classList.add('hidden');
        const successIcon = document.getElementById('successIcon');
        successIcon.classList.add('hidden');
        const uploadText = document.getElementById('uploadText');
        uploadText.textContent = '';

        let progress = 0;
        const interval = setInterval(() => {
            progressCircle.textContent = '';

            progress += 10;

            if (progress >= 100) {
                progressCircle.classList.add('hidden');
                successIcon.classList.remove('hidden');
                uploadText.textContent = 'لقد تم إستيراد البيانات بنجاح.';

           

                clearInterval(interval);

                //var reader = new FileReader();
                const reader = new FileReader();
                reader.onload = function(e) {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheet_name_list = workbook.SheetNames;
                    const worksheet = workbook.Sheets[sheet_name_list[0]];
         
                    const columnsToImport = ['الرقم', 'اللقب و الاسم', 'تاريخ الميلاد', 'الجنس', 'الإعادة', 'اللغة العربية', 'اللغة اﻷمازيغية', 'اللغة الفرنسية', 'اللغة الإنجليزية', 'التربية الإسلامية', 'التربية المدنية', 'التاريخ والجغرافيا', 'الرياضيات', 'ع الطبيعة و الحياة', 'ع الفيزيائية والتكنولوجيا', 'المعلوماتية', 'التربية التشكيلية', 'التربية الموسيقية', 'ت البدنية و الرياضية', 'معدل الفصل 1', 'القسم'];
                    // Get cell A5 value
                    const cellA5 = worksheet['A5'].v;
                    const lastTwoDigits = cellA5.substring(cellA5.length - 2);

                    const json_data = XLSX.utils.sheet_to_json(worksheet, { range: 6, header: 1, raw: false, dateNF: 'dd/mm/yyyy', defval: null, blankrows: false, dateNF: 'dd/mm/yyyy', header: columnsToImport });

                    // Remove the last row from json_data
                    json_data.pop();

                    // Add lastTwoDigits to each row in column 24 ('القسم')
                    json_data.forEach(function(row) {
                    row['القسم'] = lastTwoDigits; // Assuming 'القسم' is the Arabic name for the 'alpha' column
                    });

                    if ($.fn.DataTable.isDataTable('#data-table')) {
                        //$('#data-table').DataTable().destroy();
                        // Append data to existing DataTable
                        appendDataToDataTable(json_data);
                    } else {
                        // Initialize DataTable if it's not initialized yet
                         loadDataTable(json_data);
                    }


                // Show the pop-up modal after successful data loading
                const popupmodal = document.getElementById('popupModal');
                popupmodal.style.display = "block";
                    
                };
                reader.readAsArrayBuffer(file);

            }
        }, 300);
    }

    function loadDataTable(data) {
        var table = $('#data-table').DataTable({
            dom: 'Bfrtip',
            destroy: true,
            responsive: true,
            data: data,
            //rowReorder: true,
            rowGroup: false,
            fixedHeader: true,
            scrollX: false,
            //savedStates: true,
            //keys: true,
            //select: true,
            //autoFill: true,


            columnDefs: [
                        {
                        targets: 20,
                        render: function(data, type, row, meta) {
                            try {
                                var scienceTech = parseFloat(row['ع الفيزيائية والتكنولوجيا']) || 0;
                                var natureLife = parseFloat(row['ع الطبيعة و الحياة']) || 0;
                                var mathematics = parseFloat(row['الرياضيات']) || 0;
                                var arabic = parseFloat(row['اللغة العربية']) || 0;
                                var value = ((scienceTech * 4) + (natureLife * 4) + (mathematics * 4) + (arabic * 2)) / 14;
                                return value.toFixed(2);
                            } catch (error) {
                                // If an error occurs (e.g., column data is missing), return an empty string
                                return '';
                            }
                        }
                    },
                {
                    targets: 21,
                    render: function(data, type, row, meta) {
                        var arabic = parseFloat(row['اللغة العربية']) || 0;
                        var french = parseFloat(row['اللغة الفرنسية']) || 0;
                        var english = parseFloat(row['اللغة الإنجليزية']) || 0;
                        var history = parseFloat(row['التاريخ والجغرافيا']) || 0;
                        var value = ((arabic * 5) + (french * 4) + (english * 3) + (history * 2)) / 14;
                        return value.toFixed(2);
                    }
                },
                {

                    targets: 22,

                    render: function(data, type, row, meta) {
                        var arabic = parseFloat(row['اللغة العربية']) || 0;
                        var french = parseFloat(row['اللغة الفرنسية']) || 0;
                        var english = parseFloat(row['اللغة الإنجليزية']) || 0;
                        var history = parseFloat(row['التاريخ والجغرافيا']) || 0;
                        var TCT = ((arabic * 5) + (french * 4) + (english * 3) + (history * 2)) / 14;
                        var scienceTech = parseFloat(row['ع الفيزيائية والتكنولوجيا']) || 0;
                        var natureLife = parseFloat(row['ع الطبيعة و الحياة']) || 0;
                        var mathematics = parseFloat(row['الرياضيات']) || 0;
                        var TCL = ((scienceTech * 4) + (natureLife * 4) + (mathematics * 4) + (arabic * 2)) / 14;
                        var Orientation = '-';
                        if (TCT > TCL) {
                            Orientation = 'جذع مشترك آداب';
                        } else if (TCT < TCL) {
                            Orientation = 'جذع مشترك علوم وتكنولوجيا';
                        } else {
                            Orientation = '-';
                        }
                        return Orientation;

                    }

                },
                {
                    targets: [2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                    visible: false,
                    className: 'no-print'
                },
                {
                    targets: '_all',
                    className: 'dt-body-center'
                }
            ],
            order: [[23, "asc"]],
            columns: [
                { data: 'الرقم' },
                { data: 'اللقب و الاسم' },
                { 
                    data: 'تاريخ الميلاد',
                    render: function(data, type, row) {
                        if (type === 'sort' || type === 'type') {
                            return data;
                        }
                        var date = new Date(data);
                        var day = date.getDate();
                        var month = date.getMonth() + 1;
                        var year = date.getFullYear();
                        return (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
                    }
                },
                { data: 'الجنس' },
                { data: 'الإعادة' },
                { data: 'اللغة العربية' },
                { data: 'اللغة اﻷمازيغية' },
                { data: 'اللغة الفرنسية' },
                { data: 'اللغة الإنجليزية' },
                { data: 'التربية الإسلامية' },
                { data: 'التربية المدنية' },
                { data: 'التاريخ والجغرافيا' },
                { data: 'الرياضيات' },
                { data: 'ع الطبيعة و الحياة' },
                { data: 'ع الفيزيائية والتكنولوجيا' },
                { data: 'المعلوماتية' },
                { data: 'التربية التشكيلية' },
                { data: 'التربية الموسيقية' },
                { data: 'ت البدنية و الرياضية' },
                { data: 'معدل الفصل 1' },
                { data: null},
                { data: null},
                { data: null},
                { data: 'القسم'},
            ],

            buttons: [
                {
                    text: '',
                    extend: 'copy',
                },

                {
                    text: '',
                    extend: 'excel',
                },

                {
                    text: '',
                    extend: 'print',
                    exportOptions:{
                    columns: ':visible',
                    autoPrint: true,
                    orientation: 'landscape',
                    pageSize: 'A4',
                    }
                },

                {
                text: '',
                extend:'pageLength'
                }
            ],

            // Language setting
            language: {
                "decimal": "",
                "emptyTable": "لا توجد بيانات متاحة في الجدول",
                "info": "إظهار  _START_ إلى _END_ من أصل _TOTAL_ تلميذ",
                "infoEmpty": "عرض 0 إلى 0 من 0 لميذ",
                "infoFiltered": "(تمت تصفيته _MAX_ التلاميذ)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "عرض _MENU_ تلميذ",
                "loadingRecords": "تحميل...",
                "processing": "",
                "search": "البحث:",
                "zeroRecords": "لم يتم العثور على بيانات مطابقة",
                "paginate": {
                    "first": "الأول",
                    "last": "الأخير",
                    "next": "التالي",
                    "previous": "السابق"
                },
                "aria": {
                    "orderable": "الترتيب حسب هذا العمود",
                    "orderableReverse": "ترتيب عكسي لهذا العمود"
                }
                }
        });

         // Initialize column search inputs
        $('#data-table tfoot th').each(function () {
            var title = $(this).text();
            $(this).html('<input type="text" placeholder="' + title + '" />');
        });

        // Apply the search
        table.columns().every(function () {
            var that = this;

            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });


        function performCalculation() {

            // Coefficient of Variation (CV)
            // Coefficient complet table
            // Initialize variables to hold the sum of values for each subject
            let cvsumArabic = 0;
            let cvsumAmazigh = 0;
            let cvsumFrench = 0;
            let cvsumEnglish = 0;
            let cvsumIslamic = 0;
            let cvsumCivics = 0;
            let cvsumHistoryAndGeography = 0;
            let cvsumMath = 0;
            let cvsumNature = 0;
            let cvsumPhysical = 0;
            let cvsumInformatics = 0;
            let cvsumFine = 0;
            let cvsumMusic = 0;
            let cvsumAthletic = 0;
            let cvsumRate = 0;

            let cvsumSquaredDiffArabic = 0;
            let cvsumSquaredDiffAmazigh = 0;
            let cvsumSquaredDiffFrench = 0;
            let cvsumSquaredDiffEnglish = 0;
            let cvsumSquaredDiffIslamic = 0;
            let cvsumSquaredDiffCivics = 0;
            let cvsumSquaredDiffHistoryAndGeography = 0;
            let cvsumSquaredDiffMath = 0;
            let cvsumSquaredDiffNature = 0;
            let cvsumSquaredDiffPhysical = 0;
            let cvsumSquaredDiffInformatics = 0;
            let cvsumSquaredDiffFine = 0;
            let cvsumSquaredDiffMusic = 0;
            let cvsumSquaredDiffAthletic = 0;
            let cvsumSquaredDiffRate = 0;

            // Count the total number of rows
            let totalRows = table.rows().count();

            // Calculate the sum for each subject
                table.rows().every(function() {
                    const rowData = this.data();

                cvsumArabic += parseFloat(rowData['اللغة العربية']) || 0;
                cvsumAmazigh += parseFloat(rowData['اللغة اﻷمازيغية']) || 0;
                cvsumFrench += parseFloat(rowData['اللغة الفرنسية']) || 0;
                cvsumEnglish += parseFloat(rowData['اللغة الإنجليزية']) || 0;
                cvsumIslamic += parseFloat(rowData['التربية الإسلامية']) || 0;
                cvsumCivics += parseFloat(rowData['التربية المدنية']) || 0;
                cvsumHistoryAndGeography += parseFloat(rowData['التاريخ والجغرافيا']) || 0;
                cvsumMath += parseFloat(rowData['الرياضيات']) || 0;
                cvsumNature += parseFloat(rowData['ع الطبيعة و الحياة']) || 0;
                cvsumPhysical += parseFloat(rowData['ع الفيزيائية والتكنولوجيا']) || 0;
                cvsumInformatics += parseFloat(rowData['المعلوماتية']) || 0;
                cvsumFine += parseFloat(rowData['التربية التشكيلية']) || 0;
                cvsumMusic += parseFloat(rowData['التربية الموسيقية']) || 0;
                cvsumAthletic += parseFloat(rowData['ت البدنية و الرياضية']) || 0;
                cvsumRate += parseFloat(rowData['معدل الفصل 1']) || 0;

                    return true;
            });

                // Calculate the mean (average) for each subject
            let cvmeanArabic = cvsumArabic / totalRows;
            let cvmeanAmazigh = cvsumAmazigh / totalRows;
            let cvmeanFrench = cvsumFrench / totalRows;
            let cvmeanEnglish = cvsumEnglish / totalRows;
            let cvmeanIslamic = cvsumIslamic / totalRows;
            let cvmeanCivics = cvsumCivics / totalRows;
            let cvmeanHistoryAndGeography = cvsumHistoryAndGeography / totalRows;
            let cvmeanMath = cvsumMath / totalRows;
            let cvmeanNature = cvsumNature / totalRows;
            let cvmeanPhysical = cvsumPhysical / totalRows;
            let cvmeanInformatics = cvsumInformatics / totalRows;
            let cvmeanFine = cvsumFine / totalRows;
            let cvmeanMusic = cvsumMusic / totalRows;
            let cvmeanAthletic = cvsumAthletic / totalRows;
            let cvmeanRate = cvsumRate / totalRows;

            // Iterate over each row to sum up the values for each subject
            table.rows().every(function() {
                const rowData = this.data();

                const arabicValue = parseFloat(rowData['اللغة العربية']) || 0;
                const amazighValue = parseFloat(rowData['اللغة اﻷمازيغية']) || 0;
                const frenchValue = parseFloat(rowData['اللغة الفرنسية']) || 0;
                const englishValue = parseFloat(rowData['اللغة الإنجليزية']) || 0;
                const islamicValue = parseFloat(rowData['التربية الإسلامية']) || 0;
                const civicsValue = parseFloat(rowData['التربية المدنية']) || 0;
                const historyandgeographyValue = parseFloat(rowData['التاريخ والجغرافيا']) || 0;
                const mathValue = parseFloat(rowData['الرياضيات']) || 0;
                const natureValue = parseFloat(rowData['ع الطبيعة و الحياة']) || 0;
                const physicalValue = parseFloat(rowData['ع الفيزيائية والتكنولوجيا']) || 0;
                const informaticsValue = parseFloat(rowData['المعلوماتية']) || 0;
                const fineValue = parseFloat(rowData['التربية التشكيلية']) || 0;
                const musicValue = parseFloat(rowData['التربية الموسيقية']) || 0;
                const athleticValue = parseFloat(rowData['ت البدنية و الرياضية']) || 0;
                const rateValue = parseFloat(rowData['معدل الفصل 1']) || 0;

                // Calculate the squared differences and add them to the sum
                cvsumSquaredDiffArabic += Math.pow(arabicValue - cvmeanArabic, 2);
                cvsumSquaredDiffAmazigh += Math.pow(amazighValue - cvmeanAmazigh, 2);
                cvsumSquaredDiffFrench += Math.pow(frenchValue - cvmeanFrench, 2);
                cvsumSquaredDiffEnglish += Math.pow(englishValue - cvmeanEnglish, 2);
                cvsumSquaredDiffIslamic += Math.pow(islamicValue - cvmeanIslamic, 2);
                cvsumSquaredDiffCivics += Math.pow(civicsValue - cvmeanCivics, 2);
                cvsumSquaredDiffHistoryAndGeography += Math.pow(historyandgeographyValue - cvmeanHistoryAndGeography, 2);
                cvsumSquaredDiffMath += Math.pow(mathValue - cvmeanMath, 2);
                cvsumSquaredDiffNature += Math.pow(natureValue - cvmeanNature, 2);
                cvsumSquaredDiffPhysical += Math.pow(physicalValue - cvmeanPhysical, 2);
                cvsumSquaredDiffInformatics += Math.pow(informaticsValue - cvmeanInformatics, 2);
                cvsumSquaredDiffFine += Math.pow(fineValue - cvmeanFine, 2);
                cvsumSquaredDiffMusic += Math.pow(musicValue - cvmeanMusic, 2);
                cvsumSquaredDiffAthletic += Math.pow(athleticValue - cvmeanAthletic, 2);
                cvsumSquaredDiffRate += Math.pow(rateValue - cvmeanRate, 2);

                return true;

            });

            // Calculate the standard deviation for each subject
            let cvstdvArabic = Math.sqrt(cvsumSquaredDiffArabic / (totalRows - 1));
            let cvstdvAmazigh = Math.sqrt(cvsumSquaredDiffAmazigh / (totalRows - 1));
            let cvstdvFrench = Math.sqrt(cvsumSquaredDiffFrench / (totalRows - 1));
            let cvstdvEnglish = Math.sqrt(cvsumSquaredDiffEnglish / (totalRows - 1));
            let cvstdvIslamic = Math.sqrt(cvsumSquaredDiffIslamic / (totalRows - 1));
            let cvstdvCivics = Math.sqrt(cvsumSquaredDiffCivics / (totalRows - 1));
            let cvstdvHistoryAndGeography = Math.sqrt(cvsumSquaredDiffHistoryAndGeography / (totalRows - 1));
            let cvstdvMath = Math.sqrt(cvsumSquaredDiffMath / (totalRows - 1));
            let cvstdvNature = Math.sqrt(cvsumSquaredDiffNature / (totalRows - 1));
            let cvstdvPhysical = Math.sqrt(cvsumSquaredDiffPhysical / (totalRows - 1));
            let cvstdvInformatics = Math.sqrt(cvsumSquaredDiffInformatics / (totalRows - 1));
            let cvstdvFine = Math.sqrt(cvsumSquaredDiffFine / (totalRows - 1));
            let cvstdvMusic = Math.sqrt(cvsumSquaredDiffMusic / (totalRows - 1));
            let cvstdvAthletic = Math.sqrt(cvsumSquaredDiffAthletic / (totalRows - 1));
            let cvstdvRate = Math.sqrt(cvsumSquaredDiffRate / (totalRows - 1));

            let cvArabic = totalRows > 0 ? (cvstdvArabic / cvmeanArabic) * 100 : cv0; 
            let cvAmazigh = totalRows > 0 ? (cvstdvAmazigh / cvmeanAmazigh) * 100 : cv0;
            let cvFrench = totalRows > 0 ? (cvstdvFrench / cvmeanFrench) * 100 : cv0;
            let cvEnglish = totalRows > 0 ? (cvstdvEnglish / cvmeanEnglish) * 100 : cv0;
            let cvIslamic = totalRows > 0 ? (cvstdvIslamic / cvmeanIslamic) * 100 : cv0;
            let cvCivics = totalRows > 0 ? (cvstdvCivics / cvmeanCivics) * 100 : cv0;
            let cvHistoryAndGeography = totalRows > 0 ? (cvstdvHistoryAndGeography / cvmeanHistoryAndGeography) * 100 : cv0;
            let cvMath = totalRows > 0 ? (cvstdvMath / cvmeanMath) * 100 : cv0;
            let cvNature = totalRows > 0 ? (cvstdvNature / cvmeanNature) * 100 : cv0;
            let cvPhysical = totalRows > 0 ? (cvstdvPhysical / cvmeanPhysical) * 100 : cv0;
            let cvInformatics = totalRows > 0 ? (cvstdvInformatics / cvmeanInformatics) * 100 : cv0;
            let cvFine = totalRows > 0 ? (cvstdvFine / cvmeanFine) * 100 : cv0;
            let cvMusic = totalRows > 0 ? (cvstdvMusic / cvmeanMusic) * 100 : cv0;
            let cvAthletic = totalRows > 0 ? (cvstdvAthletic / cvmeanAthletic) * 100 : cv0;
            let cvRate = totalRows > 0 ? (cvstdvRate / cvmeanRate) * 100 : cv0;

            let cvArabicG1 = Math.abs((cvstdvArabic * 3 / 2) - cvmeanArabic); 
            let cvAmazighG1 = Math.abs((cvstdvAmazigh * 3 / 2) - cvmeanAmazigh);
            let cvFrenchG1 = Math.abs((cvstdvFrench * 3 / 2) - cvmeanFrench);
            let cvEnglishG1 = Math.abs((cvstdvEnglish * 3 / 2) - cvmeanEnglish);
            let cvIslamicG1 = Math.abs((cvstdvIslamic * 3 / 2) - cvmeanIslamic);
            let cvCivicsG1 = Math.abs((cvstdvCivics * 3 / 2) - cvmeanCivics);
            let cvHistoryAndGeographyG1 = Math.abs((cvstdvHistoryAndGeography * 3 / 2) - cvmeanHistoryAndGeography);
            let cvMathG1 = Math.abs((cvstdvMath * 3 / 2) - cvmeanMath);
            let cvNatureG1 = Math.abs((cvstdvNature * 3 / 2) - cvmeanNature);
            let cvPhysicalG1 = Math.abs((cvstdvPhysical * 3 / 2) - cvmeanPhysical);
            let cvInformaticsG1 = Math.abs((cvstdvInformatics * 3 / 2) - cvmeanInformatics);
            let cvFineG1 = Math.abs((cvstdvFine * 3 / 2) - cvmeanFine);
            let cvMusicG1 = Math.abs((cvstdvMusic * 3 / 2) - cvmeanMusic);
            let cvAthleticG1 = Math.abs((cvstdvAthletic * 3 / 2) - cvmeanAthletic);
            let cvRateG1 = Math.abs((cvstdvRate * 3 / 2) - cvmeanRate);

            let cvArabicG2 = Math.abs((cvstdvArabic * 1 / 2) - cvmeanArabic); 
            let cvAmazighG2 = Math.abs((cvstdvAmazigh * 1 / 2) - cvmeanAmazigh);
            let cvFrenchG2 = Math.abs((cvstdvFrench * 1 / 2) - cvmeanFrench);
            let cvEnglishG2 = Math.abs((cvstdvEnglish * 1 / 2) - cvmeanEnglish);
            let cvIslamicG2 = Math.abs((cvstdvIslamic * 1 / 2) - cvmeanIslamic);
            let cvCivicsG2 = Math.abs((cvstdvCivics * 1 / 2) - cvmeanCivics);
            let cvHistoryAndGeographyG2 = Math.abs((cvstdvHistoryAndGeography * 1 / 2) - cvmeanHistoryAndGeography);
            let cvMathG2 = Math.abs((cvstdvMath * 1 / 2) - cvmeanMath);
            let cvNatureG2 = Math.abs((cvstdvNature * 1 / 2) - cvmeanNature);
            let cvPhysicalG2 = Math.abs((cvstdvPhysical * 1 / 2) - cvmeanPhysical);
            let cvInformaticsG2 = Math.abs((cvstdvInformatics * 1 / 2) - cvmeanInformatics);
            let cvFineG2 = Math.abs((cvstdvFine * 1 / 2) - cvmeanFine);
            let cvMusicG2 = Math.abs((cvstdvMusic * 1 / 2) - cvmeanMusic);
            let cvAthleticG2 = Math.abs((cvstdvAthletic * 1 / 2) - cvmeanAthletic);
            let cvRateG2 = Math.abs((cvstdvRate * 1 / 2) - cvmeanRate);

            let cvArabicG3 = Math.abs((cvstdvArabic * 1 / 2) + cvmeanArabic); 
            let cvAmazighG3 = Math.abs((cvstdvAmazigh * 1 / 2) + cvmeanAmazigh);
            let cvFrenchG3 = Math.abs((cvstdvFrench * 1 / 2) + cvmeanFrench);
            let cvEnglishG3 = Math.abs((cvstdvEnglish * 1 / 2) + cvmeanEnglish);
            let cvIslamicG3 = Math.abs((cvstdvIslamic * 1 / 2) + cvmeanIslamic);
            let cvCivicsG3 = Math.abs((cvstdvCivics * 1 / 2) + cvmeanCivics);
            let cvHistoryAndGeographyG3 = Math.abs((cvstdvHistoryAndGeography * 1 / 2) + cvmeanHistoryAndGeography);
            let cvMathG3 = Math.abs((cvstdvMath * 1 / 2) + cvmeanMath);
            let cvNatureG3 = Math.abs((cvstdvNature * 1 / 2) + cvmeanNature);
            let cvPhysicalG3 = Math.abs((cvstdvPhysical * 1 / 2) + cvmeanPhysical);
            let cvInformaticsG3 = Math.abs((cvstdvInformatics * 1 / 2) + cvmeanInformatics);
            let cvFineG3 = Math.abs((cvstdvFine * 1 / 2) + cvmeanFine);
            let cvMusicG3 = Math.abs((cvstdvMusic * 1 / 2) + cvmeanMusic);
            let cvAthleticG3 = Math.abs((cvstdvAthletic * 1 / 2) + cvmeanAthletic);
            let cvRateG3 = Math.abs((cvstdvRate * 1 / 2) + cvmeanRate);

            let cvArabicG4 = Math.abs((cvstdvArabic * 2 / 2) + cvmeanArabic); 
            let cvAmazighG4 = Math.abs((cvstdvAmazigh * 2 / 2) + cvmeanAmazigh);
            let cvFrenchG4 = Math.abs((cvstdvFrench * 2 / 2) + cvmeanFrench);
            let cvEnglishG4 = Math.abs((cvstdvEnglish * 2 / 2) + cvmeanEnglish);
            let cvIslamicG4 = Math.abs((cvstdvIslamic * 2 / 2) + cvmeanIslamic);
            let cvCivicsG4 = Math.abs((cvstdvCivics * 2 / 2) + cvmeanCivics);
            let cvHistoryAndGeographyG4 = Math.abs((cvstdvHistoryAndGeography * 2 / 2) + cvmeanHistoryAndGeography);
            let cvMathG4 = Math.abs((cvstdvMath * 2 / 2) + cvmeanMath);
            let cvNatureG4 = Math.abs((cvstdvNature * 2 / 2) + cvmeanNature);
            let cvPhysicalG4 = Math.abs((cvstdvPhysical * 2 / 2) + cvmeanPhysical);
            let cvInformaticsG4 = Math.abs((cvstdvInformatics * 2 / 2) + cvmeanInformatics);
            let cvFineG4 = Math.abs((cvstdvFine * 2 / 2) + cvmeanFine);
            let cvMusicG4 = Math.abs((cvstdvMusic * 2 / 2) + cvmeanMusic);
            let cvAthleticG4 = Math.abs((cvstdvAthletic * 2 / 2) + cvmeanAthletic);
            let cvRateG4 = Math.abs((cvstdvRate * 2 / 2) + cvmeanRate);


            // Count the number of values greater than 1 in 'اللغة العربية' and 'اللغة اﻷمازيغية'
            let countarabicWeak = 0;
            let countamazighWeak = 0;
            let countfrenchWeak = 0;
            let countenglishWeak = 0;
            let countislamicWeak = 0;
            let countcivicsWeak = 0;
            let counthistoryandgeographyWeak = 0;
            let countmathWeak = 0;
            let countnatureWeak = 0;
            let countphysicalWeak = 0;
            let countinformaticsWeak = 0;
            let countfineWeak = 0;
            let countmusicWeak = 0;
            let countathleticWeak = 0;
            let countrateWeak = 0;

            let countarabicCloseto = 0;
            let countamazighCloseto = 0;
            let countfrenchCloseto = 0;
            let countenglishCloseto = 0;
            let countislamicCloseto = 0;
            let countcivicsCloseto = 0;
            let counthistoryandgeographyCloseto = 0;
            let countmathCloseto = 0;
            let countnatureCloseto = 0;
            let countphysicalCloseto = 0;
            let countinformaticsCloseto = 0;
            let countfineCloseto = 0;
            let countmusicCloseto = 0;
            let countathleticCloseto = 0;
            let countrateCloseto = 0;

            let countarabicMedium = 0;
            let countamazighMedium = 0;
            let countfrenchMedium = 0;
            let countenglishMedium = 0;
            let countislamicMedium = 0;
            let countcivicsMedium = 0;
            let counthistoryandgeographyMedium = 0;
            let countmathMedium = 0;
            let countnatureMedium = 0;
            let countphysicalMedium = 0;
            let countinformaticsMedium = 0;
            let countfineMedium = 0;
            let countmusicMedium = 0;
            let countathleticMedium = 0;
            let countrateMedium = 0;

            let countarabicGood = 0;
            let countamazighGood = 0;
            let countfrenchGood = 0;
            let countenglishGood = 0;
            let countislamicGood = 0;
            let countcivicsGood = 0;
            let counthistoryandgeographyGood = 0;
            let countmathGood = 0;
            let countnatureGood = 0;
            let countphysicalGood = 0;
            let countinformaticsGood = 0;
            let countfineGood = 0;
            let countmusicGood = 0;
            let countathleticGood = 0;
            let countrateGood = 0;

            let countarabicVeryGood = 0;
            let countamazighVeryGood = 0;
            let countfrenchVeryGood = 0;
            let countenglishVeryGood = 0;
            let countislamicVeryGood = 0;
            let countcivicsVeryGood = 0;
            let counthistoryandgeographyVeryGood = 0;
            let countmathVeryGood = 0;
            let countnatureVeryGood = 0;
            let countphysicalVeryGood = 0;
            let countinformaticsVeryGood = 0;
            let countfineVeryGood = 0;
            let countmusicVeryGood = 0;
            let countathleticVeryGood = 0;
            let countrateVeryGood = 0;

            let countarabicCV = 0;
            let countamazighCV = 0;
            let countfrenchCV = 0;
            let countenglishCV = 0;
            let countislamicCV = 0;
            let countcivicsCV = 0;
            let counthistoryandgeographyCV = 0;
            let countmathCV = 0;
            let countnatureCV = 0;
            let countphysicalCV = 0;
            let countinformaticsCV = 0;
            let countfineCV = 0;
            let countmusicCV = 0;
            let countathleticCV = 0;
            let countrateCV = 0;

            table.rows().every(function() {
                const rowData = this.data();

                const arabicValue = parseFloat(rowData['اللغة العربية']) || 0;
                const amazighValue = parseFloat(rowData['اللغة اﻷمازيغية']) || 0;
                const frenchValue = parseFloat(rowData['اللغة الفرنسية']) || 0;
                const englishValue = parseFloat(rowData['اللغة الإنجليزية']) || 0;
                const islamicValue = parseFloat(rowData['التربية الإسلامية']) || 0;
                const civicsValue = parseFloat(rowData['التربية المدنية']) || 0;
                const historyandgeographyValue = parseFloat(rowData['التاريخ والجغرافيا']) || 0;
                const mathValue = parseFloat(rowData['الرياضيات']) || 0;
                const natureValue = parseFloat(rowData['ع الطبيعة و الحياة']) || 0;
                const physicalValue = parseFloat(rowData['ع الفيزيائية والتكنولوجيا']) || 0;
                const informaticsValue = parseFloat(rowData['المعلوماتية']) || 0;
                const fineValue = parseFloat(rowData['التربية التشكيلية']) || 0;
                const musicValue = parseFloat(rowData['التربية الموسيقية']) || 0;
                const athleticValue = parseFloat(rowData['ت البدنية و الرياضية']) || 0;
                const rateValue = parseFloat(rowData['معدل الفصل 1']) || 0;

                // Coefficient of Variation - 0 - G1
                if (arabicValue > 0 && arabicValue <= cvArabicG1) {
                    countarabicWeak++;
                }
                if (amazighValue > 0 && amazighValue <= cvAmazighG1) {
                    countamazighWeak++;
                }
                if (frenchValue > 0 && frenchValue <= cvFrenchG1) {
                    countfrenchWeak++;
                }
                if (englishValue > 0 && englishValue <= cvEnglishG1) {
                    countenglishWeak++;
                }
                if (islamicValue > 0 && islamicValue <= cvIslamicG1) {
                    countislamicWeak++;
                }
                if (civicsValue > 0 && civicsValue <= cvCivicsG1) {
                    countcivicsWeak++;
                }
                if (historyandgeographyValue > 0 && historyandgeographyValue <= cvHistoryAndGeographyG1) {
                    counthistoryandgeographyWeak++;
                }
                if (mathValue > 0 && mathValue <= cvMathG1) {
                    countmathWeak++;
                }
                if (natureValue > 0 && natureValue <= cvNatureG1) {
                    countnatureWeak++;
                }
                if (physicalValue > 0 && physicalValue <= cvPhysicalG1) {
                    countphysicalWeak++;
                }
                if (informaticsValue > 0 && informaticsValue <= cvInformaticsG1) {
                    countinformaticsWeak++;
                }
                if (fineValue > 0 && fineValue <= cvFineG1) {
                    countfineWeak++;
                }
                if (musicValue > 0 && musicValue <= cvMusicG1) {
                    countmusicWeak++;
                }
                if (athleticValue > 0 && athleticValue <= cvAthleticG1) {
                    countathleticWeak++;
                }
                if (rateValue > 0 && rateValue <= cvRateG1) {
                    countrateWeak++;
                }

                // Coefficient of Variation - G1 - G2
                if (arabicValue > cvArabicG1 && arabicValue <= cvArabicG2) {
                    countarabicCloseto++;
                }
                if (amazighValue > cvAmazighG1 && amazighValue <= cvAmazighG2) {
                    countamazighCloseto++;
                }
                if (frenchValue > cvFrenchG1 && frenchValue <= cvFrenchG2) {
                    countfrenchCloseto++;
                }
                if (englishValue > cvEnglishG1 && englishValue <= cvEnglishG2) {
                    countenglishCloseto++;
                }
                if (islamicValue > cvIslamicG1 && islamicValue <= cvIslamicG2) {
                    countislamicCloseto++;
                }
                if (civicsValue > cvCivicsG1 && civicsValue <= cvCivicsG2) {
                    countcivicsCloseto++;
                }
                if (historyandgeographyValue > cvHistoryAndGeographyG1 && historyandgeographyValue <= cvHistoryAndGeographyG2) {
                    counthistoryandgeographyCloseto++;
                }
                if (mathValue > cvMathG1 && mathValue <= cvMathG2) {
                    countmathCloseto++;
                }
                if (natureValue > cvNatureG1 && natureValue <= cvNatureG2) {
                    countnatureCloseto++;
                }
                if (physicalValue > cvPhysicalG1 && physicalValue <= cvPhysicalG2) {
                    countphysicalCloseto++;
                }
                if (informaticsValue > cvInformaticsG1 && informaticsValue <= cvInformaticsG2) {
                    countinformaticsCloseto++;
                }
                if (fineValue > cvFineG1 && fineValue <= cvFineG2) {
                    countfineCloseto++;
                }
                if (musicValue > cvMusicG1 && musicValue <= cvMusicG2) {
                    countmusicCloseto++;
                }
                if (athleticValue > cvAthleticG1 && athleticValue <= cvAthleticG2) {
                    countathleticCloseto++;
                }
                if (rateValue > cvRateG1 && rateValue <= cvRateG2) {
                    countrateCloseto++;
                }

                // Coefficient of Variation - G2 - G3
                if (arabicValue > cvArabicG2 && arabicValue <= cvArabicG3) {
                    countarabicMedium++;
                }
                if (amazighValue > cvAmazighG2 && amazighValue <= cvAmazighG3) {
                    countamazighMedium++;
                }
                if (frenchValue > cvFrenchG2 && frenchValue <= cvFrenchG3) {
                    countfrenchMedium++;
                }
                if (englishValue > cvEnglishG2 && englishValue <= cvEnglishG3) {
                    countenglishMedium++;
                }
                if (islamicValue > cvIslamicG2 && islamicValue <= cvIslamicG3) {
                    countislamicMedium++;
                }
                if (civicsValue > cvCivicsG2 && civicsValue <= cvCivicsG3) {
                    countcivicsMedium++;
                }
                if (historyandgeographyValue > cvHistoryAndGeographyG2 && historyandgeographyValue <= cvHistoryAndGeographyG3) {
                    counthistoryandgeographyMedium++;
                }
                if (mathValue > cvMathG2 && mathValue <= cvMathG3) {
                    countmathMedium++;
                }
                if (natureValue > cvNatureG2 && natureValue <= cvNatureG3) {
                    countnatureMedium++;
                }
                if (physicalValue > cvPhysicalG2 && physicalValue <= cvPhysicalG3) {
                    countphysicalMedium++;
                }
                if (informaticsValue > cvInformaticsG2 && informaticsValue <= cvInformaticsG3) {
                    countinformaticsMedium++;
                }
                if (fineValue > cvFineG2 && fineValue <= cvFineG3) {
                    countfineMedium++;
                }
                if (musicValue > cvMusicG2 && musicValue <= cvMusicG3) {
                    countmusicMedium++;
                }
                if (athleticValue > cvAthleticG2 && athleticValue <= cvAthleticG3) {
                    countathleticMedium++;
                }
                if (rateValue > cvRateG2 && rateValue <= cvRateG3) {
                    countrateMedium++;
                }

                // // Coefficient of Variation - G3 - G4
                if (arabicValue > cvArabicG3 && arabicValue <= cvArabicG4) {
                    countarabicGood++;
                }
                if (amazighValue > cvAmazighG3 && amazighValue <= cvAmazighG4) {
                    countamazighGood++;
                }
                if (frenchValue > cvFrenchG3 && frenchValue <= cvFrenchG4) {
                    countfrenchGood++;
                }
                if (englishValue > cvEnglishG3 && englishValue <= cvEnglishG4) {
                    countenglishGood++;
                }
                if (islamicValue > cvIslamicG3 && islamicValue <= cvIslamicG4) {
                    countislamicGood++;
                }
                if (civicsValue > cvCivicsG3 && civicsValue <= cvCivicsG4) {
                    countcivicsGood++;
                }
                if (historyandgeographyValue > cvHistoryAndGeographyG3 && historyandgeographyValue <= cvHistoryAndGeographyG4) {
                    counthistoryandgeographyGood++;
                }
                if (mathValue > cvMathG3 && mathValue <= cvMathG4) {
                    countmathGood++;
                }
                if (natureValue > cvNatureG3 && natureValue <= cvNatureG4) {
                    countnatureGood++;
                }
                if (physicalValue > cvPhysicalG3 && physicalValue <= cvPhysicalG4) {
                    countphysicalGood++;
                }
                if (informaticsValue > cvInformaticsG3 && informaticsValue <= cvInformaticsG4) {
                    countinformaticsGood++;
                }
                if (fineValue > cvFineG3 && fineValue <= cvFineG4) {
                    countfineGood++;
                }
                if (musicValue > cvMusicG3 && musicValue <= cvMusicG4) {
                    countmusicGood++;
                }
                if (athleticValue > cvAthleticG3 && athleticValue <= cvAthleticG4) {
                    countathleticGood++;
                }
                if (rateValue > cvRateG3 && rateValue <= cvRateG4) {
                    countrateGood++;
                }

                // Coefficient of Variation - G4 - 20
                if (arabicValue > cvArabicG4 && arabicValue <= 20) {
                    countarabicVeryGood++;
                }
                if (amazighValue > cvAmazighG4 && amazighValue <= 20) {
                    countamazighVeryGood++;
                }
                if (frenchValue > cvFrenchG4 && frenchValue <= 20) {
                    countfrenchVeryGood++;
                }
                if (englishValue > cvEnglishG4 && englishValue <= 20) {
                    countenglishVeryGood++;
                }
                if (islamicValue > cvIslamicG4 && islamicValue <= 20) {
                    countislamicVeryGood++;
                }
                if (civicsValue > cvCivicsG4 && civicsValue <= 20) {
                    countcivicsVeryGood++;
                }
                if (historyandgeographyValue > cvHistoryAndGeographyG4 && historyandgeographyValue <= 20) {
                    counthistoryandgeographyVeryGood++;
                }
                if (mathValue > cvMathG4 && mathValue <= 20) {
                    countmathVeryGood++;
                }
                if (natureValue > cvNatureG4 && natureValue <= 20) {
                    countnatureVeryGood++;
                }
                if (physicalValue > cvPhysicalG4 && physicalValue <= 20) {
                    countphysicalVeryGood++;
                }
                if (informaticsValue > cvInformaticsG4 && informaticsValue <= 20) {
                    countinformaticsVeryGood++;
                }
                if (fineValue > cvFineG4 && fineValue <= 20) {
                    countfineVeryGood++;
                }
                if (musicValue > cvMusicG4 && musicValue <= 20) {
                    countmusicVeryGood++;
                }
                if (athleticValue > cvAthleticG4 && athleticValue <= 20) {
                    countathleticVeryGood++;
                }
                if (rateValue > cvRateG4 && rateValue <= 20) {
                    countrateVeryGood++;
                }

                //Count the number of values greater than 1
                if (arabicValue >= 1) {
                    countarabicCV++;
                }
                if (amazighValue >= 1) {
                    countamazighCV++;
                }
                if (frenchValue >= 1) {
                    countfrenchCV++;
                }
                if (englishValue >= 1) {
                    countenglishCV++;
                }
                if (islamicValue >= 1) {
                    countislamicCV++;
                }
                if (civicsValue >= 1) {
                    countcivicsCV++;
                }
                if (historyandgeographyValue > 1) {
                    counthistoryandgeographyCV++;
                }
                if (mathValue >= 1) {
                    countmathCV++;
                }
                if (natureValue >= 1) {
                    countnatureCV++;
                }
                if (physicalValue >= 1) {
                    countphysicalCV++;
                }
                if (informaticsValue >= 1) {
                    countinformaticsCV++;
                }
                if (fineValue >= 1) {
                    countfineCV++;
                }
                if (musicValue >= 1) {
                    countmusicCV++;
                }
                if (athleticValue >= 1) {
                    countathleticCV++;
                }
                if (rateValue >= 1) {
                    countrateCV++;
                }

                return true;

            });

            let ArabicpercentageG1 = countarabicCV > 0 ? (countarabicWeak * 100) / countarabicCV :0; 
            let AmazighpercentageG1 = countamazighCV > 0 ? (countamazighWeak * 100) / countamazighCV :0;
            let FrenchpercentageG1 = countfrenchCV > 0 ? (countfrenchWeak * 100) / countfrenchCV : 0;
            let EnglishpercentageG1 = countenglishCV > 0 ? (countenglishWeak * 100) / countenglishCV : 0;
            let IslamicpercentageG1 = countislamicCV > 0 ? (countislamicWeak * 100) / countislamicCV : 0;
            let CivicspercentageG1 = countcivicsCV > 0 ? (countcivicsWeak * 100) / countcivicsCV : 0;
            let HistoryAndGeographypercentageG1 = counthistoryandgeographyCV > 0 ? (counthistoryandgeographyWeak * 100) / counthistoryandgeographyCV : 0;
            let MathpercentageG1 = countmathCV > 0 ? (countmathWeak * 100) / countmathCV : 0;
            let NaturepercentageG1 = countnatureCV > 0 ? (countnatureWeak * 100) / countnatureCV : 0;
            let PhysicalpercentageG1 = countphysicalCV > 0 ? (countphysicalWeak * 100) / countphysicalCV : 0;
            let InformaticspercentageG1 = countinformaticsCV > 0 ? (countinformaticsWeak * 100) / countinformaticsCV : 0;
            let FinepercentageG1 = countfineCV > 0 ? (countfineWeak * 100) / countfineCV : 0;
            let MusicpercentageG1 = countmusicCV > 0 ? (countmusicWeak * 100) / countmusicCV : 0;
            let AthleticpercentageG1 = countathleticCV > 0 ? (countathleticWeak * 100) / countathleticCV : 0;
            let RatepercentageG1 = countrateCV > 0 ? (countrateWeak * 100) / countrateCV : 0;

            let ArabicpercentageG2 = countarabicCV > 0 ? (countarabicCloseto * 100) / countarabicCV : 0; 
            let AmazighpercentageG2 = countamazighCV > 0 ? (countamazighCloseto * 100) / countamazighCV : 0;
            let FrenchpercentageG2 = countfrenchCV > 0 ? (countfrenchCloseto * 100) / countfrenchCV : 0;
            let EnglishpercentageG2 = countenglishCV > 0 ? (countenglishCloseto * 100) / countenglishCV : 0;
            let IslamicpercentageG2 = countislamicCV > 0 ? (countislamicCloseto * 100) / countislamicCV : 0;
            let CivicspercentageG2 = countcivicsCV > 0 ? (countcivicsCloseto * 100) / countcivicsCV : 0;
            let HistoryAndGeographypercentageG2 = counthistoryandgeographyCV > 0 ? (counthistoryandgeographyCloseto * 100) / counthistoryandgeographyCV : 0;
            let MathpercentageG2 = countmathCV > 0 ? (countmathCloseto * 100) / countmathCV : 0;
            let NaturepercentageG2 = countnatureCV > 0 ? (countnatureCloseto * 100) / countnatureCV : 0;
            let PhysicalpercentageG2 = countphysicalCV > 0 ? (countphysicalCloseto * 100) / countphysicalCV : 0;
            let InformaticspercentageG2 = countinformaticsCV > 0 ? (countinformaticsCloseto * 100) / countinformaticsCV : 0;
            let FinepercentageG2 = countfineCV > 0 ? (countfineCloseto * 100) / countfineCV : 0;
            let MusicpercentageG2 = countmusicCV > 0 ? (countmusicCloseto * 100) / countmusicCV : 0;
            let AthleticpercentageG2 = countathleticCV > 0 ? (countathleticCloseto * 100) / countathleticCV : 0;
            let RatepercentageG2 = countrateCV > 0 ? (countrateCloseto * 100) / countrateCV : 0;

            let ArabicpercentageG3 = countarabicCV > 0 ? (countarabicMedium * 100) / countarabicCV : 0; 
            let AmazighpercentageG3 = countamazighCV > 0 ? (countamazighMedium * 100) / countamazighCV : 0;
            let FrenchpercentageG3 = countfrenchCV > 0 ? (countfrenchMedium * 100) / countfrenchCV : 0;
            let EnglishpercentageG3 = countenglishCV > 0 ? (countenglishMedium * 100) / countenglishCV : 0;
            let IslamicpercentageG3 = countislamicCV > 0 ? (countislamicMedium * 100) / countislamicCV : 0;
            let CivicspercentageG3 = countcivicsCV > 0 ? (countcivicsMedium * 100) / countcivicsCV : 0;
            let HistoryAndGeographypercentageG3 = counthistoryandgeographyCV > 0 ? (counthistoryandgeographyMedium * 100) / counthistoryandgeographyCV : 0;
            let MathpercentageG3 = countmathCV > 0 ? (countmathMedium * 100) / countmathCV : 0;
            let NaturepercentageG3 = countnatureCV > 0 ? (countnatureMedium * 100) / countnatureCV : 0;
            let PhysicalpercentageG3 = countphysicalCV > 0 ? (countphysicalMedium * 100) / countphysicalCV : 0;
            let InformaticspercentageG3 = countinformaticsCV > 0 ? (countinformaticsMedium * 100) / countinformaticsCV : 0;
            let FinepercentageG3 = countfineCV > 0 ? (countfineMedium * 100) / countfineCV : 0;
            let MusicpercentageG3 = countmusicCV > 0 ? (countmusicMedium * 100) / countmusicCV : 0;
            let AthleticpercentageG3 = countathleticCV > 0 ? (countathleticMedium * 100) / countathleticCV : 0;
            let RatepercentageG3 = countrateCV > 0 ? (countrateMedium * 100) / countrateCV : 0;

            let ArabicpercentageG4 = countarabicCV > 0 ? (countarabicGood * 100) / countarabicCV : 0; 
            let AmazighpercentageG4 = countamazighCV > 0 ? (countamazighGood * 100) / countamazighCV : 0;
            let FrenchpercentageG4 = countfrenchCV > 0 ? (countfrenchGood * 100) / countfrenchCV : 0;
            let EnglishpercentageG4 = countenglishCV > 0 ? (countenglishGood * 100) / countenglishCV : 0;
            let IslamicpercentageG4 = countislamicCV > 0 ? (countislamicGood * 100) / countislamicCV : 0;
            let CivicspercentageG4 = countcivicsCV > 0 ? (countcivicsGood * 100) / countcivicsCV : 0;
            let HistoryAndGeographypercentageG4 = counthistoryandgeographyCV > 0 ? (counthistoryandgeographyGood * 100) / counthistoryandgeographyCV : 0;
            let MathpercentageG4 = countmathCV > 0 ? (countmathGood * 100) / countmathCV : 0;
            let NaturepercentageG4 = countnatureCV > 0 ? (countnatureGood * 100) / countnatureCV : 0;
            let PhysicalpercentageG4 = countphysicalCV > 0 ? (countphysicalGood * 100) / countphysicalCV : 0;
            let InformaticspercentageG4 = countinformaticsCV > 0 ? (countinformaticsGood * 100) / countinformaticsCV : 0;
            let FinepercentageG4 = countfineCV > 0 ? (countfineGood * 100) / countfineCV : 0;
            let MusicpercentageG4 = countmusicCV > 0 ? (countmusicGood * 100) / countmusicCV : 0;
            let AthleticpercentageG4 = countathleticCV > 0 ? (countathleticGood * 100) / countathleticCV : 0;
            let RatepercentageG4 = countrateCV > 0 ? (countrateGood * 100) / countrateCV : 0;

            let ArabicpercentageG5 = countarabicCV > 0 ? (countarabicVeryGood * 100) / countarabicCV : 0; 
            let AmazighpercentageG5 = countamazighCV > 0 ? (countamazighVeryGood * 100) / countamazighCV : 0;
            let FrenchpercentageG5 = countfrenchCV > 0 ? (countfrenchVeryGood * 100) / countfrenchCV : 0;
            let EnglishpercentageG5 = countenglishCV > 0 ? (countenglishVeryGood * 100) / countenglishCV : 0;
            let IslamicpercentageG5 = countislamicCV > 0 ? (countislamicVeryGood * 100) / countislamicCV : 0;
            let CivicspercentageG5 = countcivicsCV > 0 ? (countcivicsVeryGood * 100) / countcivicsCV : 0;
            let HistoryAndGeographypercentageG5 = counthistoryandgeographyCV > 0 ? (counthistoryandgeographyVeryGood * 100) / counthistoryandgeographyCV : 0;
            let MathpercentageG5 = countmathCV > 0 ? (countmathVeryGood * 100) / countmathCV : 0;
            let NaturepercentageG5 = countnatureCV > 0 ? (countnatureVeryGood * 100) / countnatureCV : 0;
            let PhysicalpercentageG5 = countphysicalCV > 0 ? (countphysicalVeryGood * 100) / countphysicalCV : 0;
            let InformaticspercentageG5 = countinformaticsCV > 0 ? (countinformaticsVeryGood * 100) / countinformaticsCV : 0;
            let FinepercentageG5 = countfineCV > 0 ? (countfineVeryGood * 100) / countfineCV : 0;
            let MusicpercentageG5 = countmusicCV > 0 ? (countmusicVeryGood * 100) / countmusicCV : 0;
            let AthleticpercentageG5 = countathleticCV > 0 ? (countathleticVeryGood * 100) / countathleticCV : 0;
            let RatepercentageG5 = countrateCV > 0 ? (countrateVeryGood * 100) / countrateCV : 0;



                $('#arabic-cv').text(cvArabic.toFixed(2) + "%");
                $('#amazigh-cv').text(cvAmazigh.toFixed(2) + "%");
                $('#french-cv').text(cvFrench.toFixed(2) + "%");
                $('#english-cv').text(cvEnglish.toFixed(2) + "%");
                $('#islamic-cv').text(cvIslamic.toFixed(2) + "%");
                $('#civics-cv').text(cvCivics.toFixed(2) + "%");
                $('#historyandgeography-cv').text(cvHistoryAndGeography.toFixed(2) + "%");
                $('#math-cv').text(cvMath.toFixed(2) + "%");
                $('#nature-cv').text(cvNature.toFixed(2) + "%");
                $('#physical-cv').text(cvPhysical.toFixed(2) + "%");
                $('#informatics-cv').text(cvInformatics.toFixed(2) + "%");
                $('#fine-cv').text(cvFine.toFixed(2) + "%");
                $('#music-cv').text(cvMusic.toFixed(2) + "%");
                $('#athletic-cv').text(cvAthletic.toFixed(2) + "%");
                $('#rate-cv').text(cvRate.toFixed(2) + "%");

                $('#arabic-percentageG1').text(ArabicpercentageG1.toFixed(2) + "%");
                $('#amazigh-percentageG1').text(AmazighpercentageG1.toFixed(2) + "%");
                $('#french-percentageG1').text(FrenchpercentageG1.toFixed(2) + "%");
                $('#english-percentageG1').text(EnglishpercentageG1.toFixed(2) + "%");
                $('#islamic-percentageG1').text(IslamicpercentageG1.toFixed(2) + "%");
                $('#civics-percentageG1').text(CivicspercentageG1.toFixed(2) + "%");
                $('#historyandgeography-percentageG1').text(HistoryAndGeographypercentageG1.toFixed(2) + "%");
                $('#math-percentageG1').text(MathpercentageG1.toFixed(2) + "%");
                $('#nature-percentageG1').text(NaturepercentageG1.toFixed(2) + "%");
                $('#physical-percentageG1').text(PhysicalpercentageG1.toFixed(2) + "%");
                $('#informatics-percentageG1').text(InformaticspercentageG1.toFixed(2) + "%");
                $('#fine-percentageG1').text(FinepercentageG1.toFixed(2) + "%");
                $('#music-percentageG1').text(MusicpercentageG1.toFixed(2) + "%");
                $('#athletic-percentageG1').text(AthleticpercentageG1.toFixed(2) + "%");
                $('#rate-percentageG1').text(RatepercentageG1.toFixed(2) + "%");

                $('#arabic-percentageG2').text(ArabicpercentageG2.toFixed(2) + "%");
                $('#amazigh-percentageG2').text(AmazighpercentageG2.toFixed(2) + "%");
                $('#french-percentageG2').text(FrenchpercentageG2.toFixed(2) + "%");
                $('#english-percentageG2').text(EnglishpercentageG2.toFixed(2) + "%");
                $('#islamic-percentageG2').text(IslamicpercentageG2.toFixed(2) + "%");
                $('#civics-percentageG2').text(CivicspercentageG2.toFixed(2) + "%");
                $('#historyandgeography-percentageG2').text(HistoryAndGeographypercentageG2.toFixed(2) + "%");
                $('#math-percentageG2').text(MathpercentageG2.toFixed(2) + "%");
                $('#nature-percentageG2').text(NaturepercentageG2.toFixed(2) + "%");
                $('#physical-percentageG2').text(PhysicalpercentageG2.toFixed(2) + "%");
                $('#informatics-percentageG2').text(InformaticspercentageG2.toFixed(2) + "%");
                $('#fine-percentageG2').text(FinepercentageG2.toFixed(2) + "%");
                $('#music-percentageG2').text(MusicpercentageG2.toFixed(2) + "%");
                $('#athletic-percentageG2').text(AthleticpercentageG2.toFixed(2) + "%");
                $('#rate-percentageG2').text(RatepercentageG2.toFixed(2) + "%");

                $('#arabic-percentageG3').text(ArabicpercentageG3.toFixed(2) + "%");
                $('#amazigh-percentageG3').text(AmazighpercentageG3.toFixed(2) + "%");
                $('#french-percentageG3').text(FrenchpercentageG3.toFixed(2) + "%");
                $('#english-percentageG3').text(EnglishpercentageG3.toFixed(2) + "%");
                $('#islamic-percentageG3').text(IslamicpercentageG3.toFixed(2) + "%");
                $('#civics-percentageG3').text(CivicspercentageG3.toFixed(2) + "%");
                $('#historyandgeography-percentageG3').text(HistoryAndGeographypercentageG3.toFixed(2) + "%");
                $('#math-percentageG3').text(MathpercentageG3.toFixed(2) + "%");
                $('#nature-percentageG3').text(NaturepercentageG3.toFixed(2) + "%");
                $('#physical-percentageG3').text(PhysicalpercentageG3.toFixed(2) + "%");
                $('#informatics-percentageG3').text(InformaticspercentageG3.toFixed(2) + "%");
                $('#fine-percentageG3').text(FinepercentageG3.toFixed(2) + "%");
                $('#music-percentageG3').text(MusicpercentageG3.toFixed(2) + "%");
                $('#athletic-percentageG3').text(AthleticpercentageG3.toFixed(2) + "%");
                $('#rate-percentageG3').text(RatepercentageG3.toFixed(2) + "%");

                $('#arabic-percentageG4').text(ArabicpercentageG4.toFixed(2) + "%");
                $('#amazigh-percentageG4').text(AmazighpercentageG4.toFixed(2) + "%");
                $('#french-percentageG4').text(FrenchpercentageG4.toFixed(2) + "%");
                $('#english-percentageG4').text(EnglishpercentageG4.toFixed(2) + "%");
                $('#islamic-percentageG4').text(IslamicpercentageG4.toFixed(2) + "%");
                $('#civics-percentageG4').text(CivicspercentageG4.toFixed(2) + "%");
                $('#historyandgeography-percentageG4').text(HistoryAndGeographypercentageG4.toFixed(2) + "%");
                $('#math-percentageG4').text(MathpercentageG4.toFixed(2) + "%");
                $('#nature-percentageG4').text(NaturepercentageG4.toFixed(2) + "%");
                $('#physical-percentageG4').text(PhysicalpercentageG4.toFixed(2) + "%");
                $('#informatics-percentageG4').text(InformaticspercentageG4.toFixed(2) + "%");
                $('#fine-percentageG4').text(FinepercentageG4.toFixed(2) + "%");
                $('#music-percentageG4').text(MusicpercentageG4.toFixed(2) + "%");
                $('#athletic-percentageG4').text(AthleticpercentageG4.toFixed(2) + "%");
                $('#rate-percentageG4').text(RatepercentageG4.toFixed(2) + "%");

                $('#arabic-percentageG5').text(ArabicpercentageG5.toFixed(2) + "%");
                $('#amazigh-percentageG5').text(AmazighpercentageG5.toFixed(2) + "%");
                $('#french-percentageG5').text(FrenchpercentageG5.toFixed(2) + "%");
                $('#english-percentageG5').text(EnglishpercentageG5.toFixed(2) + "%");
                $('#islamic-percentageG5').text(IslamicpercentageG5.toFixed(2) + "%");
                $('#civics-percentageG5').text(CivicspercentageG5.toFixed(2) + "%");
                $('#historyandgeography-percentageG5').text(HistoryAndGeographypercentageG5.toFixed(2) + "%");
                $('#math-percentageG5').text(MathpercentageG5.toFixed(2) + "%");
                $('#nature-percentageG5').text(NaturepercentageG5.toFixed(2) + "%");
                $('#physical-percentageG5').text(PhysicalpercentageG5.toFixed(2) + "%");
                $('#informatics-percentageG5').text(InformaticspercentageG5.toFixed(2) + "%");
                $('#fine-percentageG5').text(FinepercentageG5.toFixed(2) + "%");
                $('#music-percentageG5').text(MusicpercentageG5.toFixed(2) + "%");
                $('#athletic-percentageG5').text(AthleticpercentageG5.toFixed(2) + "%");
                $('#rate-percentageG5').text(RatepercentageG5.toFixed(2) + "%");

                $('#arabic-countG1').text(countarabicWeak);
                $('#amazigh-countG1').text(countamazighWeak);
                $('#french-countG1').text(countfrenchWeak);
                $('#english-countG1').text(countenglishWeak);
                $('#islamic-countG1').text(countislamicWeak);
                $('#civics-countG1').text(countcivicsWeak);
                $('#historyandgeography-countG1').text(counthistoryandgeographyWeak);
                $('#math-countG1').text(countmathWeak);
                $('#nature-countG1').text(countnatureWeak);
                $('#physical-countG1').text(countphysicalWeak);
                $('#informatics-countG1').text(countinformaticsWeak);
                $('#fine-countG1').text(countfineWeak);
                $('#music-countG1').text(countmusicWeak);
                $('#athletic-countG1').text(countathleticWeak);
                $('#rate-countG1').text(countrateWeak);

                $('#arabic-countG2').text(countarabicCloseto);
                $('#amazigh-countG2').text(countamazighCloseto);
                $('#french-countG2').text(countfrenchCloseto);
                $('#english-countG2').text(countenglishCloseto);
                $('#islamic-countG2').text(countislamicCloseto);
                $('#civics-countG2').text(countcivicsCloseto);
                $('#historyandgeography-countG2').text(counthistoryandgeographyCloseto);
                $('#math-countG2').text(countmathCloseto);
                $('#nature-countG2').text(countnatureCloseto);
                $('#physical-countG2').text(countphysicalCloseto);
                $('#informatics-countG2').text(countinformaticsCloseto);
                $('#fine-countG2').text(countfineCloseto);
                $('#music-countG2').text(countmusicCloseto);
                $('#athletic-countG2').text(countathleticCloseto);
                $('#rate-countG2').text(countrateCloseto);

                $('#arabic-countG3').text(countarabicMedium);
                $('#amazigh-countG3').text(countamazighMedium);
                $('#french-countG3').text(countfrenchMedium);
                $('#english-countG3').text(countenglishMedium);
                $('#islamic-countG3').text(countislamicMedium);
                $('#civics-countG3').text(countcivicsMedium);
                $('#historyandgeography-countG3').text(counthistoryandgeographyMedium);
                $('#math-countG3').text(countmathMedium);
                $('#nature-countG3').text(countnatureMedium);
                $('#physical-countG3').text(countphysicalMedium);
                $('#informatics-countG3').text(countinformaticsMedium);
                $('#fine-countG3').text(countfineMedium);
                $('#music-countG3').text(countmusicMedium);
                $('#athletic-countG3').text(countathleticMedium);
                $('#rate-countG3').text(countrateMedium);

                $('#arabic-countG4').text(countarabicGood);
                $('#amazigh-countG4').text(countamazighGood);
                $('#french-countG4').text(countfrenchGood);
                $('#english-countG4').text(countenglishGood);
                $('#islamic-countG4').text(countislamicGood);
                $('#civics-countG4').text(countcivicsGood);
                $('#historyandgeography-countG4').text(counthistoryandgeographyGood);
                $('#math-countG4').text(countmathGood);
                $('#nature-countG4').text(countnatureGood);
                $('#physical-countG4').text(countphysicalGood);
                $('#informatics-countG4').text(countinformaticsGood);
                $('#fine-countG4').text(countfineGood);
                $('#music-countG4').text(countmusicGood);
                $('#athletic-countG4').text(countathleticGood);
                $('#rate-countG4').text(countrateGood);

                $('#arabic-countG5').text(countarabicVeryGood);
                $('#amazigh-countG5').text(countamazighVeryGood);
                $('#french-countG5').text(countfrenchVeryGood);
                $('#english-countG5').text(countenglishVeryGood);
                $('#islamic-countG5').text(countislamicVeryGood);
                $('#civics-countG5').text(countcivicsVeryGood);
                $('#historyandgeography-countG5').text(counthistoryandgeographyVeryGood);
                $('#math-countG5').text(countmathVeryGood);
                $('#nature-countG5').text(countnatureVeryGood);
                $('#physical-countG5').text(countphysicalVeryGood);
                $('#informatics-countG5').text(countinformaticsVeryGood);
                $('#fine-countG5').text(countfineVeryGood);
                $('#music-countG5').text(countmusicVeryGood);
                $('#athletic-countG5').text(countathleticVeryGood);
                $('#rate-countG5').text(countrateVeryGood);

                if (cvArabic <= 15) {
                    $('#arabic-cvNote').text("هناك إنسجام تام");
                } else if (cvArabic <= 30 && cvArabic > 15) {
                    $('#arabic-cvNote').text("هناك إنسجام نسبي");
                } else if (cvArabic > 30 && cvArabic > 15) {
                    $('#arabic-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#arabic-cvNote').text("-");
                }
                if (cvAmazigh <= 15) {
                    $('#amazigh-cvNote').text("هناك إنسجام تام");
                } else if (cvAmazigh <= 30 && cvAmazigh > 15) {
                    $('#amazigh-cvNote').text("هناك إنسجام نسبي");
                } else if (cvAmazigh > 30 && cvAmazigh > 15) {
                    $('#amazigh-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#amazigh-cvNote').text("-");
                }
                if (cvFrench <= 15) {
                    $('#french-cvNote').text("هناك إنسجام تام");
                } else if (cvFrench <= 30 && cvFrench > 15) {
                    $('#french-cvNote').text("هناك إنسجام نسبي");
                } else if (cvFrench > 30 && cvFrench > 15) {
                    $('#french-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#french-cvNote').text("-");
                }
                if (cvEnglish <= 15) {
                    $('#english-cvNote').text("هناك إنسجام تام");
                } else if (cvEnglish <= 30 && cvEnglish > 15) {
                    $('#english-cvNote').text("هناك إنسجام نسبي");
                } else if (cvEnglish > 30 && cvEnglish > 15) {
                    $('#english-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#english-cvNote').text("-");
                }
                if (cvIslamic <= 15) {
                    $('#islamic-cvNote').text("هناك إنسجام تام");
                } else if (cvIslamic <= 30 && cvIslamic > 15) {
                    $('#islamic-cvNote').text("هناك إنسجام نسبي");
                } else if (cvIslamic > 30 && cvIslamic > 15) {
                    $('#islamic-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#islamic-cvNote').text("-");
                }
                if (cvCivics <= 15) {
                    $('#civics-cvNote').text("هناك إنسجام تام");
                } else if (cvCivics <= 30 && cvCivics > 15) {
                    $('#civics-cvNote').text("هناك إنسجام نسبي");
                } else if (cvCivics > 30 && cvCivics > 15) {
                    $('#civics-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#civics-cvNote').text("-");
                }
                if (cvHistoryAndGeography <= 15) {
                    $('#historyandgeography-cvNote').text("هناك إنسجام تام");
                } else if (cvHistoryAndGeography <= 30 && cvHistoryAndGeography > 15) {
                    $('#historyandgeography-cvNote').text("هناك إنسجام نسبي");
                } else if (cvHistoryAndGeography > 30 && cvHistoryAndGeography > 15) {
                    $('#historyandgeography-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#historyandgeography-cvNote').text("-");
                }
                if (cvMath <= 15) {
                    $('#math-cvNote').text("هناك إنسجام تام");
                } else if (cvMath <= 30 && cvMath > 15) {
                    $('#math-cvNote').text("هناك إنسجام نسبي");
                } else if (cvMath > 30 && cvMath > 15) {
                    $('#math-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#math-cvNote').text("-");
                }
                if (cvNature <= 15) {
                    $('#nature-cvNote').text("هناك إنسجام تام");
                } else if (cvNature <= 30 && cvNature > 15) {
                    $('#nature-cvNote').text("هناك إنسجام نسبي");
                } else if (cvNature > 30 && cvNature > 15) {
                    $('#nature-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#nature-cvNote').text("-");
                }
                if (cvPhysical <= 15) {
                    $('#physical-cvNote').text("هناك إنسجام تام");
                } else if (cvPhysical <= 30 && cvPhysical > 15) {
                    $('#physical-cvNote').text("هناك إنسجام نسبي");
                } else if (cvPhysical > 30 && cvPhysical > 15) {
                    $('#physical-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#physical-cvNote').text("-");
                }
                if (cvInformatics <= 15) {
                    $('#informatics-cvNote').text("هناك إنسجام تام");
                } else if (cvInformatics <= 30 && cvInformatics > 15) {
                    $('#informatics-cvNote').text("هناك إنسجام نسبي");
                } else if (cvInformatics > 30 && cvInformatics > 15) {
                    $('#informatics-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#informatics-cvNote').text("-");
                }
                if (cvFine <= 15) {
                    $('#fine-cvNote').text("هناك إنسجام تام");
                } else if (cvFine <= 30 && cvFine > 15) {
                    $('#fine-cvNote').text("هناك إنسجام نسبي");
                } else if (cvFine > 30 && cvFine > 15) {
                    $('#fine-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#fine-cvNote').text("-");
                }
                if (cvMusic <= 15) {
                    $('#music-cvNote').text("هناك إنسجام تام");
                } else if (cvMusic <= 30 && cvMusic > 15) {
                    $('#music-cvNote').text("هناك إنسجام نسبي");
                } else if (cvMusic > 30 && cvMusic > 15) {
                    $('#music-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#music-cvNote').text("-");
                }
                if (cvAthletic <= 15) {
                    $('#athletic-cvNote').text("هناك إنسجام تام");
                } else if (cvAthletic <= 30 && cvAthletic > 15) {
                    $('#athletic-cvNote').text("هناك إنسجام نسبي");
                } else if (cvAthletic > 30 && cvAthletic > 15) {
                    $('#athletic-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#athletic-cvNote').text("-");
                }
                if (cvRate <= 15) {
                    $('#rate-cvNote').text("هناك إنسجام تام");
                } else if (cvRate <= 30 && cvRate > 15) {
                    $('#rate-cvNote').text("هناك إنسجام نسبي");
                } else if (cvRate > 30 && cvRate > 15) {
                    $('#rate-cvNote').text("هناك تشتت واختلاف");
                } else {
                    $('#rate-cvNote').text("-");
                }


}

// Attach an event listener to the button
$('#calculate-button').on('click', function() {
    // Call the function to perform the calculation when the button is clicked
    performCalculation();
});

       }

});