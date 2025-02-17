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

