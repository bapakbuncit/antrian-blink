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
    const queueNumber = String(document.getElementById('queueNumber').textContent).padStart(3, '0');
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const contentToPrint = `
        <html>
        <head>
            <title>Cetak Antrian</title>
            <style>
                @page {
                    size: 58mm auto;
                    margin: 0;
                }
                body {
                    font-family: 'Arial', sans-serif;
                    text-align: center;
                    margin: 0;
                    padding: 0;
                }
                .print-container {
                    padding: 8mm;
                    box-sizing: border-box;
                    font-size: 18px;
                    line-height: 1.4;
                    color: black;
                    text-align: center;
                    border: 2px solid black;
                    border-radius: 5px;
                }
                .title {
                    font-size: 28px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .header {
                    font-size: 16px; /* Ukuran lebih kecil */
                    font-weight: bold;
                    margin-bottom: 5px;
                    border-bottom: 1px solid black;
                    padding-bottom: 3px;
                }
                .queue-number {
                    font-size: 50px;
                    font-weight: bold;
                    margin: 15px 0;
                }
                .footer {
                    font-size: 14px;
                    margin-top: 10px;
                    border-top: 1px dashed black;
                    padding-top: 8px;
                }
                .footer span {
                    font-style: italic;
                }
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                    }
                    .print-container {
                        page-break-before: avoid;
                    }
                }
            </style>
        </head>
        <body>
            <div class="print-container">
                <div class="title">BLINK</div> <!-- Tambahan judul utama -->
                <div class="header">NOMOR ANTRIAN</div>
                <div class="queue-number">${queueNumber}</div>
                <div class="footer">
                    Dicetak pada: ${formattedDate} - ${formattedTime} <br>
                    <span>Terima kasih telah menunggu</span>
                </div>
            </div>
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(() => window.close(), 1000);
                };
            </script>
        </body>
        </html>
    `;

    const printWindow = window.open('', '', 'width=400,height=600');
    printWindow.document.open();
    printWindow.document.write(contentToPrint);
    printWindow.document.close();
}