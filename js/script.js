let queueNumber = 1; // Inisialisasi nomor antrian pertama
const queueDisplay = document.getElementById('queueNumber');
const nextButton = document.getElementById('nextButton');
const backButton = document.getElementById('backButton');
const resetButton = document.getElementById('resetButton');
const printButton = document.getElementById('printButton');

// Fungsi untuk update nomor antrian
function updateQueueNumber() {
    queueDisplay.textContent = String(queueNumber).padStart(3, '0');
}

// Fungsi untuk next nomor antrian
nextButton.addEventListener('click', () => {
    queueNumber++;
    updateQueueNumber();
});

// Fungsi untuk back nomor antrian
backButton.addEventListener('click', () => {
    if (queueNumber > 1) {
        queueNumber--;
        updateQueueNumber();
    }
});

// Fungsi untuk reset nomor antrian
resetButton.addEventListener('click', () => {
    queueNumber = 1;
    updateQueueNumber();
});

// Fungsi untuk print nomor antrian (menggunakan printer POS)
printButton.addEventListener('click', () => {
    printQueue();
});

// Fungsi print ke printer POS
function printQueue() {
    // Menggunakan metode print browser untuk print
    const contentToPrint = `\n\nNomor Antrian: ${String(queueNumber).padStart(3, '0')}`;

    const printWindow = window.open('', '', 'width=600,height=400');
    printWindow.document.write('<html><head><title>Print</title></head><body>');
    printWindow.document.write(`<pre>${contentToPrint}</pre>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}
function printQueue() {
    const queueNumber = String(document.getElementById('queueNumber').textContent).padStart(3, '0');
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const contentToPrint = `
        <html>
        <head>
            <title>Cetak Antrian</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin: 20px;
                }
                .header {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    border-bottom: 2px solid black;
                    padding-bottom: 5px;
                }
                .queue-number {
                    font-size: 50px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                .footer {
                    font-size: 14px;
                    margin-top: 10px;
                    border-top: 1px dashed black;
                    padding-top: 5px;
                }
            </style>
        </head>
        <body>
            <div class="header">NOMOR ANTRIAN</div>
            <div class="queue-number">${queueNumber}</div>
            <div class="footer">
                Dicetak pada: ${formattedDate} - ${formattedTime} <br>
                Terima kasih telah menunggu
            </div>
        </body>
        </html>
    `;

    const printWindow = window.open('', '', 'width=600,height=600');
    printWindow.document.write(contentToPrint);
    printWindow.document.close();
    

    printWindow.onload = function () {
        printWindow.print();
        printWindow.onafterprint = function() {
            printWindow.close();
        };
    };

    const cutCommand = Buffer.from([0x1D, 0x56, 0x41, 0x10]); // Perintah potong kertas
    device.write(cutCommand);
}

