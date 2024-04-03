
function handleFile(e) {
    var files = e.target.files;
    if (files.length === 0) return;
    var file = files[0];
    
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var sheet_name_list = workbook.SheetNames;
        var worksheet = workbook.Sheets[sheet_name_list[0]];
        
        // Define an array to store the column names you want to import
        var columnsToImport = ['الرقم', 'اللقب و الاسم', 'تاريخ الميلاد', 'الجنس', 'الإعادة', 'اللغة العربية', 'اللغة اﻷمازيغية', 'اللغة الفرنسية', 'اللغة الإنجليزية', 'التربية الإسلامية', 'التربية المدنية', 'التاريخ والجغرافيا', 'الرياضيات', 'ع الطبيعة و الحياة', 'ع الفيزيائية والتكنولوجيا', 'المعلوماتية', 'التربية التشكيلية', 'التربية الموسيقية', 'ت البدنية و الرياضية', 'معدل الفصل 1'];

        // Convert the range of rows into JSON format, including only the specified columns
        var json_data = XLSX.utils.sheet_to_json(worksheet, { range: 6, header: 1, raw: false, dateNF: 'dd/mm/yyyy', defval: null, blankrows: false, dateNF: 'dd/mm/yyyy', header: columnsToImport });

        // Delete the last row from the data
        json_data.pop();
        loadDataTable(json_data);
    };
    reader.readAsArrayBuffer(file);
}

function loadDataTable(data) {
    var table = $('#data-table').DataTable({
        dom: 'Bfrtip', // Add export buttons to the DataTable
        destroy: true, // Destroy existing table before creating a new one
        responsive: true, // Make the table responsive to all
        data: data,
        rowReorder: false, // Row Reorder
        rowGroup: false,
        fixedHeader: true,
        colReorder: true,
        stateSave: true,
        scrollX: false, // Enable horizontal scroll bar
        columnDefs: [
            {
                targets: [2, 6, 9, 10, 15, 16, 17, 18, 19], // Columns indexes to hide (zero-based indexing)
                visible: false // Hide specified columns
            },
            {
                targets: '_all',
                className: 'dt-body-center'
            }
        ],
        order: [[0, "asc"]],
        columns: [
            { data: 'الرقم' },
            { data: 'اللقب و الاسم' },
            { 
                data: 'تاريخ الميلاد',
                render: function(data, type, row) {
                    if (type === 'sort' || type === 'type') {
                        return data; // For sorting and filtering
                    }
                    // Format date for display
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
            { data: 'معدل الفصل 1' }
        ],
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
}


document.getElementById('file-input').addEventListener('change', handleFile);

//IMPORT DRAG AND DROP JS

document.addEventListener("DOMContentLoaded", function() {
    const dropArea = document.getElementById("dropArea");
    const messages = document.getElementById("messages");

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
        fileInput.onchange = handleFileInputChange;
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

function uploadFile(file) {
    // Display progress circle
    const progressCircle = document.getElementById('progressCircle');
    progressCircle.classList.remove('hidden');

    // Hide upload icon, success icon, and change text to loading
    const uploadIcon = document.getElementById('uploadIcon');
    uploadIcon.classList.add('hidden');
    const successIcon = document.getElementById('successIcon');
    successIcon.classList.add('hidden');
    const uploadText = document.getElementById('uploadText');
    uploadText.textContent = 'Loading...';

    // Simulate uploading process
    let progress = 0;
    const interval = setInterval(() => {
        // Update progress circle
        progressCircle.textContent = ``;

        // Increase progress
        progress += 10;

        // Check if upload is complete
        if (progress >= 100) {
            // Remove progress circle
            progressCircle.classList.add('hidden');

            // Display success icon
            successIcon.classList.remove('hidden');

            // Show success message
            uploadText.textContent = (`File uploaded successfully.`);

            // Clear interval
            clearInterval(interval);
        }
    }, 500); // Adjust the interval duration as needed
}







    function showMessage(message, type) {
        const div = document.createElement('div');
        div.textContent = message;
        div.classList.add(type);
        messages.appendChild(div);
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
});
