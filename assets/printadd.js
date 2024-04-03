function printSection(sectionId) {
    var section = document.getElementById(sectionId);
    var printWindow = window.open('', '_blank');


    printWindow.document.write('<html><head><title>قسم الطباعة</title>');
    // Include CSS files
    var stylesheets = document.querySelectorAll('link[rel="stylesheet"]');

    stylesheets.forEach(function (stylesheet) {
        var link = printWindow.document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = stylesheet.href;
        link.onload = function() {
                writeContent();
            }

        printWindow.document.head.appendChild(link);

    });

    // Function to write content after all stylesheets are loaded
    function writeContent() {
        printWindow.document.write('<link rel="stylesheet" type="text/css" href="assets/css/vendor/bootstrap.min.css">');
        printWindow.document.write('<link rel="stylesheet" type="text/css" href="assets/css/app.css">');
        printWindow.document.write('</html><lang="ar" dir="rtl">'); // Set direction to RTL
        printWindow.document.write(section.innerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus(); // Ensure the print window is in focus
        // Set a timer before printing
        setTimeout(function() {
            printWindow.print();
        }, 300); // Change the delay time as needed (in milliseconds)
    }
}



function xlsxSection(sectionId) {
    var section = document.getElementById(sectionId);
    var wb = XLSX.utils.table_to_book(section, {sheet: "تحليل"}); // Convert table directly to workbook
    var ws = wb.Sheets["تحليل"];

    // Format percentage cells
    var range = XLSX.utils.decode_range(ws['!ref']);
    for (var R = range.s.r; R <= range.e.r; ++R) {
        for (var C = range.s.c; C <= range.e.c; ++C) {
            var cell_address = { c: C, r: R };
            var cell_ref = XLSX.utils.encode_cell(cell_address);
            if (ws[cell_ref] && ws[cell_ref].v && typeof ws[cell_ref].v === 'number' && ws[cell_ref].v <= 1) {
                ws[cell_ref].t = 'n'; // Set cell type to number
                ws[cell_ref].z = '0.00%'; // Set cell format to display percentage with two decimal places
            }
        }
    }

    // Apply alignment settings to entire worksheet
    ws['!ref'] = XLSX.utils.encode_range(range);
    ws['!cols'] = [{wch: 20}, {wch: 8}, {wch: 8}, {wch: 8}, {wch: 8}, {wch: 8}, {wch: 8}, {wch: 8}, {wch: 8}, {wch: 8}, {wch: 8}, {wch: 8}, {wch: 8}, {wch: 8}, {wch: 8}]; // Set column width
    ws['!rows'] = [{hpx: 30, hidden: false}]; // Set row height
    ws['!page'] = { orientation: 'portrait', fitToPage: true }; // Set page orientation and fit to page


    var wbout = XLSX.write(wb, {
        bookType: 'xls',
        type: 'binary',
        compression: true, // Enable compression
        Props: {
            Title: "تحليل",
            Author: "Al-Wajeez",
            Subject: "تحليل النتائج",
            CreatedDate: new Date()
        },
        SheetNames: ["تحليل"], // Specify sheet name
        Sheets: {
            "تحليل": ws
        }
    });

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'Al-Wajeez.xls');
}
document.addEventListener('DOMContentLoaded', function() {
    var currentDateElement = document.getElementById('currentDate');
    var currentTimeElement = document.getElementById('currentTime');

    function updateDateTime() {
        var now = new Date();
        var dateOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        var timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        var date = now.toLocaleDateString('ar', dateOptions);
        var time = now.toLocaleTimeString('ar', timeOptions);
        currentDateElement.innerText = date;
        currentTimeElement.innerText = time;
    }

    updateDateTime(); // Initial update
    setInterval(updateDateTime, 1000); // Update every second
});
