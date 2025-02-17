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
                    size: 80mm auto;
                    margin: 0;
                }
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin: 0;
                    padding: 0;
                }
                .print-container {
                    width: 80mm;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 5px 10px; /* Kurangi padding agar tidak terlalu panjang */
                    border: 1px solid black;
                    box-sizing: border-box;
                }
                .header {
                    font-size: 18px; /* Sedikit kecil agar hemat ruang */
                    font-weight: bold;
                    margin-bottom: 5px; /* Kurangi margin agar tidak terlalu panjang */
                    border-bottom: 2px solid black;
                    padding-bottom: 3px;
                    width: 100%;
                    text-align: center;
                }
                .queue-number {
                    font-size: 45px; /* Ukuran masih besar tapi lebih pas */
                    font-weight: bold;
                    margin: 10px 0; /* Kurangi margin agar tidak terlalu panjang */
                    width: 100%;
                    text-align: center;
                }
                .footer {
                    font-size: 12px;
                    margin-top: 5px; /* Kurangi margin agar tidak terlalu panjang */
                    border-top: 1px dashed black;
                    padding-top: 3px;
                    width: 100%;
                    text-align: center;
                }
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
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
                    Terima kasih telah menunggu
                </div>
            </div>
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(() => window.close(), 500);
                };
            </script>
        </body>
        </html>
    `;

    const printWindow = window.open('', '', 'width=300,height=600');
    printWindow.document.open();
    printWindow.document.write(contentToPrint);
    printWindow.document.close();
}