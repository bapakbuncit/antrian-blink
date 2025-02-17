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
                    margin: 0; /* Hilangkan margin bawaan printer */
                }
                body {
                    font-family: 'Arial', sans-serif;
                    text-align: center;
                    margin: 0;
                    padding: 0;
                }
                .print-container {
                    padding: 10mm; /* Menambahkan padding untuk memberi ruang */
                    box-sizing: border-box;
                    font-size: 20px;
                    line-height: 1.5;
                    color: black; /* Semua teks hitam */
                    text-align: center;
                }
                .header {
                    font-size: 28px; /* Ukuran lebih besar untuk header */
                    font-weight: bold;
                    margin-bottom: 10px;
                }
                .queue-number {
                    font-size: 70px; /* Ukuran lebih besar untuk nomor antrian */
                    font-weight: bold;
                    margin: 20px 0;
                }
                .footer {
                    font-size: 14px;
                    margin-top: 20px;
                    border-top: 1px solid #000; /* Garis hitam untuk footer */
                    padding-top: 10px;
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
                    setTimeout(() => window.close(), 1000); // Menutup jendela setelah sedikit jeda
                };
            </script>
        </body>
        </html>
    `;

    const printWindow = window.open('', '', 'width=400,height=600'); // Menambah ukuran jendela agar lebih besar
    printWindow.document.open();
    printWindow.document.write(contentToPrint);
    printWindow.document.close();
}
