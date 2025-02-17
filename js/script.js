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

    // Buat elemen print baru di halaman utama
    const printContent = `
        <div id="printArea">
            <style>
                @page {
                    size: 80mm auto;
                    margin: 0; /* Hilangkan margin default */
                }
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin: 0;
                    padding: 0;
                }
                .print-container {
                    width: 80mm;
                    padding: 5px;
                    border: 1px solid black; /* Pastikan border kanan tercetak */
                    box-sizing: border-box;
                    border-collapse: collapse;
                }
                .header {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 5px;
                    border-bottom: 2px solid black;
                    padding-bottom: 3px;
                }
                .queue-number {
                    font-size: 50px;
                    font-weight: bold;
                    margin: 10px 0;
                }
                .footer {
                    font-size: 14px;
                    margin-top: 5px;
                    border-top: 1px dashed black;
                    padding-top: 3px;
                }
                @media print {
                    body * {
                        visibility: hidden; /* Sembunyikan elemen lain */
                    }
                    #printArea, #printArea * {
                        visibility: visible; /* Cetak hanya area antrian */
                    }
                    #printArea {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 80mm;
                    }
                }
            </style>
            <div class="print-container">
                <div class="header">NOMOR ANTRIAN</div>
                <div class="queue-number">${queueNumber}</div>
                <div class="footer">
                    Dicetak pada: ${formattedDate} - ${formattedTime} <br>
                    Terima kasih telah menunggu
                </div>
            </div>
        </div>
    `;

    // Hapus elemen print sebelumnya jika ada
    let existingPrintArea = document.getElementById("printArea");
    if (existingPrintArea) {
        existingPrintArea.remove();
    }

    // Tambahkan elemen ke halaman utama
    document.body.insertAdjacentHTML("beforeend", printContent);

    // Langsung cetak
    window.print();
}