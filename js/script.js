let queue = 1;

        function updateQueue() {
            document.getElementById("queueNumber").innerText = queue;
        }

        function nextQueue() {
            queue++;
            updateQueue();
        }

        function previousQueue() {
            if (queue > 1) {
                queue--;
                updateQueue();
            }
        }

        function resetQueue() {
            queue = 1;
            updateQueue();
        }

        function printQueue() {
            let printWindow = window.open('', '', 'width=300,height=400');
            printWindow.document.write('<h1>No. Antrian</h1>');
            printWindow.document.write('<h2 style="font-size: 50px;">' + queue + '</h2>');
            printWindow.document.close();
            printWindow.print();
        }